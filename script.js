// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FORCER L'AFFICHAGE DES PROJETS =====
    function forceProjectsDisplay() {
        const projectsSection = document.getElementById('projets');
        const projectsGrid = document.querySelector('.projets-grid-new');
        const projectCards = document.querySelectorAll('.projet-card-new');
        
        if (projectsSection) {
            projectsSection.style.display = 'block';
            projectsSection.style.visibility = 'visible';
            projectsSection.style.opacity = '1';
            projectsSection.style.minHeight = 'auto';
        }
        
        if (projectsGrid) {
            projectsGrid.style.display = 'flex';
            projectsGrid.style.visibility = 'visible';
            projectsGrid.style.opacity = '1';
            projectsGrid.style.flexDirection = 'column';
            projectsGrid.style.gap = '6rem';
        }
        
        projectCards.forEach(card => {
            card.style.display = 'grid';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            card.style.gridTemplateColumns = '1fr 1fr';
            card.style.gap = '2.5rem';
            
            // Vérifier si la carte est dans la zone visible pour ajouter revealed
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight + 200) {
                card.classList.add('revealed');
            } else {
                // Forcer le reveal après un délai
                setTimeout(() => {
                    card.classList.add('revealed');
                }, 300);
            }
        });
    }

    // Appeler la fonction après le chargement
    forceProjectsDisplay();
    
    // Rappeler après un délai pour être sûr
    setTimeout(forceProjectsDisplay, 500);
    setTimeout(forceProjectsDisplay, 1000);

    // ===== CAROUSEL COMPÉTENCES =====
    const swiper = new Swiper('.competences-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        on: {
            init: function() {
                console.log('Swiper initialisé');
            },
        },
    });

    // ===== MENU BURGER (mobile) =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Empêcher le scroll quand le menu est ouvert
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // ===== FERMER MENU AU CLIC SUR LIEN (mobile) =====
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // ===== FILTRES PROJETS (gardé pour compatibilité) =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projetCards = document.querySelectorAll('.projet-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projetCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== GESTION PHOTO =====
    const profileImg = document.getElementById('profile-photo');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            const frame = this.parentElement;
            frame.innerHTML = `
                <div style="width:100%; height:100%; background: linear-gradient(135deg, #1515af, #ff7b2b); display:flex; align-items:center; justify-content:center;">
                    <span style="font-size:4rem; color:white;">👤</span>
                </div>
            `;
        });
        
        // Vérifier si l'image est déjà chargée
        if (profileImg.complete && profileImg.naturalHeight === 0) {
            profileImg.dispatchEvent(new Event('error'));
        }
    }

    // ===== ANIMATION SCROLL (active link) =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset pour meilleure détection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').replace('#', '');
            if (href === current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Appel initial

    // ===== AJOUT ANNÉE FOOTER =====
    const footer = document.querySelector('footer p');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2026', year);
    }

    // ===== EFFET PARALLAXE LÉGER =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                hero.style.transform = `translate(${mouseX * 3}px, ${mouseY * 3}px)`;
            }
        });
        
        // Reset sur mobile
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                hero.style.transform = '';
            }
        });
    }

    // ===== THEME TOGGLE (MODE JOUR/NUIT) =====
    const themeSwitch = document.getElementById('theme-switch');
  
    // Vérifier si le bouton existe
    if (themeSwitch) {
        // Vérifier le thème sauvegardé dans localStorage
        const savedTheme = localStorage.getItem('theme');
            
        // Appliquer le thème sauvegardé
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeSwitch.classList.add('night-mode');
        } else {
            themeSwitch.classList.add('night-mode'); // Par défaut en mode nuit
            if (!savedTheme) {
                localStorage.setItem('theme', 'dark');
            }
        }
        
        // Ajouter l'événement de clic
        themeSwitch.addEventListener('click', () => {
            // Basculer les classes
            body.classList.toggle('light-mode');
            themeSwitch.classList.toggle('night-mode');
            
            // Sauvegarder la préférence
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        
            // Animation de feedback
            themeSwitch.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeSwitch.style.transform = 'scale(1)';
            }, 200);

            // Mettre à jour les particules avec un délai
            setTimeout(() => {
                updateParticlesTheme();
            }, 100);
            
            // Forcer le rafraîchissement des couleurs
            document.dispatchEvent(new Event('themeChanged'));
        });
    }

    // ===== CONFIGURATION DES PARTICULES =====
    function initParticles() {
        if (typeof particlesJS === 'undefined') {
            console.log('Particles.js pas encore chargé, on attend...');
            setTimeout(initParticles, 100);
            return;
        }

        // Vérifier si on est en mode clair ou sombre
        const isLightMode = document.body.classList.contains('light-mode');
        
        // Couleurs adaptées au thème
        const particleColor = '#1515af'; // Garder le bleu dans les deux modes
        const lineColor = '#1515af';
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.15,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.05,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: lineColor,
                    opacity: 0.08,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.4,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.15
                        }
                    }
                }
            },
            retina_detect: true
        });
        
        console.log('Particles.js initialisé');
    }

    // Fonction pour mettre à jour les couleurs des particules selon le thème
    function updateParticlesTheme() {
        if (window.pJSDom && window.pJSDom[0]) {
            // Garder la même couleur dans les deux modes
            const newColor = '#1515af';
            
            window.pJSDom[0].pJS.particles.color.value = newColor;
            window.pJSDom[0].pJS.particles.line_linked.color = newColor;
            window.pJSDom[0].pJS.fn.particlesRefresh();
            console.log('Particules mises à jour');
        } else {
            initParticles();
        }
    }

    // Lancer les particules
    setTimeout(initParticles, 200);

    // ===== RÉVÉLATION DES CARTES PROJETS AU SCROLL =====
    const projectCards = document.querySelectorAll('.projet-card-new');

    function checkProjectReveal() {
        const windowHeight = window.innerHeight;
        const revealThreshold = 100;

        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < windowHeight - revealThreshold && rect.bottom > revealThreshold;
            
            if (isVisible) {
                card.classList.add('revealed');
            }
        });
    }

    // Vérification initiale
    if (projectCards.length > 0) {
        checkProjectReveal();

        // Throttle pour performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkProjectReveal();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Forcer le reveal après plusieurs délais
        setTimeout(() => {
            projectCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight + 300) {
                    card.classList.add('revealed');
                }
            });
        }, 300);
        
        setTimeout(() => {
            projectCards.forEach(card => {
                card.classList.add('revealed');
            });
        }, 1000);
        
        setTimeout(() => {
            projectCards.forEach(card => {
                card.classList.add('revealed');
            });
        }, 2000);
    }

    // ===== ANIMATION DES BARRES DE PROGRESSION =====
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Animer les barres quand elles deviennent visibles
    const competenceSection = document.querySelector('.competences-section');
    if (competenceSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(competenceSection);
    }

    // ===== EFFET DE SURVOL SUR LES CARTES PROJETS =====
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const visual = card.querySelector('.projet-visual');
            if (visual) {
                visual.style.transform = 'scale(1.02)';
                visual.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            const visual = card.querySelector('.projet-visual');
            if (visual) {
                visual.style.transform = 'scale(1)';
            }
        });
    });

    // ===== GESTION DU TITRE DE LA PAGE =====
    const pageTitle = document.querySelector('title');
    const originalTitle = pageTitle ? pageTitle.textContent : 'Othniel CONVAUD · Portfolio';

    // Changer le titre quand on quitte la page
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = '👋 Revenez bientôt !';
        } else {
            document.title = originalTitle;
        }
    });

    // ===== SMOOTH SCROLL POUR LES LIENS D'ANCRE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== STATISTIQUES DYNAMIQUES =====
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const targetValue = stat.textContent.replace('+', '');
            const isPlus = stat.textContent.includes('+');
            let currentValue = 0;
            
            const interval = setInterval(() => {
                if (currentValue < parseInt(targetValue)) {
                    currentValue++;
                    stat.textContent = currentValue + (isPlus ? '+' : '');
                } else {
                    clearInterval(interval);
                }
            }, 50);
        });
    }

    // Observer la section hero pour animer les stats
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroSection);
    }

    // ===== RESPONSIVE: FERMER LE MENU QUAND ON REDIMENSIONNE =====
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ===== GESTION DES ERREURS SWIPER =====
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.swiper-slide')) {
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
        }
    }, true);

    // ===== FORCER LE RÉVEIL DU SWIPER =====
    setTimeout(() => {
        if (swiper && swiper.autoplay) {
            swiper.autoplay.start();
        }
    }, 500);

    console.log('✨ Portfolio chargé avec succès !');
    
    // ===== ÉVÉNEMENT PERSONNALISÉ POUR LE CHANGEMENT DE THÈME =====
    document.addEventListener('themeChanged', function() {
        // Rafraîchir les couleurs si nécessaire
        console.log('Thème changé');
    });
});

// ===== GESTION DU CHARGEMENT DES IMAGES =====
window.addEventListener('load', function() {
    // Forcer l'affichage des projets une dernière fois
    const projectCards = document.querySelectorAll('.projet-card-new');
    projectCards.forEach(card => {
        card.classList.add('revealed');
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    });
    
    // Vérifier que toutes les images sont chargées
    const images = document.querySelectorAll('.projet-visual img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    console.log('Page complètement chargée');
});

// ===== GESTION DU REDIMENSIONNEMENT =====
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 200);
});
