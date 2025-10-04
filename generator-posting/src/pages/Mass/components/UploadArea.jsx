import React from 'react';
import { Upload } from 'lucide-react';

function UploadArea({ watermarkImage, onUpload }) {
  return (
    <div className="form-group">
      <label className="form-label">
        Marca D'água (Logo/Avatar)
      </label>
      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="file-input"
          id="watermark-upload"
        />
        <label htmlFor="watermark-upload" className="upload-label">
          {watermarkImage ? (
            <div className="upload-success">
              <img 
                src={watermarkImage.src} 
                alt="Marca d'água" 
                className="preview-image"
              />
              <p className="success-text">Imagem carregada!</p>
            </div>
          ) : (
            <div className="upload-placeholder">
              <Upload className="upload-icon" />
              <p className="upload-text">Clique para carregar</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}

export default UploadArea;