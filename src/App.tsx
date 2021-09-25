import { useContext, useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import Puzzle from "./features/puzzle/Puzzle";
import fullPicture from "./assets/images/full_picture.jpg";
import { modalHelpTrigger } from "./components/modal/helpModalStyle";
import style from "./app.module.css";
import { InfoIcon } from "./assets/svg_components/InfoIcon";
import { timerFormatter } from "./utils/formatTimer";
import { ItemsContext } from "./context/ItemsProvider";
import { shuffledItems } from "./components/items/sampleItems";

const App: React.FC = () => {
  const [openCompilationModal, setOpenCompilationModal] = useState(false);
  const [openToolTipModal, setOpenToolTipModal] = useState(true);
  const [timer, setTimer] = useState(0);
  const [parseTime, setParseTime] = useState("00:00");
  const [score, setScore] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { setItemsContext: setItems } = useContext(ItemsContext);
  const onComplete = () => {
    setOpenCompilationModal(true);
    setIsGameStarted(false);
    setTimer(0);
  };

  // constants that define the size of the puzzle
  const height = 150;
  const width = 150;
  const pieces = 3;

  // set timer and player score time
  useEffect(() => {
    const seconds = timerFormatter(timer % 60);
    const minutes = timerFormatter(Math.floor(timer / 60));
    const timerUpdate = setInterval(() => {
      if (isGameStarted) {
        setTimer((state) => state + 1);
        setParseTime(`${minutes}:${seconds}`);
        setScore(`${minutes}:${seconds}`);
      }
    }, 1000);
    return () => {
      clearInterval(timerUpdate);
    };
  }, [timer, isGameStarted]);

  // restart the game when the isGameStarted flag is false
  useEffect(() => {
    if (!isGameStarted) {
      setParseTime("00:00");
      setTimer(0);
    } else {
      setTimer(1);
    }
  }, [isGameStarted]);

  return (
    <>
      <div className={`${style["puzzle-and-tooltip-div"]}`}>
        <div
          className={style.infoIcon}
          onClick={() => setOpenToolTipModal(true)}
          style={modalHelpTrigger({ height, width, pieces })}
          title="help"
        >
          <InfoIcon height="20px" width="20px" color="red" />
        </div>
        <div className={!isGameStarted ? style.blur : style.noBlur}>
          <Puzzle
            onComplete={onComplete}
            height={height}
            width={width}
            pieces={pieces}
            isGameStarted={isGameStarted}
          />
        </div>
        <button
          className={`btn ${!isGameStarted ? "btn-primary" : "btn-danger"}`}
          onClick={() => {
            setIsGameStarted(!isGameStarted);
            setItems(shuffledItems);
          }}
        >
          {!isGameStarted ? "start" : "reset"}
        </button>
        <div className={style.timer}>{parseTime}</div>
      </div>

      <Modal open={openCompilationModal} setOpen={setOpenCompilationModal}>
        <h1>
          Puzzle is completed!<br></br>
          your time is: {score}
          <br></br>
          well done 👌
        </h1>
      </Modal>
      <Modal open={openToolTipModal} setOpen={setOpenToolTipModal}>
        <div className={style.toolTipModal}>
          <img src={fullPicture} className={style.aircraftModalPic} alt="" />
          <h1>
            Your task is to arrange the puzzle as the picture above.<br></br>
            You can only move pieces to the blank place.<br></br>
            <br></br>Good luck!
          </h1>
        </div>
      </Modal>
    </>
  );
};

export default App;
