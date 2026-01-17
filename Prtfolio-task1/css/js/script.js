/**
 * ANAS SIDDIQUI - Professional Portfolio Core Engine v2.0
 * Total Lines: 225+ 
 * Modules: UI Dynamics, Interactive Background, Form Engine, & Modal System
 * Author: Anas Siddiqui
 */

// 1. GLOBAL INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c Anas Siddiqui Portfolio Engine v2.0 Loaded ", "background: #22d3ee; color: #000; font-weight: bold; padding: 5px;");
    
    initTypewriter();
    initScrollObserver();
    initParticles();
    initProjectFilters();
    initNavbarControl();
    setupFormEngine();
    preventImageStealing();
});

// 2. HERO TYPEWRITER EFFECT
function initTypewriter() {
    const textElement = document.querySelector(".hero-text h1 span, .typewriter-target");
    if (!textElement) return;

    const phrases = [
        "Full Stack Engineer", 
        "Backend Specialist", 
        "Python Enthusiast", 
        "B.Tech Graduate 2025",
        "Problem Solver"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end of the phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();
}

// 3. MOUSE INTERACTIVE PARTICLES (MODERN UI)
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    let particles = [];
    let mouse = { x: null, y: null };

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        for(let i=0; i<2; i++) particles.push(new Particle());
    });

    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = 'rgba(34, 211, 238, 0.5)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.05;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.3) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// 4. ADVANCED MODAL SYSTEM (PROJECTS & CERTS)
function openProject(img, title, desc) {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalProjectImg') || document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalProjectTitle') || document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalProjectDesc') || document.getElementById('modalDesc');

    if(!modal) return;

    modalImg.style.opacity = '0';
    modalImg.src = img;
    modalTitle.innerText = title;
    modalDesc.innerText = desc || "A professional technical implementation showcasing clean code and modern architecture.";

    modal.style.display = 'flex';
    modal.classList.add('active');
    
    modalImg.onload = () => {
        modalImg.style.transition = "opacity 0.6s ease-in-out";
        modalImg.style.opacity = '1';
    };

    document.body.style.overflow = 'hidden'; 
}

function openCert(img, title) {
    // Specific wrapper for certificates to show "Full View"
    const certDescription = "Officially verified credential earned by Anas Siddiqui. Documenting technical proficiency and professional excellence.";
    openProject(img, title, certDescription);
}

function closeProject() {
    const modal = document.getElementById('projectModal') || document.getElementById('certModal');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// 5. PROJECT FILTERING LOGIC
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-wrapper');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active', 'bg-cyan-400', 'text-black'));
            btn.classList.add('active', 'bg-cyan-400', 'text-black');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// 6. SCROLL REVEAL ENGINE
function initScrollObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a skill bar, animate the width
                if (entry.target.classList.contains('skill-progress')) {
                    const targetWidth = entry.target.getAttribute('data-progress');
                    entry.target.style.width = targetWidth + '%';
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .section-title, .skill-progress, .animate-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });
}

// 7. CONTACT FORM AJAX ENGINE
function setupFormEngine() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = form.querySelector('button');
        const successMsg = document.getElementById('success-msg');
        
        // Internal Validation
        const email = form.querySelector('input[name="email"]').value;
        if (!email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }

        // Loading State
        btn.disabled = true;
        btn.innerHTML = '<span class="flex items-center justify-center"><i class="bi bi-send-fill animate-pulse mr-2"></i> Sending...</span>';

        const formData = new FormData(form);
        
        try {
            const response = await fetch("https://formsubmit.co/ajax/anassiddiqui0786as@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                form.classList.add('hidden');
                successMsg.classList.remove('hidden');
                successMsg.style.display = 'block';
                window.scrollTo({ top: successMsg.offsetTop - 100, behavior: 'smooth' });
            } else {
                throw new Error("Server Response Failed");
            }
        } catch (err) {
            alert("Connection Error. Please check your internet or try again.");
            btn.disabled = false;
            btn.innerHTML = "Send Message Now";
        }
    });
}

// 8. NAVIGATION & SMOOTH SCROLLING
function initNavbarControl() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-slate-950/95', 'backdrop-blur-xl', 'py-4', 'shadow-2xl');
            header.classList.remove('py-6');
        } else {
            header.classList.remove('bg-slate-950/95', 'backdrop-blur-xl', 'py-4', 'shadow-2xl');
            header.classList.add('py-6');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// 9. CONTENT PROTECTION
function preventImageStealing() {
    // Prevents right-click on images to protect portfolio assets
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.setAttribute('draggable', false);
    });
    
    // ESC key closes any open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeProject();
    });
}

// 10. ANALYTICS SIMULATION
function logVisitorData() {
    const date = new Date();
    console.log(`%c Session Start: ${date.toLocaleString()} `, "color: #94a3b8; font-size: 10px;");
}
logVisitorData();

/**
 * End of Core Engine
 * Total Logical Blocks: 10
 * Status: Stable
 */