import React, { useContext } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { puzzleWrapperStyles } from "./components/piece/styles";
import Piece from "./components/piece/Piece";
import { sampleItems, shuffledItems } from "../../components/items/sampleItems";
import { Image } from "../../types/image";
import { ItemsContext } from "../../context/ItemsProvider";

interface Props {
  width: number;
  height: number;
  pieces: number;
  onComplete: () => void;
  isGameStarted: boolean;
}

const Puzzle: React.FC<Props> = ({
  width,
  height,
  pieces,
  onComplete,
  isGameStarted,
}) => {
  const { itemsContext: items, setItemsContext: setItems } =
    useContext(ItemsContext);

  const move = (array: Image[], oldIndex: number, newIndex: number) => {
    // check if in the same row
    if (Math.floor(newIndex / pieces) === Math.floor(oldIndex / pieces)) {
      // check that the distance between pieces is one in the row dimension
      if (Math.abs(newIndex - oldIndex) !== 1) {
        return array;
      }

      array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    }
    // or in the same column
    else if (Math.floor(newIndex % pieces) === Math.floor(oldIndex % pieces)) {
      // check that the distance between pieces is one in the column dimension
      if (
        Math.abs(
          Math.floor(newIndex / pieces) - Math.floor(oldIndex / pieces)
        ) !== 1
      ) {
        return array;
      }
      const tempNew = array[newIndex];
      array[newIndex] = array[oldIndex];
      array[oldIndex] = tempNew;
    }
    // if neither return the array without modify him

    return array;
  };

  const onDropPiece = (sourceId: string, destinationId: string) => {
    // if the game is'nt started don't allow to move
    if (!isGameStarted) {
      return;
    }
    // allow only drag in to the empty piece
    if (destinationId !== "9") {
      return;
    }

    const sourceIndex = items.findIndex((item) => item.id === sourceId);
    const destinationIndex = items.findIndex(
      (item) => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceIndex === -1 || destinationIndex === -1) {
      return;
    }

    setItems((prevState) => [
      ...move(prevState, sourceIndex, destinationIndex),
    ]);

    // check if array of shuffled items equal to the right order of puzzle
    if (JSON.stringify(items) === JSON.stringify(sampleItems)) {
      setItems(shuffledItems);
      onComplete();
    }
  };

  const renderPieces = () =>
    items.map((item) => (
      <Piece
        key={item.id}
        id={item.id}
        src={item.src}
        onDropPiece={onDropPiece}
        height={height}
        width={width}
      />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={puzzleWrapperStyles({ width, height, pieces })}>
        {renderPieces()}
      </div>
    </DndProvider>
  );
};

export default Puzzle;
