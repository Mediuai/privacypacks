"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: number;
  nome: string;
  imagem: string;
  valor: number;
  pix: number;
  amount: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  userTotal: number;
  tx_id: string;
  setTxId: (tx_id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 9999, // ID do Premium Pack
      nome: "Premium Pack",
      imagem: "/premium-pack-image.jpg", // Ajuste o caminho da imagem
      valor: 19.99, // Ajuste o valor conforme necessário
      pix: 1999, // Valor em centavos (19.99 * 100)
      amount: 1, // Quantidade inicial
    },
  ]);
  const [total, setTotal] = useState<number>(0);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [tx_id, setTxId] = useState<string>("");

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.pix * item.amount, 0);
    const userTotal = items.reduce(
      (acc, item) => acc + item.valor * item.amount,
      0
    );
    setTotal(total);
    setUserTotal(userTotal);
  }, [items]);

  const addItem = (item: CartItem) => {
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, amount: i.amount + 1 } : i
        )
      );
    } else {
      setItems((prevItems) => [...prevItems, { ...item, amount: 1 }]);
    }
  };

  const removeItem = (id: number) => {
    const existingItem = items.find((i) => i.id === id);
    if (existingItem && existingItem.amount === 1) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, amount: item.amount ? item.amount - 1 : 0 }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]); // Isso limpará tudo, incluindo o Premium Pack
    setTotal(0);
    setUserTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
        userTotal,
        tx_id,
        setTxId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};