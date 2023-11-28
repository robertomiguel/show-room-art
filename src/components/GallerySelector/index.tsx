import React, { useContext, useEffect } from 'react'
import { GalleryData } from '../../appType'
import FireContext from '../../FireContext'
import { gallery } from '../../firebase/gallery'

export const GallerySelector = () => {

    const { isMobile, db, gallerySelected, setGallerySelected, galleryList, setGalleryList, user } = useContext(FireContext)

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
        <div style={{width: isMobile ? '100%' : '350px' }}>
            <select
                value={gallerySelected?.id}
                onChange={ val => {
                    setGallerySelected(galleryList.find( (f: GalleryData) => f.id === val.target.value ))
                }}
            >
                {galleryList.map((gallery: GalleryData) =>
                    <option key={gallery.id} value={gallery.id} >{gallery.name} {user?.uid && (gallery?.visible ? '(Visible)' : '(No Visible)')}</option>)
                }
            </select>
        </div>
    )
}