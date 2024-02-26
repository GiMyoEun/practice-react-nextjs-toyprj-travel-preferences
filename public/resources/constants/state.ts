import { atom } from 'recoil';

export const answerState = atom({
    key: 'answerState',
    default: '',
});

export const alertState = atom({
    key: 'alertState',
    default: {
        title: '',
        discription: '',
        showAlert: false,
    },
});
