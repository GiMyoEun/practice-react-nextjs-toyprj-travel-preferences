import CheckBox from '@/UI/CheckBox';
import { OUTFITS } from '@/public/resources/data/ncst';

const SortedOutfits = (props: { title: string; outfitArr: string[] }) => {
    // let sortedClothesCode: string[] = [];
    // // 정렬
    // let sortedClothes = props.outfitArr.map((clothe: string) => {
    //     return OUTFITS[clothe]['name'];
    // });
    // sortedClothes.sort();

    return (
        <>
            <div className="h-[230px]">
                <h1 className="text-left text-[20px] font-bold mb-2 mt-2">{props.title}</h1>
                {props.outfitArr.map((clothe: string) => (
                    <CheckBox key={clothe} label={OUTFITS[clothe].name} />
                ))}
            </div>
        </>
    );
};

export default SortedOutfits;
