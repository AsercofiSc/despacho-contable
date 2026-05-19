// PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);

        startTypewriter();
    }, 2000);
});

// TYPEWRITER EFFECT
function startTypewriter() {
    const text = "Contabilidad inteligente y soluciones.";
    const speed = 70;
    let i = 0;
    const target = document.getElementById("typewriter");

    if (!target) return;

    function type() {
        if (i < text.length) {
            target.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// SCROLL REVEAL (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target); // Dejar de observar una vez ejecutado
        }
    });
}, observerOptions);

// ANIMACIÓN DE TARJETAS (CARDS)
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

// CAPTURA Y PROCESAMIENTO DEL FORMULARIO
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const miNumero = "5540701518";
    const formspreeID = "xaqvzprz";

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    // Resguardo de datos en memoria antes del reset
    const formData = new FormData(this);

    // Envío asíncrono en segundo plano a Formspree
    fetch(`https://formspree.io/f/${formspreeID}`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .catch(error => console.error("Error en el envío a Formspree:", error));

    // Formateo seguro de texto para evitar strings corruptas en la URL
    const msjWA = `*Nueva Consulta AserCofi*%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Correo:* ${encodeURIComponent(email)}%0A*Tel:* ${encodeURIComponent(tel)}%0A*Mensaje:* ${encodeURIComponent(mensaje)}`;

    // Redirección directa a la API de WhatsApp
    window.open(`https://wa.me/${miNumero}?text=${msjWA}`, '_blank');

    // Limpieza de campos del formulario
    this.reset();
});

console.log("AserCofi cargado correctamente.");