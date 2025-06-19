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

document.querySelector('.book-cover').addEventListener('click', function() {
  const preloader = document.getElementById('book-preloader');
  preloader.classList.add('book-open');
  
  setTimeout(() => {
    preloader.style.display = 'none';
    document.getElementById('main-content').classList.remove('hidden');
  }, 1000); 
});
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.content-wrapper-right, .content-wrapper-left, .intro, .subintro'
).forEach(element => {
  scrollObserver.observe(element);
});

const videoPlayers = [];

function stopAllVideos() {
  videoPlayers.forEach(player => {
    player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });
}

document.querySelectorAll('.video-wrapper iframe').forEach((iframe, index) => {
  iframe.id = `yt-player-${index}`;
  videoPlayers.push(iframe);
  
  
  iframe.closest('.media-container').addEventListener('click', () => {
    stopAllVideos();
  });
});
