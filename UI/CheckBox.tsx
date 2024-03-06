const CheckBox = (props: { label: string }) => {
    return (
        <div className="flex mx-auto">
            <input
                type="checkbox"
                className="mr-2"
                // onChange={({ target: { checked } }) => onChange(checked)}
            />
            <label className="">{props.label}</label>
        </div>
    );
};

export default CheckBox;
