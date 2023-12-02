import React, { useContext, useState } from 'react'
import { gallery } from 'fireDB/gallery'
import FireContext from 'FireContext'
import { GalleryData } from 'appType'
import { generateId } from 'components/common/generateId'
import { FormContainer, FormFieldColumn } from 'components/common/vamper/form.styled'
import { FormFieldRow } from 'components/admin/privateGallery/pGallery.styled'

export const GalleryCreator = () => {

    const { user, db, setGalleryList, setGallerySelected } = useContext(FireContext)

    const [ galName, setGalName ] = useState<string>('')
    const [ visible, setVisible ] = useState<boolean>(false)
    const [ forSale, setForSale ] = useState<boolean>(true)

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

    return <FormContainer>
 
        <FormFieldColumn>
          <p>Nombre de galería</p>
          <input className='bluedark-element' type='text' value={galName} onChange={handleChange} />
        </FormFieldColumn>

        <FormFieldRow>
          <p>Visible</p>
          <input type='checkbox' checked={visible} onChange={() => setVisible(!visible)} />
        </FormFieldRow>

        <FormFieldRow>
          <p>Para venta</p>
          <input type='checkbox' checked={forSale} onChange={() => setForSale(!forSale)} />
        </FormFieldRow>

        <FormFieldColumn>
          <button disabled={isCreating || !galName.trim()} onClick={create} >Crear</button>
        </FormFieldColumn>
 
    </FormContainer>
}