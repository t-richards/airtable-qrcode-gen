import Field from '@airtable/blocks/dist/types/src/models/field'
import Table from '@airtable/blocks/dist/types/src/models/table'
import { FieldId } from '@airtable/blocks/dist/types/src/types/field'
import { RecordId } from '@airtable/blocks/dist/types/src/types/record'
import { Box, Button, Heading, loadCSSFromString, useBase, useCursor, useLoadable, useRecordById, useWatchable } from '@airtable/blocks/ui'
import React, { Fragment, useState } from 'react'

import { QrCode, Ecc } from '../../../vendor/qrcodegen'

type FieldsById = {
    [key: string]: Field
}

type ItemProps = {
    activeTable: Table
    selectedRecordId: string
    selectedFieldIds: string[]
    fieldsById: FieldsById
}

type QrToSvgProps = {
    qr: QrCode
    border: number
    lightColor: string
    darkColor: string
}

// Produces SVG markup for the given QR coe
const QrToSvg: React.FC<QrToSvgProps> = ({
    qr,
    border,
    lightColor,
    darkColor
}) => {
    if (border < 0) {
        throw 'Border must be non-negative'
    }

    const parts: string[] = []

    for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
            if (qr.getModule(x, y))
                parts.push(`M${x + border},${y + border}h1v1h-1z`)
        }
    }
    const viewBox = `0 0 ${qr.size + border * 2} ${qr.size + border * 2}`

    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox={viewBox} stroke="none">
            <rect width="100%" height="100%" fill={lightColor} />
            <path d={parts.join(' ')} fill={darkColor} />
        </svg>
    )
}

// Renders an individual record
const IndividualItem: React.FC<ItemProps> = ({
    activeTable,
    selectedRecordId,
    selectedFieldIds,
    fieldsById
}) => {

    const selectedRecord = useRecordById(activeTable, selectedRecordId, {
        fields: [...selectedFieldIds]
    })
    if (!selectedRecord) {
        return null
    }

    const qr0 = QrCode.encodeText(selectedRecord.url, Ecc.LOW)

    return (
        <Fragment>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                maxHeight="480px"
                className="inventory-label"
            >
                {selectedFieldIds.map(fieldId => {
                    const val = selectedRecord.getCellValueAsString(fieldId)
                    if (val.trim() === '') {
                        return null
                    }

                    const fieldName = fieldsById[fieldId].name
                    const key = `${selectedRecordId}-${fieldId}`

                    if (fieldName === 'Name') {
                        return (
                            <Heading key={key} size="xxlarge">
                                {val}
                            </Heading>
                        )
                    }

                    return (
                        <Heading key={key}>
                            {fieldName}:&nbsp;{val}
                        </Heading>
                    )
                })}
                <QrToSvg
                    qr={qr0}
                    border={4}
                    lightColor='white'
                    darkColor='black'
                />
            </Box>
        </Fragment>
    )
}

const QrCodeGenerator: React.FC = () => {
    // state.
    const [selectedRecordIds, setSelectedRecordIds] = useState<RecordId[]>([])
    const [selectedFieldIds, setSelectedFieldIds] = useState<FieldId[]>([])

    // load selected records and fields.
    const cursor = useCursor()
    useLoadable(cursor)

    // re-render whenever selected record changes.
    useWatchable(cursor, ['selectedRecordIds', 'selectedFieldIds'], () => {
        setSelectedRecordIds(cursor.selectedRecordIds)
        setSelectedFieldIds(cursor.selectedFieldIds)
    })

    // clear selected record if the user switches tables.
    useWatchable(cursor, ['activeTableId', 'activeViewId'], () => {
        setSelectedRecordIds([])
        setSelectedFieldIds([])
    })

    // get the currently active table
    const base = useBase()
    if (!cursor.activeTableId) {
        return null
    }

    // activeTable is briefly null when switching to a newly created table.
    const activeTable = base.getTableByIdIfExists(cursor.activeTableId)
    if (!activeTable) {
        return null
    }

    const fieldsById = activeTable.fields.reduce((memo, item) => {
        memo[item.id] = item
        return memo
    }, {} as FieldsById)

    if (selectedRecordIds.length <= 0) {
        return null
    }

    const handlePrint = () => {
        const printStyles = loadCSSFromString('@media print{.inventory-label{page-break-after:always}.print-hide{display:none!important}}')

        window.print()

        printStyles.remove()
    }

    return (
        <div>
            <Box
                padding={4}
                display="flex"
                alignItems="end"
                justifyContent="end"
                className="print-hide"
            >
                <Button
                    onClick={handlePrint}
                    icon="print"
                    size="large"
                >
                    Print
                </Button>
            </Box>

            {selectedRecordIds.map(recordId => (
                <IndividualItem
                    key={recordId}
                    activeTable={activeTable}
                    selectedRecordId={recordId}
                    selectedFieldIds={selectedFieldIds}
                    fieldsById={fieldsById}
                />
            ))}
        </div>
    )
}

export default QrCodeGenerator
