// Language Toggle
let currentLang = 'ar';

function toggleLang() {
    const isAr = currentLang === 'ar';
    document.querySelectorAll('.ar').forEach(el => el.style.display = isAr ? 'none' : '');
    document.querySelectorAll('.en').forEach(el => el.style.display = isAr ? '' : 'none');
    document.documentElement.dir = isAr ? 'ltr' : 'rtl';
    document.documentElement.lang = isAr ? 'en' : 'ar';
    document.querySelector('.lang-btn').textContent = isAr ? 'AR' : 'EN';
    currentLang = isAr ? 'en' : 'ar';
}

// Floating Particles
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.prepend(container);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 20) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
createParticles();

// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.dataset.target;
        const increment = target / speed;

        function updateCount() {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        }

        updateCount();
    });
}

// Intersection Observer for counters
const statsSection = document.querySelector('.stats');
let counted = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);

// Fade-in on scroll
const cards = document.querySelectorAll('.product-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 100);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});
