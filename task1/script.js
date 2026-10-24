/* 1. Typing animation */
const roleElement = document.querySelector(".home h2");

const roles = [
    "Aspiring Full Stack Developer",
    "Computer Science Engineering Student",
    "Future Software Engineer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];

    roleElement.textContent = currentRole.substring(0, characterIndex);

    if (!deleting) {
        characterIndex++;

        if (characterIndex > currentRole.length) {
            deleting = true;
            setTimeout(typeRole, 1200);
            return;
        }
    } else {
        characterIndex--;

        if (characterIndex < 0) {
            characterIndex = 0;
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeRole, deleting ? 45 : 90);
}

typeRole();


/* 2. Reveal elements while scrolling */
const revealElements = document.querySelectorAll(
    ".home-content, .home-image, .section, .card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


/* 3. Highlight the active navigation link */
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let currentSection = "home";

    document.querySelectorAll("section[id]").forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
});


/* 4. Create a Back to Top button */
const topButton = document.createElement("button");

topButton.textContent = "↑";
topButton.className = "back-to-top";
topButton.setAttribute("aria-label", "Back to top");
topButton.title = "Back to top";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.classList.toggle("show", window.scrollY > 300);
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* 5. Update copyright year */
const footer = document.querySelector("footer p");

if (footer) {
    footer.textContent =
        `© ${new Date().getFullYear()} Nayana | Designed with 💙`;
}