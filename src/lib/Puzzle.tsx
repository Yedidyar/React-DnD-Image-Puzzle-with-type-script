import React, { useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { puzzleWrapperStyles } from "./styles";
import { shuffle, isEqual } from "./utils";
import Piece from "./Piece";

import { sampleItems } from "../lib/sampleItems";
interface Props {
  width: number;
  height: number;
  onComplete: () => void;
}
interface Image {
  src: string;
  id: string;
}
const Puzzle: React.FC<Props> = (props) => {
  const { onComplete, width, height } = props;
  const [items, setItems] = useState(sampleItems);
  useEffect(() => {
    console.log("changeg");
  }, [items]);

  function move(array: Image[], oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex);
    if (newIndex >= array.length) {
      newIndex = array.length - 1;
    }

    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  }

  function moveElement(array: Image[], index: number, offset: number) {
    const newIndex = index + offset;

    return move(array, index, newIndex);
  }

  const onDropPiece = (sourceId: string, destinationId: string) => {
    const sourceIndex = items.findIndex((item) => item.id === sourceId);
    const destinationIndex = items.findIndex(
      (item) => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceIndex === -1 || destinationIndex === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    setItems((prevState) => [...moveElement(prevState, sourceIndex, offset)]);
  };

  const renderPieces = () =>
    items.map((item) => (
      <Piece
        key={item.id}
        id={item.id}
        src={item.src}
        onDropPiece={onDropPiece}
        {...props}
      />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={puzzleWrapperStyles({ width, height })}>{renderPieces()}</div>
      <style>
        {`
          .puzzle-piece:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </DndProvider>
  );
};

// Puzzle.propTypes = {
//   image: PropTypes.string.isRequired,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   pieces: PropTypes.number,
//   piecesCompleted: (props) =>
//     props["pieces"] < 3 &&
//     new Error("Invalid prop type `pieces`. It should be >= 1"),
//   onComplete: PropTypes.func,
// };

export default Puzzle;
