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
    RAIN: {
        1: '약한 ',
        2: '',
        3: '강한 ',
        4: '매우 강한 ',
    },
    WIND: {
        1: '바람이 조금 불어요',
        2: '바람이 조금 강하게 불어요',
        3: '바람이 강하게 불어요',
        4: '바람이 매우 강하게 불어요',
    },
    DI: {
        1: '쾌적한 날이에요',
        2: '다소 습한 날이에요',
        3: '불쾌지수가 높아요',
        4: '불쾌지수가 매우 높아요',
        5: '좀 건조한 날이네요',
    },
    OUTFITS: {
        OUTER: '아우터',
        TOP: '상의',
        BOTTOM: '하의',
        SHOES: '신발',
        BAG: '가방',
        ACC: '악세사리',
    },

    MTR: {
        COTTON: '면', // 잘마르는
        LN: '린넨',
        POLY: '폴리에스테르', // 바웃효과
        SILK: '실크', // 비X,
        MA: '마', // 비X,
        MZ: '모직', //눈, 비 손상
        DN: '데님', // 더우면 피하기,
        KNIT: '니트',
    },
};

export const OUTFITS: {
    [key: string]: {
        [key: string]: string;
    };
} = {
    SLV: {
        name: '민소매',
        sort: 'TOP',
    },
    S_SLV: {
        name: '반팔 티셔츠',
        sort: 'TOP',
    },
    THIN_SHIRT: {
        name: '얇은 셔츠',
        sort: 'TOP',
    },
    THN_CRD: {
        name: '얇은 가디건',
        sort: 'OUTER',
    },
    CRD: {
        name: '가디건',
        sort: 'OUTER',
    },
    L_SLV: {
        name: '긴팔 티셔츠',
        sort: 'TOP',
    },
    JCK: {
        name: '자켓',
        sort: 'OUTER',
    },
    TRN_CT: {
        name: '트랜치 코트',
        sort: 'OUTER',
    },
    JMP: {
        name: '점퍼',
        sort: 'OUTER',
    },
    W_COAT: {
        name: '울코트',
        sort: 'OUTER',
    },
    T_COAT: {
        name: '두꺼운 코트',
        sort: 'OUTER',
    },
    PADD: {
        name: '패딩',
        sort: 'OUTER',
    },
    QLT: {
        name: '누빔',
        sort: 'OUTER',
    },
    HTT: {
        name: '히트텍',
        sort: 'TOP',
    },
    KNIT: {
        name: '니트',
        sort: 'TOP',
    },
    MTM: {
        name: '맨투맨',
        sort: 'TOP',
    },
    HOOD: {
        name: '후드티',
        sort: 'TOP',
    },
    F_HOOD: {
        name: '기모 후드티',
        sort: 'TOP',
    },
    F_MTM: {
        name: '기모 맨투맨',
        sort: 'TOP',
    },

    SHR: {
        name: '반바지',
        sort: 'BOTTOM',
    },
    SHR_SKR: {
        name: '짧은 치마',
        sort: 'BOTTOM',
    },
    SLCKS: {
        name: '슬랙스',
        sort: 'BOTTOM',
    },
    L_PNTS: {
        name: '긴바지',
        sort: 'BOTTOM',
    },
    LN_PNTS: {
        name: '린넨 긴바지',
        sort: 'BOTTOM',
    },
    JEANS: {
        name: '청바지',
        sort: 'BOTTOM',
    },
    F_PNTS: {
        name: '기모바지',
        sort: 'BOTTOM',
    },
    STK: {
        name: '스타킹',
        sort: 'ACC',
    },
    MFLR: {
        name: '목도리',
        sort: 'ACC',
    },
    K_HAT: {
        name: '니트 모자',
        sort: 'ACC',
    },
    HAT: {
        name: '모자',
        sort: 'ACC',
    },
    SNK: {
        name: '운동화',
        sort: 'SHOES',
    },
    L_SHOES: {
        name: '가죽구두',
        sort: 'SHOES',
    },
    SND: {
        name: '샌들',
        sort: 'SHOES',
    },
    SWD_SHOES: {
        name: '스웨이드',
        sort: 'SHOES',
    },
    BOOTS: {
        name: '장화',
        sort: 'SHOES',
    },

    F_BOOTS: {
        name: '털부츠',
        sort: 'SHOES',
    },
    TTB: {
        name: '토트백', //눈길에 ,
        sort: 'BAG',
    },
    CRS_BACK: {
        name: '크로스백',
        sort: 'BAG',
    },
    UMB: {
        name: '우산',
        sort: 'ACC',
    },
    GLVS: {
        name: '장갑',
        sort: 'ACC',
    },
};

export const RECOMMENDED_DATA: {
    [key: string]: {
        [key: string]: {
            [key: string]: string[];
        };
    };
} = {
    RAIN: {
        SUMMER: {
            rcmd: ['UMB', 'BOOTS'],
            unrcmd: ['L_SHOES', 'SWD_SHOES', 'SNK'],
            check: ['JEANS', 'KNIT'],
        },
        WINTER: {
            rcmd: ['UMB', 'BOOTS'],
            unrcmd: ['L_SHOES', 'SWD_SHOES', 'SNK'],
            check: ['W_COAT', 'JEANS', 'KNIT'],
        },
    },
    SNOW: {
        WINTER: {
            rcmd: ['UMB'],
            unrcmd: ['L_SHOES', 'SWD_SHOES', 'SNK', 'F_BOOTS'],
            check: ['W_COAT', 'JEANS', 'KNIT'],
        },
    },

    //체감 기온별로
    WEATHER_OUTFITS_RECMD: {
        1: {
            //'28℃ 이상'
            normal: ['SLV', 'S_SLV', 'SHR', 'SHR_SKR', 'SND'],
            sensitive_to_heat: ['SLV', 'S_SLV', 'SHR', 'SHR_SKR', 'SND'],
            sensitive_to_cold: ['SLV', 'S_SLV', 'SHR', 'THIN_SHIRT', 'THN_CRD', 'SHR_SKR', 'SND', 'LN_PNTS'],
        },
        2: {
            //'23℃ ~ 27℃'
            normal: ['S_SLV', 'THIN_SHIRT', 'SHR', 'SHR_SKR'],
            sensitive_to_heat: ['SLV', 'S_SLV', 'SHR', 'SHR_SKR', 'SND'],
            sensitive_to_cold: ['S_SLV', 'THIN_SHIRT', 'THN_CRD', 'SHR', 'SHR_SKR', 'LN_PNTS'],
        },
        3: {
            //'20℃ ~ 22℃'
            normal: ['L_SLV', 'L_PNTS', 'SLCKS'],
            sensitive_to_heat: ['L_SLV', 'S_SLV', 'L_PNTS', 'SLCKS'],
            sensitive_to_cold: ['L_SLV', 'L_PNTS', 'SLCKS'],
        },
        4: {
            //'17℃ ~ 19℃'
            normal: ['THN_CRD', 'KNIT', 'MTM', 'HOOD', 'L_PNTS'],
            sensitive_to_heat: ['THN_CRD', 'KNIT', 'MTM', 'HOOD', 'L_SLV', 'L_PNTS'],
            sensitive_to_cold: ['THN_CRD', 'KNIT', 'MTM', 'HOOD', 'L_PNTS'],
        },
        5: {
            //'12℃ ~ 16℃'
            normal: ['JCK', 'CRD', 'KNIT', 'STK', 'JEANS'],
            sensitive_to_heat: ['JCK', 'CRD', 'KNIT', 'STK', 'JEANS'],
            sensitive_to_cold: ['JMP', 'JCK', 'CRD', 'KNIT', 'MTM', 'HOOD', 'STK', 'JEANS'],
        },
        6: {
            //9℃ ~ 11℃
            normal: ['W_COAT', 'KNIT', 'MTM', 'HOOD', 'L_PNTS', 'JEANS'],
            sensitive_to_heat: ['T_COAT', 'W_COAT', 'JMP', 'L_SLV', 'STK', 'JEANS'],
            sensitive_to_cold: ['T_COAT', 'W_COAT', 'JMP', 'HTT', 'KNIT', 'MTM', 'HOOD', 'F_MTM', 'F_HOOD', 'F_PNTS'],
        },
        7: {
            //5℃ ~ 8℃
            normal: ['PADD', 'T_COAT', 'QLT', 'KNIT', 'MTM', 'HOOD', 'L_PNTS', 'JEANS', 'MFLR'],
            sensitive_to_heat: ['T_COAT', 'QLT', 'W_COAT', 'JMP', 'MTM', 'HOOD', 'L_SLV', 'L_PNTS', 'JEANS'],
            sensitive_to_cold: [
                'PADD',
                'T_COAT',
                'QLT',
                'HTT',
                'KNIT',
                'F_MTM',
                'F_HOOD',
                'F_PNTS',
                'JEANS',
                'MFLR',
                'K_HAT',
                'GLVS',
            ],
        },
        8: {
            //5℃ 이하
            normal: ['PADD', 'T_COAT', 'QLT', 'HTT', 'KNIT', 'F_MTM', 'F_HOOD', 'F_PNTS', 'MFLR', 'K_HAT', 'GLVS'],
            sensitive_to_heat: [
                'PADD',
                'T_COAT',
                'QLT',
                'HTT',
                'KNIT',
                'MTM',
                'HOOD',
                'F_MTM',
                'F_HOOD',
                'L_PNTS',
                'F_PNTS',
                'MFLR',
                'K_HAT',
                'GLVS',
            ],
            sensitive_to_cold: [
                'PADD',
                'T_COAT',
                'QLT',
                'HTT',
                'KNIT',
                'F_MTM',
                'F_HOOD',
                'F_PNTS',
                'MFLR',
                'K_HAT',
                'GLVS',
            ],
        },
    },

    WEATHER_MTR_RECMD: {
        1: {
            normal: ['SLV', 'S_SLV', 'SHR', 'SHR_SKR', 'SND'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        2: {
            normal: ['S_SLV', 'SHR', 'SHR_SKR'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        3: {
            normal: ['L_SLV', 'L_PNTS', 'SLCKS'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        4: {
            normal: ['THN_CRD', 'KNIT', 'MTM', 'HOOD', 'L_PNTS'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        5: {
            normal: ['JCK', 'CRD', 'KNIT', 'STK', 'JEANS'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        6: {
            normal: ['TRN_CT', 'JMP', 'STK', 'F_PNTS'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        7: {
            normal: ['W_COAT', 'HTT', 'F_PNTS'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
        8: {
            normal: ['PADD', 'T_COAT', 'QLT', 'MFLR', 'K_HAT'],
            sensitive_to_heat: [],
            sensitive_to_cold: [],
        },
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
