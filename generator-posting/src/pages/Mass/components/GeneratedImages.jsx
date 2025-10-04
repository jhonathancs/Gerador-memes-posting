import React from 'react';
import { Download } from 'lucide-react';

function GeneratedImages({ images, onDownload, onDownloadAll }) {
  if (images.length === 0) return null;

  return (
    <div className="results-panel">
      <div className="results-header">
        <h2 className="panel-title">
          Imagens Geradas ({images.length})
        </h2>
        <button onClick={onDownloadAll} className="download-all-button">
          <Download className="button-icon" />
          Baixar Todas
        </button>
      </div>

      <div className="images-grid">
        {images.map((img) => (
          <div key={img.index} className="image-card">
            <img 
              src={img.url} 
              alt={`Post ${img.index}`}
              className="card-image"
            />
            <div className="card-footer">
              <p className="card-phrase" title={img.phrase}>
                {img.phrase}
              </p>
              <button
                onClick={() => onDownload(img.url, img.index)}
                className="download-button"
              >
                <Download className="download-icon" />
                Baixar #{img.index}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedImages;