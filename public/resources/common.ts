import { recommndedOutfitListType, sortedClothesType, temperatureStateType, temptType } from './constants/type';
import { CMM_CODE, NCST_DATA, OUTFITS, RECOMMENDED_DATA } from './data/ncst';

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
/**
 * 체감 기온별 옷차림 추천
 *
 * @param temptArr 기온 정보 배열
 * @return temp 분석한 기온

 */
export const analyzeTempt = (temptArr: temptType[]) => {
    //   const [temperature, setTemperature] = useRecoilState(temperatureState);

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

    // 체감온도 계산 (0포함)
    if ((wsd && reh && !isNaN(tmp)) || (wsd && reh && !isNaN(t1h))) {
        //   windChill = getWindChill(t1h || tmp, wsd);
        windChill = getSensibleTemp(t1h || tmp, reh, wsd);
        console.log('체감온도 : ' + windChill);
    }

    // 강수형태 (0포함)
    if (pty) {
        console.log('강수형태 : ' + pty);
    }

    const temp = {
        isReady: true,
        windChill: windChill, // 체감온도
        reh, // 습도
        wsd, // 풍속
        tmp: t1h || tmp, // 기온
        pcp, // 강수량
        pop, // 강수확률
        pty, //TODO 강수형태
    };

    return temp;
};

/**
 * 예보 리포트 정보 받기
 *
 * @param tempObj 분석한 기온
 * @return weatherReport 예보리포트(강수량리포트, 불쾌지수리포트, 풍속리포트)

 */
export const getWeatherReport = (tempObj: temperatureStateType) => {
    let diReport = '';

    // 강수량 (0일땐 필요 없음)
    const rainfullReport = getRainfullAmountReport(tempObj.pcp, tempObj.pty);

    // 불쾌지수 계산 (0포함)
    if (tempObj.reh && !isNaN(tempObj.tmp)) {
        diReport = getRehReport(tempObj.reh, tempObj.tmp);
    }
    const windReport = getWindReport(tempObj.wsd);

    const weatherReport: { [key: string]: string } = {
        RAIN: rainfullReport,
        DI: diReport,
        WIND: windReport,
    };

    // Object.entries(weatherReport).map(([key, value]) => {
    //     console.log(key);
    //     console.log(value);
    // });
    return weatherReport;
};

/**
 * 바람 세기 리포트
 *
 * @param wsd 풍속 m/s
 * @return report 바람 리포트 코드
 */
export const getWindReport = (wsd: number) => {
    let report: string = '';
    if (wsd >= 14) {
        report = '4';
    } else if (wsd >= 9 && wsd < 14) {
        report = '3';
    } else if (wsd >= 4 && wsd > 9) {
        report = '2';
    } else {
        report = '1';
    }
    return report;
};

/**
 * 강수량 리포트
 *
 * @param rainfullAmout 강수량 mm
 * @param pty 강수형태
 * @return report 강수 리포트 코드
 */
export const getRainfullAmountReport = (rainfullAmout: number, pty: string) => {
    let report: string = '';
    // 장화
    if (rainfullAmout >= 30) {
        report = CMM_CODE['RAIN']['4'];
    } else if (rainfullAmout >= 15) {
        report = CMM_CODE['RAIN']['3'];
    } else if (rainfullAmout >= 3) {
        report = CMM_CODE['RAIN']['2'];
    } else if (rainfullAmout > 0) {
        report = CMM_CODE['RAIN']['1'];
    } else {
        report = '';
    }

    if (report) {
        report += getPty(pty) + ' 가(이) 내려와요';
    }
    return report;
};

/**
 * 불쾌지수/습도 리포트 구하기 (여름/겨울별)
 *
 * @param reh 습도
 * @param t1h 기온
 * @return result 불쾌지수/습도 리포트
 */
const getRehReport = (reh: number, tmp: number) => {
    let result = '';
    const month = getCurrentSeason();

    if (month >= 5 && month <= 9) {
        const di = getDiscomfortIndex(reh, tmp);
        result = getDiscomfortIndexReport(di);
    } else {
        result = getRehWinterReport(reh, tmp);
    }
    return result;
};

/**
 * 불쾌지수/습도 리포트 구하기
 *
 * @param reh 습도
 * @param t1h 기온
 * @return result 불쾌지수/습도 리포트
 */
const getRehWinterReport = (reh: number, tmp: number) => {
    let result = '';
    if (tmp >= 21) {
        const di = getDiscomfortIndex(reh, tmp);
        result = getDiscomfortIndexReport(di);
    } else {
        if (reh > 60) {
            result = '2';
        } else if (reh >= 40 && reh <= 60) {
            result = '1';
        } else {
            result = '5';
        }
    }
    return result;
};

/**
 * 불쾌지수 구하기
 *
 * @param reh 습도
 * @param t1h 기온
 * @return result 불쾌지수
 */
export const getDiscomfortIndex = (reh: number, t1h: number) => {
    //[불쾌지수=1.8x기온–0.55x(1–습도)x(1.8x기온–26)+32]

    const result = 1.8 * t1h - 0.55 * (1 - reh * 0.01) * (1.8 * t1h - 26) + 32;

    console.log('불쾌지수 : ' + Math.ceil(result));
    return result;
};

/**
 * 불쾌지수 리포트
 *
 * @param di 불쾌지수
 * @return diReport 불쾌지수 코드
 */
export const getDiscomfortIndexReport = (di: number) => {
    let diReport: string = '';

    if (di >= 80) {
        diReport = '4';
    } else if (di >= 75 && 80 > di) {
        diReport = '3';
    } else if (di >= 68 && 75 > di) {
        diReport = '2';
    } else {
        diReport = '1';
    }

    return diReport;
};

/**
 * 옷차림 추천
 *
 * @param tempObj 분석한 기온
 * @param weatherReport weatherReport 예보리포트(강수량리포트, 불쾌지수리포트, 풍속리포트)
 * @param answer 'sensitive_to_cold'/'sensitive_to_heat'/normal
 * @return newResult 추천하는 옷차림 Obj
 */
export const getRecommendedOutfits = (
    tempObj: temperatureStateType,
    weatherReport: { [key: string]: string },
    answer: string | string[] | undefined
) => {
    let result: recommndedOutfitListType = {
        outfits: {
            recmd: [],
        },
        mtr: {
            recmd: [],
        },
    };
    let newResult = getRecommendedOutfitsByWeather(tempObj.windChill, answer, result);
    newResult = getRecommendedOutfitsPty(newResult, tempObj.pty);

    // const sortedRcmdClothes = getSortedClothes(newResult.outfits.recmd);

    return newResult;
};

/**
 * 비/눈 올 때 옷 추천
 *
 * @param newResult 업데이트 전 옷 추천리스트
 * @param pty     강수코드
 * @return newResult 업데이트된 옷 추천 리스트
 */
export const getRecommendedOutfitsPty = (newResult: recommndedOutfitListType, pty: string) => {
    const month = getCurrentSeason();
    switch (pty) {
        case '0':
            newResult = newResult;
            break;
        case '1':
        case '4':
        case '5': // 비
            newResult = getRecommendedOutfitsRaining(newResult, month, 'RAIN');
            break;
        case '2':
        case '3':
        case '6':
        case '7': // 눈
            newResult = getRecommendedOutfitsRaining(newResult, month, 'SNOW');
            break;
    }
    // if (pty === '0') {
    //     return newResult;
    // } else if() {

    //     if (month >= 5 && month <= 9) {
    //         newResult.outfits.recmd = getConcatArr(newResult.outfits.recmd, RECOMMENDED_DATA.RAIN['SUMMER']['rcmd']);
    //     } else {
    //         newResult.outfits.recmd = getConcatArr(newResult.outfits.recmd, RECOMMENDED_DATA.RAIN['WINTER']['rcmd']);
    //     }
    // }

    return newResult;
};

/**
 * 비 올 때 옷 추천
 *
 * @param newResult 업데이트 전 옷 추천 리스트
 * @param month     달
 * @return newResult 업데이트된 옷 추천 리스트
 */
export const getRecommendedOutfitsRaining = (newResult: recommndedOutfitListType, month: number, type: string) => {
    if (month >= 5 && month <= 9) {
        if (type === 'SNOW') return newResult;
        newResult.outfits.recmd = getConcatArr(newResult.outfits.recmd, RECOMMENDED_DATA[type]['SUMMER']['rcmd']);
    } else {
        newResult.outfits.recmd = getConcatArr(newResult.outfits.recmd, RECOMMENDED_DATA[type]['WINTER']['rcmd']);
    }
    return newResult;
};

/**
 * 중복없이 배열 합치기
 *
 * @param clothes    분류 전 옷
 * @return sortClothes 분류한 옷
 */
export const getConcatArr = (arr1: string[], arr2: string[]) => {
    let newArr = arr1.concat(arr2);
    newArr = newArr.filter((item, pos) => newArr.indexOf(item) === pos);
    return newArr;
};

/**
 * 타겟 요소 제거하기
 *
 * @param clothes    분류 전 옷
 * @return sortClothes 분류한 옷
 */
export const deleteTargetElements = (arr1: string[], targetElms: string[]) => {};

/**
 * 옷 분류 (상의, 하의, 아우터...)
 *
 * @param clothes    분류 전 옷
 * @return sortClothes 분류한 옷
 */
export const getSortedClothes = (clothes: string[]) => {
    let sortedClothes: sortedClothesType = {
        outer: [],
        top: [],
        bottom: [],
        shoes: [],
        bag: [],
        acc: [],
    };
    for (var i = 0; i < clothes.length; i++) {
        const value = clothes[i];
        sortedClothes[OUTFITS[value].sort.toLowerCase()].push(value);
    }
    return sortedClothes;
};

/**
 * 체감 기온별 옷차림 추천
 *
 * @param windChill 체감 온도
 * @param answer    normal/sensitive_to_heat/sensitive_to_cold
 * @param result    return 해야하는 Obj
 * @return newResult    기온별 옷차림 Obj
 *
 */
const getRecommendedOutfitsByWeather = (
    windChill: number,
    answer: string | string[] | undefined,
    result: recommndedOutfitListType
) => {
    let newResult = result;
    if (typeof answer === 'string') {
        if (windChill >= 28) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[1][answer];
        } else if (windChill >= 23 && 27 > windChill) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[2][answer];
        } else if (windChill >= 20 && 22 > windChill) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[3][answer];
        } else if (windChill >= 17 && 19 > windChill) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[4][answer];
        } else if (windChill >= 12 && 16 > windChill) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[5][answer];
        } else if (windChill >= 9 && 11 > windChill) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[6][answer];
        } else if (windChill >= 5 && 8 > windChill) {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[7][answer];
        } else {
            newResult['outfits']['recmd'] = RECOMMENDED_DATA.WEATHER_OUTFITS_RECMD[8][answer];
        }
    }

    return newResult;
};

/**
 * 체감 온도 계산
 *
 * @param temp 기온
 * @param reh  습도 %
 * @param wsd  풍속 m/s
 * @return result 체감온도
 *
 */
const getSensibleTemp = (temp: number, reh: number, wsd: number) => {
    const month = getCurrentSeason();

    if (month >= 5 && month <= 9) {
        return getInSummer(temp, reh);
    } else {
        return getWindChill(temp, wsd);
    }
};

/**
 * 현재 달
 * @return month 현재 달
 *
 */
const getCurrentSeason = () => {
    const toady = new Date();
    const month = toady.getMonth() + 1;
    return month;
};

/**
 * 겨울 체감온도
 * @param temp 기온
 * @param windSpeed 풍속 m/s
 * @return Number(result.toFixed(1)) 체감온도
 */
export const getWindChill = (temp: number, windSpeed: number) => {
    if (10 < temp && windSpeed > 1.3) {
        return windSpeed;
    }
    const windSpeedKmS: number = windSpeed * 3.6;

    let result =
        13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeedKmS, 0.16) + 0.3965 * Math.pow(windSpeedKmS, 0.16) * temp;

    return Number(result.toFixed(1));
};

/**
 * 여름 체감온도
 * @param temp 기온
 * @param reh 습도 %
 * @return Number(result.toFixed(1)) 체감온도
 */
const getInSummer = (temp: number, reh: number) => {
    const tw = getTw(temp, reh);

    const result = -0.2442 + 0.55399 * tw + 0.45535 * temp - 0.0022 * Math.pow(tw, 2.0) + 0.00278 * tw * temp + 3.0;

    return Number(result.toFixed(1));
};

/**
 * 습구온도 계산공식
 *
 * @param temp 온도
 * @param reh 상대습도
 * @return result 습구온도
 */
const getTw = (temp: number, reh: number) => {
    return (
        temp * Math.atan(0.151977 * Math.pow(reh + 8.313659, 0.5)) +
        Math.atan(temp + reh) -
        Math.atan(reh - 1.67633) +
        0.00391838 * Math.pow(reh, 1.5) * Math.atan(0.023101 * reh) -
        4.686035
    );
};

/**
 *
 *
 * @param tempArr
 * @return resultObj
 */
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

/**
 * 강수형태 코드를 텍스트로 가져오기
 *
 * @param obsrValue 강수형태코드
 * @return result 강수형태 텍스트
 */
export const getPty = (obsrValue: string) => {
    return CMM_CODE.PTY[obsrValue];
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
// 1410 < 1626 < 1710
/**
 * baseTime 단기예보를 위한 basTime 시간 가져오기
 *
 * @return result {curr : 현재시간 기준 정시,
 *                 close : 현재시간과 가까운 정시,
 *                 smaller: close시간보다 한시간 전인 정시 }
 */
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

/**
 * baseTime 시간을 단기예보 조회 param으로 보내기 위한 정시 bastime 스트링으로 변환
 *
 * @param baseTime 시간
 * @return result 시간을 string으로 변환
 */
const formatToBaseTimeStr = (baseTime: number) => {
    const baseTimeStr = baseTime.toString();
    let result: string;

    if (baseTimeStr.length === 3) {
        result = '0' + baseTimeStr.substring(0, 1) + '00';
    } else {
        result = baseTimeStr.substring(0, 2) + '00';
    }

    return result;
};

/**
 * n 보다 작은 숫자 구하기
 * @param baseTime
 * @param n 타겟 숫자
 *
 * @return result n 보다 작은 숫자
 */
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

/**
 * 가까운 숫자 구하기
 * @param array 숫자 후보 배열
 * @param n 타겟 숫자
 *
 * @return array[indexOfMin] 가까운 숫자
 */
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

/**
 * 오늘 yyyymmdd
 *
 * @return yyyymmdd
 */
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

/**
 * 위경도를 XY 좌표로, XY 좌표를 위경도로 변환
 *
 * @param code 'toXY' / ''
 * @param v1 위도 혹은 X 좌표
 * @param v2 경도 혹은 Y 좌표
 * @return rs 위경도 ,혹은 xy 좌표 obj
 */
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
