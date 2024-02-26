import { resolve } from 'path';

export const getCurrPosition = async () => {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const result = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
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
    const currTime = Number(hours.toString() + minutes.toString());
    let result: string = getCloseNumber(baseTime, currTime).toString();
    if (result.length === 3) {
        result = '0' + result;
    }
    result = result.substring(0, 2) + '00';

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

    return array[indexOfMin].toString();
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
