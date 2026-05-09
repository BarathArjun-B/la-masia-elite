const Message = ({ type = "error", children }) => {
  if (!children) return null;

  return <div className={`message ${type}`}>{children}</div>;
};

export default Message;
