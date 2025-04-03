'use client'

import Cart from "@/components/Cart";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";

const produtos = [
  {
    id: 1,
    nome: "Pack Black",
    imagem: "/product-1.gif",
    valor: 9.99,
    pix: 999
  },
  {
    id: 2,
    nome: "Pack White",
    imagem: "/product-2.gif",
    valor: 19.90,
    pix: 1990
  },
  {
    id: 3,
    nome: "Pack Red",
    imagem: "/product-3.gif",
    valor: 15.90,
    pix: 1590
  },

];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem } = useCart();
  const handleAddToCart = (product: any) => {
    addItem(product);
  }

  return (
    <>
      <div className="min-h-screen relative bg-black">
        {/* Background com imagens de modelos */}
        <div className="absolute inset-0 z-0">
          <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#f6339a73] to-[#ff205600]"></div>

          <div className="grid grid-cols-5 h-full">
            <div className="relative">
              <Image
                src="/model-1.jpg"
                alt="Model"
                fill
                className="object-cover brightness-50"
              />
            </div>
            <div className="relative">
              <Image
                src="/model-2.jpg"
                alt="Model"
                fill
                className="object-cover brightness-50"
              />
            </div>
            <div className="relative">
              <Image
                src="/model-3.jpg"
                alt="Model"
                fill
                className="object-cover brightness-50"
              />
            </div>
            <div className="relative">
              <Image
                src="/model-4.jpg"
                alt="Model"
                fill
                className="object-cover brightness-50"
              />
            </div>
            <div className="relative">
              <Image
                src="/model-5.jpg"
                alt="Model"
                fill
                className="object-cover brightness-50"
              />
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="relative z-10">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              </div>
              <h2 className="text-white text-xl font-semibold">Privacy Packs</h2>
            </div>

            <div className="flex items-center gap-4 hidden md:flex">
              <div className="bg-white/10 backdrop-blur-sm rounded-full py-1 px-4">
                <ul className="flex gap-6">
                  <li><a href="#" className="text-white text-sm">Home</a></li>
                  <li><a href="#" className="text-white text-sm">Packs</a></li>

                  <li><a href="#" className="text-white text-sm">About</a></li>

                </ul>
              </div>

              <div className="flex items-center gap-3">
                <button className="text-white text-sm">Login</button>
                <button onClick={() => setIsCartOpen(true)} className="bg-pink-600 text-white text-sm px-4 py-1.5 rounded-full">
                  Carrinho
                </button>

              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4">


          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Veja conteúdos exclusivos para você.
          </h1>


          {/* CTA Button */}
          <button className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-700 transition-colors">
            Ver agora!
          </button>
          <div className="w-full mx-auto px-90 mt-10">
            <video src="/VID_20241229_012418_730.mp4" controls autoPlay loop playsInline className="w-full h-full object-cover border-2 border-pink-700 rounded-3xl"></video>
          </div>

          {/* Seção de Categorias */}
          <div className="w-full max-w-7xl mx-auto mt-20 px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Packs</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtos.map((produto) => (
                <div key={produto.id} className="relative group">
                  <h2 className="text-white z-10 bg-black/50 backdrop-blur-sm px-4 rounded-full text-xl font-bold absolute top-4 left-4">{produto.nome}</h2>
                  <div className="relative h-80 sm:h-92 rounded-3xl overflow-hidden">
                    <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">

                      <h3 className="text-white text-xl font-bold ">{produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                      <button onClick={() => handleAddToCart(produto)} className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 transition-colors text-white px-4 py-2 rounded-full text-sm flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-black/40 backdrop-blur-sm mt-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Coluna 1 - Logo e Descrição */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-white text-xl font-semibold">Privacy Packs</h2>
                </div>
                <p className="text-gray-400 text-sm">
                  Os melhores conteúdos exclusivos para você. Acesse agora e aproveite nossos packs especiais.
                </p>
              </div>

              {/* Coluna 2 - Links Rápidos */}
              <div>
                <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Home</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Packs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Sobre</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">FAQ</a></li>
                </ul>
              </div>

              {/* Coluna 3 - Suporte */}
              <div>
                <h3 className="text-white font-semibold mb-4">Suporte</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Política de Privacidade</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-500 text-sm transition-colors">Contato</a></li>
                </ul>
              </div>

              {/* Coluna 4 - Newsletter */}
              <div>
                <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-4">Receba novidades e ofertas exclusivas.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="bg-white/10 text-white rounded-full px-4 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full text-sm transition-colors">
                    Enviar
                  </button>
                </div>
              </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  © 2024 Privacy Packs. Todos os direitos reservados.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
}
