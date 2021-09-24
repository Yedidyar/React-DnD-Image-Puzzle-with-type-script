interface PuzzleWrapperStylesProps {
  width: number;
  height: number;
}
interface PuzzlePieceStylesProps {
  isOver: boolean;
  width: number;
  height: number;
  src: string;
  onDropPiece: (sourcePosition: string, dropPosition: string) => void;
  children?: React.ReactNode;
}

export const puzzleWrapperStyles = (
  props: React.PropsWithChildren<PuzzleWrapperStylesProps>
) => {
  return {
    display: "grid",
    gridTemplateColumns: `${props.width}px ${props.width}px ${props.width}px`,
    padding: 0,
  } as React.CSSProperties;
};

export const puzzlePieceStyles = (
  props: React.PropsWithChildren<PuzzlePieceStylesProps>
) => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  margin: "0 -1px -1px",
  border: "1px solid #000",
  backgroundImage: `url(${props.src})`,
  backgroundSize: `${props.width}px ${props.height}px`,
  opacity: `${props.isOver ? "0.2" : "1"}`,
  backgroundRepeat: "no-repeat",
  cursor: "move",
});
