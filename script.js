const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainCard = document.getElementById('main-card');
const successCard = document.getElementById('success-card');

// Yes Button Click
yesBtn.addEventListener('click', () => {
    // 1. Hide Question, Show Success
    mainCard.classList.add('hidden');
    successCard.classList.remove('hidden');

    // 2. Launch Confetti
    launchConfetti();

    // 3. More confetti bursts
    setTimeout(launchConfetti, 300);
    setTimeout(launchConfetti, 600);
});

// No Button "Runaway" Effect
// We'll use mouseover for desktop and touchstart for mobile (though touch can be tricky)
const moveNoButton = () => {
    // Get Yes button dimensions and position
    const yesRect = yesBtn.getBoundingClientRect();
    const yesX = yesRect.left + yesRect.width / 2;
    const yesY = yesRect.top + yesRect.height / 2;

    // Get No button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Get viewport dimensions
    const windowWidth = innerWidth;
    const windowHeight = innerHeight;

    // Orbit parameters
    // Reduce radius if screen is small (mobile)
    const isMobile = windowWidth < 600;
    const minRadius = isMobile ? 60 : 85;
    const maxRadius = isMobile ? 100 : 140;

    // Calculate random position in orbit
    // Restrict to Upper Hemisphere (Above Yes Button): Angles PI to 2PI
    const angle = Math.random() * Math.PI + Math.PI;
    const radius = Math.random() * (maxRadius - minRadius) + minRadius;

    // Calculate new position relative to viewport
    let newX = (yesX + radius * Math.cos(angle)) - (btnWidth / 2);
    let newY = (yesY + radius * Math.sin(angle)) - (btnHeight / 2);

    // Margin for screen edges (keep button fully inside)
    const margin = 20;

    // STRICT CLAMPING: Ensure the ENTIRE button is visible
    newX = Math.max(margin, Math.min(newX, windowWidth - btnWidth - margin));
    newY = Math.max(margin, Math.min(newY, windowHeight - btnHeight - margin));

    // Ensure position is set to fixed so it can actually move
    if (noBtn.style.position !== 'fixed') {
        noBtn.style.position = 'fixed';
    }

    // Apply new position
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
};

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton); // Fallback if they manage to click

function launchConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#ff4d4d', '#ffffff'],
            shapes: ['heart']
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff0000', '#ff4d4d', '#ffffff'],
            shapes: ['heart']
        }));
    }, 250);
}

// Reactive Background Effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Update CSS variables on body
    document.body.style.setProperty('--mouse-x', `${mouseX}px`);
    document.body.style.setProperty('--mouse-y', `${mouseY}px`);
});
