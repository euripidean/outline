import {
  useCreateCardMutation,
  useUpdateCardMutation,
} from "../../features/apiSlice";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/outlineSlice";

function CardForm(props) {
  const { project, action } = props;
  const dispatch = useDispatch();

  const [createCard, { isLoading: isCreating }] = useCreateCardMutation();
  const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const text = e.target.text.value;
    if (action === "create") {
      createCard({ title, text, project });
      closeModal();
    } else {
      updateCard({ title, text, project });
      closeModal();
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-outline-white p-4">
      <h2 className="text-2xl font-bold">
        {action === "create" ? "Create New Card" : "Update Card"}
      </h2>
      <form className="flex flex-col w-full h-full">
        <label htmlFor="title" className="text-lg font-bold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full h-10 border border-outline-bg p-2 rounded-md mb-4"
        />
        <label htmlFor="text" className="text-lg font-bold">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          className="w-full h-40 border border-outline-bg p-2 rounded-md mb-4"
        ></textarea>
        <button
          type="submit"
          className="bg-outline-bg text-white p-2 rounded-md"
          onSubmit={handleSubmit}
        >
          {action === "create" ? "Create Card" : "Update Card"}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
