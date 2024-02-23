import { useRouter } from 'next/router';
import Proceeding from '@/UI/Proceeding';
import BgImgContent from '@/UI/BgImgContent';
import BgImgQuestion from '@/UI/BgImgQuestion';

import RecommendedOutfit from '@/components/ReommendedOutfit';
import { RECOMMENDED_OUTFITS } from '@/public/resources/constants/text';
import { RecommendedOutfitType } from '@/public/resources/constants/type';
import BgImgBtn from '@/UI/BgImgBtn';

// our-domain.com/news/something-important

const Recommendation = () => {
    const router = useRouter();

    const answer = router.query.answer;

    const contentClass =
        'align-baseline text-center object-center h-svh bg-center bg-no-repeat bg-cover border-transparent pt-14';

    return (
        <>
            <BgImgContent url='url("/resources/img/cloud.jpg")' class={contentClass}>
                {/* <Proceeding title="열심히 찾고있어요" /> */}
                <BgImgQuestion title="기온별 옷차림이에요" />
                {RECOMMENDED_OUTFITS.map((item: RecommendedOutfitType, idx: number) => {
                    if (idx >= 0 && idx < 4) {
                        return (
                            <RecommendedOutfit
                                key={item.degree}
                                className={item.class}
                                title={item.degree}
                                src={item.img}
                                discription={
                                    <p>
                                        {item.outfits.map((outfit: string) => (
                                            <>
                                                {outfit}
                                                <br />
                                            </>
                                        ))}
                                    </p>
                                }
                            />
                        );
                    }
                })}
                <BgImgBtn onClickBtn={() => {}} title="목록" />
            </BgImgContent>
        </>
    );
};

export default Recommendation;
