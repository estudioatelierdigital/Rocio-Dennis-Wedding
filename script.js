/* 
=======================================================================
NOTA PARA EDICIÓN:
- Fecha de la cuenta regresiva: Modifica "2027-02-13T18:00:00" si cambia la hora o fecha exacta.
- El resto del código funciona automáticamente con las clases e IDs del HTML.
=======================================================================
*/

/* ========================= */
/* LÓGICA DE IDIOMAS */
/* ========================= */
const btnEs = document.getElementById('btn-es');
const btnDe = document.getElementById('btn-de');
const body = document.body;
const langTooltip = document.getElementById('langTooltip');

// Variables para WhatsApp
const whatsappLink = document.getElementById('whatsappLink');
const phoneNumber = "525649660085";
const msgEs = "Hola, confirmo mi asistencia a la boda de Rocío y Dennis ✨";
const msgDe = "Hallo, ich bestätige meine Teilnahme an der Hochzeit von Rocío und Dennis ✨";

btnEs.addEventListener('click', () => {
  body.classList.remove('lang-de-active');
  body.classList.add('lang-es-active');
  btnEs.classList.add('active');
  btnDe.classList.remove('active');
  
  // Oculta el globo si lo presionan
  if(langTooltip) langTooltip.classList.add('hidden');
  
  // Cambia el mensaje de WhatsApp a Español
  if(whatsappLink) {
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msgEs)}`;
  }
});

btnDe.addEventListener('click', () => {
  body.classList.remove('lang-es-active');
  body.classList.add('lang-de-active');
  btnDe.classList.add('active');
  btnEs.classList.remove('active');
  
  // Oculta el globo si lo presionan
  if(langTooltip) langTooltip.classList.add('hidden');
  
  // Cambia el mensaje de WhatsApp a Alemán
  if(whatsappLink) {
    whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msgDe)}`;
  }
});

/* ========================= */
/* INTRO Y MÚSICA */
/* ========================= */
const intro = document.getElementById('intro');
const openInvitation = document.getElementById('openInvitation');
const music = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');

let isPlaying = false;

openInvitation.addEventListener('click', () => {
  // Ocultar pantalla inicial
  intro.classList.add('hidden');
  
  // Intentar reproducir música
  music.play().then(() => {
    isPlaying = true;
    musicButton.classList.add('playing');
  }).catch((error) => {
    console.log("El navegador bloqueó el autoplay de audio. El usuario debe iniciarlo manualmente.");
  });
});

musicButton.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicButton.classList.remove('playing');
    musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    music.play();
    musicButton.classList.add('playing');
    musicButton.innerHTML = '<i class="fa-solid fa-music"></i>';
  }
  isPlaying = !isPlaying;
});

/* ========================= */
/* CUENTA REGRESIVA */
/* ========================= */
// Fecha del evento: 13 de febrero de 2027 a las 18:00 hrs
const targetDate = new Date("2027-02-13T18:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente para evitar parpadeo inicial

/* ========================= */
/* SCROLL REVEAL (ANIMACIONES) */
/* ========================= */
const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  reveals.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections(); // Ejecutar al cargar la página

/* ========================= */
/* LIGHTBOX DE GALERÍA */
/* ========================= */
const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImage.src = img.src;
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});