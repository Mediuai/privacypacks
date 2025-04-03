import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { IoCloseCircleSharp } from "react-icons/io5";

const Cart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, addItem, removeItem, clearCart, total, userTotal } = useCart();


  return (
    <div className={`fixed flex flex-col bottom-0 right-0 w-90 h-full bg-white p-4 transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="  flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoCloseCircleSharp size={24} />
        </button>
      </div>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-black">Carrinho</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">O carrinho está vazio.</p>
        ) : (
          <div className="mt-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src={item.imagem} alt={item.nome} className="w-10 h-10 rounded-full" />
                  <span className="text-[#ff2056]">{item.nome}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeItem(item.id)} className="text-black hover:text-gray-700">-</button>
                  <span className="text-black">{item.amount}</span>
                  <button onClick={() => addItem(item)} className="text-black hover:text-gray-700">+</button>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-red-500 hover:text-red-700">Limpar carrinho</button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between mt-auto">
        <div className="flex justify-between mb-4">
          <p className="text-black text-xl">Total</p>
          <p className="text-black text-xl">{userTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
        <Link href="/checkout" className="bg-[#ff2056] text-white px-4 py-2 rounded-md">Finalizar compra</Link>
      </div>
    </div>
  );
};

export default Cart;
