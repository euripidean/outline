import { useSelector } from "react-redux";

function Toast() {
  const message = useSelector((state) => state.outline.toastMessage);
  return (
    <div className={"text-outline-white bg-outline-bg p-4 rounded"}>
      {message}
    </div>
  );
}

export default Toast;
