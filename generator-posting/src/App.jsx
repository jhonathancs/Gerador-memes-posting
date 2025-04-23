// File: src/App.jsx
import { useState, useEffect } from 'react'
import TextInput from './components/TextInput'
import MemePreview from './components/MemePreview'
import MemeButtons from './components/MemeButtons'
import imagemInicial from './images/coringa.jpeg'
import './App.css'

function App() {
  // Configurações iniciais
  const defaultText = 'POV: " Você fuma muito? "\n\nEu às 6:00 da manhã:'
  const initialImage = imagemInicial

  const [defaultImage, setDefaultImage] = useState(initialImage)
  
  // Recupera a imagem do perfil do localStorage ou usa a imagem inicial
  const [imageProfile, setImageProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profileImage')
    return savedProfile || initialImage
  })
  
  const [customText, setCustomText] = useState(defaultText)
  const [imageSrc, setImageSrc] = useState(defaultImage)

  // Salva a imagem do perfil no localStorage quando ela mudar
  useEffect(() => {
    localStorage.setItem('profileImage', imageProfile)
  }, [imageProfile])

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
    // Reset do texto
    setCustomText(defaultText)
    
    // Reset das imagens
    setDefaultImage(initialImage)
    setImageSrc(initialImage)
    setImageProfile(initialImage)
    
    // Limpa o localStorage
    localStorage.removeItem('profileImage')
    
    // Opcional: Adiciona feedback visual
    alert('Todas as configurações foram restauradas!')
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

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setImageProfile(base64String)
        localStorage.setItem('profileImage', base64String)
      }
      reader.readAsDataURL(file)
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
            id="post-image-upload" // ID único para post
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <input
            type="file"
            id="profile-image-upload" // ID único para profile
            accept="image/*"
            onChange={handleProfileImageUpload} // Novo handler
            style={{ display: 'none' }}
          />
          <label htmlFor="post-image-upload" className="upload-button-post">
            Escolher Imagem Post
          </label>
          <label htmlFor="profile-image-upload" className="upload-button-profile">
            Escolher Imagem Perfil
          </label>
        </div>
        <MemePreview 
          customText={customText} 
          imageSrc={imageSrc}
          imageProfile={imageProfile} // Adicionar esta prop
        />
        <div className="buttons-container mt-4">
          <MemeButtons 
            setImageProfile={setImageProfile}
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