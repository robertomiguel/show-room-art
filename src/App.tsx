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
import { PhotoData, Price, PublicSetting, GalleryData, PersonalData, PaginatorData } from './appType';
import { Paginator } from './components/paginator';
import { GallerySelector } from './components/GallerySelector';
import { personal } from './firebase/personal';
import logoimg from './image/logo.svg'
import { PrivateGallery } from './components/privateGallery';
import { Cloudinary } from '@cloudinary/url-gen';
import { PrivatePass } from './components/privatePass';


const App = ({db, pathName, cloudinary}: {db: Firestore, pathName: string, cloudinary: Cloudinary}) => {

  const [ user, setUser ] = useState<UserCredential['user'] | null>(null)
  
  // Todas de fotos de la galería seleccionada
  const [ photosList, setPhotosList ] = useState<PhotoData[]>([])

  // Paginado
  const [ paginatorData, setPaginatorData ] = useState<PaginatorData>({  
    indexFrom: 1,
    indexTo: 5,
  })
  
  // IDs de las fotos seleccionadas en el admin
  const [ selectedPhotos, setSelectedPhotos ] = useState<string[]>([])
  
  // Lista de fotos agregadas a la lista de pedido
  const [ cartList, setCartList ] = useState<PhotoData[]>([])
  
  // Muestra/oculta el sidesheet de la lista de pedido
  const [ showCartList, setShowCartList ] = useState<boolean>(false)
  
  // revisar - refactor - quitar
  const [ price, setPrice ] = useState<Price>()
  
  // Configuraciones generales del sistema
  const [ publicSetting, setPublicSetting ] = useState<PublicSetting>()
  
  // Listado de las galerías
  const [ galleryList, setGalleryList ] = useState<GalleryData[]>([])

  // Galería seleccionada / vista actual
  const [ gallerySelected, setGallerySelected ] = useState<GalleryData>()

  // Mostrar/ocultas todos los controles del admin en mobile
  const [ showControl, setShowControl ] = useState<boolean>(false)

  // Datos de la galería personal correspondente a galería seleccionada
  const [ personalGallery, setPersonalGallery ] = useState<PersonalData | null>(null)

  // Muestra pedido de Pass cuando la galería personal tiene contraseña
  const [ showAccessPassForm, setShowAccessPassForm ] = useState<boolean>(false)

  const [ isMobile ] = useMediaQuery('(max-width: 1024px)')

  const getPersonal = async (personalId: string, fireDB: Firestore, password?: string | null) => {
    const pdata: PersonalData | null = await personal(fireDB).getById(personalId, password)
    setPersonalGallery(pdata)
  }

  useEffect(()=>{
    if (pathName && pathName !== '/' && db) {      
      getPersonal(pathName, db)
    }
  },[pathName, db])


  const getSetting = async (fdb: Firestore) => {
    const documentoRef = doc(fdb, "setting", "public")
    const docSnapshot = await getDoc(documentoRef)
    const setting = docSnapshot.data()
    setPublicSetting(setting as PublicSetting)
  }

  useEffect(() => {
    getSetting(db)
  },[db])

  const handleGoHome = () => {
    window.history.pushState({}, "",'/')
    window.location.reload()
  }
  
  // parámetros del context, solo se re actualiza cuando cambia algunos de los datos
  const valueContext = useMemo(()=>{
    return {
      user,
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
      showControl,
      cloudinary,
      showAccessPassForm,
      paginatorData,
      setPaginatorData,
      setShowAccessPassForm,
      setShowControl,
      setPublicSetting,
      setUser,
      setSelectedPhotos,
      setCartList,
      setShowCartList,
      setPrice,
      setGallerySelected,
      setGalleryList,
      setPhotosList,
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user, photosList, selectedPhotos, showAccessPassForm,
    cartList, showCartList, price, isMobile, db, gallerySelected, publicSetting,
    galleryList, showControl, cloudinary, paginatorData])

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
          {user && <Stack direction='column'>
            {(showControl || !isMobile) && <GalleryControl />}
          </Stack>
          }
        </Stack>

        {user && <PrivateGallery />}

        {!user &&  <PublicGallery /> }

        {showAccessPassForm && <PrivatePass isLoading={false} onPassSend={(pass)=>getPersonal(pathName, db, pass)} />}

        <Footer />
      </DarkMode>
    </FireContext.Provider>
  )
}

export default App;
