export const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  lines.forEach((l, i) => {
    ctx.fillText(l, x, y + (i * lineHeight));
  });

  return lines.length * lineHeight;
};

export const generateImage = (watermarkImage, phrase, displayName, username, index) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const watermarkHeight = canvas.height * 0.35;
    
    const wmScale = Math.min(
      (canvas.width * 0.8) / watermarkImage.width,
      (watermarkHeight * 0.7) / watermarkImage.height
    );
    const wmWidth = watermarkImage.width * wmScale;
    const wmHeight = watermarkImage.height * wmScale;
    const wmX = (canvas.width - wmWidth) / 2;
    const wmY = (watermarkHeight - wmHeight) / 2;
    
    ctx.drawImage(watermarkImage, wmX, wmY, wmWidth, wmHeight);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(displayName, canvas.width / 2, watermarkHeight + 80);

    ctx.font = '36px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText(username, canvas.width / 2, watermarkHeight + 130);

    ctx.fillStyle = '#000000';
    ctx.font = '42px Arial, sans-serif';
    ctx.textAlign = 'left';
    
    const textStartY = watermarkHeight + 220;
    const maxWidth = canvas.width - 120;
    const lineHeight = 60;
    
    wrapText(ctx, phrase, 60, textStartY, maxWidth, lineHeight);

    resolve({
      url: canvas.toDataURL('image/png'),
      phrase: phrase.substring(0, 50) + (phrase.length > 50 ? '...' : ''),
      index: index + 1
    });
  });
};