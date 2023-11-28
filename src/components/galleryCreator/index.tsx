import React, { useContext, useState } from 'react'
import { generateId } from '../common/generateId'
import { GalleryData } from '../../appType'
import FireContext from '../../FireContext'
import { gallery } from '../../firebase/gallery'

export const GalleryCreator = () => {

    const { user, db, setGalleryList, setGallerySelected } = useContext(FireContext)

    const [ galName, setGalName ] = useState<string>('')
    const [ visible, setVisible ] = useState<boolean>(false)
    const [ forSale, setForSale ] = useState<boolean>(false)

    const [ isCreating, setIsCreating ] = useState<boolean>(false)

    const handleChange = (e: any) => setGalName(e.target.value)

    const create = async () => {
        setIsCreating(true)
        const id = generateId()
        const galleryDate: GalleryData ={
            uid: user.uid,
            id,
            name: galName,
            created_at: new Date(),
            visible,
            deleted: false,
            for_sale: forSale,
        }
        try {
          await gallery(db).create(galleryDate)
          const list = await gallery(db).getList(user?.uid)
          setGalleryList(list)
          setGallerySelected(list.find( (f: GalleryData) => f.id === id ))
          setGalName('')
          setVisible(false)
          alert(`Galería creada: ${galName}`)
        } catch (e) {
          console.error("Error:", e);
        } finally {
            setIsCreating(false)
        }
      }

    return <div className='bluedark' style={{ display: 'flex', flexDirection: 'column', padding: '5px', gap: '10px' }} >
        <text>Nombre de galería</text>
        <input className='bluedark-element' type='text' value={galName} onChange={handleChange} />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '60%'
        }} >
          <text>Visible</text>
          <input type='checkbox' checked={visible} onChange={() => setVisible(!visible)} />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '60%'
        }} >
          <text>Para venta</text>
          <input type='checkbox' checked={forSale} onChange={() => setForSale(!forSale)} />
        </div>
        <button disabled={isCreating || isCreating} onClick={create} >Crear</button>
    </div>
}