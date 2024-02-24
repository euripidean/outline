import {
  useCreateCardMutation,
  useUpdateCardMutation,
} from "../../features/apiSlice";
import { useSelector, useDispatch } from "react-redux";

function CardForm(props) {
  const { action } = props;
  // This will be replaced with the query to get the active card
  const { menuCards, gridCards } = useSelector((state) => state.outline.cards);
  const activeCardId = useSelector((state) => state.outline.activeCard);
  const activeCard = menuCards.find((card) => card.id === activeCardId)
    ? menuCards.find((card) => card.id === activeCardId)
    : gridCards.find((card) => card.id === activeCardId);

  const handleSubmit = (e) => {
    // functionality here
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
          value={action === "update" ? activeCard.title : ""}
        />
        <label htmlFor="text" className="text-lg font-bold">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          className="w-full h-40 border border-outline-bg p-2 rounded-md mb-4"
          value={action === "update" ? activeCard.text : ""}
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
