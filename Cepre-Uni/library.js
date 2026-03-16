// Agrega comportamiento de expandir/colapsar para los botones con clase .menu-toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggles = document.querySelectorAll('.menu-toggle');

  toggles.forEach(btn => {
    const controlsId = btn.getAttribute('aria-controls');
    const submenu = controlsId ? document.getElementById(controlsId) : null;

    // Click para alternar
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (submenu) {
        if (expanded) {
          submenu.hidden = true;
        } else {
          submenu.hidden = false;
        }
      }
    });

    // Accesibilidad: Enter y Espacio también activan
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Opcional: cerrar submenus al hacer clic fuera (comportamiento común)
  document.addEventListener('click', (e) => {
    const insideSidebar = e.target.closest('.sidebar');
    if (!insideSidebar) {
      toggles.forEach(btn => {
        const controlsId = btn.getAttribute('aria-controls');
        const submenu = controlsId ? document.getElementById(controlsId) : null;
        btn.setAttribute('aria-expanded', 'false');
        if (submenu) submenu.hidden = true;
      });
    }
  });
});



/* CONTENEDORES */
// Código JavaScript que aplica a TODOS los .contenedores
(function () {
  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfViewer');
  const closeBtn = document.getElementById('closeModal');
  const titleEl = document.getElementById('pdfTitle');

  // Encuentra cada contenedor y añade el manejador al botón "Ver"
  document.querySelectorAll('.contenedores').forEach(container => {
    const verBtn = container.querySelector('.btnVer');
    // Buscamos el enlace al PDF dentro del mismo contenedor (clase download o cualquier <a> que termine en .pdf)
    let downloadLink = container.querySelector('a.download');
    if (!downloadLink) {
      downloadLink = Array.from(container.querySelectorAll('a'))
        .find(a => a.href && a.href.toLowerCase().endsWith('.pdf'));
    }
    const pdfUrl = downloadLink ? downloadLink.href : null;

    if (!verBtn) return;

    verBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!pdfUrl) {
        alert('No se encontró el PDF asociado a este elemento.');
        return;
      }

      // Opción A: abrir en nueva pestaña (descomenta si prefieres esto)
      // window.open(pdfUrl, '_blank', 'noopener');

      // Opción B: mostrar en modal (activa por defecto)
      iframe.src = pdfUrl;
      // Si quieres mostrar el nombre en el header:
      const titleLink = container.querySelector('a:not(.download)');
      titleEl.textContent = titleLink ? titleLink.textContent.trim() : 'Vista previa';
      modal.classList.add('open');
    });
  });

  // Cerrar modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    // evitar mantener el archivo cargado en background
    iframe.src = '';
  });

  // Cerrar modal con Escape
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      iframe.src = '';
    }
  });

  // Cerrar al hacer click fuera del contenido (opcional)
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) {
      modal.classList.remove('open');
      iframe.src = '';
    }
  });
})();