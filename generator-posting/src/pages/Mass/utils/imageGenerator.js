// Função auxiliar para quebrar texto em múltiplas linhas
export const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  // Divide o texto em palavras separadas por espaço
  const words = text.split(' ');
  
  // Variável para armazenar a linha atual sendo construída
  let line = '';
  
  // Array que guardará todas as linhas finais
  let lines = [];

  // Loop através de cada palavra do texto
  for (let n = 0; n < words.length; n++) {
    // Cria uma linha de teste adicionando a próxima palavra
    const testLine = line + words[n] + ' ';
    
    // Mede a largura da linha de teste usando o contexto do canvas
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    // Se a linha de teste exceder a largura máxima E não for a primeira palavra
    if (testWidth > maxWidth && n > 0) {
      // Salva a linha atual no array (sem a última palavra)
      lines.push(line);
      
      // Inicia nova linha com a palavra que não coube
      line = words[n] + ' ';
    } else {
      // Se couber, mantém a linha de teste como linha atual
      line = testLine;
    }
  }
  
  // Adiciona a última linha que sobrou
  lines.push(line);

  // Desenha cada linha no canvas
  lines.forEach((l, i) => {
    // Desenha a linha na posição y + (índice * altura da linha)
    // Isso cria o espaçamento vertical entre as linhas
    ctx.fillText(l, x, y + (i * lineHeight));
  });

  // Retorna a altura total ocupada pelo texto (útil para posicionar outros elementos)
  return lines.length * lineHeight;
};

// Função principal que gera a imagem completa
export const generateImage = (watermarkImage, phrase, displayName, username, index) => {
  // Retorna uma Promise para operação assíncrona
  return new Promise((resolve) => {
    // Cria um elemento canvas HTML dinamicamente
    const canvas = document.createElement('canvas');
    
    // Define as dimensões do canvas (quadrado 1080x1080, ideal para redes sociais)
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Obtém o contexto 2D do canvas (necessário para desenhar)
    const ctx = canvas.getContext('2d');

    // === DESENHA O FUNDO ===
    // Define a cor de preenchimento como branco
    ctx.fillStyle = '#FFFFFF';
    
    // Desenha um retângulo branco cobrindo todo o canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // === CONFIGURAÇÕES DE MARGEM ===
    // Define a margem uniforme para esquerda e topo (110px)
    const margin = 110;

    // === CONFIGURAÇÕES DA IMAGEM CIRCULAR ===
    // Define o tamanho do círculo AUMENTADO (diâmetro de 200 pixels em vez de 150)
    const circleSize = 200;
    
    // Posição horizontal do centro do círculo (margem + metade do círculo)
    const circleX = margin + circleSize / 2;
    
    // Posição vertical do centro do círculo (margem + metade do círculo)
    const circleY = margin + circleSize / 2;

    // === DESENHA A IMAGEM CIRCULAR ===
    // Salva o estado atual do contexto (para restaurar depois)
    ctx.save();
    
    // Inicia um novo caminho de desenho
    ctx.beginPath();
    
    // Cria um círculo (arco de 360 graus)
    // Parâmetros: centerX, centerY, raio, ângulo inicial, ângulo final
    ctx.arc(circleX, circleY, circleSize / 2, 0, Math.PI * 2);
    
    // Fecha o caminho
    ctx.closePath();
    
    // Define a região de recorte (clip) como o círculo
    // Tudo desenhado agora só aparecerá dentro do círculo
    ctx.clip();

    // === CALCULA O POSICIONAMENTO DA IMAGEM ===
    // Calcula a escala necessária para a imagem preencher o círculo
    // Usa o maior valor entre largura e altura para garantir cobertura total
    const scale = Math.max(
      circleSize / watermarkImage.width,
      circleSize / watermarkImage.height
    );
    
    // Calcula a posição X (canto superior esquerdo onde a imagem será desenhada)
    const wmX = circleX - (circleSize / 2);
    
    // Calcula a posição Y
    const wmY = circleY - (circleSize / 2);

    // === DESENHA A IMAGEM DENTRO DO CÍRCULO ===
    // drawImage renderiza a imagem no canvas
    // Parâmetros: imagem, x, y, largura, altura
    ctx.drawImage(
      watermarkImage,
      wmX,
      wmY,
      circleSize,
      circleSize
    );

    // Restaura o estado do contexto (remove o clip circular)
    ctx.restore();

    // === ADICIONA BORDA AO CÍRCULO ===
    // Inicia novo caminho para a borda
    ctx.beginPath();
    
    // Desenha o mesmo círculo novamente
    ctx.arc(circleX, circleY, circleSize / 2, 0, Math.PI * 2);
    
    // Define a cor da borda como preta
    ctx.strokeStyle = '#000000';
    
    // Define a espessura da linha da borda
    ctx.lineWidth = 3;
    
    // Desenha a borda
    ctx.stroke();

    // === DESENHA O NOME DE EXIBIÇÃO ===
    // Calcula a posição X onde o texto do nome começa (à direita da imagem)
    const textStartX = circleX + circleSize / 2 + 30;
    
    // Define a cor do texto como preto
    ctx.fillStyle = '#000000';
    
    // Define a fonte MAIOR como no layout original (negrito, 60px, Arial)
    ctx.font = 'bold 60px Arial, sans-serif';
    
    // Define o alinhamento do texto à esquerda
    ctx.textAlign = 'left';
    
    // Desenha o nome de exibição (posição Y ajustada baseada no circleY)
    // Parâmetros: texto, x, y
    ctx.fillText(displayName, textStartX, circleY - 25);

    // === DESENHA O USERNAME ===
    // Calcula a posição X do username (mais à direita que o nome)
    // Adicionando 15px extras para deslocar mais para a direita
    const usernameX = textStartX + 15;
    
    // Define fonte MAIOR para o username (48px como no original)
    ctx.font = '48px Arial, sans-serif';
    
    // Define cor cinza para o username
    ctx.fillStyle = '#666666';
    
    // Desenha o username abaixo do nome, mais à direita (posição Y ajustada baseada no circleY)
    ctx.fillText(username, usernameX, circleY + 35);

    // === DESENHA O TEXTO DA FRASE ===
    // Volta a cor preta para o texto principal
    ctx.fillStyle = '#000000';
    
    // Define a fonte MAIOR do texto principal (52px como no original)
    ctx.font = '52px Arial, sans-serif';
    
    // Mantém alinhamento à esquerda
    ctx.textAlign = 'left';
    
    // Define a posição Y onde o texto da frase começa (abaixo do círculo + espaçamento)
    const textStartY = margin + circleSize + 75;
    
    // Define a largura máxima para o texto (canvas width - 2 vezes a margem)
    const maxWidth = canvas.width - (margin * 2);
    
    // Define a altura MAIOR de cada linha (espaçamento vertical - 70px como no original)
    const lineHeight = 70;
    
    // Chama a função wrapText para desenhar o texto com quebra de linha
    // Usa a mesma margem para o texto principal
    wrapText(ctx, phrase, margin, textStartY, maxWidth, lineHeight);

    // === RESOLVE A PROMISE COM OS DADOS ===
    resolve({
      // Converte o canvas para uma URL de imagem PNG em base64
      url: canvas.toDataURL('image/png'),
      
      // Cria uma versão encurtada da frase (primeiros 50 caracteres)
      phrase: phrase.substring(0, 50) + (phrase.length > 50 ? '...' : ''),
      
      // Retorna o índice incrementado (para numeração)
      index: index + 1
    });
  });
};