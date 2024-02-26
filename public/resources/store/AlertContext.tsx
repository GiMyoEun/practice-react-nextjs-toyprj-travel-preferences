import { useState, createContext } from 'react';

export type AlertType = {
    isVisible: boolean;
    showAlert: () => void;
    hideAlert: () => void;
    changeData: (newData: { title: string; discription: string }) => void;
    title: string;
    discription: string;
};

type dataType = { title: string; discription: string };

export const AlertContext = createContext<AlertType>({
    isVisible: false,
    showAlert: () => {},
    hideAlert: () => {},
    changeData: (newData: dataType) => {},
    title: '',
    discription: '',
});

const AlertContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false);
    const [data, setData] = useState<dataType>({
        title: '',
        discription: '',
    });

    function changeData(newData: dataType) {
        setData(newData);
    }

    function showAlert() {
        setAlertIsOpen(true);
    }
    function hideAlert() {
        setData({
            title: '',
            discription: '',
        });
        setAlertIsOpen(false);
    }

    const alertCtx: AlertType = {
        isVisible: alertIsOpen,
        showAlert,
        hideAlert,
        changeData,
        title: data.title,
        discription: data.discription,
    };

    return <AlertContext.Provider value={alertCtx}>{props.children}</AlertContext.Provider>;
};

export default AlertContextProvider;
