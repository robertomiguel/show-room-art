import React from 'react'
import FireContext from '../../FireContext'
import { PublicSetting } from '../../appType'
import { doc, setDoc } from 'firebase/firestore'

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

    return <div className='bluedark' style={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '10px' }} >
        <text>Dolar / Foto</text>
        <input type='text' value={publicSetting.dollar} onChange={( e => setPublicSetting((prev: PublicSetting) => ({...prev, dollar: e.target.value})) )} />
        <text>Fotos x página</text>
        <input type='text' value={publicSetting.per_page} onChange={( e => setPublicSetting((prev: PublicSetting) => ({...prev, per_page: e.target.value})) )} />
        <button disabled={isLoading} onClick={handleSave} >Guardar</button>
    </div>
}