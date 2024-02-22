import { firstPageContent } from '@/styles/styles';
import Start from './UI/Start';
import BgImgContent from './UI/BgImgContent';

const Welcome = () => {
    return (
        <>
            <BgImgContent url='url("/img/cloud.jpg")'>
                <Start />
            </BgImgContent>
        </>
    );
};
export default Welcome;
