import Puzzle from "./lib/Puzzle";

const App: React.FC = () => {
  const onComplete = () => {
    console.log("Puzzle is completed!");
  };

  return <Puzzle onComplete={onComplete} height={100} width={100} />;
};

export default App;
