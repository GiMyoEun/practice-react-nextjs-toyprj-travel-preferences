import { questionFirstContent, questionInnerContent, questionTitle } from '@/styles/styles';

const BgImgQuestion = (props: { title: string }) => {
    return (
        <div className={questionFirstContent}>
            <div className={questionInnerContent}>
                <h3 className={questionTitle}>{props.title}</h3>
            </div>
        </div>
    );
};

export default BgImgQuestion;
