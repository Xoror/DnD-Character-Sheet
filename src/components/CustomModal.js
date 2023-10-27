import "./CustomModal.scss"

export const CustomModal = (props) => {
    return (
        props.show ? 
            <div className="custom-modal">
                <div className="custom-modal-content">
                    {props.children}
                </div>
            </div>
        : null
    )
}