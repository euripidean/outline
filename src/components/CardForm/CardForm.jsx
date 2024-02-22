import {
  useCreateCardMutation,
  useUpdateCardMutation,
} from "../../features/apiSlice";

function CardForm(props) {
  const { id, title, text } = props;
  const [createCard] = useCreateCardMutation();
  const [updateCard] = useUpdateCardMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === "new-card") {
      createCard({ title, text });
    } else if (id === "update-card") {
      updateCard({ id, title, text });
    }
  };

  return (
    <form
      id={id}
      className="card-form"
      onSubmit={handleSubmit}
      data-modal-form={id}
    >
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="border p-2"
        placeholder="Title"
        defaultValue={title}
      />
      <label htmlFor="text" className="sr-only">
        Text
      </label>
      <input
        type="text"
        id="text"
        name="text"
        className="border p-2"
        placeholder="Text"
        defaultValue={text}
      />
      <button type="submit" className="border p-2">
        {id === "new-card" ? "Create Card" : "Update Card"}
      </button>
    </form>
  );
}

export default CardForm;
