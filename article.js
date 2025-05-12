

  // In a real implementation, you would use this to get the article ID from the URL
  // const articleId = getUrlParameter('id');
  // if (articleId) {
  //     // Show the correct article based on URL parameter
  //     articleSelect.value = articleId;
  //     articleSelect.dispatchEvent(new Event('change'));
  // }

  // nav hidden
  function cycleAnimationType() {
    // Change to next animation type
    currentAnimationIndex = (currentAnimationIndex + 1) % animationTypes.length;
    // Apply new animation immediately
    showSlides(slideIndex);
  }
  let lastScrollTop = 0; // Track the last scroll position
  const nav = document.querySelector('nav'); // Select the navigation element

  // Detect scroll event
  window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
      // Scrolling down, hide the nav (slide up)
      nav.classList.add('nav-hidden');
    } else {
      // Scrolling up, show the nav (slide down)
      nav.classList.remove('nav-hidden');
    }
    
    // Update last scroll position to the current one
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  //preloader
  window.addEventListener("load", function () {
    // Delay before fade-out (e.g. 3 seconds = 3000ms)
    setTimeout(function () {
      const preloader = document.getElementById("preloader");
      preloader.style.opacity = "0";

      // Optional: fully remove it after fade transition
      setTimeout(() => {
        preloader.style.display = "none";
      }, 1000); // matches CSS transition duration
    }, 1200); // 👈 change this value for a longer preloader delay
  });