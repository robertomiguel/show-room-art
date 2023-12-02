import { useState, useEffect, useMemo } from 'react';
import { UserCredential } from "firebase/auth";
import { doc, getDoc, Firestore } from "firebase/firestore";
import logoimg from 'image/logo.svg'
import { gallery } from 'fireDB/gallery';
import { Cloudinary } from '@cloudinary/url-gen';
import FireContext from 'FireContext';
import { PhotoData, PaginatorData, Price, PublicSetting, GalleryData, PersonalData } from 'appType';
import { personal } from 'fireDB/personal';
import { HeaderBox } from './headerBox';
import { Logo } from './logo';
import { GallTitle } from './title';
import { GallerySelector } from 'components/common/GallerySelector';
import { Account } from 'components/admin/account';
import { GalleryControl } from 'components/admin/galleryControl';
import { PrivateGallery } from 'components/admin/privateGallery';
import { Footer } from 'components/common/footer';
import { Paginator } from 'components/common/paginator';
import { useMediaQuery } from 'components/common/useMediaQuery';
import { Cart } from 'components/public/cart';
import Login from 'components/public/login';
import { PrivatePass } from 'components/public/privatePass';
import { PublicGallery } from 'components/public/publicGallery';

export const Home = ({db, cloudinary}: {db: Firestore, cloudinary: Cloudinary}) => {

  const [ user, setUser ] = useState<UserCredential['user'] | null>(null)

  const [ pathName, setPathName ] = useState<string | undefined>(window.location.pathname.slice(1))
  
  // Todas de fotos de la galería seleccionada
  const [ photosList, setPhotosList ] = useState<PhotoData[]>([])

  // datos originales para aplicar los filtros
  const [ originalList, setOriginalList ] = useState<PhotoData[]>([])

  // Paginado
  const [ paginatorData, setPaginatorData ] = useState<PaginatorData>()
  
  // IDs de las fotos seleccionadas en el admin
  const [ selectedPhotos, setSelectedPhotos ] = useState<string[]>([])
  
  // Lista de fotos agregadas a la lista de pedido
  const [ cartList, setCartList ] = useState<PhotoData[]>([])
  
  // Muestra/oculta el sidesheet de la lista de pedido
  const [ showCartList, setShowCartList ] = useState<boolean>(false)
  
  // coming soon: se va a usar para grabar las listas de pedido y verlas en el admin
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
    if (pdata?.gallery_id) {
      const gData = await gallery(fireDB).getById(pdata.gallery_id)
      setGalleryList([gData])
      setGallerySelected(gData)
      setPersonalGallery(pdata)
      setShowAccessPassForm(false)
    } else if (pdata?.error === 'showAccessPassForm') {
      setCartList([])
      setPhotosList([])
      setGalleryList([])
      setGallerySelected(undefined)
      setPersonalGallery(null)
      setShowAccessPassForm(true)
    } else {
      window.history.pushState({}, "",'/')
      window.location.reload()
    }
  }

  useEffect(()=>{
    if (pathName && pathName !== '/' && db) {      
      getPersonal(pathName, db)
    }
  },[pathName, db])

  useEffect(() => {
    const handleRouteChange = () => {
      setPathName(window.location.pathname.slice(1))
    };
  
    window.addEventListener('popstate', handleRouteChange);
  
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const getSetting = async (fdb: Firestore, url: string | undefined) => {
    const documentoRef = doc(fdb, "setting", "public")
    const docSnapshot = await getDoc(documentoRef)
    const setting = docSnapshot.data()
    setPublicSetting(setting as PublicSetting)
    setPaginatorData({indexFrom: 1, indexTo: setting?.per_page ?? 1})
  }

  useEffect(() => {
    getSetting(db, pathName)
  },[db, pathName])

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
      originalList,
      setOriginalList,
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
  },[user, photosList, selectedPhotos, showAccessPassForm, originalList,
    cartList, showCartList, price, isMobile, db, gallerySelected, publicSetting,
    galleryList, cloudinary, paginatorData])

  return (
    <FireContext.Provider value={valueContext}>
        <HeaderBox>

          {!isMobile && <Logo onClick={handleGoHome} src={logoimg} alt="logo" />}

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

        {pathName && showAccessPassForm && <PrivatePass isLoading={false} onPassSend={(pass)=>getPersonal(pathName, db, pass)} />}

        <Footer />

    </FireContext.Provider>
  )
}
