import { getPty, getRecommendedOutfits, getWeatherReport } from '@/public/resources/common';
import { oufitsState, weatherReportState } from '@/public/resources/constants/state';
import { recommndedOutfitListType, temperatureStateType } from '@/public/resources/constants/type';
import { CMM_CODE, NCST_DATA, OUTFITS } from '@/public/resources/data/ncst';
import { firstPageInnerContent, firstPageText, firstPageTitle } from '@/styles/styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CurrRcmdOutfits from './CurrRcmdOufits';

const CurrTemp = (props: { tempt: temperatureStateType }) => {
    const [weatherReport, setWeatherReport] = useRecoilState(weatherReportState);
    const [outfits, setOutfits] = useRecoilState(oufitsState);
    const router = useRouter();
    const answer: string | string[] | undefined = router.query.answer;
    let recommendedOutfits = {
        top: '',
    };

    useEffect(() => {
        const weatherReport: { [key: string]: string } = getWeatherReport(props.tempt);
        const outfits: recommndedOutfitListType = getRecommendedOutfits(props.tempt, weatherReport, answer);

        setWeatherReport({
            isReady: true,
            rain: weatherReport['RAIN'],
            di: weatherReport['DI'],
            wind: weatherReport['WIND'],
        });
        setOutfits({
            isReady: true,
            outfits: outfits.outfits.recmd,
            mtr: outfits.mtr.recmd,
        });
    }, []);

    const windChill = props.tempt.windChill;
    const reh = props.tempt.reh;
    const wsd = props.tempt.wsd;
    const tmp = props.tempt.tmp;
    const pcp = props.tempt.pcp;
    const pop = props.tempt.pop;
    const pty = props.tempt.pty;
    const ptyStr = getPty(pty);

    return (
        <>
            <div className="align-baseline flex flex-col pt-8 h-auto pb-8 max-w-[400px] mx-auto bg-white opacity-40 items-center">
                {!isNaN(tmp) && (
                    <h1 className="text-3xl flex flex-col text-green-950 opacity-100 subpixel-antialiased font-bold">{`현재 기온은 ${tmp}${NCST_DATA['T1H'].unit}`}</h1>
                )}
                <div className="text-[13px] flex items-center text-green-950 mt-0 pt-2 font-bold">
                    {pty !== '0' && (
                        <>
                            <p>{`${ptyStr} 이/가 와요 `}</p>
                        </>
                    )}
                </div>
                <div className="text-[13px] flex items-center text-green-950 mt-0 pt-2 font-bold">
                    {!isNaN(windChill) && <p>{`체감 : ${windChill}${NCST_DATA['T1H'].unit} | `}</p>}
                    {!isNaN(reh) && <p className="ml-2">{`습도 : ${reh}${NCST_DATA['REH'].unit} | `}</p>}
                    {!isNaN(wsd) && <p className="ml-2">{`풍속 : ${wsd}${NCST_DATA['WSD'].unit}`}</p>}
                </div>
                <div className="text-[13px] flex items-center mt-0 text-green-950 pt-2 font-bold">
                    {!isNaN(pop) && <p>{`강수확률 : ${pop}${NCST_DATA['POP'].unit}`}</p>}
                    {pty !== '0' && (
                        <>
                            <p className="ml-2">{` | 강수량 : ${pcp}${NCST_DATA['RN1'].unit}`}</p>
                        </>
                    )}
                </div>
                {weatherReport.isReady && (
                    <>
                        <div className="text-[13px] mt-0 text-green-950 pt-2 font-bold text-left">
                            {weatherReport.rain && <p>{CMM_CODE['RAIN'][`${weatherReport.rain}`]}</p>}
                            {weatherReport.wind && <p>{CMM_CODE['WIND'][`${weatherReport.wind}`]}</p>}
                            {weatherReport.di && <p>{CMM_CODE['DI'][`${weatherReport.di}`]}</p>}
                        </div>
                    </>
                )}

                {outfits.isReady && (
                    <>
                        <CurrRcmdOutfits sortedClothes={outfits.outfits} />
                    </>
                )}
            </div>
        </>
    );
};

export default CurrTemp;
