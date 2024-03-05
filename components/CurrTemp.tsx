import { getPty, getRecommendedOutfits, getWeatherReport } from '@/public/resources/common';
import { oufitsState, weatherReportState } from '@/public/resources/constants/state';
import { recommndedOutfitListType, temperatureStateType } from '@/public/resources/constants/type';
import { CMM_CODE, NCST_DATA } from '@/public/resources/data/ncst';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CurrRcmdOutfits from './CurrRcmdOufits';
import {
    currTempContent,
    currTempH1,
    currTempInnerContent,
    currTempInnerContentRain,
    currTempInnerContentRainIcon,
    currTempInnerContentRainText,
    currTempWeatherReportInnerConent,
    currTempWeatherReportP,
} from '@/styles/styles';
import CurrWeatherIcon from './CurrWeatherIcon';

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
            <div className={currTempContent}>
                {!isNaN(tmp) && <h1 className={currTempH1}>{`현재 기온은 ${tmp}${NCST_DATA['T1H'].unit}`}</h1>}

                <div className={currTempInnerContent}>
                    {!isNaN(windChill) && <p>{`체감 : ${windChill}${NCST_DATA['T1H'].unit} | `}</p>}
                    {!isNaN(reh) && <p className="ml-2">{`습도 : ${reh}${NCST_DATA['REH'].unit} | `}</p>}
                    {!isNaN(wsd) && <p className="ml-2">{`풍속 : ${wsd}${NCST_DATA['WSD'].unit}`}</p>}
                </div>
                <div className={currTempInnerContent}>
                    {!isNaN(pop) && <p>{`강수확률 : ${pop}${NCST_DATA['POP'].unit}`}</p>}
                    {pty !== '0' && (
                        <>
                            <p className="ml-2">{` | 강수량 : ${pcp}${NCST_DATA['RN1'].unit}`}</p>
                        </>
                    )}
                </div>
                {weatherReport.isReady && (
                    <>
                        <div className={currTempWeatherReportInnerConent}>
                            {weatherReport.rain && pty !== '0' && (
                                <>
                                    <div className={currTempInnerContentRain}>
                                        <p className={currTempInnerContentRainIcon}>
                                            <CurrWeatherIcon pty={pty} />
                                        </p>
                                        <p className={currTempInnerContentRainText}>{weatherReport.rain}</p>
                                    </div>
                                </>
                            )}
                            {weatherReport.wind && (
                                <p className={currTempWeatherReportP}>{CMM_CODE['WIND'][`${weatherReport.wind}`]}</p>
                            )}
                            {weatherReport.di && (
                                <p className={currTempWeatherReportP}>{CMM_CODE['DI'][`${weatherReport.di}`]}</p>
                            )}
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
