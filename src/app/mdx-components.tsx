import type { ReactNode } from "react";
import MdxLayout from "./components/mdx-layout";

export const metadata = {
  title: "Blog",
};

function Subrayado({ children }: { children: ReactNode }) {
  return <span className="renglon-subrayado">{children}</span>;
}

export function useMDXComponents() {
  return {
    default: MdxLayout,
    Subrayado,
  };
}
