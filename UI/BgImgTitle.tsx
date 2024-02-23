import { questionFirstContent, questionInnerContent, questionTitle } from '@/styles/styles';

const BgImgTitle = (props: { title: string }) => {
    <div className={questionFirstContent}>
        <div className={questionInnerContent}>
            <h3 className={questionTitle}>{props.title}</h3>
        </div>
    </div>;
};

export default BgImgTitle;
