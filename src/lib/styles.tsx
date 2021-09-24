interface PuzzleWrapperStylesProps {
  width: number;
  height: number;
}
interface PuzzlePieceStylesProps {
  isOver: boolean;
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
  children?: React.ReactNode;
}

export const puzzleWrapperStyles = (
  props: React.PropsWithChildren<PuzzleWrapperStylesProps>
) => {
  return {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
    width: `${props.width}px`,
    height: `${props.height}px`,
  } as React.CSSProperties;
};

export const puzzlePieceStyles = (
  props: React.PropsWithChildren<PuzzlePieceStylesProps>
) => ({
  width: `${props.width / props.pieces}px`,
  height: `${props.height / props.pieces}px`,
  margin: "0 -1px -1px",
  border: "1px solid #000",
  backgroundImage: `url(${props.image})`,
  backgroundSize: `${props.width}px ${props.height}px`,
  backgroundPosition: `-${props.coords.x}px -${props.coords.y}px`,
  opacity: `${props.isOver ? "0.2" : "1"}`,
  backgroundRepeat: "no-repeat",
  cursor: "move",
});
