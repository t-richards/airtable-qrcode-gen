import { useSettingsButton } from '@airtable/blocks/ui'
import React, { useState } from 'react'

import QrCodeGenerator from '../QrCodeGenerator'
import Settings from '../Settings'

const App: React.FC = () => {
    const [isShowingSettings, setIsShowingSettings] = useState(false)
    useSettingsButton(function () {
        setIsShowingSettings(!isShowingSettings)
    })

    if (isShowingSettings) {
        return <Settings handleDone={() => setIsShowingSettings(false)}/>
    }
    return <QrCodeGenerator />
}

export default App
