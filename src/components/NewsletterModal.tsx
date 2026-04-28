import React, { useState, useEffect } from 'react';

const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    terms: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-newsletter-modal', handleOpen);
    return () => window.removeEventListener('open-newsletter-modal', handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setStatus('idle');
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) return;
    
    setStatus('loading');
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ 
          "form-name": "newsletter-subscription",
          ...formData 
        })
      });
      setStatus('success');
      setTimeout(() => closeModal(), 3000);
    } catch (error) {
      console.error("Netlify Form Error:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-300 p-8 md:p-10">

        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-ee-terracotta transition-colors"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 className="font-dm-serif-display text-2xl text-ee-brown-dark mb-2">¡Gracias por sumarte!</h3>
            <p className="font-poppins text-gray-600 text-sm">Ya eres parte de nuestra comunidad consciente.</p>
          </div>
        ) : (
          <>
            <h2 className="font-dm-serif-display text-2xl md:text-3xl text-ee-brown-dark mb-4 leading-tight">
              Suscríbete a nuestro newsletter y sé parte del cambio
            </h2>
            <p className="font-dm-serif text-sm md:text-base text-gray-600 italic mb-8">
              ¡Sumate a nuestra comunidad y recibe en tu correo una selección de nuestro contenido!
            </p>

            <form 
              name="newsletter-subscription"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              {/* Netlify hidden field */}
              <input type="hidden" name="form-name" value="newsletter-subscription" />
              <p className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
              </p>
              <div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre *"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="w-full border border-gray-200 px-4 py-3 text-sm font-poppins focus:outline-none focus:border-ee-terracotta transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos *"
                  required
                  value={formData.apellidos}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="w-full border border-gray-200 px-4 py-3 text-sm font-poppins focus:outline-none focus:border-ee-terracotta transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full border border-gray-200 px-4 py-3 text-sm font-poppins focus:outline-none focus:border-ee-terracotta transition-colors"
                />
              </div>
              
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-1 accent-ee-terracotta"
                />
                <span className="text-[11px] text-gray-500 font-poppins group-hover:text-gray-700 transition-colors">
                  Acepto los términos legales *
                </span>
              </label>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#f39c12] hover:bg-[#e67e22] text-white px-10 py-2 font-dm-serif-display text-xs uppercase tracking-widest transition-colors shadow-md disabled:opacity-50"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
