import React, { useState, useEffect, useMemo } from 'react';
import FireContext from './FireContext';
import { DarkMode, Image, Stack, Text, useMediaQuery } from '@chakra-ui/react'
import Login from './components/login';
import { UserCredential } from "firebase/auth";
import { doc, getDoc, Firestore } from "firebase/firestore";
import { Cart } from './components/cart';
import { Account } from './components/account';
import { Footer } from './components/footer';
import { GalleryControl } from './components/galleryControl';
import { PublicGallery } from './components/publicGallery';
import { PhotoData, Price, PublicSetting, GalleryData, PersonalData } from './appType';
import { Paginator } from './components/paginator';
import { GallerySelector } from './components/GallerySelector';
import { photos } from './firebase/photos';
import { personal } from './firebase/personal';
import { gallery } from './firebase/gallery';
import logoimg from './image/logo.svg'
import { PrivateGallery } from './components/privateGallery';
import { Cloudinary } from '@cloudinary/url-gen';
import { PrivatePass } from './components/privatePass';


const App = ({db, pathName, cloudinary}: {db: Firestore, pathName: string, cloudinary: Cloudinary}) => {

  const [ user, setUser ] = useState<UserCredential['user'] | null>(null) // Se llena cuando un usuario registrado se loguea y pasa a la pantalla de admin
  const [ isLoading, setIsLoading ] = useState(false)
  const [ photosList, setPhotosList ] = useState<PhotoData[]>([]) // Galería de fotos privadas
  const [ publicPhotos, setPublicPhotos ] = useState<any[]>([]) // Galería de fotos públicas para el portal
  const [ selectedPhotos, setSelectedPhotos ] = useState<string[]>([]) // Fotos seleccionadas, el use depende del login
  const [ cartList, setCartList ] = useState<PhotoData[]>([])
  const [ showCartList, setShowCartList ] = useState<boolean>(false)
  const [ price, setPrice ] = useState<Price>()
  const [ publicSetting, setPublicSetting ] = useState<PublicSetting>()
  const [ galleryList, setGalleryList ] = useState<GalleryData[]>([])
  const [ gallerySelected, setGallerySelected ] = useState<GalleryData>()
  const [ lastDocument, setLastDocument ] = useState<number>(1)
  const [ showControl, setShowControl ] = useState<boolean>(false)
  const [ personalGallery, setPersonalGallery ] = useState<PersonalData | null>(null)
  const [ showAccessPassForm, setShowAccessPassForm ] = useState<boolean>(false)
  const [ totalPhotos, setTotalPhotos ] = useState<number>(0)

  const [ isMobile ] = useMediaQuery('(max-width: 1024px)')

  // sube/actualiza datos de fotos en firestore
  const uploadPhoto = async (photoData: PhotoData) => {
    setIsLoading(true)
    try {
      await photos(db).create(photoData)
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setIsLoading(false)
    }
  }


  // Recupera el listado de fotos desde firebase que correspondan al usuario logueado (user.id)
  // no recupera fotos elimninadas
  const getPhotos = async (pageSize: number, lastDoc?: number) => {
    if (!pageSize || !user?.uid || !gallerySelected?.id) return
    setPhotosList([])
    try {
      const list = await photos(db).getList({
        galleryId: gallerySelected.id,
        pageSize,
        lastDocument: lastDoc,
      })
      setPhotosList(list)
    } catch (error) {
      console.log('PhotosError: ', error);
    }
  }

  // dispara la busqueda de fotos del usuario al hacer login
  useEffect(() => {
    if (user?.uid && gallerySelected?.id && publicSetting?.per_page)
      getPhotos(publicSetting.per_page, lastDocument)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user?.uid, gallerySelected?.id, lastDocument])

  const getPersonal = async (personalId: string, fireDB: Firestore, password?: string | null) => {
    const pdata: PersonalData | null = await personal(fireDB).getById(personalId, password)
    if (pdata?.error === 'showAccessPassForm') setShowAccessPassForm(true)
    if (pdata?.gallery_id) {
      setPersonalGallery(pdata)
      const gdata: GalleryData = await gallery(fireDB).getById(pdata.gallery_id)
      setGallerySelected(gdata)
      setGalleryList([gdata])
      setShowAccessPassForm(false)
    } else {
      setPersonalGallery(null)
      setGallerySelected(undefined)
    }
  }

  useEffect(()=>{
    if (pathName && pathName !== '/' && db) {      
      getPersonal(pathName, db)
    }
  },[pathName, db])

  // recupera todas las fotos, de todos los usuarios, que fueron marcadas como pública en el admin del usuario logueado
  const getPublicPhotos = async (pageSize: number, galleryId: string, lastDoc?: number) => {
    if (!pageSize || !gallerySelected?.id) return
    setPublicPhotos([])
    const list = await photos(db).getList({
      pageSize,
      lastDocument: lastDoc,
      galleryId,
      published: true,
    })
    setPublicPhotos(list)
  }

  useEffect(() => {
    if (gallerySelected?.id && !user?.uid && publicSetting?.per_page) {
      getPublicPhotos(publicSetting.per_page, gallerySelected.id, lastDocument )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[gallerySelected?.id, lastDocument, user])

  const getSetting = async () => {
    const documentoRef = doc(db, "setting", "public")
    const docSnapshot = await getDoc(documentoRef)
    const setting = docSnapshot.data()
   setPublicSetting(setting as PublicSetting)
  }

  // dispara la busqueda de fotos públicas al cargar la app x 1era vez
  useEffect(() => {
    getSetting()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[db])

  const handleGoHome = () => {
    window.history.pushState({}, "",'/')
    window.location.reload()
  }
  
  // parámetros del context, solo se re actualiza cuando cambia algunos de los datos
  const valueContext = useMemo(()=>{
    return {
      user,
      publicPhotos,
      photosList,
      selectedPhotos,
      cartList,
      showCartList,
      price,
      publicSetting,
      isMobile,
      db,
      gallerySelected,
      galleryList,
      lastDocument,
      showControl,
      cloudinary,
      showAccessPassForm,
      totalPhotos,
      setShowAccessPassForm,
      setShowControl,
      setPublicSetting,
      setUser,
      uploadPhoto,
      setSelectedPhotos,
      getPublicPhotos,
      setCartList,
      setShowCartList,
      setPrice,
      setGallerySelected,
      setGalleryList,
      getPhotos,
      setLastDocument,
      setPhotosList,
      setTotalPhotos,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user, photosList, selectedPhotos, showAccessPassForm, publicPhotos,
    cartList, showCartList, price, isMobile, db, gallerySelected, publicSetting,
    galleryList, lastDocument, showControl, cloudinary, totalPhotos])

  return (
    <FireContext.Provider value={valueContext}>
      <DarkMode>

        <Stack
          spacing={4}
          direction="row"
          position="fixed"
          top="0"
          left="0"
          right="0"
          boxShadow="md"
          bg='var(--chakra-colors-gray-700)'
          zIndex='sticky'
          padding='5px'
          justifyContent='center'
          alignItems='center'
          flexWrap='wrap'
        >
          <Stack direction={['column', 'row']} justifyContent='space-between' alignItems='center' width='100%'>

            <Stack direction='row' justifyContent='center' alignItems='center' width={['100%','auto']} >
              {!isMobile && <div style={{cursor: 'pointer'}} onClick={handleGoHome}><Image src={logoimg} alt="logo" width='50px' /></div>}

              {(pathName === '/' || !pathName) && <GallerySelector />}

              {personalGallery?.title && <Text color='orange' fontSize='20px' >{personalGallery.title}</Text>}
            </Stack>

            {publicSetting && <Paginator />}

            {!user && gallerySelected?.for_sale && <Cart />}

            {user
              ? <Account />
              : window.location.href.includes('?admin') && <Login />
            }
          </Stack>
          {user && !isLoading && <Stack direction='column'>
            {(showControl || !isMobile) && <GalleryControl />}
          </Stack>
          }
        </Stack>

        {user && !isLoading && <PrivateGallery />}

        {!user &&  <PublicGallery /> }

        {showAccessPassForm && <PrivatePass isLoading={isLoading} onPassSend={(pass)=>getPersonal(pathName, db, pass)} />}

        <Footer />
      </DarkMode>
    </FireContext.Provider>
  )
}

export default App;
