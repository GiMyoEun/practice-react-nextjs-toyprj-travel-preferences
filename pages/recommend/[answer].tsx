import { useRouter } from 'next/router';

import BgImgContent from '@/UI/BgImgContent';
import BgImgBtn from '@/UI/BgImgBtn';
import Proceeding from '@/UI/Proceeding';
import { useRecoilState } from 'recoil';
import { temperatureState } from '@/public/resources/constants/state';

import { getVillageFcstInfo } from '../api/hello';
import { useEffect, useState } from 'react';
import { temperatureStateType } from '@/public/resources/constants/type';
import { getTempUnit } from '@/public/resources/common';
import { NCST_DATA } from '@/public/resources/data/ncst';
import CurrTemp from '@/components/CurrTemp';

// our-domain.com/news/something-important

const Recommendation = () => {
    const router = useRouter();
    const answer = router.query.answer;
    const [tempt, setTempt] = useRecoilState(temperatureState);

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
            <BgImgContent url='url("/resources/img/cloud.jpg")' class={contentClass}>
                {!tempt.isReady && <Proceeding title="열심히 찾고있어요" />}
                {tempt.isReady && <CurrTemp tempt={tempt} />}

                <BgImgBtn onClickBtn={() => {}} title="목록" />
            </BgImgContent>
        </>
    );
};

export default Recommendation;
