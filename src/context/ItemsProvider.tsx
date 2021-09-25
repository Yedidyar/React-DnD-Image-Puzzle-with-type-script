import React, { useState } from "react";
import { shuffledItems } from "../components/items/sampleItems";
import { Image } from "../types/image";

interface ItemContextInterface {
  itemsContext: Image[];
  setItemsContext: React.Dispatch<React.SetStateAction<Image[]>>;
}

export const ItemsContext = React.createContext<ItemContextInterface>(
  {} as ItemContextInterface
);

const ItemsProvider: React.FC<{ children: any }> = ({ children }) => {
  const [itemsContext, setItemsContext] = useState<Image[]>(shuffledItems);
  return (
    <ItemsContext.Provider value={{ itemsContext, setItemsContext }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
