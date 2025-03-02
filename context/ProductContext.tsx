import React, { createContext, useState, useContext } from "react";

interface MaterialI {
  id: string;
  name: string;
  pt: string;
  cant: string;
  pu: string;
}
interface ProductI {
  name: string;
  description: string;
  margenUtilidad: string;
  igv: string;
}
interface ProductData {
  Producto: ProductI;
  materia_prima: MaterialI[];
  packaging: MaterialI[];
  mano_obra: MaterialI[];
  gastos_operativos: MaterialI[];
}

interface ProductContextType {
  productData: ProductData;
  setProducto: (product: ProductI) => void;
  addProduct: (
    category: keyof Omit<ProductData, "Producto">,
    product: MaterialI
  ) => void;
  deleteProduct: (
    category: keyof Omit<ProductData, "Producto">,
    id: string
  ) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productData, setProductData] = useState<ProductData>({
    Producto: {
      name: "",
      description: "",
      margenUtilidad: "20",
      igv: "0.18",
    },
    materia_prima: [],
    packaging: [],
    mano_obra: [],
    gastos_operativos: [],
  });

  const setProducto = (product: ProductI) => {
    setProductData((prev) => ({ ...prev, Producto: product }));
  };

  const addProduct = (
    category: keyof Omit<ProductData, "Producto">,
    product: MaterialI
  ) => {
    setProductData((prev) => ({
      ...prev,
      [category]: [...prev[category], product],
    }));
  };

  const deleteProduct = (
    category: keyof Omit<ProductData, "Producto">,
    id: string
  ) => {
    setProductData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  };

  return (
    <ProductContext.Provider
      value={{ productData, setProducto, addProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct debe usarse dentro de un ProductProvider");
  }
  return context;
};
