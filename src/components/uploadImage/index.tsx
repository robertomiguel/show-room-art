import React, { useContext, useState } from 'react'
import { Stack, Button, Text } from "@chakra-ui/react"
import axios from 'axios'
import FireContext from "../../FireContext"
import { generateId } from '../common/generateId'
import { PhotoData } from '../../appType'

export const UploadImage = () => {

    const { user, uploadPhoto, gallerySelected, photosList, getPhotos, publicSetting } = useContext(FireContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [files, setFiles] = useState<File[]>([]);
    

    const handleUpload = async () => {
        if (!gallerySelected?.id) return
        setIsLoading(true)
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`

        const formData = new FormData();

        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
              if (event.target) {
                const imgId = generateId()
                const fileData = new File([file], file.name, { type: file.type })

                formData.append("api_key", process.env.REACT_APP_CLOUD_API_KEY as string);
                formData.append("file", fileData);
                formData.append("public_id", user?.email + '/' + imgId)
                formData.append("timestamp", new Date().getTime().toString())
                formData.append("upload_preset", 'preset1')
                formData.append("folder", 'photos/' + gallerySelected.id)

                try {
                    const result = await axios.post(url, formData)
                    const order = photosList.length + index + 1
                    const newPhoto: PhotoData = {
                        uid: user?.uid,
                        id: imgId,
                        public_id: result.data.public_id,
                        secure_url: result.data.secure_url,
                        url: result.data.url,
                        asset_id: result.data.asset_id,
                        created_at: new Date(),
                        deleted: false,
                        public: false,
                        gallery_id: gallerySelected.id,
                        file_name: file.name,
                        order,
                    }
                    await uploadPhoto(newPhoto)
                } catch (err) {
                    console.log(err);
                }
            }
        };
        reader.readAsDataURL(file);
        });
        setIsLoading(false)
        getPhotos(publicSetting.per_page)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const selectedFiles = Array.from(e.target.files);
          setFiles(selectedFiles);
        }
      };

    return <Stack direction='column' gap='20px' alignItems='center' >
        <input type="file" onChange={handleFileChange} multiple accept='image/jpeg' />
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
            <Text>Galería</Text>
            <Text>{gallerySelected?.name}</Text>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
            <Text>Cargados</Text>
            <Text>0/{files.length}</Text>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' >
            <Button isLoading={isLoading} colorScheme='green' onClick={handleUpload} >Iniciar Carga</Button>
        </Stack>
    </Stack>
}
