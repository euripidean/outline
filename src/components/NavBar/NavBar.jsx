import { useDispatch } from "react-redux";
import { openModal, signIn } from "../../features/outlineSlice";

function NavBar(props) {
  const { userSignedIn } = props;
  const dispatch = useDispatch();

  const handleNewProjectClick = () => {
    dispatch(openModal("new-project"));
  };

  const handleSignInClick = () => {
    // for demo purposes, we're just going to toggle the sign in state
    dispatch(signIn(false));
  };

  return (
    <nav className="bg-outline-bg text-outline-white">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <img
          className="h-8 flex items-start space-x-3 rtl:space-x-reverse"
          src="./images/logo.png"
          alt="Outline Logo"
        />
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li className="flex items-center">
              <button
                className="block py-2 px-3 text-outline-white rounded hover:text-outline-mid md:p-0"
                onClick={handleNewProjectClick}
              >
                New Project <i className="fa-solid fa-circle-plus p-1"></i>
              </button>
            </li>
            <li>
              <button
                className="block py-2 px-3 text-outline-white rounded hover:text-outline-mid md:p-0"
                onClick={handleSignInClick}
              >
                {userSignedIn ? `Sign out` : `Sign in`}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
