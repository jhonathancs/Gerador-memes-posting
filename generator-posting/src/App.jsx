// File: src/App.jsx
import { useState, useEffect } from 'react'
import TextInput from './components/TextInput'
import MemePreview from './components/MemePreview'
import MemeButtons from './components/MemeButtons'
import imagemInicial from './images/coringa.jpeg'
import './App.css'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

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

  // Estados com valores do localStorage ou valores padrão
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('profileName') || 'LifeSad'
  })

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'EleGosta_4gmal'
  })

  const [watermark, setWatermark] = useState(() => {
    return localStorage.getItem('watermark') || 'ThugLife'
  })

  // Salva a imagem do perfil no localStorage quando ela mudar
  useEffect(() => {
    localStorage.setItem('profileImage', imageProfile)
  }, [imageProfile])

  // Salva os valores no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('profileName', profileName)
  }, [profileName])

  useEffect(() => {
    localStorage.setItem('userName', userName)
  }, [userName])

  useEffect(() => {
    localStorage.setItem('watermark', watermark)
  }, [watermark])

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

  // Função de reset atualizada
  const handleReset = () => {
    // Reset dos valores
    setProfileName('LifeSad')
    setUserName('EleGosta_4gmal')
    setWatermark('ThugLife')
    
    // Limpa o localStorage
    localStorage.removeItem('profileName')
    localStorage.removeItem('userName')
    localStorage.removeItem('watermark')

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
      <TextInput 
        customText={customText} 
        setCustomText={setCustomText}
        profileName={profileName} // Nova prop
        setProfileName={setProfileName} // Nova prop
        userName={userName}           // Nova prop
        setUserName={setUserName}    // Nova prop
        watermark={watermark}         // Nova prop
        setWatermark={setWatermark}  // Nova prop
      />
      <div className="meme-container">
        <MemeButtons 
          setCustomText={setCustomText}
          setImageSrc={setImageSrc}
          setImageProfile={setImageProfile}
          defaultImage={defaultImage}
          defaultText={defaultText}
          onDownload={handleDownload}
          onReset={handleReset}
          handleImageUpload={handleImageUpload}
          handleProfileImageUpload={handleProfileImageUpload}
        />
        <MemePreview 
          customText={customText} 
          imageSrc={imageSrc}
          imageProfile={imageProfile}
          profileName={profileName} // Nova prop
          userName={userName}         // Nova prop
          watermark={watermark}      // Nova prop
        />
      </div>
      <footer className="footer">
      <p className="footer-text">Desenvolvido por Jhonathancs</p>
        <div className="social-icons">
          <a 
            href="https://github.com/jhonathancs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/jhonathan-cs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://www.instagram.com/jhonathan_jcs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
        </div>
       
      </footer>
    </div>
  )
}

export default App