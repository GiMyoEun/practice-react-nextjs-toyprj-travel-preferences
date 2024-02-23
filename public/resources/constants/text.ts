import { RecommendedOutfitType } from './type';
import {
    recommendedOutfitsContentOrange,
    recommendedOutfitsContentRed,
    recommendedOutfitsContentAmber,
    recommendedOutfitsContentLime,
} from '@/styles/styles';

export const RECOMMENDED_OUTFITS: RecommendedOutfitType[] = [
    {
        id: 'DEGREE_28',
        degree: '28℃ 이상',
        outfits: ['민소매', '반팔', '반바지', '짧은 치마', '린넨 옷'],
        class: recommendedOutfitsContentRed,
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_23',
        degree: '23℃ ~ 27℃',
        outfits: ['반팔', '얇은 셔츠', '반바지', '면바지'],
        class: recommendedOutfitsContentOrange,
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_20',
        degree: '20℃ ~ 22℃',
        outfits: ['블라우스', '긴팔 티', '면바지', '슬랙스'],
        class: recommendedOutfitsContentAmber,
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_17',
        degree: '17℃ ~ 19℃',
        outfits: ['얇은 가디건', '니트', '맨투맨', '후드', '긴 바지'],
        class: recommendedOutfitsContentLime,
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_12',
        degree: '12℃ ~ 16℃',
        outfits: ['자켓', '가디건', '청자켓', '니트', '스타킹', '청바지'],
        class: ' bg-red-300',
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_9',
        degree: '9℃ ~ 11℃',
        outfits: ['트렌치코트', '야상', '점퍼', '스타킹', '기모바지'],
        class: ' bg-red-300',
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_5',
        degree: '5℃ ~ 8℃',
        outfits: ['울 코트', '히트텍', '가죽 옷', '기모'],
        class: ' bg-red-300',
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
    {
        id: 'DEGREE_4',
        degree: '4℃ 이하',
        outfits: ['패딩', '두꺼운 코트', '누빔 옷', '기모', '목도리'],
        class: ' bg-red-300',
        img: ['/resources/img/sleeveless.png', '/resources/img/shorts.png'],
    },
];

export const PRE_QUESTION = [
    {
        value: 'SENSITIVE_TO_COLD',
        title: '추위를 많이 타요',
    },
    {
        value: 'SENSITIVE_TO_HEAT',
        title: '더위를 많이 타요',
    },
    {
        value: 'NORMAL',
        title: '보통이에요',
    },
];
