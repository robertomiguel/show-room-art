import React, { useContext, useState } from 'react'
import axios from 'axios'
import { photos } from 'fireDB/photos'
import FireContext from 'FireContext'
import { PhotoData } from 'appType'
import { generateId } from 'components/common/generateId'
import { FormContainer, FormFieldColumn, FormFieldRow } from 'components/common/vamper/form.styled'

export const UploadImage = () => {

    const { db, user, gallerySelected, photosList, setPhotosList } = useContext(FireContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ files, setFiles ] = useState<File[]>([]);
    const [ count, setCount ] = useState(0)
    

    const handleUpload = async () => {
        if (!gallerySelected?.id) return
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
                        setIsLoading(true)
                        const result = await axios.post(url, formData)
                        const maxOrderNumber = photosList.length ? photosList.sort( (a: PhotoData, b: PhotoData) => b.order - a.order)[0].order : 0
                        const order = maxOrderNumber + index + 1
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
                        await photos(db).create(newPhoto)
                        setPhotosList( (prev: PhotoData[]) => ([...prev, newPhoto].sort( (a: PhotoData, b: PhotoData) => a.order - b.order)))
                        setCount( (prev: number) => prev + 1)
                    } catch (err) {
                        console.log(err);
                    } finally {
                        setIsLoading(false)
                    }
                }
            };
            reader.readAsDataURL(file);
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            setCount(0)
        }
      };

    return <FormContainer>

        <FormFieldColumn>
            <input type="file" onChange={handleFileChange} multiple accept='image/jpeg' />
        </FormFieldColumn>

        <FormFieldColumn>
            <p>Galería:</p>
            <p>{gallerySelected?.name}</p>
        </FormFieldColumn>

        <FormFieldRow>
            <p>Cargados</p>
            <p>{count} - {files.length}</p>
        </FormFieldRow>

        <FormFieldColumn>
            <button disabled={files.length===0 || files.length === count || isLoading} onClick={handleUpload} >Iniciar Carga</button>
        </FormFieldColumn>

    </FormContainer>
}
