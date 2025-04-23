// File: src/components/MemePreview.jsx
import React from 'react'
import PropTypes from 'prop-types'
import '../styles/MemePreview.css'

function MemePreview({ customText, imageSrc }) {
  return (
    <div className="meme-preview" id="meme-preview">
      <div className="tweet-header">
        <img src={imageSrc} alt="Perfil" className="profile-pic" />
        <div className="tweet-info">
          <strong>Safadinhos</strong>
          <br />
          <span>&nbsp;&nbsp;@EleGosta_4gmal</span>
        </div>
      </div>
      <div className="tweet-text">{customText}</div>
      <div className="meme-image-container">
        <img className="meme-image" src={imageSrc} alt="Meme" />
        <p className="meme-caption">@safadinhos</p>
      </div>
    </div>
  )
}

MemePreview.propTypes = {
  customText: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
}

export default MemePreview
