// File: src/components/TextInput.jsx
import React from 'react'
import '../styles/TextInput.css'

/**
 * Componente de entrada de texto personalizado para o meme
 * Permite ao usuário escrever e editar o texto da simulação de tweet
 */
function TextInput({ 
  customText, 
  setCustomText, 
  profileName, 
  setProfileName,
  userName,
  setUserName,
  watermark,
  setWatermark 
}) {
  const handleInputChange = (e) => {
    setCustomText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue =
        customText.substring(0, start) + '\n' + customText.substring(end)
      setCustomText(newValue)
      // Reposiciona o cursor corretamente após a quebra de linha
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1
      }, 0)
    }
  }

  return (
    <div className="input-container">
      <div className="profile-inputs-container">
        <div className="profile-name-input">
          <label htmlFor="profile-name" className="input-label">
            Nome do Perfil:
          </label>
          <input
            id="profile-name"
            className="text-input"
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Digite o nome do perfil"
          />
        </div>

        <div className="profile-name-input">
          <label htmlFor="user-name" className="input-label">
            Nome de Usuário:
          </label>
          <input
            id="user-name"
            className="text-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Digite o nome de usuário"
          />
        </div>

        <div className="profile-name-input">
          <label htmlFor="watermark" className="input-label">
            Marca d'água:
          </label>
          <input
            id="watermark"
            className="text-input"
            type="text"
            value={watermark}
            onChange={(e) => setWatermark(e.target.value)}
            placeholder="Digite a marca d'água"
          />
        </div>
      </div>
      
      <label htmlFor="custom-text-input" className="input-label">
        Escreva abaixo sua frase:
      </label>
      <textarea
        id="custom-text-input"
        className="text-input"
        placeholder="Escreva seu texto aqui"
        rows={4}
        value={customText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default TextInput
