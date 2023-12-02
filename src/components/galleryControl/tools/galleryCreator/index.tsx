import React, { useContext, useState } from 'react'
import { gallery } from 'fireDB/gallery'
import { ToolsFormContainer, ToolsFormFieldColumn, ToolsFormFieldRow } from '../toolsForm.styled'
import FireContext from 'FireContext'
import { GalleryData } from 'appType'
import { generateId } from 'components/common/generateId'

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

    return <ToolsFormContainer>
        <ToolsFormFieldColumn>
          <p>Nombre de galería</p>
          <input className='bluedark-element' type='text' value={galName} onChange={handleChange} />
        </ToolsFormFieldColumn>
        <ToolsFormFieldRow>
          <p>Visible</p>
          <input type='checkbox' checked={visible} onChange={() => setVisible(!visible)} />
        </ToolsFormFieldRow>
        <ToolsFormFieldRow>
          <p>Para venta</p>
          <input type='checkbox' checked={forSale} onChange={() => setForSale(!forSale)} />
        </ToolsFormFieldRow>
        <ToolsFormFieldColumn>
          <button disabled={isCreating || !galName.trim()} onClick={create} >Crear</button>
        </ToolsFormFieldColumn>
    </ToolsFormContainer>
}