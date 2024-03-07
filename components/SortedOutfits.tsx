import CheckBox from '@/UI/CheckBox';
import { selectedOutfitsState } from '@/public/resources/constants/state';
import { OUTFITS } from '@/public/resources/data/ncst';
import { useRecoilState } from 'recoil';

const SortedOutfits = (props: { title: string; outfitArr: string[] }) => {
    const [selected, setSelected] = useRecoilState<{ [key: string]: boolean }>(selectedOutfitsState);

    // let sortedClothesCode: string[] = [];
    // // 정렬
    // let sortedClothes = props.outfitArr.map((clothe: string) => {
    //     return OUTFITS[clothe]['name'];
    // });
    // sortedClothes.sort();

    return (
        <>
            <div className="h-[270px]">
                <h1 className="text-left text-[20px] font-bold mb-2 mt-2">{props.title}</h1>
                {props.outfitArr.map((clothe: string) => (
                    <CheckBox
                        key={clothe}
                        item={{
                            label: OUTFITS[clothe].name,
                            checked: selected[clothe] || false,
                            clothe: clothe,
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default SortedOutfits;
