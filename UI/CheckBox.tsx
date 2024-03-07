import { alertState, selectedOutfitsState } from '@/public/resources/constants/state';
import PreviousMap from 'postcss/lib/previous-map';
import { useRecoilState } from 'recoil';

const CheckBox = (props: { item: { label: string; checked: boolean; clothe: string } }) => {
    const [selected, setSelected] = useRecoilState<{ [key: string]: boolean }>(selectedOutfitsState);
    const [alert, setAlert] = useRecoilState(alertState);

    const onClickCheckBox = (checked: boolean) => {
        if (alert.showAlert) {
            setAlert({
                title: '',
                discription: '',
                showAlert: false,
            });
        }
        setSelected((prev) => {
            return { ...prev, [props.item.clothe]: checked };
        });
    };
    return (
        <div className="flex mx-auto">
            <input
                type="checkbox"
                className="mr-2"
                checked={props.item.checked}
                onChange={({ target: { checked } }) => {
                    onClickCheckBox(checked);
                }}
            />
            <label
                className=""
                onClick={() => {
                    onClickCheckBox(!props.item.checked);
                }}
            >
                {props.item.label}
            </label>
        </div>
    );
};

export default CheckBox;
