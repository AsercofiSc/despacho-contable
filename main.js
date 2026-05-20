document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. PANTALLA DE CARGA (PRELOADER) - MANTENIDO INTACTO
    // ==========================================================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("fade-out");
        }, 2200); // 2.2s coincide con tu animación CSS fillLoader
    }

    // ==========================================================================
    // 2. CONFIGURACIÓN DE TUS CREDENCIALES
    // ==========================================================================
    const TELEFONO_WHATSAPP = "525540701518"; // Ej: "5215512345678" sin espacios ni +
    const ID_FORMSPREE = "xlgvgvrg";     // ID de Formspree

    // ==========================================================================
    // 3. ELEMENTOS DEL DOM (TUS CLASES E IDS INTACTOS)
    // ==========================================================================
    const sidePanel = document.getElementById("side-panel");
    const overlay = document.getElementById("overlay");
    const openPanelBtn = document.querySelector(".toggle-form-btn");
    const closePanelBtn = document.getElementById("close-panel-btn");
    const contactForm = document.getElementById("contact-form");

    // ==========================================================================
    // 4. LÓGICA DE APERTURA Y CIERRE
    // ==========================================================================
    const closePanel = () => {
        sidePanel?.classList.remove("active");
        overlay?.classList.remove("active");
    };

    openPanelBtn?.addEventListener("click", () => {
        sidePanel?.classList.add("active");
        overlay?.classList.add("active");
    });

    closePanelBtn?.addEventListener("click", closePanel);
    overlay?.addEventListener("click", closePanel);

    // ==========================================================================
    // 5. ENVÍO DEL FORMULARIO (CORREO EN SEGUNDO PLANO + REDIRECCIÓN A WHATSAPP)
    // ==========================================================================
    contactForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        // Captura de datos ingresados por el usuario
        const nombre = contactForm.querySelector('input[name="nombre"]').value;
        const correo = contactForm.querySelector('input[name="correo"]').value;
        const mensaje = contactForm.querySelector('textarea[name="mensaje"]').value;

        // Feedback visual en tu botón .btn-submit
        const submitBtn = contactForm.querySelector(".btn-submit");
        if (submitBtn) {
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;
        }

        // Envío asíncrono a Formspree para que llegue al correo
        fetch(`https://formspree.io/f/${ID_FORMSPREE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        })
        .then(response => {
            if (response.ok) {
                // Redirección inmediata a WhatsApp incluyendo los datos del formulario
                const textoWhatsApp = `Hola, me interesa una asesoría contable.%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Correo:* ${encodeURIComponent(correo)}%0A*Mensaje:* ${encodeURIComponent(mensaje)}`;
                const urlWhatsApp = `https://wa.me/${5540701518}?text=${textoWhatsApp}`;
                
               window.location.href = urlWhatsApp;

                if (submitBtn) {
                    submitBtn.textContent = "¡Enviado con éxito!";
                    submitBtn.style.backgroundColor = "#10b981"; 
                }

                // Limpieza del formulario y cierre del panel
                setTimeout(() => {
                    contactForm.reset();
                    closePanel();
                    if (submitBtn) {
                        submitBtn.textContent = "Solicitar Asesoría";
                        submitBtn.style.backgroundColor = "";
                        submitBtn.disabled = false;
                    }
                }, 1500);
            } else {
                alert("Hubo un problema al enviar al correo. Revisa tu ID de Formspree.");
                if (submitBtn) {
                    submitBtn.textContent = "Solicitar Asesoría";
                    submitBtn.disabled = false;
                }
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error de conexión al enviar el formulario.");
            if (submitBtn) {
                submitBtn.textContent = "Solicitar Asesoría";
                submitBtn.disabled = false;
            }
        });
    });
});