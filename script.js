document.addEventListener('DOMContentLoaded', () => {
    const knop = document.getElementById('onthulKnop');
    const cadeauTekstDiv = document.getElementById('cadeau-tekst');
    const bloemContainer = document.getElementById('bloem-container');
    const titels = document.querySelectorAll('.titel, .ondertitel');

    // Functie om de vallende bloemen te creëren
    function creëerBloem() {
        const bloem = document.createElement('div');
        bloem.classList.add('bloem');
        bloem.style.left = `${Math.random() * 100}vw`;
        bloem.style.animationDuration = `${Math.random() * 10 + 5}s`;
        bloem.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        bloem.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        bloemContainer.appendChild(bloem);

        setTimeout(() => {
            bloem.remove();
        }, 15000);
    }

    knop.addEventListener('click', () => {
        setInterval(creëerBloem, 500);

        cadeauTekstDiv.classList.remove('verborgen');
        
        knop.style.display = 'none';
        titels.forEach(titel => titel.style.display = 'none');

        const nieuweTitel = document.createElement('h1');
        nieuweTitel.classList.add('titel');
        nieuweTitel.textContent = 'Un petit quelque chose so you will not forget about me. ❤️';
        document.querySelector('.container').prepend(nieuweTitel);
    });

    // Code voor de Lottie-animatie
    lottie.loadAnimation({
        container: document.getElementById('kat-animatie'), // De DOM-element
        renderer: 'svg', // Gebruik SVG-rendering
        loop: true,
        autoplay: true,
        path: 'kat.json' // De link naar je JSON-bestand
    });
});