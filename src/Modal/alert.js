export const Alert = ({ message }) => {
        return (
            <div className="alert">
                <div className="alert-container">
                    <div className="symbol">
                    </div>
                    <div className="description">
                        <span className="title">{message.title}</span>
                        <span className="text">{message.text}</span>
                    </div>
                </div>
            </div>
        );
};