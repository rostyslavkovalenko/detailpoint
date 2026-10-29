const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Zamknij menu" : "Otwórz menu"
    );
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Otwórz menu");
    });
});


// Header visibility on scroll

const siteHeader = document.querySelector(".site-header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const menuIsOpen = menuToggle?.classList.contains("active");

    if (currentScrollY < 80 || menuIsOpen) {
        siteHeader.classList.remove("header-hidden");
    } else if (currentScrollY > lastScrollY) {
        siteHeader.classList.add("header-hidden");
    } else if (currentScrollY < lastScrollY) {
        siteHeader.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
});



// Contact form — EmailJS

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    emailjs.init({
        publicKey: "oSDSw1Gp3fS85Hsmy",
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );
        const formNote = contactForm.querySelector(".form-note");

        submitButton.disabled = true;
        submitButton.textContent = "Wysyłanie...";

        try {
            await emailjs.sendForm(
                "service_hoakqrr",
                "template_hq55qw4",
                contactForm
            );

            formNote.textContent =
                "Dziękujemy! Wiadomość została wysłana.";
            formNote.classList.add("form-success");

            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);

            formNote.textContent =
                "Nie udało się wysłać wiadomości. Spróbuj ponownie.";
            formNote.classList.add("form-error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Przygotuj zapytanie";
        }
    });
}
