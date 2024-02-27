import { resolve } from 'path';
import { temptType } from './constants/type';
import { CMM_CODE, NCST_DATA } from './data/ncst';
import { useRecoilState } from 'recoil';
import { temperatureState } from './constants/state';

export const analyzeTempt = (temptArr: temptType[]) => {
    //   const [temperature, setTemperature] = useRecoilState(temperatureState);

    // 결과 객체
    /*
        resultCode : 결과코드,
        resultMsg : 결과메시지,
        numOfRows : 한 페이지 결과 수,
        pageNo : 페이지번호,
        totalCount : 전체 결과 수,
        dataType : 응답자료형식 (XML/JSON),
        baseDate : 21년 6월 28일 발표,
        baseTime : 06시 발표(매 정시),
        nx : 입력한 예보지점 X 좌표,
        ny : 입력한 예보지점 Y 좌표,
        category : 자료구분코드,
        obsrValue : RN1, T1H, UUU, VVV, WSD 실수로 제공,

        */
    let windChill: number = 0; // 체감온도
    let reh: number = 0; // 습도
    let wsd: number = 0; // 풍속
    let t1h: number = 0; // 기온
    let tmp: number = 0; // 1시간 기온
    let pcp: number = 0; // 강수량 (단기예보)
    let rn1: number = 0; // 강수량 (초단기예보)
    let pop: number = 0; // 강수확률
    let pty: string = ''; // 강수형태

    for (var i = 0; i < temptArr!.length; i++) {
        const category = temptArr![i].category;
        const obsrValue = temptArr![i].obsrValue; //3.6

        if (NCST_DATA[category]) {
            switch (category) {
                case 'REH': // 습도
                    reh = Number(obsrValue);

                    break;
                case 'T1H': // 기온
                    t1h = Number(obsrValue);

                    break;
                case 'TMP': // 1시간 기온
                    tmp = Number(obsrValue);

                    break;
                case 'WSD': //풍속
                    wsd = Number(obsrValue);

                    break;
                case 'PTY': //강수형태,
                    // pty = getPty(obsrValue.toString());
                    pty = obsrValue.toString();

                    break;
                case 'PCP': // 강수량(단기예보)
                    pcp = Number(obsrValue);

                    break;
                case 'RN1': // 강수량 (초단기예보)
                    rn1 = Number(obsrValue);

                    break;
                case 'POP': //강수확률
                    pop = Number(obsrValue);

                    break;
            }
            console.log(NCST_DATA[category].name + ' : ' + obsrValue + NCST_DATA[category].unit);
        }
    }

    // 불쾌지수 계산 (0포함)
    if ((reh && !isNaN(tmp)) || (reh && !isNaN(t1h))) {
        const di = getDiscomfortIndex(reh, t1h || tmp);
        console.log(di);
    }
    // 체감온도 계산 (0포함)
    if ((wsd && !isNaN(tmp)) || (wsd && !isNaN(t1h))) {
        windChill = getWindChill(t1h || tmp, wsd);
        console.log('체감온도 : ' + windChill);
    }
    // 강수형태 (0포함)
    if (pty) {
        console.log('강수형태 : ' + pty);
    }
    // 강수량 (0일땐 필요 없음)
    if (rn1 || pcp) {
        const rainfullReport = getRainfullAmountReport(rn1 || pcp);
        console.log(rainfullReport);
    }

    const temp = {
        isReady: true,
        windChill: windChill, // 체감온도
        reh: reh, // 습도
        wsd: wsd, // 풍속
        tmp: t1h || tmp, // 기온
        pcp: rn1 || pcp, // 강수량
        pop: pop, // 강수확률
        pty: pty, // 강수형태
    };

    return temp;

    // setTemperature(temp);
};

export const getTempUnit = (tempArr: string[]) => {
    let resultObj: { [key: string]: string } = {};
    for (var i = 0; i < tempArr!.length; i++) {
        const category = tempArr![i];

        if (NCST_DATA[category]) {
            resultObj[category] = NCST_DATA[category].unit;
        }
    }
    return resultObj;
};

export const getRainfullAmountReport = (rainfullAmout: number) => {
    let report: string = '';
    if (rainfullAmout >= 30) {
        report = '매우 강한 비가 와요';
    } else if (rainfullAmout >= 15) {
        report = '강한 비가 와요';
    } else if (rainfullAmout >= 3) {
        report = '비가 와요';
    } else {
        report = '약한 비가 와요';
    }
};

export const getPty = (obsrValue: string) => {
    return CMM_CODE.PTY[obsrValue];
};

export const getDiscomfortIndex = (reh: number, t1h: number) => {
    //[불쾌지수=1.8x기온–0.55x(1–습도)x(1.8x기온–26)+32]

    const result = 1.8 * t1h - 0.55 * (1 - reh * 0.01) * (1.8 * t1h - 26) + 32;

    console.log('불쾌지수 : ' + Math.ceil(result));
    return result;
};

export const getDiscomfortIndexReport = (di: number) => {
    let diReport: string = '';

    if (di >= 80) {
        diReport = '불쾌지수가 매우 높아요.';
    } else if (di >= 75 && 80 > di) {
        diReport = '불쾌지수가 높아요.';
    } else if (di >= 68 && 75 > di) {
        diReport = '다소 끈적끈적한 날이네요';
    } else {
        diReport = '쾌적한 날이에요';
    }

    return diReport;
};

export const getWindChill = (reh: number, windSpeed: number) => {
    const windSpeedKmS: number = windSpeed * 3.6;
    const windSpeedSquare: number = windSpeedKmS ** 0.16;

    const result: number = 13.12 + 0.6215 * reh - 11.37 * windSpeedSquare + 0.3965 * windSpeedSquare * reh;

    return Number(result.toFixed(1));
};

export const getCurrPosition = async () => {
    return new Promise<{
        latitude: number;
        longitude: number;
    }>((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let result: {
                latitude: number;
                longitude: number;
            } = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            let toXY = dfs_xy_conv('toXY', result.latitude, result.longitude);
            result = {
                latitude: toXY['x'],
                longitude: toXY['y'],
            };

            resolve(result);
        });
    });
};

//❍단기예보
//- Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
//- API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
//1410 < 1626 < 1710
export const getBaseTime = () => {
    const baseTime: number[] = [210, 510, 810, 1110, 1410, 1710, 2010, 2310];
    var today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const minutesStr = minutes.toString().length < 2 ? '0' + minutes.toString() : minutes.toString();
    const currTime = Number(hours.toString() + minutesStr);

    const closeNumber: number = getCloseNumber(baseTime, currTime);
    const smallerNumber: number = getSmallerNumber(baseTime, closeNumber);

    const currTimeStr: string = formatToBaseTimeStr(currTime);
    const closeNumberStr: string = formatToBaseTimeStr(closeNumber);
    const smallerNumberStr: string = formatToBaseTimeStr(smallerNumber);

    return {
        curr: currTimeStr, // 현재 시간대 (정시로 변환)
        close: closeNumberStr, // 가장 최신 시간대
        smaller: smallerNumberStr, // 만약 정보가 없을 시 시간대
    };
};

const formatToBaseTimeStr = (baseTime: number) => {
    const baseTimeStr = baseTime.toString();
    let result: string;

    if (baseTimeStr.length === 3) {
        result = '0' + baseTimeStr;
    }

    result = baseTimeStr.substring(0, 2) + '00';
    return result;
};

const getSmallerNumber = (baseTime: number[], n: number) => {
    let result: number = n;
    for (var i = 0; i < baseTime.length; i++) {
        if (baseTime[i] === n) {
            if (i !== 0) {
                result = baseTime[i - 1];
                break;
            }
        }
    }

    return result;
};

const getCloseNumber = (array: number[], n: number) => {
    let ans: number[] = [];

    array.forEach((item) => {
        ans.push(Math.abs(item - n));
    });

    const min = Math.min(...ans);

    if (ans.indexOf(min) !== ans.lastIndexOf(min)) {
        const indexOne = ans.indexOf(min);
        const indexTwo = ans.lastIndexOf(min);

        return array[indexOne] > array[indexTwo] ? array[indexTwo] : array[indexOne];
    }

    const indexOfMin = ans.indexOf(Math.min(...ans));

    return array[indexOfMin];
};

export const getBaseDate = () => {
    const today = new Date();

    // 년도
    const year = today.getFullYear();
    // 월
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // 일
    const day = today.getDate().toString().padStart(2, '0');
    // yyyymmdd
    const yyyymmdd = `${year}${month}${day}`;

    return yyyymmdd;
};

function dfs_xy_conv(code: string, v1: number, v2: number) {
    var RE = 6371.00877; // 지구 반경(km)
    var GRID = 5.0; // 격자 간격(km)
    var SLAT1 = 30.0; // 투영 위도1(degree)
    var SLAT2 = 60.0; // 투영 위도2(degree)
    var OLON = 126.0; // 기준점 경도(degree)
    var OLAT = 38.0; // 기준점 위도(degree)
    var XO = 43; // 기준점 X좌표(GRID)
    var YO = 136; // 기1준점 Y좌표(GRID)
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    var rs: any = {};
    if (code == 'toXY') {
        rs['lat'] = v1;
        rs['lng'] = v2;
        var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
        ra = (re * sf) / Math.pow(ra, sn);
        var theta = v2 * DEGRAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
        rs['x'] = v1;
        rs['y'] = v2;
        var xn = v1 - XO;
        var yn = ro - v2 + YO;
        ra = Math.sqrt(xn * xn + yn * yn);
        if (sn < 0.0) -ra;
        var alat = Math.pow((re * sf) / ra, 1.0 / sn);
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

        if (Math.abs(xn) <= 0.0) {
            theta = 0.0;
        } else {
            if (Math.abs(yn) <= 0.0) {
                theta = Math.PI * 0.5;
                if (xn < 0.0) -theta;
            } else theta = Math.atan2(xn, yn);
        }
        var alon = theta / sn + olon;
        rs['lat'] = alat * RADDEG;
        rs['lng'] = alon * RADDEG;
    }
    return rs;
}
