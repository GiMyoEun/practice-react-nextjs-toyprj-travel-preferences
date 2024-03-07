import { getDegreeCode } from '@/public/resources/common';
import { temperatureStateType } from '@/public/resources/constants/type';
import { NCST_DATA } from '@/public/resources/data/ncst';
import { currTempInnerContentRain, currTempInnerContentRainIcon } from '@/styles/styles';
import CurrWeatherIcon from './CurrWeatherIcon';

const FormFcstData = (props: { tempt: temperatureStateType }) => {
    const windChillVal = getDegreeCode(props.tempt.windChill);

    return (
        <div className="h-[10%] w-[90%] mx-auto bg-white p-2 m-2 opacity-70 rounded-lg text-green-950">
            {props.tempt.pty !== '0' && (
                <>
                    <p className="text-[25px] flex flex-col items-center font-bold">
                        <CurrWeatherIcon pty={props.tempt.pty} />
                    </p>
                </>
            )}

            <p className="font-bold">체감온도 : {`${props.tempt.windChill} ${NCST_DATA['T1H'].unit}`}</p>
        </div>
    );
};

export default FormFcstData;
