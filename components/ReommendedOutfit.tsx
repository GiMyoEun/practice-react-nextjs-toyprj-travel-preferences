import {
    recommendedOutfitsDiscription,
    recommendedOutfitsImg,
    recommendedOutfitsInnerContent,
    recommendedOutfitsTitle,
} from '@/styles/styles';
import { ReactNode } from 'react';

const RecommendedOutfit = (props: { className: string; title: string; src: string[]; discription: ReactNode }) => {
    return (
        <div className={props.className}>
            <div className={recommendedOutfitsInnerContent}>
                <h3 className={recommendedOutfitsTitle}>{props.title}</h3>
                {props.src.map((item: string) => {
                    return (
                        <div className={recommendedOutfitsImg}>
                            <img src={item} />
                        </div>
                    );
                })}

                <div className={recommendedOutfitsDiscription}>{props.discription}</div>
            </div>
        </div>
    );
};

export default RecommendedOutfit;
