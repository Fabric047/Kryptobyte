(function () {
    const links = document.querySelectorAll('nav a');
    const sidebar = document.getElementById('primary-sidebar');
    const hamburger = document.getElementById('hamburger');

    function setActive(el) {
        links.forEach(a => {
            a.classList.remove('active');
            a.removeAttribute('aria-current');
        });
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
    }

    links.forEach(a => {
        a.addEventListener('click', e => {
            setActive(e.currentTarget);
            // on small screens close the sidebar
            if (window.matchMedia('(max-width:720px)').matches) {
                sidebar.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    hamburger.addEventListener('click', () => {
        const open = sidebar.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
    });

    // Optional: highlight based on hash on load
    const hash = location.hash;
    if (hash) {
        const target = document.querySelector('nav a[href="' + hash + '"]');
        if (target) setActive(target);
    }
})();

