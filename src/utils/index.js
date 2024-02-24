export const defaultState = () => {
  return {
    allProjects: [],
    activeProject: null,
    cards: {
      menuCards: [
        {
          id: "1",
          title: "The planet blows up",
          text: "Here's an example of an exciting plot point.",
        },
        { id: "2", title: "Plot Card 2", text: "Plot Card 2 text" },
        { id: "3", title: "Plot Card 3", text: "Plot Card 3 text" },
        { id: "4", title: "Plot Card 4", text: "Plot Card 4 text" },
        { id: "5", title: "Plot Card 5", text: "Plot Card 5 text" },
      ],
      gridCards: [
        { id: "6", title: "Plot Card 6", text: "Plot Card 6 text" },
        { id: "7", title: "Plot Card 7", text: "Plot Card 7 text" },
        { id: "8", title: "Plot Card 8", text: "Plot Card 8 text" },
        { id: "9", title: "Plot Card 9", text: "Plot Card 9 text" },
        { id: "10", title: "Plot Card 10", text: "Plot Card 10 text" },
      ],
    },
    activeId: null,
    userId: "65d92ad6a415a1285b572e38", // For development purposes, passing this in as the default.
    showModal: false,
    hideMenu: false,
    modalId: null,
  };
};
