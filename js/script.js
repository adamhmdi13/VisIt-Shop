// Typing Effect
function typeEffect() {
    const arText = 'أقدم لكم أفضل المنتجات الرقمية: بلقنات ماينكرافت، بوتات ديسكورد، وسيرفرات جاهزة وخدمات احترافية';
    const enText = 'I offer the best digital products: Minecraft plugins, Discord bots, ready servers, and professional services';
    const elAr = document.querySelector('.hero-sub.ar');
    const elEn = document.querySelector('.hero-sub.en');
    let index = 0;
    let isAr = true;

    elAr.textContent = '';
    elEn.textContent = '';
    const cursor = '<span class="typing-cursor"></span>';

    function type() {
        const text = isAr ? arText : enText;
        const el = isAr ? elAr : elEn;
        if (isAr) elEn.style.display = 'none';
        else elAr.style.display = 'none';

        if (index < text.length) {
            el.innerHTML = text.substring(0, index + 1) + cursor;
            index++;
            setTimeout(type, 30 + Math.random() * 40);
        } else {
            el.innerHTML = text;
        }
    }
    type();
}
typeEffect();

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

// Neon Cursor Follower
const cursor = document.createElement('div');
cursor.className = 'cursor-follower';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Enhanced Neon Particles
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.prepend(container);

    const colors = ['#00f0ff', '#ff00e4', '#b300ff', '#00ff88', '#0044ff'];

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 25) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        const size = 2 + Math.random() * 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;
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
