import React, { useContext, useEffect } from 'react'
import { gallery } from 'fireDB/gallery'
import { StyledOption, StyledSelect } from './gSelector.styled'
import FireContext from 'FireContext'
import { GalleryData } from 'appType'

export const GallerySelector = () => {

    const { finishLoginCheck, setLinkData, isMobile, db, gallerySelected, setGallerySelected, galleryList, setGalleryList, user } = useContext(FireContext)

    useEffect(() => {
        if (!finishLoginCheck) return
        const getList = async () => {
            try {
                const list = await gallery(db).getList(user?.uid)            
                setGalleryList(list)
                if (list.length)
                    setGallerySelected(list[0])
                else
                    setGallerySelected(null)

            } catch (error) {
                console.log('galError: ', error);
            }
        }
        getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid])

    return (
        <fieldset style={{
            padding: 0,
            borderRadius: '5px',
            textAlign: 'center',
            border: 'none',
            width: isMobile ? '90%' : 'auto',
        }} >
            <legend>Seleccionar galería</legend>
            <StyledSelect
                $isMobile={isMobile}
                value={gallerySelected?.id}
                onChange={ val => {
                    setGallerySelected(galleryList.find( (f: GalleryData) => f.id === val.target.value ))
                    setLinkData(null)
                }}
                >
                {galleryList.map((gallery: GalleryData) =>
                    <StyledOption $isMobile={isMobile} key={gallery.id} value={gallery.id} >{gallery.name} {user?.uid && (gallery?.visible ? '(Visible)' : '(No Visible)')}</StyledOption>)
                }
            </StyledSelect>
        </fieldset>
    )
}