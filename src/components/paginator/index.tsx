import React, { useContext, useEffect, useState } from 'react'
import FireContext from '../../FireContext'
import { photos } from '../../firebase/photos'
import { generateId } from '../common/generateId'
import { ButtonPaginator, StyledPagSelect, StyledPaginator } from './styledPaginator'

export const Paginator = () => {

    const { publicSetting, isMobile, user, db, gallerySelected, photosList, setPhotosList, setPaginatorData } = useContext(FireContext)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(0)
    const [totalDocs, setTotalDocs] = useState<number>(0)

    const getPhotos = async (publicPhotos: boolean) => {
        const list = await photos(db).getList(gallerySelected?.id, publicPhotos)
        setPhotosList(list)
    }

    useEffect(() => {
        const list = photosList
        const count = list.length
        setTotalDocs(count)
        setTotalPage(Math.ceil(count / publicSetting?.per_page))
        setPerPage(publicSetting?.per_page)
        setCurrentPage(1)
    },[publicSetting?.per_page, photosList])

    useEffect(() => {
        if (gallerySelected?.id) getPhotos(!user?.uid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gallerySelected?.id])

    useEffect(() => {
        const count = photosList.length
        if (totalDocs === count) return
        setTotalDocs(count)
        setTotalPage(Math.ceil(count / publicSetting?.per_page))
        setPerPage(publicSetting?.per_page)
        setCurrentPage(1)
        setPaginatorData({ indexFrom: 1, indexTo: publicSetting?.per_page })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photosList])

    const nextPage = () => {
        const newPage = currentPage + 1 > totalPage ? 1 : currentPage + 1
        setCurrentPage(newPage)
        setPaginatorData({ indexFrom: newPage * perPage - perPage + 1, indexTo: newPage * perPage })
    }

    const prevPage = () => {
        const newPage = currentPage - 1 === 0 ? totalPage : currentPage - 1
        setCurrentPage(newPage)
        setPaginatorData({ indexFrom: newPage * perPage - perPage + 1, indexTo: newPage * perPage })
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const pagerNumber = parseInt(e.target.value)
        setPaginatorData({ indexFrom: pagerNumber * perPage - perPage + 1, indexTo: pagerNumber * perPage })
        setCurrentPage(pagerNumber)
    }

    return totalPage ? <StyledPaginator $isMobile={isMobile} >
        <fieldset style={{
            padding: 0,
            borderRadius: '5px',
            textAlign: 'center',
            border: 'none',
        }} >
            <legend>Navegador de fotos</legend>
            <ButtonPaginator onClick={prevPage}>{'<'}</ButtonPaginator>
            <StyledPagSelect value={currentPage} onChange={handleChange}>
                {Array.from({ length: totalPage }).map((_, idx) => (
                    <option key={generateId()} value={idx + 1} >
                        Pág. {idx + 1} de {`${(idx + 1) * perPage - perPage + 1} a ${((idx + 1) * perPage) > totalDocs ? totalDocs : ((idx + 1) * perPage)}`}
                    </option>
                ))}
            </StyledPagSelect>
            <ButtonPaginator onClick={nextPage}>{'>'}</ButtonPaginator>
        </fieldset>
    </StyledPaginator> : <></>
}