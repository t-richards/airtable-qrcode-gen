import React, { useState } from 'react'

import { Box, Button, Heading, Label, SelectButtons, Text } from '@airtable/blocks/ui'

const options = [
    { value: 'l', label: 'Low (7%)' },
    { value: 'm', label: 'Medium (15%)' },
    { value: 'q', label: 'High (25%)' },
    { value: 'h', label: 'Extreme (30%)' },
]

interface SettingsProps {
    handleDone: () => void
}

const Settings: React.FC<SettingsProps> = ({ handleDone }) => {
    const [value, setValue] = useState(options[0].value)
    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            margin="3rem"
        >
            <Heading>Settings</Heading>
            <Label>Error Correction Level</Label>
            <Text>How much damage the QR code can sustain before it becomes unreadable.</Text>

            <SelectButtons
                value={value}
                onChange={newValue => typeof newValue === 'string' && setValue(newValue)}
                options={options}
                width="25rem"
                marginY="0.5rem"
            />

            <Button
                onClick={handleDone}
                variant="primary"
                size="large"
                icon="check"
                marginY="1rem"
            >
                Done
            </Button>
        </Box>
    )
}

export default Settings
