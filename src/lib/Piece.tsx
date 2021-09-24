import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { puzzlePieceStyles } from "./styles";

interface Props {
  width: number;
  height: number;
  pieces: number;
  image: string;
  position: number;
  coords: {
    x: number;
    y: number;
  };
  onDropPiece: (sourcePosition: number, dropPosition: number) => void;
}

const Piece: React.FC<Props> = memo((props) => {
  const { position, onDropPiece } = props;

  const [, dragEl] = useDrag({
    type: "PIECE",
    item: { position },
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "PIECE",
    drop: (item: { position: number }, monitor) => {
      console.log(item);

      onDropPiece(
        item.position, // source position
        position // drop position
      );
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  return (
    <div className="puzzle-piece" ref={dropRef}>
      <div ref={dragEl} style={puzzlePieceStyles({ ...props, isOver })}></div>
    </div>
  );
});

Piece.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pieces: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  onDropPiece: PropTypes.func.isRequired,
};

export default Piece;
