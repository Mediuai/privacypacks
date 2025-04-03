"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { useCart } from "@/context/CartContext";
import { generatePayment, qrCodeStatus } from "@/services/generatePayment";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  nome: string;
  price: number;
  image: string;
  amount: number;
}

interface CartItem {
  id: number;
  nome: string;
  valor: number;
  imagem: string;
  pix: number;
  amount: number;
}

export default function CheckoutPage() {
  const [showPixCode, setShowPixCode] = useState(false);
  const { items, total, userTotal, addItem, removeItem, setTxId } = useCart();
  const [pixCode, setPixCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const [email, setEmail] = useState(""); // Novo estado para o e-mail

  useEffect(() => {
    if (total === 0) {
      router.push("/pack");
    }
  }, [total]);

  const checkPaymentStatus = async () => {
    if (!transactionId) return;
    try {
      const status = await qrCodeStatus(transactionId);
      if (status.status === "paid") {
        setTxId(status.id);
        router.push("/success");
      }
    } catch (error) {
      console.error("Erro ao verificar status do pagamento:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showPixCode && transactionId) {
      interval = setInterval(checkPaymentStatus, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [transactionId, showPixCode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPixCode && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showPixCode, timeLeft]);

  const handleFinalizarCompra = async () => {
    if (!email) {
      alert("Por favor, insira seu e-mail antes de continuar.");
      return;
    }
    setIsPaymentStarted(true);
    setShowPixCode(true);
    const response = await generatePayment(total);
    setPixCode(response.qr_code);
    setQrCode(response.qr_code_base64);
    setTransactionId(response.id);
    setTimeLeft(600);
  };

  const handleAddToCart = (item: Product) => {
    if (isLoading) return;
    setIsLoading(true);
    const existingItem = items.find((cartItem) => cartItem.id === item.id);
    if (!existingItem) {
      addItem({
        id: item.id,
        nome: item.nome,
        imagem: item.image,
        valor: item.price,
        pix: item.price * 100,
        amount: 1,
      });
    } else {
      addItem({
        ...existingItem,
        amount: existingItem.amount + 1,
      });
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setShowPixCode(false);
    setCopySuccess(false);
    setTimeLeft(600);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 12000);
  };

  const availableProducts: Product[] = [
    {
      id: 999,
      nome: "Novinhas 10 e 11",
      price: 14.99,
      image: "/3333.jpg",
      amount: 1,
    },
    {
      id: 1000,
      nome: "Novinhas 12 a 14",
      price: 12.99,
      image: "/oder-bump2.webp?v=1",
      amount: 1,
    },
  ];

  const filteredProducts = availableProducts.filter(
    (product) => !items.some((item) => item.id === product.id)
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
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
          fbq('init', '632447286090858');
          fbq('init', '4093944730836053');
          fbq('track', 'PageView');
          fbq('track', 'InitiateCheckout');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=615863191427427&ev=PageView&noscript=1"
        />
      </noscript>

      <div className="absolute inset-0 z-0">
        <div className="z-10 absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#f6339a73] to-[#ff205600]">
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white/60 backdrop-blur-lg rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Finalizar Compra
              </h1>
              <div className="mb-8">
                {!isPaymentStarted && filteredProducts.length > 0 && (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Adicione mais ao seu carrinho
                    </h2>
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm mb-4"
                      >
                        <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.nome}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {product.nome}
                          </h3>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-900 text-lg font-medium line-through">
                              R$ {(product.price + 51.01).toFixed(2)}
                            </p>
                            <p className="text-gray-900 text-lg font-medium">
                              R$ {product.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={isLoading}
                            className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-auto"
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Conteúdo Adicionado
                </h2>
                <div className="space-y-4 max-h-75 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.imagem}
                          alt={item.nome}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.nome}
                        </h3>
                        <p className="text-gray-900 font-medium">
                          R$ {item.valor.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.id !== 9999 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200 mb-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      R$ {userTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="space-y-4">
                  {/* Campo de entrada para o e-mail */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 mb-1"
                    >
                      Seu e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite seu e-mail"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-black" // bg-white para fundo branco, text-black para texto preto
                      required
                    />
                  </div>
                  <button
                    onClick={handleFinalizarCompra}
                    // Desabilita o botão se o e-mail estiver vazio
                    className={`w-full py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                      email
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-600 text-white" // Mantém a cor normal, mesmo quando desabilitado
                    }`}
                  >
                    Pagar com PIX
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do PIX com Cronômetro */}
      {showPixCode && qrCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div
            className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src="/header-pagamento.webp"
              alt="Imagem de topo"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="px-4 py-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Pagamento PIX
              </h3>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Tempo restante para pagamento:{" "}
                  <span className="font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </span>
                </p>
                {timeLeft === 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    O tempo expirou! Gere um novo código PIX.
                  </p>
                )}
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-md">
                    <img src={qrCode} alt="QR Code" className="w-full h-full" />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleCopyCode}
                    className={`mb-3 text-sm font-medium ${
                      copySuccess
                        ? "bg-green-600 text-white"
                        : "bg-pink-600 text-white"
                    } hover:bg-opacity-90 rounded-lg py-2 px-4 transition-all duration-200`}
                  >
                    {copySuccess ? "PIX copiado!" : "Copiar código"}
                  </button>
                  <div className="bg-white p-2 rounded-lg border border-gray-200">
                    <p className="text-xs font-mono break-all text-black">
                      {pixCode}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-600 text-center">
                Abra o app do seu banco e escaneie o QR Code ou cole o código
                PIX
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}