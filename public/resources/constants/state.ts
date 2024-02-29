import { atom } from 'recoil';

export const answerState = atom({
    key: 'answerState',
    default: '',
});

export const alertState = atom({
    key: 'alertState',
    default: {
        title: '',
        discription: '',
        showAlert: false,
    },
});

export const temperatureState = atom({
    key: 'temperatureState',
    default: {
        isReady: false,
        windChill: 0, // 체감온도
        reh: 0, // 습도
        wsd: 0, // 풍속
        tmp: 0, // 기온
        pcp: 0, // 강수량
        pop: 0, // 강수확률
        pty: '', // 강수형태
    },
});

export const weatherReportState = atom({
    key: 'weatherReportState',
    default: {
        isReady: false,
        rain: '',
        di: '',
        wind: '',
    },
});

export const oufitsState = atom({
    key: 'oufitsState',
    default: {
        isReady: false,
        outfits: [''],
        mtr: [''],
    },
});
