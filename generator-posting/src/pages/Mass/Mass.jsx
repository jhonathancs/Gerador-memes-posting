import React, { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import Preview from './components/Preview';
import GeneratedImages from './components/GeneratedImages';
import { generateImage } from './utils/imageGenerator';
import './styles.css';

function Mass() {
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [phrases, setPhrases] = useState('');
  const [username, setUsername] = useState('@seu_usuario');
  const [displayName, setDisplayName] = useState('Seu Nome 😊🔞');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleWatermarkUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setWatermarkImage(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImages = async () => {
    if (!watermarkImage || !phrases.trim()) {
      alert('Por favor, carregue uma marca d\'água e adicione frases!');
      return;
    }

    setIsGenerating(true);
    const phraseList = phrases.split('\n').filter(p => p.trim() !== '');
    const images = [];

    for (let i = 0; i < phraseList.length; i++) {
      const image = await generateImage(
        watermarkImage, 
        phraseList[i], 
        displayName, 
        username, 
        i
      );
      images.push(image);
    }

    setGeneratedImages(images);
    setIsGenerating(false);
  };

  const downloadImage = (url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `post_${index}.png`;
    link.click();
  };

  const downloadAll = () => {
    generatedImages.forEach((img, index) => {
      setTimeout(() => {
        downloadImage(img.url, img.index);
      }, index * 300);
    });
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="app-title">
          Gerador de Posts em Lote 🎨
        </h1>

        <div className="main-grid">
          <ConfigForm
            watermarkImage={watermarkImage}
            onWatermarkUpload={handleWatermarkUpload}
            displayName={displayName}
            setDisplayName={setDisplayName}
            username={username}
            setUsername={setUsername}
            phrases={phrases}
            setPhrases={setPhrases}
            isGenerating={isGenerating}
            onGenerate={handleGenerateImages}
          />

          <Preview generatedImages={generatedImages} />
        </div>

        <GeneratedImages
          images={generatedImages}
          onDownload={downloadImage}
          onDownloadAll={downloadAll}
        />
      </div>
    </div>
  );
}

export default Mass;