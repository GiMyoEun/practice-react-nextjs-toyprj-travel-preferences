import { alertState, confirmState } from '@/public/resources/constants/state';
import { useRecoilState } from 'recoil';
import Modal from './Modal';
import BgImgBtn from './BgImgBtn';
import { alertDiscription, alerteButton, alerteButtonDiv } from '@/styles/styles';
import { AnimatePresence, motion } from 'framer-motion';

const Confirm = (props: { onClickConfirmBtn: () => void }) => {
    const [contirm, setConfirm] = useRecoilState(confirmState);

    const closeConfirmHandler = () => {
        setConfirm({
            title: '',
            discription: '',
            showConfirm: false,
        });
    };

    const onClickConfirmBtn = () => {
        setConfirm({
            title: '',
            discription: '',
            showConfirm: false,
        });
        props.onClickConfirmBtn();
    };

    return (
        <AnimatePresence>
            {contirm.showConfirm && (
                <Modal title={contirm.title} onClose={closeConfirmHandler}>
                    <p className={alertDiscription}>{contirm.discription}</p>
                    <div className={alerteButtonDiv}>
                        <button className={alerteButton} onClick={onClickConfirmBtn}>
                            확인
                        </button>
                        <button className={alerteButton} onClick={closeConfirmHandler}>
                            취소
                        </button>
                    </div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default Confirm;
