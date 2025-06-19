document.addEventListener('DOMContentLoaded', function() {
  const book = document.querySelector('.book');
  const bookLoader = document.getElementById('bookLoader');
  const mainContent = document.getElementById('mainContent');
  
  document.body.classList.add('loading');
  
  mainContent.style.display = 'none';

  book.addEventListener('click', function() {
    book.classList.add('open');
    
    setTimeout(function() {
      bookLoader.classList.add('zoom-out');

      setTimeout(function() {
        bookLoader.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.classList.remove('loading');
        mainContent.style.animation = 'fadeIn 1s ease';
      }, 1500);
    }, 1500);
  });

  setTimeout(function() {
    if (!book.classList.contains('open')) {
      book.click(); 
    }
  }, 6000);
});

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
