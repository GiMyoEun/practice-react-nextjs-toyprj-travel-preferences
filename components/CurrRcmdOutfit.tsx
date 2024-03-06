import { OUTFITS } from '@/public/resources/data/ncst';
import {
    currTempRcmdOutfitConent,
    currTempRcmdOutfitSortType,
    currTempRcmdOutfitText,
    currTempRcmdOutfitTextEnd,
} from '@/styles/styles';

const CurrRcmdOutfit = (props: { outfitArr: string[]; sortType: string }) => {
    // 정렬
    let sortedClothes = props.outfitArr.map((clothe: string) => {
        return OUTFITS[clothe]['name'];
    });
    sortedClothes.sort();

    return (
        <>
            {props.outfitArr.length > 0 && (
                <div className={currTempRcmdOutfitConent}>
                    <p className={currTempRcmdOutfitSortType}>{props.sortType}</p>
                    {sortedClothes.map((value: string, index: number) => {
                        if (index === props.outfitArr.length - 1) {
                            return (
                                <p key={value} className={currTempRcmdOutfitText}>
                                    {value}
                                </p>
                            );
                        } else {
                            return (
                                <p key={value} className={currTempRcmdOutfitTextEnd}>
                                    {value},
                                </p>
                            );
                        }
                    })}
                </div>
            )}
        </>
    );
};

export default CurrRcmdOutfit;
