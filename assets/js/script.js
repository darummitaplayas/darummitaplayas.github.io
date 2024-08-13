// Galería 1
const images = [
    { 
        src: 'images/image1.jpg', 
        title: 'Teriyaki De Pollo', 
        price: '$120.00 mxn', 
        promo: '2x1 en promoción $210.00 mxn', 
        prepTime: '15 minutos', 
        ingredients: 'Una cama de arroz blanco com verduras mixtas, pollo, Salsa dulce y ajonjoli' 
    },
    { 
        src: 'images/image2.jpg', 
        title: 'Tempura de pechuga', 
        price: '$160.00 mxn', 
        promo: 'No Aplica', 
        prepTime: '20 minutos', 
        ingredients: 'Pechuga de pollo, guarnición de arroz especial, bañado en salsa especial a elegir entre DULCE o SPICY' 
    },
    // Añade más imágenes y descripciones aquí
];

let currentIndex = 0;

function updateImage() {
    const imgElement = document.getElementById('current-image');
    const descriptionElement = document.getElementById('image-description');
    imgElement.src = images[currentIndex].src;
    descriptionElement.innerHTML = `
        <h2 style="text-align: center;">${images[currentIndex].title}</h2>
        <p><strong style="color: red;">Precio:</strong> ${images[currentIndex].price}</p>
        <p><strong style="color: red;">Promoción:</strong> ${images[currentIndex].promo}</p>
        <p><strong style="color: red;">Tiempo de preparación:</strong> ${images[currentIndex].prepTime}</p>
        <p><strong style="color: red;">Ingredientes:</strong> ${images[currentIndex].ingredients}</p>
    `;
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
    }
}

// Galería 2
const images2 = [
    { 
        src: 'images/image1.jpg', 
        title: 'Otra Imagen 1', 
        price: '$100.00 mxn', 
        promo: '2x1 en promoción $180.00 mxn', 
        prepTime: '10 minutos', 
        ingredients: 'Descripción de la otra imagen 1' 
    },
    { 
        src: 'images/image2.jpg', 
        title: 'Otra Imagen 2', 
        price: '$140.00 mxn', 
        promo: 'No Aplica', 
        prepTime: '25 minutos', 
        ingredients: 'Descripción de la otra imagen 2' 
    },
    // Añade más imágenes y descripciones aquí
];

let currentIndex2 = 0;

function updateImage2() {
    const imgElement = document.getElementById('current-image-2');
    const descriptionElement = document.getElementById('image-description-2');
    imgElement.src = images2[currentIndex2].src;
    descriptionElement.innerHTML = `
        <h2 style="text-align: center;">${images2[currentIndex2].title}</h2>
        <p><strong style="color: red;">Precio:</strong> ${images2[currentIndex2].price}</p>
        <p><strong style="color: red;">Promoción:</strong> ${images2[currentIndex2].promo}</p>
        <p><strong style="color: red;">Tiempo de preparación:</strong> ${images2[currentIndex2].prepTime}</p>
        <p><strong style="color: red;">Ingredientes:</strong> ${images2[currentIndex2].ingredients}</p>
    `;
}

function prevImage2() {
    if (currentIndex2 > 0) {
        currentIndex2--;
        updateImage2();
    }
}

function nextImage2() {
    if (currentIndex2 < images2.length - 1) {
        currentIndex2++;
        updateImage2();
    }
}

window.onload = function() {
    updateImage();
    updateImage2();
};
