import { OUTFITS } from '@/public/resources/data/ncst';

const CurrRcmdOutfit = (props: { outfitArr: string[]; sortType: string }) => {
    return (
        <>
            {props.outfitArr.length > 0 && (
                <div className="flex w-auto">
                    <p className="text-[15px] w-20 ml-[5px]">{props.sortType}</p>
                    {props.outfitArr.map((value: string, index: number) => {
                        if (index === props.outfitArr.length - 1) {
                            return <p className="flex mr-[5px]">{OUTFITS[value]['name']}</p>;
                        } else {
                            return <p className="flex mr-[2px]">{OUTFITS[value]['name']}, </p>;
                        }
                    })}
                </div>
            )}
        </>
    );
};

export default CurrRcmdOutfit;
