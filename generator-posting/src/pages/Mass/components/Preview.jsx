import React from 'react';

function Preview({ generatedImages }) {
  return (
    <div className="preview-panel">
      <h2 className="panel-title">Preview</h2>
      {generatedImages.length > 0 ? (
        <div className="preview-content">
          <img 
            src={generatedImages[0].url} 
            alt="Preview" 
            className="preview-main-image"
          />
          <p className="preview-caption">
            Exemplo da primeira imagem gerada
          </p>
        </div>
      ) : (
        <div className="preview-empty">
          <p>Preview aparecerá aqui</p>
        </div>
      )}
    </div>
  );
}

export default Preview;