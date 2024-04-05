const translate = require('node-google-translate-skidz');

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const productosDiv = document.getElementById('productos');
    data.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');
      traducirTexto(producto.title, 'en', 'es').then(translatedTitle => {
        traducirTexto(producto.category, 'en', 'es').then(translatedCategory => {
          productoElement.innerHTML = `
            <h2>${translatedTitle}</h2>
            <p><strong>${translatedPrice}:</strong> $${producto.price}</p>
            <p><strong>${translatedCategory}:</strong> ${translatedCategory}</p>
            <img src="${producto.image}" alt="${translatedTitle}">
          `;
          productosDiv.appendChild(productoElement);
        });
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para traducir texto utilizando node-google-translate-skidz
function traducirTexto(texto, sourceLang, targetLang) {
  return new Promise((resolve, reject) => {
    translate({ text: texto, source: sourceLang, target: targetLang }, function(result) {
      resolve(result.translation);
    });
  });
}
