// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function slideCarousel() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        const offset = -currentIndex * 100; // Calcula el desplazamiento
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    // Auto-slide cada 5 segundos
    setInterval(slideCarousel, 5000);
});
