import React from 'react'
import FireContext from '../../../../FireContext'
import { GalleryData } from '../../../../appType'
import { gallery } from '../../../../firebase/gallery'
import { ToolsFormCheckConfirm, ToolsFormContainer, ToolsFormFieldColumn, ToolsFormFieldRow } from '../toolsForm.styled'

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

  return <ToolsFormContainer>
    <ToolsFormFieldColumn>
      <p>Nombre actual:</p>
      <p style={{fontWeight: 700}} >{gallerySelected.name}</p>
    </ToolsFormFieldColumn>
    <ToolsFormFieldRow>
      <p>Estado:</p>
      <p style={{fontWeight: 700}} >{gallerySelected.visible ? 'Visible' : 'Oculto'} </p>
    </ToolsFormFieldRow>
    <ToolsFormFieldColumn>
      <p>Nuevo nombre:</p>
      <input className='bluedark-element' type='text' autoComplete='false' value={galName} onChange={handleChange} />
    </ToolsFormFieldColumn>
    <ToolsFormFieldRow>
      <button disabled={isEditing} onClick={rename} >Renombrar</button>
    </ToolsFormFieldRow>
    <ToolsFormFieldColumn>
      <p>Cambiar estado:</p>
      <ToolsFormFieldRow>
        <button onClick={() => handleVisible(true)} >Visible</button>
        <button onClick={() => handleVisible(false)} >Oculto</button>
      </ToolsFormFieldRow>
    </ToolsFormFieldColumn>
    <ToolsFormFieldRow>
      <ToolsFormCheckConfirm><input type='checkbox' /><p>Confirmar borrado</p></ToolsFormCheckConfirm>
      <button disabled >Eliminar</button>
    </ToolsFormFieldRow>
  </ToolsFormContainer>
}
