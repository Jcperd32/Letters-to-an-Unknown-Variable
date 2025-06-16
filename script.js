document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".content-section").forEach(section => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });

    const targetId = button.getAttribute("data-section");
    document.getElementById(targetId).classList.add("active");
    document.getElementById(targetId).classList.remove("hidden");
  });
});
