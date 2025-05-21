document.addEventListener("DOMContentLoaded", () => {
            const animatedElements = document.querySelectorAll(".three, .four, .five, .six, .seven");

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                    }
                });
            }, {
                threshold: 0.2
            });

            animatedElements.forEach(el => observer.observe(el));
        });