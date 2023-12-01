import React from "react";
import FireContext from "../../../../FireContext";
import { PersonalData, GalleryData } from "../../../../appType";
import { gallery } from "../../../../firebase/gallery";
import { personal } from "../../../../firebase/personal";
import { ToolsFormContainer, ToolsFormFieldColumn, ToolsFormFieldRow } from "../toolsForm.styled";

export const GalleryLink = ({onClose}: {onClose: () => void}) => {

    const { user, gallerySelected, db } = React.useContext(FireContext)

    const [ linkData, setLinkData ] = React.useState<PersonalData | null>()
    const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

    React.useEffect(()=>{
        if (!gallerySelected?.personal_id) return
        const getPersonal = async () => {
            const personalData: PersonalData | null = await personal(db).getById(gallerySelected.personal_id)
            setLinkData(personalData)            
        }
        getPersonal()
    }, [gallerySelected, db])

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newForm = new FormData(e.target as HTMLFormElement)
        const personal_id: string = newForm.get('personal_id') as string        
        const formData: PersonalData = {
            enabled: newForm.get('enabled') === 'on',
            id: personal_id,
            uid: user?.uid as string,
            gallery_id: gallerySelected?.id as string,
            title: newForm.get('title') as string,
            description: newForm.get('description') as string,
            security: newForm.get('security') === 'on',
            password: newForm.get('password') as string,
        }
        setIsLoading(true)
         try {
            if (personal_id !== gallerySelected?.personal_id) {
                await gallery(db).update(gallerySelected.id, {personal_id} as GalleryData )
                await personal(db).create(personal_id, formData)
                if (gallerySelected?.personal_id) {
                    await personal(db).delete(gallerySelected.personal_id)
                }
            } else {
                await personal(db).update(personal_id, formData)
            }
            
         } catch (error) {
            console.log('error', error)
         } finally {
            setIsLoading(false)
            onClose()
         }
    }

    return (
        <form onSubmit={handleForm}>
            <ToolsFormContainer>
                <ToolsFormFieldRow>
                    <p>Activar Link</p>
                    <input type='checkbox' defaultChecked={linkData?.enabled} name='enabled' />
                </ToolsFormFieldRow>

                <ToolsFormFieldColumn>
                    <p>URL de acceso:</p>
                    <p>robertomiguelfotos.art/</p>
                    <input type='text' defaultValue={gallerySelected?.personal_id} name='personal_id' required />
                </ToolsFormFieldColumn>

                <ToolsFormFieldColumn>
                    <p>Título:</p>
                    <input type='text' defaultValue={linkData?.title} name='title' required />
                </ToolsFormFieldColumn>

                <ToolsFormFieldColumn>
                    <p>Descripción</p>
                    <textarea defaultValue={linkData?.description} name='description' />
                </ToolsFormFieldColumn>

                <ToolsFormFieldRow>
                    <p>Acceso con contraseña</p>
                    <input
                        type='checkbox'
                        defaultChecked={linkData?.security}
                        name='security'
                        onChange={(e) =>
                        setLinkData((prev) => ({ ...prev, security: e.target.checked } as PersonalData))
                        }
                    />
                </ToolsFormFieldRow>

                <ToolsFormFieldColumn>
                    <input autoComplete="false" placeholder="contraseña" type='password' defaultValue={linkData?.password} name='password' required={linkData?.security} disabled={!linkData?.security} />
                </ToolsFormFieldColumn>

                <ToolsFormFieldColumn>
                    <button type='submit' disabled={isLoading}>
                        Aplicar
                    </button>
                </ToolsFormFieldColumn>

            </ToolsFormContainer>

        </form>
    )
}