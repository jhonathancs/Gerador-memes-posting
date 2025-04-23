// File: src/components/MemePreview.jsx
import React from 'react'
import PropTypes from 'prop-types'
import '../styles/MemePreview.css'

function MemePreview({ 
  customText, 
  imageSrc, 
  imageProfile, 
  profilePicSize, 
  profileName,
  userName,
  watermark,
  profileFontSize,
  usernameFontSize,
  watermarkFontSize,
  textFontSize
}) {
  return (
    <div className="meme-preview" id="meme-preview">
      <div className="tweet-header">
        <img 
          src={imageProfile} 
          alt="Perfil" 
          className="profile-pic"
          style={{ 
            width: `${profilePicSize}px`,
            height: `${profilePicSize}px`
          }} 
        />
        <div className="tweet-info">
          <strong style={{ fontSize: `${profileFontSize}px` }}>{profileName}</strong>
          <br />
          <span style={{ fontSize: `${usernameFontSize}px` }}>&nbsp;&nbsp;@{userName}</span>
        </div>
      </div>
      <div className="tweet-text" style={{ fontSize: `${textFontSize}px` }}>
        {customText}
      </div>
      <div className="meme-image-container">
        <img className="meme-image" src={imageSrc} alt="Meme" />
        <p className="meme-caption" style={{ fontSize: `${watermarkFontSize}px` }}>
          @{watermark}
        </p>
      </div>
    </div>
  )
}

MemePreview.propTypes = {
  customText: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageProfile: PropTypes.string.isRequired,
  profilePicSize: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  watermark: PropTypes.string.isRequired,
  profileFontSize: PropTypes.string.isRequired,
  usernameFontSize: PropTypes.string.isRequired,
  watermarkFontSize: PropTypes.string.isRequired,
  textFontSize: PropTypes.string.isRequired
}

export default MemePreview
