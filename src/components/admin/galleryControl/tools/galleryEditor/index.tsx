import React from 'react'
import { gallery } from 'fireDB/gallery'
import FireContext from 'FireContext'
import { GalleryData } from 'appType'
import { FormContainer, FormFieldColumn, FormFieldRow, FormCheckConfirm } from 'components/common/vamper/form.styled'

interface GalleryEditorProps {
  onClose: () => void
}

export const GalleryEditor = ({onClose}: GalleryEditorProps) => {

  const { db, gallerySelected, setGallerySelected, setGalleryList } = React.useContext(FireContext)

  const [ galName, setGalName ] = React.useState<string>(gallerySelected.name)
  const [ galDescription, setGalDescription ] = React.useState<string>(gallerySelected?.description || '')

  const [ isEditing, setIsEditing ] = React.useState<boolean>(false)

  const handleChange = (e: any) => setGalName(e.target.value)
  const handleDescription = (e: any) => setGalDescription(e.target.value)

  const rename = async () => {
    if (galName === '') return
    setIsEditing(true)
    await gallery(db).rename(galName, galDescription, gallerySelected.id)
    setIsEditing(false)
    setGallerySelected({...gallerySelected, name: galName, description: galDescription})
    setGalleryList((prev: GalleryData[]) => prev.map(g => g.id === gallerySelected.id ? {...g, name: galName, description: galDescription} : g))
    onClose()
  }

  

  const handleVisible = async (status: boolean) => {
    await gallery(db).visible(status, gallerySelected.id)
    setGallerySelected({...gallerySelected, visible: status})
    setGalleryList((prev: GalleryData[]) => prev.map(g => g.id === gallerySelected.id ? {...g, visible: status} : g))
    onClose()
  }

  return <FormContainer>

    <FormFieldColumn>
      <p>Título:</p>
      <input className='bluedark-element' type='text' autoComplete='false' value={galName} onChange={handleChange} />
      <FormFieldRow $right>
        <button disabled={isEditing || !galName.trim() || galName === gallerySelected.name } onClick={rename} >Renombrar</button>
      </FormFieldRow>
    </FormFieldColumn>

    <FormFieldColumn>
      <p>Comentario:</p>
      <textarea value={galDescription} onChange={handleDescription} ></textarea>
      <FormFieldRow $right>
        <button disabled={isEditing || !galDescription.trim() || galDescription === gallerySelected?.description } onClick={rename} >Guardar</button>
      </FormFieldRow>
    </FormFieldColumn>


    <FormFieldColumn>
      <p>Cambiar estado:</p>
      <FormFieldRow>
        <button disabled={gallerySelected.visible} onClick={() => handleVisible(true)} >Hacer visible</button>
        <button disabled={!gallerySelected.visible} onClick={() => handleVisible(false)} >Ocultar</button>
      </FormFieldRow>
    </FormFieldColumn>

    <FormFieldRow>
      <FormCheckConfirm><input type='checkbox' /><p>Confirmar borrado</p></FormCheckConfirm>
      <button disabled >Eliminar</button>
    </FormFieldRow>

  </FormContainer>
}
