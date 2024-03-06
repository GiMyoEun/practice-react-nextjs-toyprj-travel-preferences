import { firstPageButton, firstPageButtonDiv } from '@/styles/styles';

const BgImgBtn = (props: { title: string; onClickBtn: () => void; class?: string }) => {
    return (
        <>
            <div className={props.class || firstPageButtonDiv}>
                <button className={firstPageButton} onClick={props.onClickBtn}>
                    {props.title}
                </button>
            </div>
        </>
    );
};

export default BgImgBtn;
