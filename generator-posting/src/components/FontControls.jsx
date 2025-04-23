import React from 'react'
import PropTypes from 'prop-types'
import '../styles/FontControls.css'

function FontControls({
  profileFontSize,
  setProfileFontSize,
  usernameFontSize,
  setUsernameFontSize,
  watermarkFontSize,
  setWatermarkFontSize,
  textFontSize,
  setTextFontSize,
  profilePicSize,
  setProfilePicSize
}) {
  return (
    <div className="font-controls-container">
      <h3 className="font-controls-title">Ajuste os tamanhos</h3>
      <div className="font-size-controls">
        <div className="font-control">
          <label className="input-label">Foto Perfil:</label>
          <input
            type="range"
            min="60"
            max="150"
            value={profilePicSize}
            onChange={(e) => setProfilePicSize(e.target.value)}
            className="font-slider"
          />
          <span className="font-size-value">{profilePicSize}px</span>
        </div>

        <div className="font-control">
          <label className="input-label">Nome:</label>
          <input
            type="range"
            min="16"
            max="60"
            value={profileFontSize}
            onChange={(e) => setProfileFontSize(e.target.value)}
            className="font-slider"
          />
          <span className="font-size-value">{profileFontSize}px</span>
        </div>
        
        <div className="font-control">
          <label className="input-label">Usuário:</label>
          <input
            type="range"
            min="12"
            max="30"
            value={usernameFontSize}
            onChange={(e) => setUsernameFontSize(e.target.value)}
            className="font-slider"
          />
          <span className="font-size-value">{usernameFontSize}px</span>
        </div>
        
        <div className="font-control">
          <label className="input-label">Marca d'água:</label>
          <input
            type="range"
            min="12"
            max="30"
            value={watermarkFontSize}
            onChange={(e) => setWatermarkFontSize(e.target.value)}
            className="font-slider"
          />
          <span className="font-size-value">{watermarkFontSize}px</span>
        </div>

        <div className="font-control">
          <label className="input-label">Frase:</label>
          <input
            type="range"
            min="12"
            max="50"
            value={textFontSize}
            onChange={(e) => setTextFontSize(e.target.value)}
            className="font-slider"
          />
          <span className="font-size-value">{textFontSize}px</span>
        </div>
      </div>
    </div>
  )
}

FontControls.propTypes = {
  profileFontSize: PropTypes.string.isRequired,
  setProfileFontSize: PropTypes.func.isRequired,
  usernameFontSize: PropTypes.string.isRequired,
  setUsernameFontSize: PropTypes.func.isRequired,
  watermarkFontSize: PropTypes.string.isRequired,
  setWatermarkFontSize: PropTypes.func.isRequired,
  textFontSize: PropTypes.string.isRequired,
  setTextFontSize: PropTypes.func.isRequired,
  profilePicSize: PropTypes.string.isRequired,
  setProfilePicSize: PropTypes.func.isRequired
}

export default FontControls