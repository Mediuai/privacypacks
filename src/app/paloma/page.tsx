"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script"; // Importa o componente Script do Next.js
import Pack from "../pack/page";

export default function Whatsapp() {
  const [showPack, setShowPack] = useState(false);
  const router = useRouter(); // Adicionei o useRouter para consistência, embora não seja usado diretamente aqui

  useEffect(() => {
    function getUrlParameter(name: string) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    const zuck = getUrlParameter("zuck");
    const utmSource = getUrlParameter("utm_source");
    const utmCampaign = getUrlParameter("utm_campaign");

    if (zuck === "ativo") {
      setShowPack(true);
    } else if (utmSource === "fb" && utmCampaign) {
      if (!zuck || zuck === "" || zuck !== "ativo") {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("zuck", "ativo");
        window.location.href = newUrl.href;
      }
    }

    function fetchContent(url: string) {
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          document.body.innerHTML = data;
        })
        .catch((error) => console.error("Erro ao carregar conteúdo:", error));
    }
  }, []);

  if (showPack) {
    return <Pack />;
  }

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
                    fbq('track', 'PageView');
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

      <div className="w-full h-full bg-black flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex flex-col items-center">
            <img
              src="/self.jpg"
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Maria Silva
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Olá! Fale comigo para mais informações sobre nossos produtos.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
              Fale comigo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
