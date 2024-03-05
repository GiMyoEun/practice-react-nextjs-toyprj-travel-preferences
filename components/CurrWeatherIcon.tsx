import { WiRain, WiSnowflakeCold, WiSnowWind, WiRainMix } from 'react-icons/wi';

const CurrWeatherIcon = (props: { pty: string }) => {
    return (
        <>
            {props.pty === '1' && (
                <>
                    <WiRain />
                </>
            )}
            {props.pty === '2' && (
                <>
                    <WiRainMix />
                </>
            )}
            {props.pty === '3' && (
                <>
                    <WiSnowflakeCold />
                </>
            )}
            {props.pty === '4' && (
                <>
                    <WiRain />
                </>
            )}
            {props.pty === '5' && (
                <>
                    <WiRain />
                </>
            )}
            {props.pty === '6' && (
                <>
                    <WiRainMix />
                </>
            )}
            {props.pty === '7' && (
                <>
                    <WiSnowWind />
                </>
            )}
        </>
    );
};

export default CurrWeatherIcon;
