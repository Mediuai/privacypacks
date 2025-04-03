'use client'
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const images = [
    {
        src: "/c-item1.gif?v=1",
        alt: "Pessoa comendo"
    },
    {
        src: "/c-item2.gif?v=2",
        alt: "Pessoa na moto"
    },
    {
        src: "/product-2.gif?v=1",
        alt: "Tratamento facial"
    },
    {
        src: "/c-item3.gif?v=1",
        alt: "Laranjas"
    },
    {
        src: "/c-item5.gif?v=1",
        alt: "Pessoa na praia"
    },
    {
        src: "/c-item4.gif?v=1",
        alt: "Pessoas dançando"
    },
];

export default function Pack() {
    const { addItem, clearCart } = useCart();
    const router = useRouter();
    const [video1Ended, setVideo1Ended] = useState(false);
    const [video2Ended, setVideo2Ended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Data final (30 minutos a partir de agora)
        clearCart();
        const endDate = new Date();
        endDate.setMinutes(endDate.getMinutes() + 30);

        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
            if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdown);
                document.getElementById('countdown')!.innerHTML = "SITE OFFLINE";
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleVideoEnd = (videoNumber: number) => {
        if (videoNumber === 1) {
            setVideo1Ended(true);
        } else {
            setVideo2Ended(true);
        }
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.target as HTMLVideoElement;
        if (video.currentTime >= video.duration / 2 && !video1Ended) {
            setVideo1Ended(true);
        }
    };

    const handleAddToCart = () => {
        if (isLoading) return;

        setIsLoading(true);
        localStorage.setItem("pack", "true");
        addItem({
            id: 9999,
            nome: "Premium Pack",
            valor: 19.90,
            imagem: "/c-item7.gif",
            pix: 1990,
            amount: 1,
        });

        router.push("/checkout");
    };
    return (
        <>

            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center ">
            <div className="bg-red-900/50 w-full text-center backdrop-blur-sm p-2 flex justify-center items-center space-x-2">
    <h3 className="text-white text-lg font-bold mb-0">O site vai sair do ar em</h3>
    <div id="countdown" className="text-white text-lg font-bold mb-0">
        <span id="minutes">00</span>m <span id="seconds">00</span>s
    </div>
</div>

                <div className="overflow-x-auto flex">
                    <img
                        src='/novinha-y.gif?v=1'
                        alt='Pessoa comendo'
                        className="object-cover shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-1/3 h-[300px]"
                    />
                    <img
                        src='/c-item7.gif'
                        alt='Pessoa comendo'
                        className="object-cover shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-1/3 h-[300px]"
                    />
                    <img
                        src='/c-item6.gif?v=1'
                        alt='Pessoa comendo'
                        className="object-cover shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-1/3 h-[300px]"
                    />
                </div>
                <div className="max-w-4xl px-5 mx-auto text-center relative">
                    <h1 className="text-xl md:text-7xl font-bold text-white mt-6 mb-6">
                    Está afim de ver coisas diferentes? O que acha de ver umas novinhas? Umas perdendo a virgindade com 14 e 15 aninhos, outras sendo gravadas escondidas, e dormindo.
                    </h1>

                    <img src="/content-2.png?v=10" alt="" className="w-full h-full object-contain" />
                    <p className="text-md md:text-2xl text-white/90 mb-8 pt-10">
                        Tenha acesso exclusivo a vídeos que ninguém mais oferece. Satisfaça sua curiosidade com total segurança e discrição!
                    </p>


                    <p className="text-xl md:text-2xl text-white/90 mb-8 ">
                    SIGILO TOTAL, NÃO PEDIMOS SEUS DADOS.
                    </p>
                    <div className="relative px-10">
                        <video
                            src="/0323.mp4"
                            controls
                            autoPlay
                            playsInline
                            className="mt-10 w-full h-full object-cover"
                            onEnded={() => handleVideoEnd(1)}
                            onTimeUpdate={handleTimeUpdate}
                        ></video>
                        {video1Ended && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                    className={`bg-[#f6339a] hover:bg-[#d42a85] text-white text-xl font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'Processando...' : 'Continuar Vendo'}
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-white/90 my-10 text-2xl ">
                        Você vai ver <b>NOVINHAS GOSTOSAS</b> perdendo o cabaço, e muito mais! Aqui é sem limites.
                    </p>

                    <div className="flex items-center mb-12  flex-col lg:flex-row justify-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <a href="#content" rel="noopener noreferrer" className="w-full h-[500px] lg:w-1/3 flex items-center justify-center">
                            <img src="/content-1.png?v=3" alt="Premium Pack" className="w-full h-full object-contain" />
                        </a>
                        <a href="#content" rel="noopener noreferrer" className="w-full h-[500px] lg:w-1/3 flex items-center justify-center">
                            <img src="/galeria 02.webp?v=3" alt="Premium Pack" className="mb-29 w-full h-full object-contain" />
                        </a>
                    </div>
                

                    <p className="text-white/90 my-10 text-xl">
                        Não perca essa oportunidade o site vai sair do ar em breve!.
                    </p>


                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-5">
                        <div className="bg-red-900/50 backdrop-blur-sm p-2 rounded-lg">
                            <h3 className="text-white text-xl font-bold mb-2">Pessoas que já compraram</h3>
                            <div className="text-white text-2xl font-bold">
                                <span id="sales">5150</span>
                            </div>
                        </div>
                    </div>

                    <div id="content" className="space-y-6 px-5 bg-[#7907168a] backdrop-blur-sm rounded-lg p-6 border-2 border-red-900">
                        <p className="text-white/90 text-2xl font-bold">Acesso Exclusivo por Tempo Limitado!</p>
                        <p className="text-white/90">Conteúdos de novinhas de 18 anos: vídeos, fotos e muito mais.</p>
                        <p className="text-white/90 text-xl line-through">De R$ 99,99</p>

                        <div className="text-3xl md:text-4xl font-bold text-white">
                            R$ 19,90
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={isLoading}
                            className={`bg-red-600 hover:bg-[#d42a85] text-white text-xl font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Processando...' : 'Comprar Agora'}
                        </button>
                    </div>



                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">

                        <div className="p-4">
                            <h3 className="font-semibold mb-2">Acesso Imediato</h3>
                            <p>Receba o acesso instantâneo após a compra</p>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-2">Suporte Premium</h3>
                            <p>Atendimento prioritário para dúvidas</p>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-2">Garantia Total</h3>
                            <p>7 dias de garantia incondicional</p>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-2">Segurança</h3>
                            <p>Todo conteúdo são de maiores de 18 anos</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
