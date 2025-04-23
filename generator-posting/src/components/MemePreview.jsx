// File: src/components/MemePreview.jsx
import React from 'react'
import PropTypes from 'prop-types'
import '../styles/MemePreview.css'

function MemePreview({ customText, imageSrc, imageProfile, profileName, userName, watermark }) {
  return (
    <div className="meme-preview" id="meme-preview">
      <div className="tweet-header">
        <img src={imageProfile} alt="Perfil" className="profile-pic" />
        <div className="tweet-info">
          <strong>{profileName}</strong>
          <br />
          <span>&nbsp;&nbsp;@{userName}</span>
        </div>
      </div>
      <div className="tweet-text">{customText}</div>
      <div className="meme-image-container">
        <img className="meme-image" src={imageSrc} alt="Meme" />
        <p className="meme-caption">@{watermark}</p>
      </div>
    </div>
  )
}

MemePreview.propTypes = {
  customText: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageProfile: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  watermark: PropTypes.string.isRequired
}

export default MemePreview
