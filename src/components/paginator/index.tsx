import React, { useContext, useEffect, useState } from 'react'
import { Button, Select, Stack } from '@chakra-ui/react'
import FireContext from '../../FireContext'
import { photos } from '../../firebase/photos'
import { generateId } from '../common/generateId'

export const Paginator = () => {

    const { publicSetting, isMobile, user, db, gallerySelected, lastDocument, setLastDocument, } = useContext(FireContext)
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ totalPage, setTotalPage ] = useState<number>(0)
    const [ perPage, setPerPage ] = useState<number>(0)
    const [ totalDocs, setTotalDocs ] = useState<number>(0)

    const getUserPhotos = async () => {
        if (!user?.uid) return
        const count = await photos(db).getCount({
            galleryId: gallerySelected?.id,
        })
        setTotalDocs(count)        
        setTotalPage(Math.ceil(count / publicSetting?.per_page))
        setPerPage(publicSetting?.per_page)
        setCurrentPage(lastDocument)
    }

    const getPublic = async () => {
        if (user?.uid) return
        const count = await photos(db).getCount({
            galleryId: gallerySelected?.id,
            published: true,
        })

        setTotalDocs(count)
        setTotalPage(Math.ceil(count / publicSetting?.per_page))
        setPerPage(publicSetting?.per_page)
        setCurrentPage(lastDocument)
    }

    useEffect(() => {
        if (user?.uid) {
            getUserPhotos()
        } else {
            getPublic()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gallerySelected, publicSetting, totalDocs, user?.uid])

    const nextPage = () => {
        setCurrentPage(prev => prev + 1 > totalPage ? 1 : prev + 1)
    }

    const prevPage = () => {
        setCurrentPage(prev => prev - 1 === 0 ? totalPage : prev - 1)
    }

    useEffect(() => {
       const newCurrentPage = (currentPage === 1 ? 1 : perPage * currentPage - (perPage - 1))
       setLastDocument(newCurrentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])

    return <Stack direction='row' alignItems='center' width={['100%', '350px']} >
        <Button colorScheme='gray' onClick={prevPage}>{isMobile ? '<' : 'Anterior'}</Button>
        <Select value={currentPage} width={['100%', '200px']} onChange={ e =>setCurrentPage(parseInt(e.target.value))}>
            {Array.from({ length: totalPage }).map((_, idx) => (
                <option key={generateId()} value={idx + 1} >
                    Pág. {idx + 1} de {`${(idx + 1) * perPage - perPage + 1} a ${((idx + 1) * perPage) > totalDocs ? totalDocs : ((idx + 1) * perPage)}`}
                </option>
                ))}
        </Select>
        <Button colorScheme='gray' onClick={nextPage}>{isMobile ? '>' : 'Siguiente'}</Button>
    </Stack>
}