import BgImgContent from '@/UI/BgImgContent';

import BgImgBtn from '@/UI/BgImgBtn';
import BgImgQuestion from '@/UI/BgImgQuestion';
import BgImgAnswer from '@/UI/BgImgAnswer';
import { PRE_QUESTION } from '@/public/resources/constants/text';
import { useRecoilState } from 'recoil';
import { alertState, answerState } from '@/public/resources/constants/state';
import { questionContent, selectedQuestionContent } from '@/styles/styles';
import Alert from '@/UI/Alert';
import { useRouter } from 'next/router';

const PreQuestion = () => {
    const [answer, setAnswer] = useRecoilState(answerState);
    const [alert, setAlert] = useRecoilState(alertState);
    const router = useRouter();

    const changeUrlHandler = () => {
        if (!answer) {
            setAlert({
                title: '답변 미선택',
                discription: '답변을 선택해주세요',
                showAlert: true,
            });
            return;
        } else {
            router.push('/recommend/' + answer.toLocaleLowerCase());
        }
    };

    const selectAnswerHandler = (answer: string) => {
        setAnswer(answer);
    };
    return (
        <>
            <Alert />
            <BgImgContent url='url("/resources/img/cloud.jpg")'>
                <BgImgQuestion title="당신은..." />
                {PRE_QUESTION.map((item: { value: string; title: string }) => {
                    return (
                        <BgImgAnswer
                            key={item.value}
                            class={answer === item.value ? selectedQuestionContent : questionContent}
                            value={item.value}
                            title={item.title}
                            onClickAnswer={selectAnswerHandler}
                        />
                    );
                })}
                <BgImgBtn title="다음" onClickBtn={changeUrlHandler} />
            </BgImgContent>
        </>
    );
};

export default PreQuestion;
