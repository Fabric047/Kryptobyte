// Tu función original[cite: 2]
function toggleMenu() {
    const menu = document.querySelector('.menu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}

// NUEVO: Animación "Smooth" al scrollear
document.addEventListener("DOMContentLoaded", () => {
    // Creamos un observador de intersección
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase cuando la sección entra en la vista
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% de la sección es visible
    });

    // Seleccionamos todas las secciones dentro del main y las observamos
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        observer.observe(section);
    });
});