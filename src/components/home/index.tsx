import { useState, useEffect, useMemo } from 'react';
import { UserCredential } from "firebase/auth";
import { doc, getDoc, Firestore } from "firebase/firestore";
import logoimg from '../../image/logo.svg'
import { Cloudinary } from '@cloudinary/url-gen';
import FireContext from '../../FireContext';
import { PhotoData, PaginatorData, Price, PublicSetting, GalleryData, PersonalData } from '../../appType';
import { personal } from '../../firebase/personal';
import { GallerySelector } from '../GallerySelector';
import { Account } from '../account';
import { Cart } from '../cart';
import { useMediaQuery } from '../common/useMediaQuery';
import { Footer } from '../footer';
import { GalleryControl } from '../galleryControl';
import Login from '../login';
import { Paginator } from '../paginator';
import { PrivatePass } from '../privatePass';
import { PublicGallery } from '../publicGallery';
import { HeaderBox } from './headerBox';
import { Logo } from './logo';
import { GallTitle } from './title';
import { PrivateGallery } from '../privateGallery';


export const Home = ({db, pathName, cloudinary}: {db: Firestore, pathName: string, cloudinary: Cloudinary}) => {

  const [ user, setUser ] = useState<UserCredential['user'] | null>(null)
  
  // Todas de fotos de la galería seleccionada
  const [ photosList, setPhotosList ] = useState<PhotoData[]>([])

  // Paginado
  const [ paginatorData, setPaginatorData ] = useState<PaginatorData>()
  
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

  // Datos de la galería personal correspondente a galería seleccionada
  const [ personalGallery, setPersonalGallery ] = useState<PersonalData | null>(null)

  // Muestra pedido de Pass cuando la galería personal tiene contraseña
  const [ showAccessPassForm, setShowAccessPassForm ] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width: 900px)')

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
    setPaginatorData({indexFrom: 1, indexTo: setting?.per_page ?? 1})
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
      cloudinary,
      showAccessPassForm,
      paginatorData,
      setPaginatorData,
      setShowAccessPassForm,
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
    galleryList, cloudinary, paginatorData])

  return (
    <FireContext.Provider value={valueContext}>
        <HeaderBox>

          {!isMobile && <div style={{cursor: 'pointer'}} onClick={handleGoHome}><Logo src={logoimg} alt="logo" /></div>}

          {(pathName === '/' || !pathName) && <GallerySelector />}

          {personalGallery?.title && <GallTitle >{personalGallery.title}</GallTitle>}

          {publicSetting && <Paginator />}

          {!user && gallerySelected?.for_sale && <Cart />}

          {user
            ? <Account />
            : window.location.href.includes('?admin') && <Login />
          }

          {user && <GalleryControl />}

        </HeaderBox>

        {user && <PrivateGallery />}

        {!user &&  <PublicGallery /> }

        {showAccessPassForm && <PrivatePass isLoading={false} onPassSend={(pass)=>getPersonal(pathName, db, pass)} />}

        <Footer />

    </FireContext.Provider>
  )
}
