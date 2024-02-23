import BgImgContent from '@/UI/BgImgContent';
import BgImgBtn from '@/UI/BgImgBtn';
import InnerContent from '@/UI/InnerContent';

export default function Home() {
    const changeUrlHandler = () => {};

    return (
        <>
            <BgImgContent url='url("/resources/img/cloud.jpg")'>
                <InnerContent
                    title="What should I wear?"
                    description="오늘의 기온에 맞는 옷차림을
                추천해드릴게요."
                />
                <BgImgBtn title="추천 받기" onClickBtn={changeUrlHandler} />
            </BgImgContent>
        </>
    );
}
