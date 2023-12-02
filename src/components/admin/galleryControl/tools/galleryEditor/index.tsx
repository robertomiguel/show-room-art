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

  const [ galName, setGalName ] = React.useState<string>('')

  const [ isEditing, setIsEditing ] = React.useState<boolean>(false)

  const handleChange = (e: any) => setGalName(e.target.value)

  const rename = async () => {
    if (galName === '') return
    setIsEditing(true)
    await gallery(db).rename(galName, gallerySelected.id)
    setIsEditing(false)
    setGallerySelected({...gallerySelected, name: galName})
    setGalleryList((prev: GalleryData[]) => prev.map(g => g.id === gallerySelected.id ? {...g, name: galName} : g))
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
      <p>Nombre actual:</p>
      <p style={{fontWeight: 700}} >{gallerySelected.name}</p>
    </FormFieldColumn>

    <FormFieldRow>
      <p>Estado:</p>
      <p style={{fontWeight: 700}} >{gallerySelected.visible ? 'Visible' : 'Oculto'} </p>
    </FormFieldRow>

    <FormFieldColumn>
      <p>Nuevo nombre:</p>
      <input className='bluedark-element' type='text' autoComplete='false' value={galName} onChange={handleChange} />
    </FormFieldColumn>

    <FormFieldRow>
      <button disabled={isEditing || !galName.trim() || galName === gallerySelected.name } onClick={rename} >Renombrar</button>
    </FormFieldRow>

    <FormFieldColumn>
      <p>Cambiar estado:</p>
      <FormFieldRow>
        <button disabled={gallerySelected.visible} onClick={() => handleVisible(true)} >Visible</button>
        <button disabled={!gallerySelected.visible} onClick={() => handleVisible(false)} >Oculto</button>
      </FormFieldRow>
    </FormFieldColumn>

    <FormFieldRow>
      <FormCheckConfirm><input type='checkbox' /><p>Confirmar borrado</p></FormCheckConfirm>
      <button disabled >Eliminar</button>
    </FormFieldRow>

  </FormContainer>
}
