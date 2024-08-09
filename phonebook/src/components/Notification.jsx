const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="succeedIndicator">{message}</div>;
};

export default Notification;
