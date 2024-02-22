import { ReactNode } from 'react';
import { firstPageContent, firstPageTitle, firstPageInnerContent, firstPageText } from '@/styles/styles';

const InnerContent: React.FC<{ title: string; description: string }> = (props) => {
    return (
        <>
            <div className={firstPageInnerContent}>
                <h1 className={firstPageTitle}>{props.title}</h1>
                <p className={firstPageText}>{props.description}</p>
            </div>
        </>
    );
};

export default InnerContent;
