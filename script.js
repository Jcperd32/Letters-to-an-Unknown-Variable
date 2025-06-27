document.addEventListener('DOMContentLoaded', function() {
  const book = document.querySelector('.book');
  const bookLoader = document.getElementById('bookLoader');
  const mainContent = document.getElementById('mainContent');
  const ambientLight = document.querySelector('.ambient-light');
  const contentContainer = document.getElementById('content-container');//

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
  /*dictionary*/
  function initializeDictionary() {
    const inputEl = document.getElementById("word");
    const infoTextEl = document.getElementById("info-text");
    const meaningContainerEl = document.getElementById("definition-container");
    const titleEl = document.getElementById("word-title");
    const meaningEl = document.getElementById("definition");
    const audioEl = document.getElementById("word-audio");

    async function fetchAPI(word) {
      try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        if (result.title) {
          meaningContainerEl.style.display = "block";
          infoTextEl.style.display = "none";
          titleEl.innerText = word;
          meaningEl.innerText = "N/A";
          audioEl.style.display = "none";
        } else {
          infoTextEl.style.display = "none";
          meaningContainerEl.style.display = "block";
          audioEl.style.display = "inline-flex";
          titleEl.innerText = result[0].word;
          meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
          audioEl.src = result[0].phonetics[0].audio;
        }
      } catch (error) {
        console.log(error);
        infoTextEl.innerText = `an error happened, try again later`;
      }
    }

    if (inputEl) {
      inputEl.addEventListener("keyup", (e) => {
        if (e.target.value && e.key === "Enter") {
          fetchAPI(e.target.value);
        }
      });
    }
  }
  /*game for scramble*/
  function scrambleGame() {
    

    
      const scramble = [
        "within",
        "the", 
        "ineffable",
        "lingering",
        "machiavelian",
        "maim",
        "vices",
        "crisis",
        "tale",
        "conundrum",
        "theorem",
        "quantum",
        "pi",
        "piece"
    ]
    
    const hints = [
        "000001",
        "000010", 
        "000011",
        "000100",
        "000101",
        "000110",
        "000111",
        "001000",
        "001001",
        "001010",
        "001011",
        "001100",
        "001101",
        "001111"
    ];
    
    let displayWord = "";
    
    function shuffle(str) {
        strArray = Array.from(str);
        for (let i = 0; i < strArray.length - 1; ++i) {
            let j = Math.floor(Math.random() * strArray.length);
        
            let temp = strArray[i];
            strArray[i] = strArray[j];
            strArray[j] = temp;
        }
        return strArray.join(" ");
    }
    
    function check() {
        let input = document.getElementById("inputWord");
        let output = document.getElementById("output");
        if (
            input.value.toLocaleLowerCase() ===
            displayWord.toLocaleLowerCase()
        )
            output.innerHTML = "Result: Correct";
        else output.innerHTML = "Result: Incorrect";
    }
    
    function refresh() {
        index = Math.floor(Math.random() * 15);
        displayWord = scramble[index];
        displayHint = hints[index];
        scrambleWord = 
            document.getElementById("scrambleWord");
        scrambleWord.innerText =
            shuffle(displayWord).toUpperCase();
        let hint = document.getElementById("hint");
        hint.innerHTML = "<b>Hint:</b> " + displayHint;
        document.getElementById("output").innerText = "Result:";
    }
    
    refresh();

    document.addEventListener("click", function(e) {
      if (e.target.id === "checkBtn") check();
      if (e.target.id === "refreshBtn") refresh();
    });
    }

  
  /*math section*/
  document.addEventListener("click", function(e) {
    if (e.target.closest(".theorem-btn")) {
      e.target.closest(".theorem").classList.toggle("show-text");
  
      if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise();
      }
    }
  });
  
  /*quote*/
  function initializeQuotes() {
  const quotes = [
    {
      content: "Once you've been loved once and have loved once, you cannot forget it.",
      author: "Natsume Takashi"
    },
    {
      content: "As I encountered kindness, I wanted to be kind myself. I wanted to be able to do something, just as others had done for me",
      author: "Natsume Takashi"
    },
    {
      content: "I called his name again and again. And I learned that each time, nothing called back. I learned that no matter how much you want something, how many times you scream to it, sometimes it's out of reach. I decided to stop calling out for someone who would never call back",
      author: "Natsume Takashi"
    },
    {
      content: "No matter what anybody tells you, words and ideas can change the world",
      author: "Dead Poets Society"
    },
    {
      content: "Carpe Diem. Seize the day, boys. Make your lives extraordinary",
      author: "Dead Poets Society"
    },
    {
      content: "Humanity is a vessel bruised and broken, barely able to contain its contents.",
      author: "The Vegetarian by Han Kang"
    },
    {
      content: "No matter what happens, even if it leaves scars, as long as you overcome it, that’s what matters.",
      author: "Before the Coffee Gets Cold by Toshikazu Kawaguchi"
    },
    {
      content: "The things that go unsaid are often the things that eat at you—whether because you didn’t get to have your say, or because the other person never got to hear you and really wanted to.",
      author: "Everything I Never Told You by Celeste Ng"
    },
    {
      content: "Girls are capable of doing everything men are capable of doing. Sometimes they have more imagination than men.",
      author: "Hidden Figures by Margot Lee Shetterly"
    },
    {
      content: "No matter what, I want to continue living with the awareness that I will die. Without that, I am not alive.",
      author: "Kitchen by Banana Yoshimoto"
    },
    {
      content: "Happiness is always determined by your heart. No one is born unhappy.",
      author: "Ikigai by Héctor García and Francesc Miralles"
    },
    {
      content: "The first to die at the end taught me that love is louder than death.",
      author: "The First to Die at the End by Adam Silvera"
    },
    {
      content: "Wasn’t friendship its own miracle, the finding of another person who made the entire lonely world seem somehow less lonely?",
      author: "A Little Life by Hanya Yanagihara"
    },
    {
      content: "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.",
      author: "Marie Curie"
    },
    {
      content: "The world is a dangerous place to live; not because of the people who are evil, but because of the people who don’t do anything about it.",
      author: "Albert Einstein"
    },
    {
      content: "However difficult life may seem, there is always something you can do and succeed at.",
      author: "Stephen Hawking"
    },
    {
      content: "A mathematician is a machine for turning coffee into theorems.",
      author: "Paul Erdős"
    },
    {
      content: "I have no time. I need to finish my work before I die.",
      author: "Évariste Galois"
    },
    {
      content: "If I have seen further, it is by standing on the shoulders of giants.",
      author: "Isaac Newton"
    },
    {
      content: "There is nothing so barren as a mind closed to new ideas.",
      author: "Gottfried Wilhelm Leibniz"
    },
    {
      content: "To those who do not know mathematics, it is difficult to get across a real feeling as to the beauty, the deepest beauty, of nature.",
      author: "Daniel Bernoulli"
    },
    {
      content: "We realize the importance of our voices only when we are silenced.",
      author: "Malala Yousafzai"
    },
    {
      content: "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
      author: "Maya Angelou"
    },
    {
      content: "The most difficult thing is the decision to act, the rest is merely tenacity.",
      author: "Amelia Earhart"
    },
    {
      content: "I am not free while any woman is unfree, even when her shackles are very different from my own.",
      author: "Audre Lorde"
    },
    {
      content: "If they don’t give you a seat at the table, bring a folding chair.",
      author: "Shirley Chisholm"
    },
    {
      content: "You must never be fearful about what you are doing when it is right.",
      author: "Rosa Parks"
    },
    {
      content: "I alone cannot change the world, but I can cast a stone across the waters to create many ripples.",
      author: "Mother Teresa"
    },
    {
      content: "The question isn’t who’s going to let me; it’s who’s going to stop me.",
      author: "Ayn Rand"
    },
    {
      content: "Courage is like a muscle. We strengthen it by use.",
      author: "Ruth Bader Ginsburg"
    },
    {
      content: "I was taught that the way of progress was neither swift nor easy.",
      author: "Marie Curie"
    },
    {
      content: "The world isn’t beautiful, and that’s why it is.",
      author: "March Comes in Like a Lion"
    },
    {
      content: "Even if you’re not rewarded, even if no one notices, you have to keep walking forward.",
      author: "March Comes in Like a Lion"
    },
    {
      content: "It’s okay to be weak. That’s why we have other people—to help us stand.",
      author: "March Comes in Like a Lion"
    },
    {
      content: "I don’t know what ‘I love you’ means, but if it makes you happy, I’ll say it as many times as you want.",
      author: "Violet Evergarden"
    },
    {
      content: "You cannot substitute anything for the people you’ve lost.",
      author: "Violet Evergarden"
    },
    {
      content: "Some words must be said face to face to truly reach someone.",
      author: "Violet Evergarden"
    },
    {
      content: "I found you. Finally, I found you… ",
      author: "Anohana: The Flower We Saw That Day"
    },
    {
      content: "We all grew up, but we never moved on.",
      author: "Anohana: The Flower We Saw That Day"
    },
    {
      content: "I don’t want to disappear… I still have so much I want to do.",
      author: "Anohana: The Flower We Saw That Day"
    },
    {
      content: "No matter how many times I fall, I have to stand up again.",
      author: "A Silent Voice"
    },
    {
      content: "I wanted to tell you… that I’m sorry.",
      author: "A Silent Voice"
    },
    {
      content: "I thought I was alone, but you were always there.",
      author: "A Silent Voice"
    }
  ];

  const quoteEl = document.getElementById("pquote");
  const authorEl = document.getElementById("author");
  const btnEl = document.getElementById("getbtn");

  function showRandomQuote() {
    if (!quoteEl || !authorEl) return; 
    
    quoteEl.style.opacity = 0;
    authorEl.style.opacity = 0;
    
    setTimeout(() => {
      const {content, author} = quotes[Math.floor(Math.random() * quotes.length)];
      quoteEl.textContent = content;
      authorEl.textContent = `~ ${author}`;
      
      quoteEl.style.opacity = 1;
      authorEl.style.opacity = 1;
    }, 300);
  }

  if (quoteEl && authorEl) {
    showRandomQuote();
    
    if (btnEl) {
      btnEl.addEventListener("click", showRandomQuote);
    }
  }
}



  const btn = document.querySelector(".btn");
  const video = document.querySelector(".background-video");
  const fa= document.querySelector(".fa");
  const preloader = document.querySelector(".preloader");
  
  btn.addEventListener("click", () => {
    if (btn.classList.contains("pause")) {
      btn.classList.remove("pause");
      video.play();
      fa.classList.add("fa-pause");
      fa.classList.remove("fa-play");
    } else {
      btn.classList.add("pause");
      video.pause();
      fa.classList.remove("fa-pause");
      fa.classList.add("fa-play");
    }
  });
  
  window.addEventListener("load", () => {
    preloader.style.zIndex = "-999";
  });

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
        setTimeout(() => initializeDictionary(), 100); 
      }
      

      if (sectionId === 'movies') {
        setTimeout(() => {
          scrambleGame(); 
        }, 50); 
      }

      if (sectionId === 'poetry') {
        initializeQuotes();
      }

      document.querySelectorAll(
        '.content-wrapper-right, .content-wrapper-left, .intro, .subintro'
      ).forEach(element => {
        scrollObserver.observe(element);
      });

      initializeVideoPlayers();
      //for math section
      if (sectionId === 'math') {
        if (!document.getElementById('MathJax-script')) {
          const script = document.createElement('script');
          script.id = 'MathJax-script';
          script.async = true;
          script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
          script.onload = () => {
            if (typeof MathJax !== 'undefined') {
              MathJax.typesetPromise(); 
            }
          };
          document.head.appendChild(script);
        }
      }

      // Initialize gallery only if we're in the gallery section
      if (sectionId === 'gallery') {
        const imageContainerEl = document.querySelector(".image-container");
        const prevEl = document.getElementById("prev");
        const nextEl = document.getElementById("next");
        let x = 0;
        let timer;
        
        if (prevEl && nextEl && imageContainerEl) {
          prevEl.addEventListener("click", () => {
            x = x + 45;
            clearTimeout(timer);
            updateGallery();
          });
          
          nextEl.addEventListener("click", () => {
            x = x - 45;
            clearTimeout(timer);
            updateGallery();
          });
          
          function updateGallery() {
            imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
            timer = setTimeout(() => {
              x = x - 45;
              updateGallery();
            }, 3000);
          }
          
          updateGallery();
        }
      }
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


