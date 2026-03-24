import React, { useState } from 'react';

const SubscriptionForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [tier, setTier] = useState<'free' | 'paid'>('free');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulating API call
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <section className="bg-ee-green-bg relative overflow-hidden py-16 px-8 border-y-8 border-ee-brown-dark/20 text-center">
            {/* Background design elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-ee-terracotta opacity-10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-8">
                <div className="flex flex-col gap-3">
                    <h2 className="font-playfair text-[48px] text-ee-brown-dark leading-tight font-bold selection:bg-ee-terracotta selection:text-white">
                        Suscripción a <span className="text-white italic">EE Estilo Editorial</span>
                    </h2>
                    <p className="font-dm-serif text-ee-subhead text-ee-brown-dark/80 italic max-w-2xl mx-auto">
                        Únete a nuestra comunidad de lectores conscientes para recibir contenido exclusivo y las últimas ediciones digitales de la revista.
                    </p>
                </div>

                <div className="flex bg-white/30 p-1 rounded-none border border-ee-brown-dark/20 w-fit">
                    <button 
                        onClick={() => setTier('free')}
                        className={`px-8 py-3 font-dm-serif-display text-sm uppercase tracking-widest transition-all ${tier === 'free' ? 'bg-ee-brown-dark text-white' : 'hover:bg-ee-brown-dark/10 text-ee-brown-dark opacity-70'}`}
                    >
                        Gratis
                    </button>
                    <button 
                        onClick={() => setTier('paid')}
                        className={`px-8 py-3 font-dm-serif-display text-sm uppercase tracking-widest transition-all ${tier === 'paid' ? 'bg-ee-terracotta text-white shadow-xl' : 'hover:bg-ee-terracotta/10 text-ee-terracotta opacity-70'}`}
                    >
                        Premium
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-4 items-stretch">
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        autoComplete="email"
                        placeholder="tu@email.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-white border-2 border-ee-brown-dark/10 px-6 py-4 font-poppins text-ee-body tracking-wider focus:outline-none focus:border-ee-terracotta transition-colors shadow-inner"
                    />
                    <button 
                        disabled={status === 'loading' || status === 'success'}
                        className={`bg-ee-brown-dark text-white px-12 py-4 font-dm-serif-display uppercase tracking-[0.2em] transform transition-all hover:scale-[1.02] shadow-xl ${status === 'loading' ? 'opacity-50' : status === 'success' ? 'bg-green-700' : ''}`}
                    >
                        {status === 'loading' ? 'Procesando...' : status === 'success' ? '¡Suscrito!' : tier === 'paid' ? 'Comprar Suscripción' : 'Unirme Gratis'}
                    </button>
                </form>

                {status === 'success' && (
                    <p className="font-poppins text-sm text-ee-brown-dark bg-white/40 px-6 py-3 border border-ee-brown-dark/10 animate-fade-in">
                        ¡Gracias por unirte! Revisa tu bandeja de entrada para confirmar tu suscripción.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SubscriptionForm;
