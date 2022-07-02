import '../styles/FormValidationErrorContainer.css';

export const FormValidationErrorContainer= (props) => {
    const { errMessage } = props;
    return (
        <>
            <div className="errorMsgnew">
                {errMessage}
            </div>
        </>
    )
};