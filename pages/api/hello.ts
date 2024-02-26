// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBaseDate, getBaseTime, getCurrPosition } from '@/public/resources/common';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ name: 'John Doe' });
}

//❍단기예보
//- Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
//- API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10

export const fetchVillageFcstInfo = async () => {
    const baseTime = getBaseTime();
    const baseDate = getBaseDate();

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const result = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            var XMLHttpRequest = require('xhr2');
            var xhr = new XMLHttpRequest();
            var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
            var queryParams =
                '?' +
                encodeURIComponent('serviceKey') +
                '=jvcvbJlBsGUPo2UoZ8kaC%2FNxLfVR1457Pk%2FR6Irl9iNtR%2BwF0lpZ9yHXq7y7CtSrzLEfekl1eOtchLSOiIPG2Q%3D%3D'; /* Service Key*/
            queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지번호*/
            queryParams +=
                '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /*한페이지 결과 수*/
            queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입*/
            queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDate); /*발표일자*/
            queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(baseTime); /*발표시각*/
            queryParams +=
                '&' +
                encodeURIComponent('nx') +
                '=' +
                encodeURIComponent(Math.ceil(result!.latitude)); /*예보지점 X 좌표*/
            queryParams +=
                '&' +
                encodeURIComponent('ny') +
                '=' +
                encodeURIComponent(Math.ceil(result!.longitude)); /*예보지점 Y좌표*/
            xhr.open('GET', url + queryParams);

            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    const result = JSON.parse(this.responseText);

                    const resultArr: [] = result.response.body.items.item;

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
                }
            };

            xhr.send('');

            resolve(result);
        });
    });
};
