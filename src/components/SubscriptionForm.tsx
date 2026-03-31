import React, { useState } from 'react';

const SubscriptionForm: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => setStatus('success'), 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="bg-ee-green-bg relative overflow-hidden py-12 md:py-16 px-4 md:px-8 border-y-8 border-ee-brown-dark/20 text-center">
            <div className="absolute top-10 left-10 w-40 h-40 bg-ee-terracotta opacity-10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>

            <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
                <div className="flex flex-col gap-3">
                    <h2 className="font-playfair text-2xl md:text-4xl lg:text-[48px] text-ee-brown-dark leading-tight font-bold selection:bg-ee-terracotta selection:text-white">
                        Suscribite a <span className="text-white italic">Entre Eras</span>
                    </h2>
                    <p className="font-dm-serif text-base md:text-lg text-ee-brown-dark/80 italic max-w-2xl mx-auto">
                        Únete a nuestra comunidad de lectores conscientes para recibir contenido exclusivo y las últimas ediciones digitales de la revista.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 md:gap-4 items-stretch max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <input 
                            id="nombre"
                            name="nombre"
                            type="text" 
                            placeholder="Nombre" 
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                            className="bg-white border-2 border-ee-brown-dark/10 px-4 md:px-6 py-3 md:py-4 font-poppins text-sm md:text-base tracking-wider focus:outline-none focus:border-ee-terracotta transition-colors shadow-inner"
                        />
                        <input 
                            id="apellido"
                            name="apellido"
                            type="text" 
                            placeholder="Apellido" 
                            required
                            value={formData.apellido}
                            onChange={handleChange}
                            className="bg-white border-2 border-ee-brown-dark/10 px-4 md:px-6 py-3 md:py-4 font-poppins text-sm md:text-base tracking-wider focus:outline-none focus:border-ee-terracotta transition-colors shadow-inner"
                        />
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            placeholder="tu@email.com" 
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-white border-2 border-ee-brown-dark/10 px-4 md:px-6 py-3 md:py-4 font-poppins text-sm md:text-base tracking-wider focus:outline-none focus:border-ee-terracotta transition-colors shadow-inner"
                        />
                    </div>
                    <button 
                        disabled={status === 'loading' || status === 'success'}
                        className={`bg-ee-brown-dark text-white px-8 py-3 md:py-4 font-dm-serif-display text-sm md:text-base uppercase tracking-[0.2em] transform transition-all hover:scale-[1.02] shadow-xl ${status === 'loading' ? 'opacity-50' : status === 'success' ? 'bg-green-700' : ''}`}
                    >
                        {status === 'loading' ? 'Procesando...' : status === 'success' ? '¡Suscrito!' : 'Unirme Gratis'}
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