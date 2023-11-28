import React from "react";
import { GalleryData, PersonalData } from "../../appType";
import FireContext from "../../FireContext";
import { gallery } from "../../firebase/gallery";
import { personal } from "../../firebase/personal";

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
            <div className="bluedark" style={{ display: 'flex', flexDirection: 'column', columnGap: '10px', padding: '10px', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '80%' }}>
                    <text>Activar Link</text>
                    <input type='checkbox' defaultChecked={linkData?.enabled} name='enabled' />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <text>URL de acceso:</text>
                    <text>robertomiguelfotos.art/</text>
                    <input type='text' defaultValue={gallerySelected?.personal_id} name='personal_id' required />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <text>Título:</text>
                    <input type='text' defaultValue={linkData?.title} name='title' required />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <text>Descripción</text>
                    <textarea defaultValue={linkData?.description} name='description' />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '80%' }}>
                    <text>Acceso con contraseña</text>
                    <input
                        type='checkbox'
                        defaultChecked={linkData?.security}
                        name='security'
                        onChange={(e) =>
                        setLinkData((prev) => ({ ...prev, security: e.target.checked } as PersonalData))
                        }
                    />
                    </div>
                    <input type='password' defaultValue={linkData?.password} name='password' required={linkData?.security} disabled={!linkData?.security} />
                </div>

                <div>
                    <button type='submit' disabled={isLoading}>
                    Aplicar
                    </button>
                </div>
            </div>

        </form>
    )
}