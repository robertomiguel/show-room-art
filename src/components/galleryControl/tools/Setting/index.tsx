import React from 'react'
import { doc, setDoc } from 'firebase/firestore'
import FireContext from '../../../../FireContext'
import { PublicSetting } from '../../../../appType'
import { ToolsFormContainer, ToolsFormFieldColumn } from '../toolsForm.styled'

export const Setting = () => {

    const { db, publicSetting, setPublicSetting } = React.useContext(FireContext)

    const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

    const handleSave = async () => {
        setIsLoading(true)
        try {
            await setDoc(doc(db, 'setting', 'public'), publicSetting)
        } catch (error) {
            console.error("Error:", error);
        }finally {
            setIsLoading(false)
        }
    }

    return <ToolsFormContainer>
        <ToolsFormFieldColumn>
            <p>Dolar / Foto</p>
            <input type='text' value={publicSetting.dollar} onChange={( e => setPublicSetting((prev: PublicSetting) => ({...prev, dollar: e.target.value})) )} />
        </ToolsFormFieldColumn>
        <ToolsFormFieldColumn>
            <p>Fotos x página</p>
            <input type='text' value={publicSetting.per_page} onChange={( e => setPublicSetting((prev: PublicSetting) => ({...prev, per_page: e.target.value})) )} />
        </ToolsFormFieldColumn>
        <ToolsFormFieldColumn>
            <button disabled={isLoading} onClick={handleSave} >Guardar</button>
        </ToolsFormFieldColumn>
    </ToolsFormContainer>
}