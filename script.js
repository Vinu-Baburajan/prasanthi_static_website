// Prasanthi Farm House - Official Interactive Script

function initIcons() {
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
  // Fallback for custom brand icons not present in standard Lucide icon package
  const instagramEls = document.querySelectorAll('[data-lucide="instagram"]');
  instagramEls.forEach(el => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    const classes = el.getAttribute('class');
    if (classes) svg.setAttribute('class', classes);
    svg.innerHTML = '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>';
    el.replaceWith(svg);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  initIcons();
  window.addEventListener('load', initIcons);

  // Set default minimum date for check-in to today
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('checkInDate');
  if (dateInput) {
    dateInput.min = today;
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  }

  // Gallery Filter Tabs
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active style
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-forest-900', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
      });
      btn.classList.add('active', 'bg-forest-900', 'text-white');
      btn.classList.remove('bg-white', 'text-stone-700');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.faq-answer');
    const icon = toggle.querySelector('i');

    toggle.addEventListener('click', () => {
      const isExpanded = !answer.classList.contains('hidden');

      // Close all other items
      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-toggle i');
        otherAnswer.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      // Toggle current
      if (!isExpanded) {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Solution A: Smart Autoplay on Scroll (Intersection Observer)
  const featuredVideo = document.getElementById('featuredVideo');
  if (featuredVideo && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Play silently when visible in viewport
          featuredVideo.play().catch(e => {
            console.log('Autoplay waiting for user interaction:', e);
          });
        } else {
          // Pause when scrolled away to save CPU, battery, and bandwidth
          featuredVideo.pause();
        }
      });
    }, {
      threshold: 0.3 // Starts playing when 30% visible
    });

    videoObserver.observe(featuredVideo);
  }
});

// Helper: Auto-select room from card buttons
function selectRoom(roomName) {
  const roomSelect = document.getElementById('roomPreference');
  const purposeSelect = document.getElementById('bookingPurpose');
  if (roomSelect) {
    roomSelect.value = roomName;
  }
  if (purposeSelect) {
    if (roomName.includes('Entire Farm House')) {
      purposeSelect.value = 'Entire Farm House Buyout';
    } else {
      purposeSelect.value = 'Room Stay (Overnight)';
    }
  }
  const bookingSec = document.getElementById('booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// Helper: Auto-select event type from celebration section
function selectEventType(eventType) {
  const purposeSelect = document.getElementById('bookingPurpose');
  if (purposeSelect) {
    purposeSelect.value = eventType;
  }
  const bookingSec = document.getElementById('booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// WhatsApp Booking Submission Handler
function handleBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const purpose = document.getElementById('bookingPurpose').value;
  const date = document.getElementById('checkInDate').value;
  const room = document.getElementById('roomPreference').value;
  const guests = document.getElementById('guestCount').value;
  const requests = document.getElementById('specialRequests').value.trim();

  // Official Booking Numbers
  const whatsappNumber = "919447072207"; // Primary contact

  let msg = `*Booking & Inquiry - Prasanthi Farm House, Ashtamudi*\n\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📞 *Phone:* ${phone}\n`;
  msg += `🎯 *Purpose:* ${purpose}\n`;
  msg += `📅 *Date:* ${date}\n`;
  msg += `🛏️ *Preference:* ${room}\n`;
  msg += `👥 *Estimated Guests:* ${guests}\n`;

  if (requests) {
    msg += `📝 *Notes / Special Requests:* ${requests}\n`;
  }

  msg += `\nPlease let me know the availability and pricing details. Thank you!`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  window.open(whatsappUrl, '_blank');
}

// Photo Gallery Lightbox using Real Images
const galleryImages = [
  {
    src: "assets/images/img_1.png",
    caption: "Golden Sunset over Ashtamudi Lake Backwaters"
  },
  {
    src: "assets/images/img_2.png",
    caption: "Lakeside Paved Stone Courtyard, Coconut Palms & Sunset Sit-out"
  },
  {
    src: "assets/images/img_3.png",
    caption: "Evening Festoon String Lights on Waterfront Lawn overlooking Sunset"
  },
  {
    src: "assets/images/img_4.webp",
    caption: "Garden Walkway with Stone Steps, Hibiscus Blooms & Backwater View"
  },
  {
    src: "assets/images/img_5.webp",
    caption: "Heritage Kerala Cottage with Terracotta Clay Roof & Traditional Sit-out (Poomukham)"
  },
  {
    src: "assets/images/img_6.png",
    caption: "Expansive Lakeside Celebration Lawn & Decorative Sunburst Entry Arch"
  }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (modal && img && caption) {
    img.src = galleryImages[index].src;
    caption.textContent = galleryImages[index].caption;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

function changeLightboxImage(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (img && caption) {
    img.src = galleryImages[currentLightboxIndex].src;
    caption.textContent = galleryImages[currentLightboxIndex].caption;
  }
}

// Dual Video Tour Implementation
const videos = [
  {
    id: 1,
    title: "Video 1: Property & Backwater Ambiance",
    src: "assets/videos/prasanthi_vid_one.mp4",
    poster: "assets/images/img_3.png",
    desc: "A comprehensive look at the serene Ashtamudi backwater property, sunset vibe, and lawn."
  },
  {
    id: 2,
    title: "Video 2: Waterfront Walkthrough",
    src: "assets/videos/prasanthi_vid_two.mp4",
    poster: "assets/images/img_2.png",
    desc: "Walking along the waterfront railing, coconut palms, and peaceful backwater ripples."
  }
];

let activeVideoIndex = 0;

// Toggle Sound for Featured Video Player (Solution A)
function toggleFeaturedSound() {
  const video = document.getElementById('featuredVideo');
  const soundText = document.getElementById('soundToggleText');
  const soundIcon = document.getElementById('soundToggleIcon');
  const soundBtn = document.getElementById('soundToggleBtn');

  if (video) {
    video.muted = !video.muted;
    if (video.muted) {
      if (soundText) soundText.innerHTML = 'Sound Off &bull; Tap to Hear';
      if (soundBtn) {
        soundBtn.className = "absolute top-4 right-4 z-20 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full border border-emerald-400/50 flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95";
      }
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
    } else {
      if (soundText) soundText.innerHTML = 'Sound On';
      if (soundBtn) {
        soundBtn.className = "absolute top-4 right-4 z-20 bg-stone-900/90 hover:bg-black text-emerald-400 text-xs font-bold px-4 py-2 rounded-full border border-emerald-400/70 flex items-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95";
      }
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-2');
    }
    if (window.lucide) lucide.createIcons();
  }
}

// Switch video on the main page player
function switchFeaturedVideo(index) {
  activeVideoIndex = index;
  const v = videos[index];
  const videoElem = document.getElementById('featuredVideo');
  const titleElem = document.getElementById('featuredVideoTitle');
  const descElem = document.getElementById('featuredVideoDesc');
  
  const card1 = document.getElementById('videoCard1');
  const card2 = document.getElementById('videoCard2');
  const badge1 = document.getElementById('videoBadge1');
  const badge2 = document.getElementById('videoBadge2');
  const icon1 = document.getElementById('videoStatusIcon1');
  const icon2 = document.getElementById('videoStatusIcon2');

  if (videoElem && titleElem && descElem) {
    const wasPlaying = !videoElem.paused;
    videoElem.src = v.src;
    videoElem.poster = v.poster;
    titleElem.textContent = v.title;
    descElem.textContent = v.desc;

    // Toggle active card styles
    if (index === 0) {
      if (card1) card1.className = "video-selector-card text-left p-4 rounded-2xl bg-forest-900/90 border-2 border-emerald-500 shadow-xl shadow-emerald-950/40 transition-all flex items-center gap-4 group hover:bg-forest-900";
      if (card2) card2.className = "video-selector-card text-left p-4 rounded-2xl bg-forest-950/60 border border-forest-800 shadow-sm transition-all flex items-center gap-4 group hover:bg-forest-900/80 hover:border-forest-700";
      if (badge1) {
        badge1.className = "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-300 border border-emerald-500/40";
        badge1.textContent = "● Now Playing";
      }
      if (badge2) {
        badge2.className = "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-warm-300";
        badge2.textContent = "Click to Play";
      }
      if (icon1) icon1.className = "w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow";
      if (icon2) icon2.className = "w-7 h-7 rounded-full bg-white/30 text-white flex items-center justify-center shadow";
    } else {
      if (card2) card2.className = "video-selector-card text-left p-4 rounded-2xl bg-forest-900/90 border-2 border-emerald-500 shadow-xl shadow-emerald-950/40 transition-all flex items-center gap-4 group hover:bg-forest-900";
      if (card1) card1.className = "video-selector-card text-left p-4 rounded-2xl bg-forest-950/60 border border-forest-800 shadow-sm transition-all flex items-center gap-4 group hover:bg-forest-900/80 hover:border-forest-700";
      if (badge2) {
        badge2.className = "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-300 border border-emerald-500/40";
        badge2.textContent = "● Now Playing";
      }
      if (badge1) {
        badge1.className = "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-800 text-warm-300";
        badge1.textContent = "Click to Play";
      }
      if (icon2) icon2.className = "w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow";
      if (icon1) icon1.className = "w-7 h-7 rounded-full bg-white/30 text-white flex items-center justify-center shadow";
    }

    // Play if in view
    videoElem.play().catch(e => console.log('Autoplay deferred:', e));

    if (window.lucide) lucide.createIcons();
  }
}

// Launch full-screen modal from featured video
function toggleModalFromFeatured() {
  const currentVideo = videos[activeVideoIndex];
  openVideoPlayer(currentVideo.src, currentVideo.title);
}

// Open video modal
function openVideoPlayer(videoSrc, title) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideoElement');
  const modalTitle = document.getElementById('modalVideoTitle');

  if (modal && video) {
    video.src = videoSrc;
    if (modalTitle && title) {
      modalTitle.textContent = title;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    video.play().catch(e => console.log('Autoplay deferred:', e));
    if (window.lucide) lucide.createIcons();
  }
}

function closeVideoPlayer() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideoElement');
  if (modal && video) {
    video.pause();
    video.currentTime = 0;
    video.src = "";
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

// Keyboard shortcuts for Lightbox & Video Modal
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  const mobileMenu = document.getElementById('mobileMenu');
  if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }

  // Lightbox
  const lightboxModal = document.getElementById('lightbox');
  if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
  }

  // Video Modal
  const videoModal = document.getElementById('videoModal');
  if (videoModal && !videoModal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeVideoPlayer();
  }
});

// Mobile Touch Swipe Navigation for Photo Lightbox
(function initLightboxSwipe() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  lightbox.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length === 1) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }
  }, { passive: true });

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    // Ensure horizontal swipe is dominant and exceeds threshold (40px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped left -> Next photo
        changeLightboxImage(1);
      } else {
        // Swiped right -> Previous photo
        changeLightboxImage(-1);
      }
    }
  }
})();
