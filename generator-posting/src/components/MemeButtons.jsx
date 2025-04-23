// File: src/components/MemeButtons.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { toPng } from 'html-to-image'
import '../styles/MemeButtons.css'

/**
 * Componente responsável pelos botões de ação do meme
 * Permite ao usuário baixar a imagem gerada, resetar os campos e fazer upload de imagens
 */
function MemeButtons({ 
  setCustomText, 
  setImageSrc, 
  setImageProfile,
  defaultImage, 
  defaultText, 
  onDownload, 
  onReset, 
  handleImageUpload,
  handleProfileImageUpload 
}) {

  return (
    <div className="button-container">
      {/* Grupo de botões de upload */}
      <div className="button-row">
        <div className="button-group">
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            onChange={handleProfileImageUpload}
            style={{ display: 'none' }}
          />
          <input
            type="file"
            id="post-image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="profile-image-upload" className="button upload-button-profile">
            Escolher Imagem Perfil
          </label>
          <label htmlFor="post-image-upload" className="button upload-button-post">
            Escolher Imagem Post
          </label>
        </div>
      </div>
      
      {/* Grupo de botões de ação */}
      <div className="button-row">
        <div className="button-group">
          <button className="button download-button" onClick={onDownload}>
            Baixar
          </button>
          <button className="button reset-button" onClick={onReset}>
            Resetar
          </button>
        </div>
      </div>
    </div>
  )
}

// Adicione PropTypes para validação
MemeButtons.propTypes = {
  setCustomText: PropTypes.func.isRequired,
  setImageSrc: PropTypes.func.isRequired,
  setImageProfile: PropTypes.func.isRequired,
  defaultImage: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
  onReset: PropTypes.func,
  handleImageUpload: PropTypes.func.isRequired,
  handleProfileImageUpload: PropTypes.func.isRequired
}

export default MemeButtons
