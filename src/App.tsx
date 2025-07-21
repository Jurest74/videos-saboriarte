import React, { useState, useRef } from 'react';
import { Play, Download, Loader2, CheckCircle, Video } from 'lucide-react';

function App() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Ruta del video local - Coloca tu video en la carpeta public/
  const videoUrl = '/videoprueba.mp4';
  const videoTitle = 'Clidddck para Ver tu Sorpresa';

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Crear elemento de descarga
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      
      // Crear URL temporal para la descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoTitle.replace(/\s+/g, '_')}.mp4`;
      
      // Disparar descarga
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
      
    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Error al descargar el video. Por favor, inténtalo de nuevo.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-sm">SABOR</span><span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-sm">Y</span><span className="bg-gradient-to-r from-red-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-sm">ARTE</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent font-extrabold italic">LUISA</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Haz Click para Ver tu Sorpresa
            </h3>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Este es un mensaje lleno de amor y sabor, hecho especialmente para ti
            </p>
          </div>

          {/* Video Container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden mb-12">
            <div className="relative group">
              <div className="w-full bg-black rounded-t-3xl h-64 sm:h-80 md:h-96">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover md:object-contain"
                  controls
                  preload="metadata"
                  poster="/video-poster.svg"
                  style={{ borderRadius: '24px 24px 0 0' }}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              
              {/* Play overlay button - only show on desktop hover when paused */}
              {!playing && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 md:group-hover:opacity-100 transition-all duration-500 pointer-events-none md:pointer-events-auto"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-6 hover:scale-110 transition-all duration-300 shadow-2xl">
                    <Play className="text-white w-12 h-12 ml-1" />
                  </div>
                </button>
              )}
            </div>
          </div>

                      <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-lg mt-4 mb-8">
              <div className="flex items-center justify-center text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">💡</span>
                </div>
                <p className="text-lg">
                  Tienes 6 horas para descargar el video antes de que se elimine automáticamente.
                  
                </p>
              </div>
            </div>

          {/* Download Section */}
          <div className="text-center space-y-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
                  Descargar Video
                </span>
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Obtén el video completo en calidad original para verlo sin conexión
              </p>
              
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`
                  group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-lg
                  transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/50
                  shadow-2xl hover:shadow-orange-500/25
                  ${downloadComplete 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : isDownloading
                    ? 'bg-gray-600/50 cursor-not-allowed text-gray-300'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                  }
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  {downloadComplete ? (
                    <>
                      <CheckCircle className="w-7 h-7 mr-3" />
                      ¡Descarga Completa!
                    </>
                  ) : isDownloading ? (
                    <>
                      <Loader2 className="w-7 h-7 mr-3 animate-spin" />
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Download className="w-7 h-7 mr-3 group-hover:animate-bounce" />
                      Descargar Video
                    </>
                  )}
                </div>
              </button>
              
              {!isDownloading && !downloadComplete && (
                <div className="mt-6 flex items-center justify-center space-x-6 text-gray-500 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Formato: MP4
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Calidad: Original
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;