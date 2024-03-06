import Modal from '@/UI/Modal';
import { temperatureStateType } from '@/public/resources/constants/type';
import { AnimatePresence } from 'framer-motion';
import SelectOutfits from './SelectOutfits';
import BgImgBtn from '@/UI/BgImgBtn';

const NewForm = (props: { tempt: temperatureStateType; onClose: () => void; edit: boolean }) => {
    const closeAlertHandler = () => {};

    return (
        <AnimatePresence>
            {props.edit && (
                <Modal title="오늘 착장 기록하기" onClose={closeAlertHandler}>
                    <SelectOutfits />
                    <div className="flex">
                        <div className="flex mx-auto">
                            <BgImgBtn class="flex" onClickBtn={() => {}} title="저장" />
                            <BgImgBtn class="flex ml-2" onClickBtn={props.onClose} title="취소" />
                        </div>
                    </div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default NewForm;
