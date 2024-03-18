import Modal from '@/UI/Modal';
import { temperatureStateType } from '@/public/resources/constants/type';
import { AnimatePresence } from 'framer-motion';
import SelectOutfits from './SelectOutfits';
import BgImgBtn from '@/UI/BgImgBtn';
import { useRecoilState } from 'recoil';
import { alertState, confirmState, selectedOutfitsState } from '@/public/resources/constants/state';
import FormFcstData from './FormFcstData';
import Confirm from '@/UI/Confirm';
import { getDegreeCode, getPtyYnForUrl } from '@/public/resources/common';
import { app } from '@/public/resources/config/config';
import { addDoc, collection, doc, getFirestore, setDoc, writeBatch } from 'firebase/firestore';
import { useEffect } from 'react';
import { getDatabase } from 'firebase/database';
import { updateRecommendedOutfits } from '@/pages/api/manageOutfitsData';

/**
 * url 가져오기
 *
 * @param windChill 체감온도
 * @param pty 강수형태
 * @param answer normal/sensitive_to_heat/sensitive_to_cold
 * @return url
 */
const getFetchUrl = (windChill: number, pty: string, answer: string) => {
    let degreeCode = getDegreeCode(windChill);
    let ptyCode = getPtyYnForUrl(pty);

    let url = `${process.env.REACT_APP_FIREBASE_URL}${answer}/${degreeCode}/${ptyCode}`;
    return url;
};

const NewForm = (props: { tempt: temperatureStateType; onClose: () => void; edit: boolean; answer: string }) => {
    const [selected, setSelected] = useRecoilState<{ [key: string]: boolean }>(selectedOutfitsState);
    const [confirm, setConfirm] = useRecoilState(confirmState);
    const [alert, setAlert] = useRecoilState(alertState);

    const onClickSaveBtn = () => {
        const validateCheck = checkRequiredData();
        if (!validateCheck) {
            setAlert({
                title: '선택된 데이터 없음',
                discription: '데이터를 선택해주세요',
                showAlert: true,
            });
            return;
        } else {
            setConfirm({
                title: '데이터 저장',
                discription: '데이터를 저장하시겠습니까?',
                showConfirm: true,
            });
            return;
        }
    };

    const checkRequiredData = () => {
        if (!selected) return false;
        for (var key in selected) {
            if (selected[key]) {
                return true;
            }
        }

        return false;
    };
    const onClickCloseBtn = () => {
        setAlert({
            title: '',
            discription: '',
            showAlert: false,
        });
        setSelected({});
        props.onClose();
    };
    const onClickInitBtn = () => {
        const validateCheck = checkRequiredData();
        if (validateCheck) {
            setSelected({});
        }
    };
  

    useEffect(() => {
        // async function test() {
        //     // await setDoc(doc(db, 'citiqess', 'LqA'), {
        //     //     name: 'Los Anqgeles',
        //     //     state: 'CA',
        //     //     country: 'USA22',
        //     // });

          
        // }
        // test();

       
    }, []);

    const saveDataHandler = async () => {
        let degreeCode = getDegreeCode(props.tempt.windChill);
        let ptyCode = getPtyYnForUrl(props.tempt.pty);
        let newArr: string[] = [];
        for (var key in selected) {
            if (selected[key]) {
                newArr.push(key);
            }
        }

        updateRecommendedOutfits(degreeCode,ptyCode,newArr, props.answer);

        // const db = getFirestore(app);
        // const batch = writeBatch(db);
        // // Set the value of 'NYC'
        // const nycRef = doc(db, "cities", "NYC");
        // batch.set(nycRef, {name: "New York CityNEW"});
            
        // // Update the population of 'SF'
        //     // const sfRef = doc(db, "cities", "SF");
        //     // batch.update(sfRef, {"population": 1000000});
            
        //     // // Delete the city 'LA'
        //     // const laRef = doc(db, "cities", "LAWHAT");
        //     // batch.delete(laRef);
            
        //     // Commit the batch
        //     await batch.commit();

        // async function test(val :string) {
        //     await setDoc(collection(db, props.answer, degreeCode, val), {
        //         ptyStts: ptyCode,
        //         // value : getDatabase(app).FieldValue.increment(-50)
        //     });
        // }
        // for(var i=0; i< newArr.length; i++){
        //     await test(newArr[i]);
        // }

        
// Get a new write batch

        
        

      
    };

    return (
        <>
            <AnimatePresence>
                {props.edit && (
                    <>
                        <Confirm onClickConfirmBtn={saveDataHandler} />
                        <Modal
                            title="오늘 착장 기록하기"
                            onClose={onClickCloseBtn}
                            className={confirm.showConfirm ? 'modal-back' : ''}
                        >
                            {!confirm.showConfirm && (
                                <>
                                    <FormFcstData tempt={props.tempt} />
                                    <SelectOutfits />

                                    {alert.showAlert && <p className="mb-2 font-bold">{alert.discription}</p>}
                                    <div className="flex">
                                        <div className="flex mx-auto">
                                            <BgImgBtn class="flex" onClickBtn={onClickInitBtn} title="초기화" />
                                            <BgImgBtn class="flex ml-2" onClickBtn={onClickSaveBtn} title="저장" />
                                            <BgImgBtn class="flex ml-2" onClickBtn={onClickCloseBtn} title="취소" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </Modal>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default NewForm;
