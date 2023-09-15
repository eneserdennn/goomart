import React, { ReactNode } from "react";

type GridProps = {
  gap?: number;
  children: any;
  cols: number;
  className?: string;
};

const Grid: React.FC<GridProps> = ({ gap, children, cols }) => {
  return <div className={`grid grid-cols-${cols} gap-${gap}`}>{children}</div>;
};

export default Grid;
