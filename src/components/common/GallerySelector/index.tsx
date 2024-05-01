import React, { useContext, useEffect } from 'react'
import { gallery } from 'fireDB/gallery'
import { GalleryLegend, StyledOption, StyledSelect } from './gSelector.styled'
import FireContext from 'FireContext'
import { GalleryData } from 'appType'

export const GallerySelector = () => {

    const { finishLoginCheck, setLinkData, db, gallerySelected, setGallerySelected, galleryList, setGalleryList, user } = useContext(FireContext)

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
        <GalleryLegend>
            <legend>Seleccionar galería</legend>
            <StyledSelect
                value={gallerySelected?.id}
                onChange={ val => {
                    setGallerySelected(galleryList.find( (f: GalleryData) => f.id === val.target.value ))
                    setLinkData(null)
                }}
                >
                {galleryList.map((gallery: GalleryData) =>
                    <StyledOption
                        key={gallery.id}
                        value={gallery.id}
                    >
                        {gallery.name} {user?.uid && (gallery?.visible ? '(Visible)' : '(No Visible)')}
                    </StyledOption>)
                }
            </StyledSelect>
        </GalleryLegend>
    )
}