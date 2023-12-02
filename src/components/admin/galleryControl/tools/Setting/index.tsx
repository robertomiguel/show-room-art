import React from 'react'
import { doc, setDoc } from 'firebase/firestore'
import FireContext from 'FireContext'
import { PublicSetting } from 'appType'
import { FormContainer, FormFieldColumn } from 'components/common/vamper/form.styled'

export const Setting = () => {

    const { db, publicSetting, setPublicSetting, setPaginatorData } = React.useContext(FireContext)

    const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

    const [ dollar, setDollar ] = React.useState<number>(publicSetting.dollar)
    const [ perPage, setPerPage ] = React.useState<number>(publicSetting.per_page)

    const handleSave = async () => {
        const newPublicSetting: PublicSetting = {...publicSetting, dollar, per_page: perPage}
        setIsLoading(true)
        try {
            await setDoc(doc(db, 'setting', 'public'), newPublicSetting)
            setPublicSetting(newPublicSetting)
            if (perPage !== publicSetting.per_page)
                setPaginatorData({indexFrom: 1, indexTo: perPage})
        } catch (error) {
            console.error("Error:", error);
        }finally {
            setIsLoading(false)
        }
    }

    return <FormContainer>

        <FormFieldColumn>
            <p>Dolar / Foto</p>
            <input type='text' value={dollar} onChange={( e => setDollar(Number(e.target.value ?? 0)) )} />
        </FormFieldColumn>

        <FormFieldColumn>
            <p>Fotos x página</p>
            <input type='text' value={perPage} onChange={( e => setPerPage(Number(e.target.value ?? 1)) )} />
        </FormFieldColumn>

        <FormFieldColumn>
            <button disabled={
                isLoading
                || (dollar === publicSetting.dollar && perPage === publicSetting.per_page)
                || dollar < 1
                || perPage < 1
            } onClick={handleSave} >Guardar</button>
        </FormFieldColumn>

    </FormContainer>
}