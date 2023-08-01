
const Notification = ({ note, setNote }) => {

    const handleClick = () => {
        setNote('')
    }

    const style = note
        ? 'notification_container'
        : 'notification_container hidden'

    return (
        <div className={style}>
            <span className="notification_item">{note}</span>
            <span role="button" className="closeButton" onClick={handleClick} ></span>
        </div>
    )
};

export default Notification;