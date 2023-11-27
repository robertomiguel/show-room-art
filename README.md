# Roberto Miguel PH
    Sitio para ventas online

# Requisitos
    Cuenta dev en Google Firebase
    Cuenta para fotos en Cloudinary

# Configuración de .env
## Google firebase
    REACT_APP_APIKEY=
    REACT_APP_AUTHDOMAIN=
    REACT_APP_DATABASEURL=
    REACT_APP_PROJECTID=
    REACT_APP_STORAGEBUCKET=
    REACT_APP_MESSAGINGSENDERID=
    REACT_APP_APPID=

## Cloudinary
    REACT_APP_CLOUD_NAME=
    REACT_APP_CLOUD_API_KEY=
    REACT_APP_CLOUD_API_SECRET=
    REACT_APP_CLOUD_UPLOAD_PRESET=

# firebase.json
    {
    "firestore": {
        "rules": "firestore.rules"
    },
    "hosting": {
        "public": "build",
        "rewrites": [
        {
            "source": "**",
            "destination": "/index.html"
        }
        ],
        "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
        ]
    }
    }
