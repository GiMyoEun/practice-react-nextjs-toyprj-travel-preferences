import CheckBox from '@/UI/CheckBox';
import { getSortedClothes } from '@/public/resources/common';
import { sortedClothesType } from '@/public/resources/constants/type';
import { OUTFITS } from '@/public/resources/data/ncst';
import SortedOutfits from './SortedOutfits';
import { useState } from 'react';
import BgImgBtn from '@/UI/BgImgBtn';

const SelectOutfits = () => {
    const [show, setShow] = useState<number>(1);

    let allOutfits: string[] = [];
    for (var key in OUTFITS) {
        allOutfits.push(key);
    }

    // 정렬
    const newSortedClothes: sortedClothesType = getSortedClothes(allOutfits);

    return (
        <div className="h-[340px]">
            {show === 1 && newSortedClothes.outer && (
                <SortedOutfits title="아우터" outfitArr={newSortedClothes.outer} />
            )}
            {show === 2 && newSortedClothes.top && <SortedOutfits title="상의" outfitArr={newSortedClothes.top} />}
            {show === 3 && newSortedClothes.bottom && (
                <SortedOutfits title="하의" outfitArr={newSortedClothes.bottom} />
            )}
            {show === 4 && newSortedClothes.shoes && <SortedOutfits title="신발" outfitArr={newSortedClothes.shoes} />}
            {show === 5 && newSortedClothes.bag && <SortedOutfits title="가방" outfitArr={newSortedClothes.bag} />}
            {show === 6 && newSortedClothes.acc && <SortedOutfits title="악세서리" outfitArr={newSortedClothes.acc} />}
            <div className="flex mt-6">
                <div className="flex mx-auto">
                    <BgImgBtn
                        class="flex"
                        onClickBtn={() => {
                            if (show !== 1) {
                                setShow((prev) => prev - 1);
                            }
                        }}
                        title="<"
                    />
                    <BgImgBtn
                        class="flex ml-2"
                        onClickBtn={() => {
                            if (show !== 6) {
                                setShow((prev) => prev + 1);
                            }
                        }}
                        title=">"
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectOutfits;
