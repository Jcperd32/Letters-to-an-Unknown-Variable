document.addEventListener('DOMContentLoaded', function() {
  const book = document.querySelector('.book');
  const bookLoader = document.getElementById('bookLoader');
  const mainContent = document.getElementById('mainContent');
  const ambientLight = document.querySelector('.ambient-light');

  const spine = document.createElement('div');
  spine.className = 'spine';
  book.appendChild(spine);


  document.body.classList.add('loading');
  mainContent.style.display = 'none';


  book.addEventListener('click', function() {
    handleBookClick();
  });


  book.addEventListener('mouseenter', function() {
    if (!book.classList.contains('open')) {
      book.style.transform = 'translateZ(20px)';
      ambientLight.style.transform = 'scale(1.1)';
    }
  });
  
  book.addEventListener('mouseleave', function() {
    if (!book.classList.contains('open')) {
      book.style.transform = 'translateZ(0)';
      ambientLight.style.transform = 'scale(1)';
    }
  });

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", handleNavButtonClick);
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

  // Video player controls
  const videoPlayers = [];
  initializeVideoPlayers();

  // Functions
  function handleBookClick() {
    book.style.pointerEvents = 'none';
    
    // Create shimmer effect
    const shimmer = document.createElement('div');
    shimmer.style.position = 'absolute';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.top = '0';
    shimmer.style.left = '0';
    shimmer.style.background = 'radial-gradient(circle at center, rgba(201, 167, 105, 0.8) 0%, transparent 70%)';
    shimmer.style.opacity = '0';
    shimmer.style.transition = 'opacity 0.5s ease';
    book.appendChild(shimmer);
   
    setTimeout(() => {
      shimmer.style.opacity = '1';
      setTimeout(() => {
        shimmer.style.opacity = '0';
        setTimeout(() => shimmer.remove(), 500);
      }, 300);
    }, 50);

    book.classList.add('open');
    ambientLight.style.transform = 'scale(1.5)';
    ambientLight.style.opacity = '0';
    
    setTimeout(() => {
      bookLoader.classList.add('zoom-out');
      setTimeout(() => {
        bookLoader.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.classList.remove('loading');
        mainContent.classList.add('fade-in');
      }, 1500);
    }, 1500);
  }

  function handleNavButtonClick() {
    document.querySelectorAll(".content-section").forEach(section => {
      section.classList.add("hidden");
      section.classList.remove("active");
    });

    const targetId = this.getAttribute("data-section");
    const targetSection = document.getElementById(targetId);
    targetSection.classList.add("active");
    targetSection.classList.remove("hidden");
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }

  function stopAllVideos() {
    videoPlayers.forEach(player => {
      player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
  }

  function initializeVideoPlayers() {
    document.querySelectorAll('.video-wrapper iframe').forEach((iframe, index) => {
      iframe.id = `yt-player-${index}`;
      videoPlayers.push(iframe);
      
      iframe.closest('.media-container').addEventListener('click', () => {
        stopAllVideos();
      });
    });
  }
});
