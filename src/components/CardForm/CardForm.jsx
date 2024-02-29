import { useState, useEffect } from "react";
import {
  useGetCardQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} from "../../features/apiSlice";
import { useSelector, useDispatch } from "react-redux";

import { closeModal, showToast } from "../../features/outlineSlice";

function CardForm(props) {
  const { action } = props;
  const dispatch = useDispatch();
  const activeCardId = useSelector((state) => state.outline.activeCard);
  const currentProjectId = useSelector(
    (state) => state.outline.activeProject.id
  );
  const { data: activeCard } = useGetCardQuery(activeCardId);
  const [createCard, { error: createError }] = useCreateCardMutation();
  const [updateCard, { error: updateError }] = useUpdateCardMutation();
  const [deleteCard, { error: deleteError }] = useDeleteCardMutation();

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (action === "update" && activeCard) {
      setText(activeCard.text || "");
      setTitle(activeCard.title || "");
    }
  }, [action, activeCard]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await deleteCard(activeCardId).unwrap();
      dispatch(closeModal());
      dispatch(showToast("Card deleted!"));
    } catch (error) {
      dispatch(showToast("Failed to delete card"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "create") {
      await createCard({
        title,
        text,
        project: currentProjectId,
        cardType: "menu",
      });
      if (createError) {
        dispatch(showToast("Failed to create card"));
      }
    } else if (action === "update") {
      await updateCard({ id: activeCardId, body: { title, text } });
      if (updateError) {
        dispatch(showToast("Failed to update card"));
      }
    }
    dispatch(closeModal());
    dispatch(showToast("Card saved!"));
  };

  return (
    <div className="flex flex-col w-full h-full bg-outline-white p-4">
      <h2 className="text-2xl font-bold">
        {action === "create" ? "Create New Card" : "Edit Card"}
      </h2>
      <form className="flex flex-col w-full h-full" onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-lg font-bold">
          Title: {activeCardId}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full h-10 border border-outline-bg p-2 rounded-md mb-4"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="text" className="text-lg font-bold">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          className="w-full h-40 border border-outline-bg p-2 rounded-md mb-4"
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <button
          type="submit"
          className="bg-outline-bg text-white p-2 rounded-md"
        >
          {action === "create" ? "Create Card" : "Edit Card"}
        </button>
      </form>
      {action === "update" && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-md mt-4"
        >
          {" "}
          Delete Card{" "}
        </button>
      )}
    </div>
  );
}

export default CardForm;
