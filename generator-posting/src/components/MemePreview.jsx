// File: src/components/MemePreview.jsx
import React from 'react'
import '../styles/MemePreview.css'
import coringa from '../images/coringa.jpeg'

/**
 * Componente responsável por exibir a pré-visualização do meme completo
 * Inclui cabeçalho com avatar e nome, texto do tweet e imagem com legenda
 */

function MemePreview({ customText }) {
  return (
    <div className="meme-preview" id="meme-preview">
      <div className="tweet-header">
        <img src={coringa} alt="Perfil" className="profile-pic" />
        <div className="tweet-info">
          <strong>Safadinhos</strong>
          <br />
          <span>&nbsp;&nbsp;@EleGosta_4gmal</span>
        </div>
      </div>
      <div className="tweet-text">{customText}</div>
      <div className="meme-image-container">
        <img className="meme-image" src={coringa} alt="Meme" />
        <p className="meme-caption">@safadinhos</p>
      </div>
    </div>
  )
}

export default MemePreview
