import { DocumentData, DocumentSnapshot, Firestore, collection, doc, getDocs, limit, orderBy, query, setDoc, startAt, where } from "firebase/firestore";
import { PhotoData } from "../appType";

export interface PhotosGetList {
    galleryId: string
    pageSize: number
    lastDocument?: number
    published?: boolean
    password?: string
}

function photos(db: Firestore) {

  return {
    getList: async ({galleryId, lastDocument, pageSize, published}: PhotosGetList) => {
        try {
            const wheres = [
                orderBy('order'),
                where("deleted", "==", false),
              ]
              if (published) wheres.push(where("public", "==", true))
              let q
              if (lastDocument)
                q = query(
                  collection(db, 'gallery', galleryId, "photos"),  
                  ...wheres,
                  startAt(lastDocument),
                  limit(pageSize),
                )
              else q = query(
                collection(db, 'gallery', galleryId, "photos"),
                ...wheres,
                limit(pageSize),
              )
              const querySnapshot: DocumentData = await getDocs(q);                
              return querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
        } catch (error) {
            console.log('galError: ', error);
            throw error
        }
    },

    create: async (photoData: PhotoData) => {
      try {
        await setDoc(doc(db, 'gallery', photoData.gallery_id, 'photos', photoData.id),
              photoData
        , { merge: true });
      } catch (e) {
        console.error("Error:", e);
      }
    },

    public: async (galleryId: string, photoId: string, status: boolean) => {
      try {
        const data = status ? {public: true, public_last_date: new Date() } : { public: false }
        await setDoc(doc(db, 'gallery', galleryId, 'photos', photoId), data, { merge: true });
      } catch (e) {
        console.error("Error:", e);
      }
    },

    delete: async (galleryId: string, photoId: string) => {
      try {
        const data = { deleted: true, deleted_at: new Date() }
        await setDoc(doc(db, 'gallery', galleryId, 'photos', photoId), data, { merge: true });
      } catch (e) {
        console.error("Error:", e);
      }
    },

    getCount: async ({galleryId, published}: {galleryId: string, published?: boolean}) => {
      const wheres = [
        where("deleted", "==", false),
      ]
      if (published) wheres.push(where("public", "==", true))
      const q = query(
        collection(db, "gallery", galleryId, "photos"),
        ...wheres,
      )
      const querySnapshot: DocumentData = await getDocs(q)
      return querySnapshot.docs.length
    },

    getListByPassword: async ({galleryId, lastDocument, pageSize, published}: PhotosGetList) => {
      try {
            const queryParams = []

            if (lastDocument) queryParams.push(startAt(lastDocument))
            if (published) queryParams.push(where("public", "==", true))
            
            const q = query(
                collection(db, 'gallery', galleryId, "photos"),
                orderBy('order'),
                where("deleted", "==", false),
                ...queryParams,
                limit(pageSize),
            )

            const querySnapshot: DocumentData = await getDocs(q);
            return querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
      } catch (error) {
          console.log('galError: ', error);
          throw error
      }
    },
  }
}

export { photos }