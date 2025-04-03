"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Script from "next/script";

export default function SuccessPage() {
  const [pack, setPack] = useState(false);
  const { clearCart } = useCart();
  const [isCartCleared, setIsCartCleared] = useState(false);

  useEffect(() => {
    if (!isCartCleared) {
      // Verifique se o clearCart já foi chamado
      clearCart();
      setIsCartCleared(true); // Marque que o carrinho foi limpo
    }

    // Verifique o valor de 'pack' no localStorage
    const packValue = localStorage.getItem("pack");
    if (packValue === "true") {
      setPack(true); // Só define como true se o pack estiver no localStorage com o valor 'true'
    }
  }, [clearCart, isCartCleared]);

  const handleAccessContent = () => {
    localStorage.removeItem("pack");
    window.location.assign("https://packprivacy.com.br/paloma/");
  };

  return (
    <>
      {/* Meta Pixel Script */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '632447286090858'); // Novo ID 1
          fbq('init', '4093944730836053'); // Novo ID 2
          fbq('track', 'PageView'); // Evento PageView
          fbq('track', 'Purchase', {
              value: 19.99,
              currency: 'BRL'
          }); // Evento Purchase com valor fixo
        `}
      </Script>
      {/* Noscript para o Pixel */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=615863191427427&ev=PageView&noscript=1"
        />
      </noscript>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#f6339a73] to-[#ff205600]">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <svg
              className="w-20 h-20 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pagamento Confirmado!
          </h1>

          <p className="text-gray-600 mb-6">
            Obrigado pela sua compra. Clique no botão abaixo para acessar o
            conteúdo.
          </p>

          {pack && (
            <a
              className="bg-pink-500 cursor-pointer text-white px-4 py-2 rounded-md"
              onClick={handleAccessContent}
            >
              Acessar Conteúdo
            </a>
          )}

          <div className="animate-pulse">
            <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}