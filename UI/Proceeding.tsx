import { ProceedingContent, ProceedingInnerContent, proceedingIcon, proceedingText } from '@/styles/styles';
import { FcSearch } from 'react-icons/fc';

const Proceeding = (props: { title: string }) => {
    return (
        <div className={ProceedingContent}>
            <div className={ProceedingInnerContent}>
                <svg className={proceedingIcon} viewBox="0 0 24 24">
                    <FcSearch />
                </svg>
                <p className={proceedingText}>{props.title}</p>
            </div>
        </div>
    );
};

export default Proceeding;
