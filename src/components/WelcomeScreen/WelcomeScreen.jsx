import { useDispatch } from "react-redux";
import { signIn } from "../../features/outlineSlice";

function WelcomeScreen() {
  const dispatch = useDispatch();
  const handleFakeSignIn = () => {
    // This is just a fake sign in for the demo, obviously in a real app you would have a proper sign in process
    dispatch(signIn(true));
  };
  return (
    <div className="text-outline-white absolute top-0 left-0 w-full h-full bg-outline-bg flex flex-col items-center space">
      <div className="w-[50%] my-auto">
        <img src="./images/logo.png" alt="logo" />
        <div className="text-outline-light text-center text-xl font-thin p-4">
          <blockquote>
            <p className="leading-8">
              I love deadlines. I like the whooshing sound they make as they fly
              by.
            </p>
          </blockquote>
          <p className="uppercase mt-2"> - Douglas Adams</p>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleFakeSignIn}
            className="border border-outline-gold text-outline-white p-4 w-[75%] text-xl hover:bg-outline-gold hover:text-outline-bg hover:border-outline-bg"
          >
            Get Plotting
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
