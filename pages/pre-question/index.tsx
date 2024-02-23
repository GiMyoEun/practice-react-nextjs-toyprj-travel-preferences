import BgImgContent from '@/UI/BgImgContent';

import BgImgBtn from '@/UI/BgImgBtn';
import BgImgQuestion from '@/UI/BgImgQuestion';
import BgImgAnswer from '@/UI/BgImgAnswer';
import { PRE_QUESTION } from '@/public/resources/constants/text';

const PreQuestion = () => {
    const changeUrlHandler = () => {};

    const selectAnswerHandler = (answer: string) => {};
    return (
        <>
            <BgImgContent url='url("/resources/img/cloud.jpg")'>
                <BgImgQuestion title="당신은..." />
                {PRE_QUESTION.map((item: { value: string; title: string }) => {
                    return <BgImgAnswer value={item.value} title={item.title} onClickAnswer={selectAnswerHandler} />;
                })}
                <BgImgBtn title="다음" onClickBtn={changeUrlHandler} />
            </BgImgContent>
        </>
    );
};

export default PreQuestion;
