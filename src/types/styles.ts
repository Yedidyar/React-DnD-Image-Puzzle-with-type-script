export interface PuzzleWrapperStylesProps {
  width: number;
  height: number;
  pieces: number;
}
export interface PuzzlePieceStylesProps {
  isOver: boolean;
  width: number;
  height: number;
  src: string;
  onDropPiece: (sourcePosition: string, dropPosition: string) => void;
  children?: React.ReactNode;
}
