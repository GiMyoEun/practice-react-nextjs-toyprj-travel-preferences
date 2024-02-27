export const CMM_CODE: {
    [key: string]: {
        [key: string]: string;
    };
} = {
    PTY: {
        0: '없음',
        1: '비',
        2: '비와 눈',
        3: '눈',
        4: '소나기',
        5: '빗방울',
        6: '빗방울눈날림',
        7: '눈날림',
    },
};

export const NCST_DATA: { [key: string]: { name: string; unit: string } } = {
    POP: {
        name: '강수확률',
        unit: '%',
    },
    PTY: {
        name: '강수형태',
        unit: '코드값',
    },
    PCP: {
        name: '1시간 강수량',
        unit: '범주 (1 mm)',
    },
    REH: {
        name: '습도',
        unit: '%',
    },
    RN1: {
        name: '1시간 강수량',
        unit: 'mm',
    },
    T1H: {
        name: '기온',
        unit: '℃',
    },
    UUU: {
        name: '풍속(동서성분)',
        unit: 'm/s',
    },
    VEC: {
        name: '풍향',
        unit: 'deg',
    },
    VVV: {
        name: '풍속(남북성분)',
        unit: 'm/s',
    },
    WSD: {
        name: '풍속',
        unit: 'm/s',
    },

    WAV: {
        name: '파고',
        unit: 'M',
    },

    SNO: {
        name: '1시간 신적설',
        unit: '범주(1 cm)',
    },
    SKY: {
        name: '하늘상태',
        unit: '',
    },
    LGT: {
        name: '낙뢰',
        unit: 'kA(킬로암페어)',
    },

    TMP: {
        name: '1시간 기온',
        unit: '℃',
    },
    TMN: {
        name: '일 최저기온',
        unit: '℃',
    },
    TMX: {
        name: '일 최고기온',
        unit: '℃',
    },
};
