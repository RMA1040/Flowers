document.addEventListener('DOMContentLoaded', () => {
    const knop = document.getElementById('onthulKnop');
    const cadeauTekstDiv = document.getElementById('cadeau-tekst');
    const bloemContainer = document.getElementById('bloem-container');
    const titels = document.querySelectorAll('.titel, .ondertitel');

    // Timer-elementen
    const timerDisplay = document.getElementById('timer-display');
    const timerStatus = document.getElementById('timer-status');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Timer-variabelen
    let timerInterval;
    let timeRemaining = 25 * 60; // 25 minuten in seconden
    let isStudySession = true;
    let halfwayAlertShown = false;
    let fiveMinAlertShown = false;

    // Functie om de timer te updaten
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Functie om de timer te starten
    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                timeRemaining--;
                updateTimerDisplay();

                // Nieuwe meldingen toevoegen
                if (isStudySession) {
                    if (timeRemaining === Math.floor(25 * 60 / 2) && !halfwayAlertShown) {
                        timerStatus.textContent = 'Your halfway stay focused! 🧠';
                        halfwayAlertShown = true;
                    }
                    if (timeRemaining === 5 * 60 && !fiveMinAlertShown) {
                        timerStatus.textContent = '5 more minutes. Home stretch! 💪';
                        fiveMinAlertShown = true;
                    }
                }

                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    
                    if (isStudySession) {
                        // Pauze starten
                        timeRemaining = 5 * 60; // 5 minuten pauze
                        timerStatus.textContent = 'Pause! Get some tea and get some rest. ☕️';
                    } else {
                        // Volgende studiesessie starten
                        timeRemaining = 25 * 60; // 25 minuten studeren
                        timerStatus.textContent = 'Time to study! 📖';
                    }
                    isStudySession = !isStudySession;
                    halfwayAlertShown = false;
                    fiveMinAlertShown = false;
                    updateTimerDisplay();
                }
            }, 1000);
        }
    }

    // Functie om de timer te pauzeren
    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Functie om de timer te resetten
    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timeRemaining = 25 * 60;
        isStudySession = true;
        halfwayAlertShown = false;
        fiveMinAlertShown = false;
        timerStatus.textContent = 'Time to study! 📖';
        updateTimerDisplay();
    }

    // Event listeners voor de timer-knoppen
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

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
        container: document.getElementById('kat-animatie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'kat.json'
    });
});