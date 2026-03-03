const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const themeToggle = document.getElementById("themeToggle");
const revealElements = document.querySelectorAll(".reveal");
const zoomableImages = document.querySelectorAll(".project-shot-grid img, .profile-ring img, .about-photo-wrap img");
const playstoreModal = document.getElementById("playstoreModal");
const openPlaystoreModalBtn = document.getElementById("openPlaystoreModal");
const closePlaystoreModalBtn = document.getElementById("closePlaystoreModal");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

const onIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(onIntersect, {
  threshold: 0.15,
});

revealElements.forEach((element) => revealObserver.observe(element));

const sectionIds = ["home", "about", "skills", "portfolio", "services", "social-contact", "contact"];
const sectionMap = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

const setActiveNav = () => {
  const scrollY = window.scrollY + 140;

  sectionMap.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (!navLink) return;

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((item) => item.classList.remove("active"));
      navLink.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveNav);
setActiveNav();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "Dark";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "Dark" : "Light";
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

const lightbox = document.createElement("div");
lightbox.className = "image-lightbox";
lightbox.setAttribute("aria-hidden", "true");

const lightboxImage = document.createElement("img");
lightboxImage.alt = "Project screenshot preview";

const lightboxClose = document.createElement("button");
lightboxClose.className = "lightbox-close";
lightboxClose.type = "button";
lightboxClose.setAttribute("aria-label", "Close image preview");
lightboxClose.innerHTML = "&times;";

lightbox.appendChild(lightboxClose);
lightbox.appendChild(lightboxImage);
document.body.appendChild(lightbox);

const openLightbox = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Project screenshot preview";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
};

zoomableImages.forEach((image) => {
  image.addEventListener("click", () => {
    openLightbox(image.src, image.alt);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

const openPlaystoreModal = () => {
  if (!playstoreModal) return;
  playstoreModal.classList.add("open");
  playstoreModal.setAttribute("aria-hidden", "false");
};

const closePlaystoreModal = () => {
  if (!playstoreModal) return;
  playstoreModal.classList.remove("open");
  playstoreModal.setAttribute("aria-hidden", "true");
};

if (openPlaystoreModalBtn && closePlaystoreModalBtn && playstoreModal) {
  openPlaystoreModalBtn.addEventListener("click", openPlaystoreModal);
  closePlaystoreModalBtn.addEventListener("click", closePlaystoreModal);

  playstoreModal.addEventListener("click", (event) => {
    if (event.target === playstoreModal) {
      closePlaystoreModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && playstoreModal.classList.contains("open")) {
      closePlaystoreModal();
    }
  });
}
