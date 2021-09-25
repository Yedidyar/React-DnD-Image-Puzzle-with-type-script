interface ModalHelpTrigger {
  height: number;
  width: number;
  pieces: number;
}
export const modalHelpTrigger = ({
  height,
  width,
  pieces,
}: React.PropsWithChildren<ModalHelpTrigger>) => {
  return {
    marginLeft: `calc(${width}px *3 - 20px)`,
    marginBottom: "10px",
    height: "20px",
    cursor: "pointer",
  } as React.CSSProperties;
};
