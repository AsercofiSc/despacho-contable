const panel =
document.getElementById("panel");

const openBtn =
document.getElementById("openPanel");

const closeBtn =
document.getElementById("closePanel");

openBtn.addEventListener("click", () => {

    panel.classList.add("active");

});

closeBtn.addEventListener("click", () => {

    panel.classList.remove("active");

});

document
.getElementById("contactForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const nombre =
    document.getElementById("nombre").value;

    const email =
    document.getElementById("email").value;

    const telefono =
    document.getElementById("telefono").value;

    const mensaje =
    document.getElementById("mensaje").value;

    const numero =
    "5540701518";

    const texto =
`Nueva Consulta AserCofi

Nombre: ${nombre}

Correo: ${email}

Teléfono: ${telefono}

Mensaje: ${mensaje}`;

    window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
"_blank"
);

});