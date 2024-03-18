import { app } from '@/public/resources/config/config';
import { addDoc, collection, doc, getDocFromCache, getDocs, getFirestore, query, runTransaction, setDoc, writeBatch } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';

export const updateRecommendedOutfits = async (degreeCode:string, ptyCode:string , selectedOutfits : string[], answer:string) =>{
// Create a reference to the SF doc.
    const db = getFirestore(app);
    const docRef = doc(db, answer,degreeCode );
    const batch = writeBatch(db);
    
    

    // const updateObject = {
    //  ...
    // };

    // await setDoc(collectionRef, updateObject, { merge: true });

    async function insertData() {
        await addDoc(collection(db, answer,degreeCode ), {
            num: 1,
            ptyStts: ptyCode,
            val: selectedOutfits[0],
        });
    }
    

    try {
       
    const q = query(collection(db, answer,degreeCode ));

    const querySnapshot = await getDocs(q);

        if(querySnapshot.empty){
            // await setDoc(doc(db, answer,degreeCode ), {
            //     num: 1,
            //     ptyStts: ptyCode,
            //     val: selectedOutfits[0],
            // });
             
            batch.set(docRef, {
                num: 1,
                ptyStts: ptyCode,
                val: selectedOutfits[0],
            });
            await batch.commit();
            
        }else{
          
        }
    
    

    
    } catch (e) {
    // This will be a "population is too big" error.
    console.error(e);
    }

}

export async function sendHttpRequest(url: string, config: {}) {
    const response = await fetch(url, config);

    const resData = await response.json();
    if (resData) {
        resData['message'] = 'Success to fetch Data';
    }

    if (!response.ok) {
        throw new Error(resData.message || 'Failed to fetch data');
    }

    return resData || { message: 'success' };
}

export default function useHttp(url: string, config: { method?: string }, initialData: any) {
    const [data, setData] = useState<any>(initialData);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function clearData() {
        setData(initialData);
        setError('');
    }

    const sendRequest = useCallback(
        async function sendRequest(data?: any, newUrl?: string) {
            let requestUrl = url;
            if (newUrl) {
                requestUrl = newUrl;
            }

            setIsLoading(true);

            try {
                const resData = await sendHttpRequest(requestUrl, { ...config, body: data });

                setData(resData);
            } catch (error: any) {
                setError(error.message || 'Failed to fetch data');
            }
            setIsLoading(false);
        },
        [url, config]
    );

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    };
}
