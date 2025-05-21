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

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let count = 100;
          const target = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
          const speed = Math.floor(1000 / target); 

          const interval = setInterval(() => {
            if (count < target) {
              count++;
              document.getElementById("visitor-count").textContent = count;
            } else {
              clearInterval(interval);
            }
          }, speed);

          counterObserver.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.5
    });

    counterObserver.observe(document.getElementById("counter-section"));