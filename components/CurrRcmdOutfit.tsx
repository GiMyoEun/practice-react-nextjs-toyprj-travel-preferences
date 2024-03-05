import { OUTFITS } from '@/public/resources/data/ncst';
import {
    currTempRcmdOutfitConent,
    currTempRcmdOutfitSortType,
    currTempRcmdOutfitText,
    currTempRcmdOutfitTextEnd,
} from '@/styles/styles';

const CurrRcmdOutfit = (props: { outfitArr: string[]; sortType: string }) => {
    return (
        <>
            {props.outfitArr.length > 0 && (
                <div className={currTempRcmdOutfitConent}>
                    <p className={currTempRcmdOutfitSortType}>{props.sortType}</p>
                    {props.outfitArr.map((value: string, index: number) => {
                        if (index === props.outfitArr.length - 1) {
                            return (
                                <p key={value} className={currTempRcmdOutfitText}>
                                    {OUTFITS[value]['name']}
                                </p>
                            );
                        } else {
                            return (
                                <p key={value} className={currTempRcmdOutfitTextEnd}>
                                    {OUTFITS[value]['name']},{' '}
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
