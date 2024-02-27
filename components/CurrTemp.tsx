import { getPty } from '@/public/resources/common';
import { temperatureStateType } from '@/public/resources/constants/type';
import { NCST_DATA } from '@/public/resources/data/ncst';
import { firstPageInnerContent, firstPageText, firstPageTitle } from '@/styles/styles';

const CurrTemp = (props: { tempt: temperatureStateType }) => {
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
            <div className="align-baseline flex flex-col pt-8 h-64 w-96 mx-auto bg-white opacity-40 items-center">
                {!isNaN(tmp) && (
                    <h1 className="text-3xl flex flex-col text-green-950 opacity-100 subpixel-antialiased font-bold">{`현재 기온은 ${tmp}${NCST_DATA['T1H'].unit}`}</h1>
                )}
                <div className="text-[13px] flex items-center mt-0 pt-2 font-bold">
                    {pty !== '0' && (
                        <>
                            <p>{`${ptyStr} 이/가 와요 `}</p>
                        </>
                    )}
                </div>
                <div className="text-[13px] flex items-center mt-0 pt-2 font-bold">
                    {!isNaN(windChill) && <p>{`체감 : ${windChill}${NCST_DATA['T1H'].unit} | `}</p>}
                    {!isNaN(reh) && <p className="ml-2">{`습도 : ${reh}${NCST_DATA['REH'].unit} | `}</p>}
                    {!isNaN(wsd) && <p className="ml-2">{`풍속 : ${wsd}${NCST_DATA['WSD'].unit}`}</p>}
                </div>
                <div className="text-[13px] flex items-center mt-0 pt-2 font-bold">
                    {!isNaN(pop) && <p>{`강수확률 : ${pop}${NCST_DATA['POP'].unit}`}</p>}
                    {pty !== '0' && (
                        <>
                            <p className="ml-2">{` | 강수량 : ${pcp}${NCST_DATA['RN1'].unit}`}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CurrTemp;
