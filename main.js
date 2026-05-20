document.addEventListener('DOMContentLoaded', () => {
    const sidePanel = document.getElementById('side-panel');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-panel-btn');
    const toggleButtons = document.querySelectorAll('.toggle-form-btn');

    // Abre el formulario deslizando desde la derecha
    const openPanel = () => {
        if (sidePanel && overlay) {
            sidePanel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquea el scroll de fondo
        }
    };

    // Cierra el formulario ocultándolo a la derecha
    const closePanel = () => {
        if (sidePanel && overlay) {
            sidePanel.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Devuelve el scroll original
        }
    };

    // Asigna el evento a todos los botones de apertura
    toggleButtons.forEach(button => {
        button.addEventListener('click', openPanel);
    });

    // Cierre seguro al hacer click en la "X"
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closePanel();
        });
    }

    // Cierre al hacer click en el fondo oscuro difuminado
    if (overlay) {
        overlay.addEventListener('click', closePanel);
    }

    // Extra: Cerrar panel con la tecla Escape (PC)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePanel();
        }
    });

    // --- LÓGICA DE NAVEGACIÓN DEL CARRUSEL ---
    const carrusel = document.getElementById('services-slider');
    const prevBtn = document.getElementById('prev-arr');
    const nextBtn = document.getElementById('next-arr');

    if (carrusel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = carrusel.querySelector('.service-card');
            return card ? card.clientWidth + 16 : 300;
        };

        nextBtn.addEventListener('click', () => {
            carrusel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carrusel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
});