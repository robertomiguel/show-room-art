import React from "react";
import { gallery } from "fireDB/gallery";
import { personal } from "fireDB/personal";
import FireContext from "FireContext";
import { PersonalData, GalleryData } from "appType";
import { FormContainer, FormFieldRow, FormFieldColumn } from "components/common/vamper/form.styled";

export const GalleryLink = ({onClose}: {onClose: () => void}) => {

    const { linkData, setLinkData, user, gallerySelected, db } = React.useContext(FireContext)

    const [ isLoading, setIsLoading ] = React.useState<boolean>(false)

    
    React.useEffect(()=>{
        const getPersonal = async () => {
            if (linkData?.id === gallerySelected?.personal_id) return
            const personalData: PersonalData | null = await personal(db).getByUid(gallerySelected.personal_id, user?.uid as string)
            setLinkData(personalData)            
        }
        getPersonal()
    }, [db, gallerySelected.personal_id, linkData?.id, setLinkData, user?.uid])

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
            <FormContainer>
                
                <FormFieldRow>
                    <p>Activar Link</p>
                    <input type='checkbox' defaultChecked={linkData?.enabled} name='enabled' />
                </FormFieldRow>

                <FormFieldColumn>
                    <p>URL de acceso:</p>
                    <p>robertomiguelfotos.art/</p>
                    <input type='text' defaultValue={gallerySelected?.personal_id} name='personal_id' required />
                </FormFieldColumn>

                <FormFieldColumn>
                    <p>Título:</p>
                    <input type='text' defaultValue={linkData?.title} name='title' required />
                </FormFieldColumn>

                <FormFieldColumn>
                    <p>Descripción</p>
                    <textarea defaultValue={linkData?.description} name='description' />
                </FormFieldColumn>

                <FormFieldRow>
                    <p>Acceso con contraseña</p>
                    <input
                        type='checkbox'
                        defaultChecked={linkData?.security}
                        name='security'
                        onChange={(e) =>
                        setLinkData((prev: PersonalData) => ({ ...prev, security: e.target.checked }))
                        }
                    />
                </FormFieldRow>

                <FormFieldColumn>
                    <input autoComplete="false" placeholder="contraseña" type='password' defaultValue={linkData?.password} name='password' required={linkData?.security} disabled={!linkData?.security} />
                </FormFieldColumn>

                <FormFieldColumn>
                    <button type='submit' disabled={isLoading}>
                        Guardar
                    </button>
                </FormFieldColumn>

            </FormContainer>

        </form>
    )
}