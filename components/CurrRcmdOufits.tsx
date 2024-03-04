import { getSortedClothes } from '@/public/resources/common';
import { sortedClothesType } from '@/public/resources/constants/type';
import { OUTFITS } from '@/public/resources/data/ncst';
import CurrRcmdOutfit from './CurrRcmdOutfit';

const CurrRcmdOutfits = (props: { sortedClothes: string[] }) => {
    const newSortedClothes: sortedClothesType = getSortedClothes(props.sortedClothes);

    return (
        <>
            <div className="text-[13px] mt-0 flex flex-col text-green-950 pt-2 font-bold text-left">
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
