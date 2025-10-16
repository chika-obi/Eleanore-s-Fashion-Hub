// ==============================
//  CANVAS SPARKLE BACKGROUND (Interactive)
// ==============================
const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle setup
const particles = [];
const particleCount = 100;
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.4,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.8 + 0.2
  });
}

// Track mouse position
const mouse = { x: null, y: null };
canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    // Move particles
    p.x += p.dx;
    p.y += p.dy;

    // Gentle wrap-around edges
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    // Mouse interaction: attraction
    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        p.x += dx / distance; // gentle repel effect
        p.y += dy / distance;
      }
    }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(214, 240, 90, ${p.opacity})`;
    ctx.fill();
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

// =============================
//     CONTACT FORM HANDLER
// =============================
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    alert(`Thank you, ${name}! Your message has been sent successfully.`);
    this.reset();
  } else {
    alert("Please fill out all fields before submitting.");
  }
});
// =============================
//   SOCIAL ICON POP EFFECT
// =============================
document.querySelectorAll(".footer-socials a").forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.2)";
  });
  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "scale(1)";
  });
});
// Animate gallery items on scroll
window.addEventListener("scroll", () => {
  const items = document.querySelectorAll(".gallery-item");
  const trigger = window.innerHeight * 0.85;

  items.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) {
      item.classList.add("visible");
    }
  });
});
// Lookbook button interaction
document.querySelector(".lookbook-btn").addEventListener("click", () => {
  alert("Lookbook feature coming soon! 💅");
});
// Lookbook Modal Logic
const modal = document.getElementById("lookbookModal");
const modalImg = document.getElementById("lookbookImage");
const closeBtn = document.querySelector(".close-modal");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Your Lookbook images
const lookbookImages = [
   "./images/fashion6.jpg",
  "./images/logo.jpeg",
  "./images/fashion1.jpg",
  "./images/fashion2.jpg",
  "./images/fashion3.jpg",
  "./images/fashion4.jpg",
   "./images/fashion5.jpg",
    
];

let currentIndex = 0;

// Open modal on button click
document.querySelector(".lookbook-btn").addEventListener("click", () => {
  modal.style.display = "flex";
  modalImg.src = lookbookImages[currentIndex];
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Navigation
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % lookbookImages.length;
  modalImg.style.opacity = 0;
  setTimeout(() => {
    modalImg.src = lookbookImages[currentIndex];
    modalImg.style.opacity = 1;
  }, 300);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + lookbookImages.length) % lookbookImages.length;
  modalImg.style.opacity = 0;
  setTimeout(() => {
    modalImg.src = lookbookImages[currentIndex];
    modalImg.style.opacity = 1;
  }, 300);
});

// Close modal by clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// ===========================
// FASHION SLIDER LOGIC
// ===========================
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const totalSlides = slides.length;

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add("active");
}

// Auto-change every 6 seconds
setInterval(showNextSlide, 6000);

// 🌿 Back to Top Button Functionality
const backToTop = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTop.style.display = "block";
    backToTop.style.animation = "fadeIn 0.5s ease";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// 🌿 Advanced Floating + Color-Changing Animation
document.addEventListener("DOMContentLoaded", () => {
  const logoImg = document.querySelector(".footer-image img");
  let angle = 0;
  let hue = 0;

  function animateLogo() {
    // Update angles for motion
    angle += 0.02;
    hue = (hue + 1) % 360;

    // Gentle up/down + side movement
    const y = Math.sin(angle) * 10;  // vertical float
    const x = Math.cos(angle / 2) * 8; // horizontal sway
    const r = Math.sin(angle / 3) * 8; // rotation

    // Apply transformations
    logoImg.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;

    // Animate background color with hue rotation
    logoImg.style.background = `linear-gradient(135deg, hsl(${hue}, 90%, 60%), hsl(${(hue + 60) % 360}, 90%, 70%))`;

    requestAnimationFrame(animateLogo);
  }

  animateLogo();

  // Pause and glow on hover
  logoImg.addEventListener("mouseenter", () => {
    logoImg.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    logoImg.style.boxShadow = "0 0 25px rgba(198, 255, 0, 0.8)";
  });

  logoImg.addEventListener("mouseleave", () => {
    logoImg.style.boxShadow = "10px 10px 10px black";
  });
});

// 🌿 Reveal About Us on scroll
window.addEventListener("scroll", () => {
  const aboutSection = document.querySelector(".about-section");
  const rect = aboutSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    aboutSection.style.opacity = "1";
    aboutSection.style.transform = "translateY(0)";
    aboutSection.style.transition = "all 1s ease";
  }
});







