import { firstPageContent } from '@/styles/styles';
import { ReactNode } from 'react';
const BgImgContent: React.FC<{ url: string; children: ReactNode; class?: string }> = (props) => {
    const newClass = props.class ? props.class : firstPageContent;

    return (
        <div className={newClass} style={{ backgroundImage: props.url }}>
            {props.children}
        </div>
    );
};

export default BgImgContent;
