import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default layout;
