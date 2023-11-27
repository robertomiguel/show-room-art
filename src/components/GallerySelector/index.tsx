import React, { useContext, useEffect } from 'react'
import { Select, Stack } from '@chakra-ui/react'
import { GalleryData } from '../../appType'
import FireContext from '../../FireContext'
import { gallery } from '../../firebase/gallery'

export const GallerySelector = () => {

    const { db, gallerySelected, setGallerySelected, galleryList, setGalleryList, setLastDocument, user } = useContext(FireContext)
    

    const getList = async () => {
        try {
            const list = await gallery(db).getList(user?.uid)            
            setGalleryList(list)
            if (list.length > 0)
                setGallerySelected(list[0])
        } catch (error) {
            console.log('galError: ', error);
        }
    }

    useEffect(() => {
        getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid])

    return (
        <Stack width={['100%', '350px']}>
            <Select
                value={gallerySelected?.id}
                onChange={ val => {
                    setLastDocument(1)
                    setGallerySelected(galleryList.find( (f: GalleryData) => f.id === val.target.value ))
                }}
                size={['lg']}
            >
                {galleryList.map((gallery: GalleryData) =>
                    <option key={gallery.id} value={gallery.id} >{gallery.name}</option>)
                }
            </Select>
        </Stack>
    )
}