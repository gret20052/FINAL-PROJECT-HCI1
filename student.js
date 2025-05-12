








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
// preloader 
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

document.addEventListener('DOMContentLoaded', function() {
    // Animation delay for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Reset animations
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    // Re-apply animation with a slight delay based on index
                    const index = Array.from(galleryItems).indexOf(item);
                    item.style.animation = `fadeIn 0.6s ease forwards ${index * 0.05}s`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const studentLightbox = document.querySelector('.student-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
    
    // Open lightbox when clicking on a gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.item-title').textContent;
            const category = this.querySelector('.item-category').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} - ${category}`;
            studentLightbox.classList.add('active');
            
            // Set current image index
            currentImageIndex = visibleItems().indexOf(this);
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';

            console.log('Lightbox opened'); // Debug
        });
    });
    
    // Close lightbox when clicking on close button
    closeLightbox.addEventListener('click', () => {
        studentLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Lightbox closed via X button'); // Debug
    });
    
    // Close lightbox when clicking outside the image
    studentLightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            studentLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('Lightbox closed via outside click'); // Debug
        }
    });
    
    // Navigate through images with prev and next buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to the lightbox background
        const items = visibleItems();
        currentImageIndex = (currentImageIndex - 1 + items.length) % items.length;
        updateLightboxContent(items[currentImageIndex]);
        console.log('Previous image'); // Debug
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to the lightbox background
        const items = visibleItems();
        currentImageIndex = (currentImageIndex + 1) % items.length;
        updateLightboxContent(items[currentImageIndex]);
        console.log('Next image'); // Debug
    });
    
    // Navigation with keyboard
    document.addEventListener('keydown', function(e) {
        if (!studentLightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            studentLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('Lightbox closed via ESC key'); // Debug
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    function updateLightboxContent(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('.item-title').textContent;
        const category = item.querySelector('.item-category').textContent;
        
        // Add a slight animation
        lightboxImg.style.opacity = 0;
        
        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} - ${category}`;
            lightboxImg.style.opacity = 1;
        }, 200);
    }
});