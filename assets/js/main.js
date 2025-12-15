const navMenu = document.getElementById("nav-menu"),
	navToggle = document.getElementById("nav-toggle"),
	navItem = document.querySelectorAll(".nav__item"),
	header = document.getElementById("header");

// open and close menu
navToggle.addEventListener("click", () => {
	navMenu.classList.toggle("nav__menu--open");
	changeIcon();
});

const scrollToHireMe = () => {
	const hireMeSection = document.getElementById("hireMe");
	hireMeSection.scrollIntoView({ behavior: "smooth" });
};

// close the menu when the user clicks the nav links
navItem.forEach((item) => {
	item.addEventListener("click", () => {
		if (navMenu.classList.contains("nav__menu--open")) {
			navMenu.classList.remove("nav__menu--open");
		}
		changeIcon();
	});
});

// Change nav toggle icon
function changeIcon() {
	if (navMenu.classList.contains("nav__menu--open")) {
		navToggle.classList.replace("ri-menu-3-line", "ri-close-line");
	} else {
		navToggle.classList.replace("ri-close-line", "ri-menu-3-line");
	}
}

// Downloading Resume
// document.getElementsByClassName("btn btn--primary").addEventListener("click", function() {
//   window.location.href = "../../assets/Calvin Mwangi.pdf"
// })

// Testimonial Slide

const testimonialSlide = new Swiper(".testimonial__wrapper", {
	loop: true,
	spaceBetween: 30,
	centeredSlides: true,
	effect: "coverflow",
	grabCursor: true,
	slidesPerView: 1,
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	breakpoints: {
		520: {
			slidesPerView: "auto",
		},
	},
});

// header scroll animation
window.addEventListener("scroll", () => {
	if (window.scrollY > 40) {
		header.classList.add("header--scroll");
	} else {
		header.classList.remove("header--scroll");
	}
});

// ScrollReveal animations
const sr = ScrollReveal({
	duration: 2000,
	distance: "100px",
	delay: 400,
	reset: false,
});

sr.reveal(".hero__content, .about__content");
sr.reveal(".hero__img", { origin: "top" });

sr.reveal(
	".hero__info-wrapper, .skills__title, .skills__content, .qualification__name, .qualification__item, .service__card, .project__content, .testimonial__wrapper, .footer__content",
	{
		delay: 500,
		interval: 100,
	}
);

sr.reveal(".qualification__footer-text, .contact__content", {
	origin: "left",
});

sr.reveal(".qualification__footer .btn, .contact__btn", { origin: "right" });

document.addEventListener("DOMContentLoaded", () => {
	fetch("assets/database/data.json")
		.then((res) => res.json())
		.then((data) => {
			const yearSpan = document.querySelector(".footer__copyright");
			const currentYear = new Date().getFullYear();
			yearSpan.innerHTML = yearSpan.innerHTML.replace(
				"{currentYear}",
				currentYear
			);
			yearSpan.innerHTML = yearSpan.innerHTML.replace(
				"{fullname}",
				data.hero?.name || ""
			);

			// Helper to safely set text content
			function setText(id, value) {
				const el = document.getElementById(id);
				if (el) {
					if (value !== undefined && value !== null) {
						el.textContent = value;
					} else {
						console.warn(`Warning: Missing value for #${id}`);
					}
				} else {
					console.warn(`Warning: Element #${id} not found in DOM`);
				}
			}

			// Helper to safely set attribute
			function setAttr(id, attr, value) {
				const el = document.getElementById(id);
				if (el) {
					if (value !== undefined && value !== null) {
						el.setAttribute(attr, value);
					} else {
						console.warn(
							`Warning: Missing value for ${attr} of #${id}`
						);
					}
				} else {
					console.warn(`Warning: Element #${id} not found in DOM`);
				}
			}

			setText("hero-name", data.hero?.name);
			setText("hero-title", data.hero?.title);
			setText("hero-description", data.hero?.description);
			setAttr("hero-image", "src", data.hero?.image);
			setText("about-title", data.about?.title);
			setText("about-description", data.about?.description);
			setText("projects-completed", data.hero?.projectsCompleted);
			setText("hire-btn", data.hero?.hireText);
			setAttr("hire-btn", "href", `mailto:${data.hero?.hireEmail || ""}`);

			// Navigation
			const navLinksContainer = document.getElementById("nav-links");

			if (navLinksContainer && Array.isArray(data.navlinks)) {
				navLinksContainer.innerHTML = ""; // clear old items if any

				data.navlinks.forEach((link) => {
					// Validate item
					if (!link.name || !link.url) {
						console.warn("Invalid nav link:", link);
						return; // skip invalid entry
					}

					const li = document.createElement("li");
					li.className = "nav__item";

					const a = document.createElement("a");
					a.className = "nav__link";
					a.href = link.url;
					a.textContent = link.name;

					li.appendChild(a);
					navLinksContainer.appendChild(li);
				});
			} else {
				console.warn("Nav links missing or invalid");
			}

			// Skills
			const backend = document.getElementById("backend-skills");
			if (backend && Array.isArray(data.skills?.backend)) {
				data.skills.backend.forEach((skill) => {
					const li = document.createElement("li");
					li.className = "skills__item";
					li.innerHTML = `<i class="ri-arrow-right-s-fill"></i> ${skill}`;
					backend.appendChild(li);
				});
			} else {
				console.warn("Backend skills missing or empty");
			}

			const frontend = document.getElementById("frontend-skills");
			if (frontend && Array.isArray(data.skills?.frontend)) {
				data.skills.frontend.forEach((skill) => {
					const li = document.createElement("li");
					li.className = "skills__item";
					li.innerHTML = `<i class="ri-arrow-right-s-fill"></i> ${skill}`;
					frontend.appendChild(li);
				});
			} else {
				console.warn("Frontend skills missing or empty");
			}

			// Qualification (Experience & Education)
			const experienceList = document.getElementById("experience-list");
			if (
				experienceList &&
				Array.isArray(data.qualification?.experience)
			) {
				data.qualification.experience.forEach((exp) => {
					const div = document.createElement("div");
					div.className = "qualification__item";
					div.innerHTML = `
          <h3 class="qualification__title">${exp.title || ""}</h3>
          <p class="qualification__description">${exp.description || ""}</p>
          <span class="qualification__date">${exp.date || ""}</span>
        `;
					experienceList.appendChild(div);
				});
			} else {
				console.warn("Experience data missing or empty");
			}

			const educationList = document.getElementById("education-list");
			if (educationList && Array.isArray(data.qualification?.education)) {
				data.qualification.education.forEach((edu) => {
					const div = document.createElement("div");
					div.className = "qualification__item";
					div.innerHTML = `
          <h3 class="qualification__title">${edu.title || ""}</h3>
          <h4>${edu.institution || ""}</h4>
          <p class="qualification__description">${edu.description || ""}</p>
          <span class="qualification__date">${edu.date || ""}</span>
        `;
					educationList.appendChild(div);
				});
			} else {
				console.warn("Education data missing or empty");
			}

			const projectList = document.getElementById("project-list");
			if (projectList && Array.isArray(data.projects)) {
				data.projects.forEach((project) => {
					const div = document.createElement("div");
					div.className = "project__content";
					div.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project__img">
        <a href="${project.liveLink}" class="project__link">
          <h3 class="project__title">${project.title}</h3>
        </a>
        <p class="project__description">${project.description}</p>
        <a href="${project.githubLink}" class="project__link">View Project
          <i class="ri-arrow-right-line"></i>
        </a>
      `;
					projectList.appendChild(div);
				});
			}

			// Contact & Social
			setAttr(
				"contact-email",
				"href",
				`mailto:${data.contact?.email}` || "#"
			);
			setAttr(
				"social-whatsapp",
				"href",
				data.contact?.social?.whatsapp || "#"
			);
			setAttr(
				"social-instagram",
				"href",
				data.contact?.social?.instagram || "#"
			);
			setAttr(
				"social-linkedin",
				"href",
				data.contact?.social?.linkedin || "#"
			);
			setAttr(
				"social-github",
				"href",
				data.contact?.social?.github || "#"
			);
			setAttr(
				"social-twitter",
				"href",
				data.contact?.social?.twitter || "#"
			);
		})
		.catch((err) => console.error("Failed to load data.json:", err));
});
