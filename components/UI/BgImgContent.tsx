import { firstPageContent } from '@/styles/styles';
import { ReactNode } from 'react';
const BgImgContent: React.FC<{ url: string; children: ReactNode }> = (props) => {
    return (
        <div className={firstPageContent} style={{ backgroundImage: props.url }}>
            {props.children}
        </div>
    );
};

export default BgImgContent;
