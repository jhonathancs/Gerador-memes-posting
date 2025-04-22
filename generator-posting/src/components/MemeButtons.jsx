// File: src/components/MemeButtons.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { toPng } from 'html-to-image'
import '../styles/MemeButtons.css'

/**
 * Componente responsável pelos botões de ação do meme
 * Permite ao usuário baixar a imagem gerada e resetar os campos
 */
function MemeButtons({ setCustomText, setImageSrc, defaultImage, defaultText }) {
  // Verificação básica de props
  if (!setCustomText || !setImageSrc) {
    console.error('Propriedades necessárias não foram fornecidas ao MemeButtons')
    return null
  }

  const handleDownload = () => {
    const memeElement = document.getElementById('meme-preview')
    if (!memeElement) {
      console.error('Elemento meme-preview não encontrado')
      return
    }

    toPng(memeElement)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'meme-safadinho.png'
        link.href = dataUrl
        link.click()
      })
      .catch((error) => {
        console.error('Erro ao gerar a imagem:', error)
      })
  }

  const handleReset = () => {
    setCustomText(defaultText)
    setImageSrc(defaultImage)
  }

  return (
    <div className="buttons">
      <button id="download-btn" onClick={handleDownload}>
        Baixar Meme
      </button>
      <button id="reset-btn" onClick={handleReset}>
        Resetar
      </button>
    </div>
  )
}

// Adicione PropTypes para validação
MemeButtons.propTypes = {
  setCustomText: PropTypes.func.isRequired,
  setImageSrc: PropTypes.func.isRequired,
  defaultImage: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired
}

export default MemeButtons
