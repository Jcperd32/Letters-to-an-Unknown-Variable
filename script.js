document.addEventListener('DOMContentLoaded', function() {
  const book = document.querySelector('.book');
  const bookLoader = document.getElementById('bookLoader');
  const mainContent = document.getElementById('mainContent');
  const ambientLight = document.querySelector('.ambient-light');
  const contentContainer = document.getElementById('content-container');

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
    button.addEventListener("click", function() {
      const sectionId = this.getAttribute("data-section");
      loadSection(sectionId);
    });
  });

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });


  const videoPlayers = [];


  function handleBookClick() {
    book.style.pointerEvents = 'none';
    
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
        loadSection('home');
      }, 1500);
    }, 1500);
  }

  async function loadSection(sectionId) {
    try {
      const response = await fetch(`sections/${sectionId}.html`);
      
      if (!response.ok) {
        throw new Error('Failed to load section');
      }
      
      const html = await response.text();
      contentContainer.innerHTML = html;
      
      if (sectionId === 'books') {
        loadCSS('styles/books.css');
      }

      document.querySelectorAll(
        '.content-wrapper-right, .content-wrapper-left, .intro, .subintro'
      ).forEach(element => {
        scrollObserver.observe(element);
      });

      initializeVideoPlayers();
    } catch (error) {
      console.error('Error loading section:', error);
      contentContainer.innerHTML = `
        <div class="error-message">
          <h2>Content Could Not Be Loaded</h2>
          <p>We couldn't load the ${sectionId} content. Please try again later.</p>
        </div>
      `;
    }
  }

  function loadCSS(href) {
    const existingLinks = Array.from(document.head.querySelectorAll('link')).filter(
      link => link.href.includes(href)
    );
    
    if (existingLinks.length === 0) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  function stopAllVideos() {
    videoPlayers.forEach(player => {
      if (player.contentWindow) {
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  }

  function initializeVideoPlayers() {

    videoPlayers.length = 0;
    
    document.querySelectorAll('.video-wrapper iframe').forEach((iframe, index) => {
      if (!iframe.id) {
        iframe.id = `yt-player-${index}`;
        videoPlayers.push(iframe);
        
        iframe.closest('.media-container')?.addEventListener('click', () => {
          stopAllVideos();
        });
      }
    });
  }
});
