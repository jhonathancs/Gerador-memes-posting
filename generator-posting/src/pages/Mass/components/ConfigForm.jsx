import React from 'react';
import { ImagePlus } from 'lucide-react';
import UploadArea from './UploadArea';

function ConfigForm({ 
  watermarkImage, 
  onWatermarkUpload, 
  displayName, 
  setDisplayName,
  username, 
  setUsername,
  phrases, 
  setPhrases,
  isGenerating,
  onGenerate 
}) {
  return (
    <div className="config-panel">
      <UploadArea 
        watermarkImage={watermarkImage} 
        onUpload={onWatermarkUpload}
      />

      <div className="form-group">
        <label className="form-label">Nome de Exibição</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="text-input"
          placeholder="Safado Citou 😊🔞"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-input"
          placeholder="@safadocitou"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Frases (uma por linha)</label>
        <textarea
          value={phrases}
          onChange={(e) => setPhrases(e.target.value)}
          className="textarea-input"
          placeholder="primeira frase aqui&#x0a;segunda frase aqui&#x0a;terceira frase..."
        />
        <p className="phrase-count">
          {phrases.split('\n').filter(p => p.trim() !== '').length} frases adicionadas
        </p>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !watermarkImage || !phrases.trim()}
        className="generate-button"
      >
        <ImagePlus className="button-icon" />
        {isGenerating ? 'Gerando...' : 'Gerar Todas as Imagens'}
      </button>
    </div>
  );
}

export default ConfigForm;