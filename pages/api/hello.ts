// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { analyzeTempt, getBaseDate, getBaseTime, getCurrPosition } from '@/public/resources/common';
import { temptType } from '@/public/resources/constants/type';
import { NCST_DATA } from '@/public/resources/data/ncst';
import { rejects } from 'assert';
import type { NextApiRequest, NextApiResponse } from 'next';
import { type } from 'os';

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ name: 'John Doe' });
}

export const getVillageFcstInfo = async () => {
    const baseTime = getBaseTime();
    const baseDate = getBaseDate();
    const loaction: {
        latitude: number;
        longitude: number;
    } = await getCurrPosition();

    let result = await requestVillageFcstInfo(baseTime.curr, baseDate, loaction);

    if (result == null) {
        result = await requestVillageFcstInfo(baseTime.close, baseDate, loaction);
    }

    if (result === null) {
        console.log('small');
        result = await requestVillageFcstInfo(baseTime.smaller, baseDate, loaction);
    }
    if (result === null) {
        console.log('init');
        result = await requestVillageFcstInfo('0200', baseDate, loaction);
    }

    if (result) {
        return analyzeTempt(result);
    } else {
        return null;
    }
};

//❍단기예보
//- Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
//- API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10

export const requestVillageFcstInfo = async (
    baseTime: string,
    baseDate: string,
    location: {
        latitude: number;
        longitude: number;
    }
) => {
    console.log('base time : ' + baseTime);
    return new Promise<
        | {
              baseDate: string;
              baseTime: string;
              category: string;
              nx: number;
              ny: number;
              obsrValue: string;
          }[]
        | null
    >((resolve) => {
        let result;
        var XMLHttpRequest = require('xhr2');
        var xhr = new XMLHttpRequest();
        var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
        var queryParams =
            '?' +
            encodeURIComponent('serviceKey') +
            '=jvcvbJlBsGUPo2UoZ8kaC%2FNxLfVR1457Pk%2FR6Irl9iNtR%2BwF0lpZ9yHXq7y7CtSrzLEfekl1eOtchLSOiIPG2Q%3D%3D'; /* Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지번호*/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /*한페이지 결과 수*/
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입*/
        queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDate); /*발표일자*/
        queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(baseTime); /*발표시각*/
        queryParams +=
            '&' +
            encodeURIComponent('nx') +
            '=' +
            encodeURIComponent(location!.latitude.toString()); /*예보지점 X 좌표*/
        queryParams +=
            '&' +
            encodeURIComponent('ny') +
            '=' +
            encodeURIComponent(location!.longitude.toString()); /*예보지점 Y좌표*/
        xhr.open('GET', url + queryParams);

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                const result = JSON.parse(this.responseText);

                if (undefined !== result.response.body && undefined !== result.response.body.items) {
                    const resultArr: temptType[] = result.response.body.items.item;
                    resolve(resultArr);
                } else {
                    resolve(null);
                }
            } else {
            }
        };

        xhr.send('');
    });
};
