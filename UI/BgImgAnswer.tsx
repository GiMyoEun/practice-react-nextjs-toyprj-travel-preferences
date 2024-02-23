import { questionContent, questionDiscription, questionInnerContent } from '@/styles/styles';

const BgImgAnswer = (props: { value: string; title: string; onClickAnswer: (answer: string) => void }) => {
    const onClickAnswer = () => {
        props.onClickAnswer(props.value);
    };

    return (
        <div className={questionContent} onClick={onClickAnswer}>
            <div className={questionInnerContent}>
                <h3 className={questionDiscription}>{props.title}</h3>
            </div>
        </div>
    );
};

export default BgImgAnswer;
