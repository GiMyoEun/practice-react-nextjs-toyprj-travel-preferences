import { useRouter } from 'next/router';

import BgImgContent from '@/UI/BgImgContent';

import Proceeding from '@/UI/Proceeding';
import { useRecoilState } from 'recoil';
import { temperatureState } from '@/public/resources/constants/state';

import { getVillageFcstInfo } from '../api/fetchFcst';
import { useEffect, useState } from 'react';
import { temperatureStateType } from '@/public/resources/constants/type';

import CurrTemp from '@/components/CurrTemp';
import BgImgBtn from '@/UI/BgImgBtn';
import NewForm from '@/components/NewForm';
import { app } from '@/public/resources/config/config';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

// our-domain.com/news/something-important

const Recommendation = () => {
    const router = useRouter();
    const answer = router.query.answer;
    const [tempt, setTempt] = useRecoilState(temperatureState);
    const [editForm, setEditForm] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            const result: temperatureStateType | null = await getVillageFcstInfo();
            if (result !== null) {
                setTempt(result);
            }
        };
        getInfo();
    }, []);

    const contentClass =
        'align-baseline text-center object-center h-svh bg-center bg-no-repeat bg-cover border-transparent pt-14';

    return (
        <>
            <NewForm
                tempt={tempt}
                onClose={() => {
                    setEditForm(false);
                }}
                edit={editForm}
                answer={typeof answer === 'string' ? answer : ''}
            />
            <BgImgContent url='url("/resources/img/cloud.jpg")' class={contentClass}>
                {!tempt.isReady && <Proceeding title="열심히 찾고있어요" />}
                {tempt.isReady && <CurrTemp tempt={tempt} />}
                <div className="flex mx-auto mt-10">
                    <div className="flex mx-auto">
                        <BgImgBtn
                            class="flex"
                            onClickBtn={() => {
                                router.push('/pre-question');
                            }}
                            title="처음으로"
                        />
                        {/* <BgImgBtn
                            class="flex ml-2"
                            onClickBtn={() => {
                                setEditForm(true);
                            }}
                            title="기록하기"
                        /> */}
                    </div>
                </div>
            </BgImgContent>
        </>
    );
};

export default Recommendation;
