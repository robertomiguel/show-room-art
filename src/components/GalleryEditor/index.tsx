import React from 'react'
import { gallery } from '../../firebase/gallery'
import FireContext from '../../FireContext'
import { GalleryData } from '../../appType'

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

  return <div className='bluedark' style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
  }}
   >
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <text>Nombre actual:</text>
      <text style={{fontWeight: 700}} >{gallerySelected.name}</text>
      <text>Estado:</text>
      <text style={{fontWeight: 700}} >{gallerySelected.visible ? 'Visible' : 'Oculto'} </text>
    </div>
        <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <text>Nuevo nombre:</text>
      <input className='bluedark-element' type='text' autoComplete='false' value={galName} onChange={handleChange} />
    </div>
    <button disabled={isEditing} onClick={rename} >Renombrar</button>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
      <text>Cambiar estado:</text>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <button onClick={() => handleVisible(true)} >Visible</button>
        <button onClick={() => handleVisible(false)} >Oculto</button>
      </div>
    </div>
    <button disabled >Eliminar</button>
  </div>
}
