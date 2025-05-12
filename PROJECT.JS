document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Initialize the slider
  updateSlider();
  
  // Set up navigation functions
  function updateSlider() {
    // Update slider position
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    updateSlider();
  }
  
  // Set up event listeners
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-index'));
      goToSlide(slideIndex);
    });
  });
  
  // Auto-play functionality
  let interval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);
  
  // Pause auto-play on hover
  const sliderContainer = document.querySelector('.slider-container');
  
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    interval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  });
  
  // Handle touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (difference > 50) {
      // Swipe left
      goToSlide(currentIndex + 1);
    } else if (difference < -50) {
      // Swipe right
      goToSlide(currentIndex - 1);
    }
  }
});

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
function initMap() {
  var location = {lat: 7.1152, lng: 125.5926}; // Coordinates for your location

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: location
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

// Load the Google Maps script


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
  function openTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Activate the clicked tab button
    event.currentTarget.classList.add('active');
  }
  
  // Map view toggle
  function toggleMapView(viewType) {
    const mapIframe = document.getElementById('map-iframe');
    let currentSrc = mapIframe.src;
    
    if (viewType === 'satellite') {
      // Add satellite view parameter
      if (!currentSrc.includes('maptype=satellite')) {
        mapIframe.src = currentSrc + '&maptype=satellite';
      }
    } else {
      // Remove satellite view parameter
      mapIframe.src = currentSrc.replace('&maptype=satellite', '');
    }
  }
  
  // Show time details
  function showTimeDetail(day) {
    alert(`${day} hours: Details about services available during this time.`);
  }
  
  // Check if currently open or closed
  function checkOpenStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute; // Convert to minutes for easier comparison
    
    const openTime = 9 * 60; // 9:00 AM
    const closeTimeWeekday = 17 * 60; // 5:00 PM
    const closeTimeSaturday = 17 * 60 + 30; // 5:30 PM
    
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    
    // Check if open based on day and time
    let isOpen = false;
    
    if (day >= 1 && day <= 5) { // Monday to Friday
      isOpen = (currentTime >= openTime && currentTime < closeTimeWeekday);
    } else if (day === 6) { // Saturday
      isOpen = (currentTime >= openTime && currentTime < closeTimeSaturday);
    }
    
    // Update status display
    if (isOpen) {
      statusIndicator.className = 'status-indicator status-open';
      statusText.textContent = 'Open Now';
    } else {
      statusIndicator.className = 'status-indicator status-closed';
      statusText.textContent = 'Closed Now';
    }
  }
  
  // Run when page loads
  document.addEventListener('DOMContentLoaded', function() {
    checkOpenStatus();
    // Update status every minute
    setInterval(checkOpenStatus, 60000);
  });
  document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.getElementById('read-more');
    const moreContent = document.getElementById('more-content');
    
    readMoreBtn.addEventListener('click', function() {
        if (moreContent.style.display === 'block') {
            moreContent.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        } else {
            moreContent.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
        }
    });
    
    // Hover effect for faculty cards
    const facultyCards = document.querySelectorAll('.faculty-card');
    facultyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});


//enrollment codes
document.getElementById('enrollmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for submitting your application! Our admissions team will contact you within 3-5 business days.');
});
// Academics 
// Initialize the timeline animation
 // Initialize the timeline animation
 function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function checkTimelineItems() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    if (isElementInViewport(item)) {
      item.classList.add('in-view');
    }
  });
}
    // Run once on page load
    document.addEventListener('DOMContentLoaded', checkTimelineItems);
    // Run on scroll
    window.addEventListener('scroll', checkTimelineItems);


    // student activities 

    
    