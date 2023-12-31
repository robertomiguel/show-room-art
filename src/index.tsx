import ReactDOM from 'react-dom/client'
import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Cloudinary } from '@cloudinary/url-gen'
import './css/index.css'
import { Home } from './components/home'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// parámetros de configuración de google firebase
const fireApp = initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
})

const db: Firestore = getFirestore(fireApp)

const cld = new Cloudinary({
  cloud: {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
  },
})

root.render(
    <Home db={db} cloudinary={cld} />
)
