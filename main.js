document.addEventListener('DOMContentLoaded', () => {
    const sidePanel = document.getElementById('side-panel');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-panel-btn');
    const toggleButtons = document.querySelectorAll('.toggle-form-btn');

    // Abre el formulario deslizando desde la derecha
    const openPanel = () => {
        sidePanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo en móviles
    };

    // Cierra el formulario ocultándolo a la derecha
    const closePanel = () => {
        sidePanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Devuelve el scroll original al cerrar
    };

    // Añade el detector de eventos a los botones que abren el panel
    toggleButtons.forEach(button => {
        button.addEventListener('click', openPanel);
    });

    // Cierra el panel al hacer click en la "X" o en el fondo oscuro
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // --- LÓGICA DE NAVEGACIÓN DEL CARRUSEL CORREGIDA ---
    // Cambiado 'carrusel-grid' por 'services-slider' para coincidir con el HTML
    const carrusel = document.getElementById('services-slider');
    const prevBtn = document.getElementById('prev-arr');
    const nextBtn = document.getElementById('next-arr');

    if (carrusel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = carrusel.querySelector('.service-card');
            // Detecta el ancho real de la tarjeta + 16px del gap configurado en el CSS
            return card ? card.clientWidth + 16 : 301;
        };

        nextBtn.addEventListener('click', () => {
            carrusel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carrusel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
});