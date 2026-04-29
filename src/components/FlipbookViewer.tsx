import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker URL - Using unpkg for reliability
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface Props {
  pdfUrl: string;
  paginaInicial: number;
}

const FlipbookViewer: React.FC<Props> = ({ pdfUrl, paginaInicial }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(paginaInicial || 1);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.1);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdf && currentPage <= numPages) {
      renderPage(currentPage);
    }
  }, [pdf, currentPage, scale]);

  const renderPage = async (pageNumber: number) => {
    if (!pdf || !canvasRef.current) return;

    try {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: window.innerWidth < 768 ? scale * 0.8 : scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#fdfcf8] p-4 md:p-8 font-serif-body">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-ee-terracotta animate-pulse font-poppins tracking-widest uppercase text-sm">Cargando revista...</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl flex justify-between items-center mb-8 sticky top-4 z-20 bg-[#fdfcf8]/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-ee-sand/20">
            <button
              onClick={prevPage}
              disabled={currentPage <= 1}
              className="bg-ee-terracotta text-white px-4 md:px-6 py-2 rounded-sm text-sm font-poppins uppercase tracking-widest disabled:opacity-30 hover:bg-ee-brown-dark transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              <span className="hidden md:inline">Anterior</span>
            </button>
            
            <div className="text-ee-brown-dark font-dm-serif text-lg md:text-xl">
              Página {currentPage} de {numPages}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage >= numPages}
              className="bg-ee-terracotta text-white px-4 md:px-6 py-2 rounded-sm text-sm font-poppins uppercase tracking-widest disabled:opacity-30 hover:bg-ee-brown-dark transition-colors flex items-center gap-2"
            >
              <span className="hidden md:inline">Siguiente</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <div className="relative shadow-2xl bg-white border border-ee-sand/10 overflow-hidden mb-12">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
          </div>

          <div className="flex gap-4 mb-12">
             <button 
                onClick={() => setScale(prev => Math.min(prev + 0.2, 3))}
                className="p-2 border border-ee-terracotta text-ee-terracotta hover:bg-ee-terracotta hover:text-white transition-colors"
                title="Aumentar zoom"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
             </button>
             <button 
                onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
                className="p-2 border border-ee-terracotta text-ee-terracotta hover:bg-ee-terracotta hover:text-white transition-colors"
                title="Reducir zoom"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
             </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlipbookViewer;
