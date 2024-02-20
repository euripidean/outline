function Button(props) {
  const { onClick, text } = props;
  return (
    <button className="border p-2" onClick={onClick}>
      {text} <i className="fa-solid fa-circle-plus p-1"></i>
    </button>
  );
}

export default Button;
