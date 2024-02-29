import { useState } from "react";
import {
  useGetCardQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
} from "../../features/apiSlice";
import { useSelector, useDispatch } from "react-redux";

import { closeModal } from "../../features/outlineSlice";

function CardForm(props) {
  const { action } = props;
  const dispatch = useDispatch();
  const activeCardId = useSelector((state) => state.outline.activeCard);
  const currentProjectId = useSelector(
    (state) => state.outline.activeProject.id
  );
  const { data: activeCard } = useGetCardQuery(activeCardId);
  const [createCard, { data: createData, error: createError }] =
    useCreateCardMutation();
  const [updateCard, { data: updateData, error: updateError }] =
    useUpdateCardMutation();

  const [text, setText] = useState(
    action === "update" ? activeCard?.text || "" : ""
  );
  const [title, setTitle] = useState(
    action === "update" ? activeCard?.title || "" : ""
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
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
        console.error("Failed to create card:", createError);
      }
    } else if (action === "update") {
      console.log("activeCardId:", activeCardId);
      console.log("text:", text);
      await updateCard({ id: activeCardId, body: { title, text } });
      if (updateError) {
        console.error("Failed to update card:", updateError);
      }
    }
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col w-full h-full bg-outline-white p-4">
      <h2 className="text-2xl font-bold">
        {action === "create" ? "Create New Card" : "Update Card"}
      </h2>
      <form className="flex flex-col w-full h-full" onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-lg font-bold">
          Title
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
    </div>
  );
}

export default CardForm;
