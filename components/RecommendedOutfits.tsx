import { RECOMMENDED_OUTFITS } from '@/public/resources/constants/text';
import { RecommendedOutfitType } from '@/public/resources/constants/type';
import RecommendedOutfit from './ReommendedOutfit';

const RecommendedOutfits = (props: { type: string }) => {
    return (
        <>
            {props.type === 'ONE' &&
                RECOMMENDED_OUTFITS.map((item: RecommendedOutfitType, idx: number) => {
                    if (idx < 4) {
                        return (
                            <RecommendedOutfit
                                key={item.degree}
                                className={item.class}
                                title={item.degree}
                                src={item.img}
                                discription={
                                    <>
                                        {item.outfits.map((outfit: string) => (
                                            <p key={outfit}>
                                                {outfit}
                                                <br />
                                            </p>
                                        ))}
                                    </>
                                }
                            />
                        );
                    }
                })}
            {props.type === 'TWO' &&
                RECOMMENDED_OUTFITS.map((item: RecommendedOutfitType, idx: number) => {
                    if (idx < 4) {
                        return (
                            <RecommendedOutfit
                                key={item.degree}
                                className={item.class}
                                title={item.degree}
                                src={item.img}
                                discription={
                                    <>
                                        {item.outfits.map((outfit: string) => (
                                            <p key={outfit}>
                                                {outfit}
                                                <br />
                                            </p>
                                        ))}
                                    </>
                                }
                            />
                        );
                    }
                })}
        </>
    );
};

export default RecommendedOutfits;
