import { alertState } from '@/public/resources/constants/state';
import { useRecoilState } from 'recoil';
import Modal from './Modal';
import BgImgBtn from './BgImgBtn';
import { alertDiscription, alerteButton, alerteButtonDiv } from '@/styles/styles';
import { AnimatePresence, motion } from 'framer-motion';

const Alert = () => {
    const [alert, setAlert] = useRecoilState(alertState);

    const closeAlertHandler = () => {
        setAlert({
            title: '',
            discription: '',
            showAlert: false,
        });
    };

    return (
        <AnimatePresence>
            {alert.showAlert && (
                <Modal title={alert.title} onClose={closeAlertHandler}>
                    <p className={alertDiscription}>{alert.discription}</p>

                    <div className={alerteButtonDiv}>
                        <button className={alerteButton} onClick={closeAlertHandler}>
                            확인
                        </button>
                    </div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default Alert;
