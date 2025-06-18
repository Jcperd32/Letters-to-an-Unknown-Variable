document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".content-section").forEach(section => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });
    
    const targetId = button.getAttribute("data-section");
    const targetSection = document.getElementById(targetId);
    targetSection.classList.add("active");
    targetSection.classList.remove("hidden");

    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

const wrapperObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });


document.querySelectorAll('.content-wrapper-right, .content-wrapper-left').forEach(wrapper => {
  wrapperObserver.observe(wrapper);
});


const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.content-section').forEach(section => {
  sectionObserver.observe(section);
});
