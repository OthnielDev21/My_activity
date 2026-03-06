// Initialisation du carousel Swiper
document.addEventListener('DOMContentLoaded', function() {
    
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
    });

    // ===== MENU BURGER (mobile) =====
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // ===== FILTRES PROJETS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projetCards = document.querySelectorAll('.projet-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active button
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

    // ===== GESTION PHOTO =====
    const profileImg = document.getElementById('profile-photo');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Crée un placeholder si la photo ne charge pas
            this.style.display = 'none';
            const frame = this.parentElement;
            frame.innerHTML = `
                <div style="width:100%; height:100%; background: linear-gradient(135deg, #a970ff, #7c3aed); display:flex; align-items:center; justify-content:center;">
                    <span style="font-size:4rem; color:white;">👤</span>
                </div>
            `;
        });
    }

    // ===== ANIMATION SCROLL (active link) =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

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
                hero.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
            }
        });
    }

    // ===== FERMER MENU AU CLIC SUR LIEN (mobile) =====
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
  
    // Récupérer les éléments
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
  
    // Vérifier si le bouton existe
    if (!themeSwitch) return;
  
    // Vérifier le thème sauvegardé dans localStorage
    const savedTheme = localStorage.getItem('theme');
        
    // Appliquer le thème sauvegardé
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeSwitch.classList.add('night-mode');
    } else {
      themeSwitch.classList.add('night-mode'); // Par défaut en mode nuit
    }
    
    // Ajouter l'événement de clic
    themeSwitch.addEventListener('click', () => {
      // Basculer les classes
      body.classList.toggle('light-mode');
      themeSwitch.classList.toggle('night-mode');
        
      // Sauvegarder la préférence
      if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        // Optionnel: changer l'icône du bouton (déjà géré par CSS)
      } else {
        localStorage.setItem('theme', 'dark');
      }
    
        // Optionnel: animation de feedback
        themeSwitch.style.transform = 'scale(0.95)';
        setTimeout(() => {
          themeSwitch.style.transform = 'scale(1)';
        }, 200);
    });
  
    // Pour le responsive, ajuster si nécessaire
    window.addEventListener('resize', function() {
        // Rien de spécial ici
    });

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
  const particleColor = isLightMode ? '#7c3aed' : '#a970ff';
  const lineColor = isLightMode ? '#7c3aed' : '#a970ff';
  
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 60,
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
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
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
        distance: 120,
        color: lineColor,
        opacity: 0.15,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
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
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.3
          }
        },
        push: {
          particles_nb: 3
        }
      }
    },
    retina_detect: true
  });
}

// Lancer les particules
initParticles();

// Mettre à jour les particules quand on change de thème
if (themeSwitch) {
  themeSwitch.addEventListener('click', function() {
    // Petit délai pour laisser le temps au thème de changer
    setTimeout(() => {
      // Recharger les particules avec les nouvelles couleurs
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = document.body.classList.contains('light-mode') ? '#7c3aed' : '#a970ff';
        window.pJSDom[0].pJS.particles.line_linked.color = document.body.classList.contains('light-mode') ? '#7c3aed' : '#a970ff';
        window.pJSDom[0].pJS.fn.particlesRefresh();
      } else {
        // Si l'instance n'existe pas, réinitialiser
        initParticles();
      }
    }, 100);
  });
}
});

