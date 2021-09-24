import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { puzzlePieceStyles } from "./styles";
import style from "./piece.module.css";
interface Props {
  id: string;
  src: string;
  height: number;
  width: number;
  onDropPiece: (sourcePosition: string, dropPosition: string) => void;
}

const Piece: React.FC<Props> = memo((props) => {
  const { id, src, onDropPiece } = props;

  const [, dragEl] = useDrag({
    type: "PIECE",
    item: { id },
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "PIECE",
    drop: (item: { id: string }, monitor) => {
      onDropPiece(
        item.id, // source position
        id // drop position
      );
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  return (
    <div className={`puzzle-piece ${style.GridItemWrapper}`} ref={dropRef}>
      <div ref={dragEl} style={puzzlePieceStyles({ ...props, isOver })}></div>
    </div>
  );
});

export default Piece;
