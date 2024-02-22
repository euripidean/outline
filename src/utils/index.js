export const defaultState = () => {
  console.log("In defaultState");
  return {
    projects: [],
    cards: [],
    tags: [],
    userLoggedIn: false,
    showModal: false,
  };
};
