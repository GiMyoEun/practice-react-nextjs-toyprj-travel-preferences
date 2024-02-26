import { useRouter } from 'next/router';

import BgImgContent from '@/UI/BgImgContent';
import BgImgQuestion from '@/UI/BgImgQuestion';

import RecommendedOutfits from '@/components/RecommendedOutfits';
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
                <RecommendedOutfits type="ONE" />
                <BgImgBtn onClickBtn={() => {}} title="목록" />
            </BgImgContent>
        </>
    );
};

export default Recommendation;
