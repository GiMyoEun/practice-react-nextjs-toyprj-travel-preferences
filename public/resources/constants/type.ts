export type RecommendedOutfitType = {
    id: string;
    degree: string;
    outfits: string[];
    class: string;
    img: string[];
};

export type temptType = {
    baseDate: string;
    baseTime: string;
    category: string;
    nx: number;
    ny: number;
    obsrValue: string;
};

export type temperatureStateType = {
    isReady: boolean;
    windChill: number; // 체감온도
    reh: number; // 습도
    wsd: number; // 풍속
    tmp: number; // 기온
    pcp: number; // 강수량
    pop: number; // 강수확률
    pty: string; // 강수형태
};

export type recommndedOutfitListType = {
    outfits: {
        recmd: string[];
    };
    mtr: {
        recmd: string[];
    };
};
