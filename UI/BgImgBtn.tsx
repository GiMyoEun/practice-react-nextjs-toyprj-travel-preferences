import { firstPageButton, firstPageButtonDiv } from '@/styles/styles';

const BgImgBtn = (props: { title: string; onClickBtn: () => void }) => {
    return (
        <>
            <div className={firstPageButtonDiv}>
                <button className={firstPageButton} onClick={props.onClickBtn}>
                    {props.title}
                </button>
            </div>
        </>
    );
};

export default BgImgBtn;
