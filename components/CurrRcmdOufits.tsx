import { getSortedClothes } from '@/public/resources/common';
import { sortedClothesType } from '@/public/resources/constants/type';
import CurrRcmdOutfit from './CurrRcmdOutfit';
import { currTempRcmdOutfitsInnerConent } from '@/styles/styles';

const CurrRcmdOutfits = (props: { sortedClothes: string[] }) => {
    const newSortedClothes: sortedClothesType = getSortedClothes(props.sortedClothes);

    return (
        <>
            <div className={currTempRcmdOutfitsInnerConent}>
                <CurrRcmdOutfit outfitArr={newSortedClothes.outer} sortType="아우터" />
                <CurrRcmdOutfit outfitArr={newSortedClothes.top} sortType="상의" />
                <CurrRcmdOutfit outfitArr={newSortedClothes.bottom} sortType="하의" />
                <CurrRcmdOutfit outfitArr={newSortedClothes.shoes} sortType="신발" />
                <CurrRcmdOutfit outfitArr={newSortedClothes.bag} sortType="가방" />
                <CurrRcmdOutfit outfitArr={newSortedClothes.acc} sortType="악세서리" />
            </div>
        </>
    );
};

export default CurrRcmdOutfits;
