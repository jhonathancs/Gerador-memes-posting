// File: src/App.jsx
import { useState } from 'react'
import TextInput from './components/TextInput'
import MemePreview from './components/MemePreview'
import MemeButtons from './components/MemeButtons'
import imagemInicial from './images/coringa.jpeg'
import './App.css'

function App() {
  const defaultText = 'POV: " Você fuma muito? "\n\nEu às 6:00 da manhã:'
  const [defaultImage, setDefaultImage] = useState(imagemInicial)
  
  const [customText, setCustomText] = useState(defaultText)
  const [imageSrc, setImageSrc] = useState(defaultImage)

  const handleDownload = () => {
    const meme = document.getElementById('meme-preview')
    if (!meme) {
      console.error('Elemento meme-preview não encontrado')
      return
    }

    import('html-to-image').then(({ toPng }) => {
      toPng(meme)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'meme-safadinho.png'
          link.href = dataUrl
          link.click()
        })
        .catch((error) => {
          console.error('Erro ao gerar a imagem:', error)
        })
    })
  }

  const handleReset = () => {
    setCustomText(defaultText)
    setImageSrc(defaultImage)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setDefaultImage(imageUrl) // Atualiza a imagem padrão
      setImageSrc(imageUrl)    // Atualiza a imagem atual
      alert('Nova imagem definida como padrão!')
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">Gerador de Posting</h1>
      <TextInput customText={customText} setCustomText={setCustomText} />
      <div className="meme-container">
        <div className="image-upload-container">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="upload-button-post">
            Escolher Imagem Post
          </label>
          <label htmlFor="image-upload" className="upload-button-profile">
            Escolher Imagem Perfil
          </label>
        </div>
        <MemePreview customText={customText} imageSrc={imageSrc} />
        <div className="buttons-container mt-4">
          <MemeButtons 
            setCustomText={setCustomText}
            setImageSrc={setImageSrc}
            defaultImage={defaultImage}
            defaultText={defaultText}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  )
}

export default App