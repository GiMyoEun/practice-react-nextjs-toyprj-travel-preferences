import { firstPageButton, firstPageButtonDiv } from '@/styles/styles';
import InnerContent from './InnerContent';

const Start = () => {
    return (
        <>
            <InnerContent
                title="What should I wear?"
                description="오늘의 기온에 맞는 옷차림을
                추천해드릴게요."
            />
            <div className={firstPageButtonDiv}>
                <button className={firstPageButton}>추천 받기</button>
            </div>
        </>
    );
};

export default Start;
