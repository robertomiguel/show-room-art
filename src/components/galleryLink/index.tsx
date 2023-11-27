import { Button, Input, Stack, Text, Textarea } from "@chakra-ui/react";
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
            enabled: newForm.get('enabled') === 'on' ? true : false,
            id: personal_id,
            uid: user?.uid as string,
            gallery_id: gallerySelected?.id as string,
            title: newForm.get('title') as string,
            description: newForm.get('description') as string,
            security: newForm.get('security') === 'on' ? true : false,
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
            <Stack direction='column' columnGap='10px' >
                <Stack direction='row' justifyContent='space-between'>
                    <Text>Activar Link</Text>
                    <input type='checkbox' defaultChecked={linkData?.enabled} name='enabled' />
                </Stack>

                <Stack>
                    <Text>URL de acceso:</Text>
                    <Text>robertomiguelfotos.art/</Text>
                    <Input defaultValue={gallerySelected?.personal_id} name='personal_id' required />
                </Stack>

                <Stack>
                    <Text>Título:</Text>
                    <Input defaultValue={linkData?.title} name='title' required />
                </Stack>

                <Stack>
                    <Text>Descripción</Text>
                    <Textarea defaultValue={linkData?.description} name='description' />
                </Stack>

                <Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Text>Acceso con contraseña</Text>
                        <input type='checkbox' defaultChecked={linkData?.security} name='security' onChange={ e => 
                            setLinkData( prev => ({...prev, security: e.target.checked} as PersonalData))
                        } />
                    </Stack>
                    <Input defaultValue={linkData?.password} name='password' required={linkData?.security} isDisabled={!linkData?.security} />
                </Stack>

                <Stack>
                    <Button isLoading={isLoading} type='submit' >Aplicar</Button>
                </Stack>
            </Stack>
        </form>
    )
}