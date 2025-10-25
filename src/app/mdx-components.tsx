import MdxLayout from "./components/mdx-layout";

export const metadata = {
  title: "Blog",
};

export function useMDXComponents() {
  return {
    default: MdxLayout,
  };
}
