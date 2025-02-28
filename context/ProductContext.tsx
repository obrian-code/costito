import React, { createContext, useState, useContext } from "react";

interface Product {
  id: string;
  name: string;
  pt: string;
  cant: string;
  pu: string;
}

interface ProductData {
  Producto: string;
  materia_prima: Product[];
  packaging: Product[];
  mano_obra: Product[];
  gastos_operativos: Product[];
}

interface ProductContextType {
  productData: ProductData;
  setProductoName: (name: string) => void;
  addProduct: (
    category: keyof Omit<ProductData, "Producto">,
    product: Product
  ) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [productData, setProductData] = useState<ProductData>({
    Producto: "",
    materia_prima: [],
    packaging: [],
    mano_obra: [],
    gastos_operativos: [],
  });

  const setProductoName = (name: string) => {
    setProductData((prev) => ({ ...prev, Producto: name }));
  };

  const addProduct = (
    category: keyof Omit<ProductData, "Producto">,
    product: Product
  ) => {
    setProductData((prev) => ({
      ...prev,
      [category]: [...prev[category], product],
    }));
  };

  return (
    <ProductContext.Provider
      value={{ productData, setProductoName, addProduct }}
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
