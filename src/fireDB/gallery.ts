import { DocumentData, DocumentSnapshot, Firestore, collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { GalleryData } from "appType";

function gallery(db: Firestore) {

    return {
        getList: async (uid: string) => {
            try {
                let q
                if (!uid)
                q = query(
                    collection(db, "gallery"),
                    orderBy("created_at", "asc"),
                    where("visible", "==", true),
                    where("deleted", "==", false),
                );
            else
                q = query(
                    collection(db, "gallery"),
                    orderBy("created_at", "asc"),
                    where("deleted", "==", false),
                    where("uid", "==", uid),
                );

                const querySnapshot: DocumentData = await getDocs(q);
                return querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
            } catch (error) {
                console.log('galError: ', error);
                throw error
            }
        },

        getById: async (galleryId: string) => {
            const docRef = doc(db, 'gallery', galleryId);
            const docSnap = await getDoc(docRef);
            return docSnap.data() as GalleryData;
        },

        create: async (galleryData: GalleryData) => {
            try {
                await setDoc(doc(db, 'gallery', galleryData.id), 
                galleryData
              , { merge: true });                
            } catch (error) {
                console.log('galError: ', error);
                throw error
            }
        },

        rename: async (newName: string, newDescription: string, galleryId: string) => {
            try {
                await setDoc(doc(db, 'gallery', galleryId), 
                { name: newName, description: newDescription }
              , { merge: true });                
            } catch (error) {
                console.log('galError: ', error);
                throw error
            }
        },

        update: async (galleryId: string, data: GalleryData) => {
            const docRef = doc(db, 'gallery', galleryId);
            await setDoc(docRef, data, { merge: true });
        },

        password: async (newPass: string, galleryId: string) => {
            try {
                await setDoc(doc(db, 'gallery', galleryId), 
                { password: newPass }
              , { merge: true });                
            } catch (error) {
                console.log('galError: ', error);
                throw error
            }
        },

        visible: async (visible: boolean, galleryId: string) => {
            try {
                await setDoc(doc(db, 'gallery', galleryId), 
                { visible }
              , { merge: true });                
            } catch (error) {
                console.log('galError: ', error);
                throw error
            }
        },

    }
}

export { gallery }