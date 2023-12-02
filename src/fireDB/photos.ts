import { DocumentData, DocumentSnapshot, Firestore, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { PhotoData } from "appType";

function photos(db: Firestore) {

  return {
    getList: async (galleryId: string, published?: boolean) => {
        try {
            const wheres = [
              orderBy('order'),
              where("deleted", "==", false),
            ]

            if (published) wheres.push(where("public", "==", true))

            const q = query(
              collection(db, 'gallery', galleryId, "photos"),
              ...wheres,
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

    delete: async (galleryId: string, photoId: string, isRealDelete?: boolean) => {
      try {
        if (isRealDelete){
          const docRef = doc(db, 'gallery', galleryId, 'photos', photoId)
          await deleteDoc(docRef);
        }
        else {
          const data = { deleted: true, deleted_at: new Date() }
          await setDoc(doc(db, 'gallery', galleryId, 'photos', photoId), data, { merge: true });
        }
      } catch (e) {
        console.error("Error:", e);
      }
    },

  }
}

export { photos }