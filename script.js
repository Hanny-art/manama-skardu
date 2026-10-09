/**
 * MANAMA GUEST HOUSE SKARDU - INTERACTIVE JAVASCRIPT ENGINE
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ==================== 0. HERO BACKGROUND SLIDESHOW ==================== */
  const heroSlides = document.querySelectorAll('.hero-bg-slide');
  const heroCaptionEl = document.getElementById('hero-caption');
  const heroCaptions = [
    "Nestled Amid Apple Orchards in Skardu",
    "A Peaceful Retreat Under Skardu Skies",
    "Comfortable Rooms for Restful Nights",
    "Thoughtfully Furnished Living Spaces",
    "A Traditional Lounge to Gather & Relax",
    "Clean, Practical Bathrooms",
    "Cozy Double Bedrooms with Warm Bedding",
    "Spacious Rooms for Families & Groups"
  ];
  let heroIndex = 0;

  if (heroSlides.length && heroCaptionEl) {
    setInterval(() => {
      heroSlides[heroIndex].classList.remove('active');
      heroCaptionEl.style.opacity = '0';
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('active');
      setTimeout(() => {
        heroCaptionEl.textContent = heroCaptions[heroIndex];
        heroCaptionEl.style.opacity = '1';
      }, 400);
    }, 4500);
  }

  /* ==================== 1. DATA SOURCES ==================== */
  const ROOMS_DATA = {
    deluxe: {
      title: "Deluxe Room",
      image: "images/photo-6-bathroom.jpg",
      description: "A tranquil sanctuary designed with warm woodwork and traditional Balti accents. Offers stunning views of the surrounding valley.",
      specs: [
        "Bed Type: 1 King Size Bed",
        "Capacity: 2 Adults + 1 Child",
        "View: Garden & Mountain View",
        "Size: 320 sq. ft."
      ],
      amenities: ["Free WiFi", "Central Heating", "24/7 Hot Water", "Electric Kettle", "Room Service", "Smart TV"]
    },
    family: {
      title: "Family Room",
      image: "images/photo-7-double-room.jpg",
      description: "Expansive suite designed for comfortable family stays. Provides plenty of room to unwind after a day of mountain adventures.",
      specs: [
        "Bed Type: 2 Queen Beds",
        "Capacity: 4 Adults",
        "View: Panoramic Valley View",
        "Size: 480 sq. ft."
      ],
      amenities: ["Free WiFi", "Central Heating", "Sitting Lounge", "Mini Fridge", "24/7 Hot Water", "Complimentary Breakfast"]
    },
    premium: {
      title: "Premium Room",
      image: "images/photo-3-premium-twin-room.jpg",
      description: "Our finest accommodation featuring a private balcony overlooking the Karakoram mountains and high-end room comforts.",
      specs: [
        "Bed Type: 1 Super King Bed",
        "Capacity: 2 Guests",
        "View: Private Balcony Mountain View",
        "Size: 520 sq. ft."
      ],
      amenities: ["Private Balcony", "Bathtub & Shower", "Espresso Machine", "Free WiFi", "Central Heating", "VIP Breakfast"]
    }
  };

  const GALLERY_IMAGES = [
    { src: "images/photo-1-exterior-day.jpg", caption: "Guest House Exterior" },
    { src: "images/photo-2-exterior-evening.jpg", caption: "Evening at the Guest House" },
    { src: "images/photo-3-premium-twin-room.jpg", caption: "Premium Twin Room" },
    { src: "images/photo-4-living-room.jpg", caption: "Furnished Living Room" },
    { src: "images/photo-5-majlis-lounge.jpg", caption: "Traditional Lounge" },
    { src: "images/photo-6-bathroom.jpg", caption: "Clean Bathroom" },
    { src: "images/photo-7-double-room.jpg", caption: "Cozy Double Bedroom" },
    { src: "images/photo-8-twin-room.jpg", caption: "Spacious Twin Room" }
  ];

  let currentGalleryIndex = 0;

  /* ==================== 2. HEADER & NAVIGATION ==================== */
  const header = document.getElementById('site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMobileNavBtn = document.getElementById('close-mobile-nav');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Drawer Toggle
  function openMobileNav() {
    mobileNavDrawer.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavDrawer.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openMobileNav);
  closeMobileNavBtn.addEventListener('click', closeMobileNav);
  mobileNavOverlay.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Active Link Highlighter on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==================== 3. MODALS SYSTEM ==================== */
  const bookingModal = document.getElementById('booking-modal');
  const roomDetailsModal = document.getElementById('room-details-modal');
  const carRentalModal = document.getElementById('car-rental-modal');
  const allModals = [bookingModal, roomDetailsModal, carRentalModal];

  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Generic Close Button Handlers
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parentModal = e.target.closest('.modal-backdrop');
      if (parentModal) closeModal(parentModal);
    });
  });

  // Backdrop click to close
  allModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(modal => closeModal(modal));
      closeLightbox();
    }
  });

  /* ==================== 4. BOOKING MODAL TRIGGERING ==================== */
  const openBookingBtns = document.querySelectorAll('.open-booking-modal');
  const bookRoomTypeSelect = document.getElementById('book-room-type');

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Close details modal if open
      closeModal(roomDetailsModal);
      closeMobileNav();

      const requestedRoom = btn.getAttribute('data-room-type');
      if (requestedRoom && bookRoomTypeSelect) {
        bookRoomTypeSelect.value = requestedRoom;
      }
      openModal(bookingModal);
    });
  });

  /* ==================== 5. ROOM DETAILS DYNAMIC MODAL ==================== */
  const viewRoomDetailBtns = document.querySelectorAll('.view-room-details');

  viewRoomDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomKey = btn.getAttribute('data-room');
      const data = ROOMS_DATA[roomKey];

      if (data) {
        document.getElementById('rd-title').textContent = data.title;
        document.getElementById('rd-image').src = data.image;
        document.getElementById('rd-description').textContent = data.description;

        // Populate Specs List
        const specsList = document.getElementById('rd-specs-list');
        specsList.innerHTML = '';
        data.specs.forEach(spec => {
          const li = document.createElement('li');
          li.textContent = `• ${spec}`;
          specsList.appendChild(li);
        });

        // Populate Amenities Tags
        const amenitiesDiv = document.getElementById('rd-amenities');
        amenitiesDiv.innerHTML = '';
        data.amenities.forEach(item => {
          const span = document.createElement('span');
          span.className = 'rd-tag';
          span.textContent = item;
          amenitiesDiv.appendChild(span);
        });

        // Bind Booking Button
        const rdBookBtn = document.getElementById('rd-book-btn');
        rdBookBtn.setAttribute('data-room-type', data.title);

        openModal(roomDetailsModal);
      }
    });
  });

  /* ==================== 6. CAR RENTAL MODAL ==================== */
  const openCarBtns = document.querySelectorAll('.open-car-modal');
  const carVehicleInput = document.getElementById('car-selected-vehicle');

  openCarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const vehicleName = btn.getAttribute('data-vehicle');
      if (vehicleName) {
        carVehicleInput.value = vehicleName;
      }
      openModal(carRentalModal);
    });
  });

  /* ==================== 7. GALLERY LIGHTBOX ==================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  function updateLightbox(index) {
    currentGalleryIndex = index;
    const item = GALLERY_IMAGES[index];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'));
      updateLightbox(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', () => {
    let newIndex = currentGalleryIndex - 1;
    if (newIndex < 0) newIndex = GALLERY_IMAGES.length - 1;
    updateLightbox(newIndex);
  });

  lightboxNext.addEventListener('click', () => {
    let newIndex = currentGalleryIndex + 1;
    if (newIndex >= GALLERY_IMAGES.length) newIndex = 0;
    updateLightbox(newIndex);
  });

  /* ==================== 8. FORM SUBMISSIONS & VALIDATION ==================== */
  // Prevent past dates on booking/rental forms
  const todayStr = new Date().toISOString().split('T')[0];
  ['book-checkin', 'book-checkout', 'car-pickup', 'car-return'].forEach(id => {
    const dateInput = document.getElementById(id);
    if (dateInput) dateInput.setAttribute('min', todayStr);
  });

  // Static site (no backend): every form opens a pre-filled WhatsApp message
  // to the guest house so submissions actually reach the owner.
  const OWNER_WHATSAPP = '923232871860';

  function showAlert(containerId, message, type) {
    const alertBox = document.getElementById(containerId);
    alertBox.className = `form-alert ${type}`;
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
  }

  function sendToWhatsApp(message) {
    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const val = (id) => document.getElementById(id).value.trim();

  // A. Contact Form
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = val('contact-subject');
    const waMessage =
      `New Contact Message - Manama Guest House\n` +
      `Name: ${val('contact-name')}\n` +
      `Email: ${val('contact-email')}\n` +
      `Phone: ${val('contact-phone')}\n` +
      (subject ? `Subject: ${subject}\n` : '') +
      `Message: ${val('contact-message')}`;
    sendToWhatsApp(waMessage);
    showAlert('contact-form-alert', 'Opening WhatsApp so you can send your message directly to us. If it did not open, please message us at 0323 2871860.', 'success');
    contactForm.reset();
  });

  // B. Booking Form
  const bookingForm = document.getElementById('booking-form');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const notes = val('book-message');
    const waMessage =
      `New Room Booking Request - Manama Guest House\n` +
      `Room Type: ${document.getElementById('book-room-type').value}\n` +
      `Name: ${val('book-name')}\n` +
      `Phone: ${val('book-phone')}\n` +
      `Email: ${val('book-email')}\n` +
      `Guests: ${val('book-guests')}\n` +
      `Check-in: ${val('book-checkin')}\n` +
      `Check-out: ${val('book-checkout')}\n` +
      (notes ? `Notes: ${notes}` : '');
    sendToWhatsApp(waMessage);
    showAlert('booking-alert', 'Opening WhatsApp so you can send your booking request directly to us. If it did not open, please message us at 0323 2871860.', 'success');
    bookingForm.reset();
  });

  // C. Car Rental Form
  const carForm = document.getElementById('car-rental-form');
  carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const notes = val('car-message');
    const waMessage =
      `New Car Rental Request - Manama Guest House\n` +
      `Vehicle: ${document.getElementById('car-selected-vehicle').value}\n` +
      `Name: ${val('car-name')}\n` +
      `Phone: ${val('car-phone')}\n` +
      `Email: ${val('car-email')}\n` +
      `Passengers: ${val('car-passengers')}\n` +
      `Pickup Date: ${val('car-pickup')}\n` +
      `Return Date: ${val('car-return')}\n` +
      (notes ? `Notes: ${notes}` : '');
    sendToWhatsApp(waMessage);
    showAlert('car-rental-alert', 'Opening WhatsApp so you can send your rental request directly to us. If it did not open, please message us at 0323 2871860.', 'success');
    carForm.reset();
  });

  /* ==================== 9. SCROLL ANIMATIONS ==================== */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -5% 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  /* ==================== 10. BACK TO TOP BUTTON ==================== */
  const backToTopBtn = document.getElementById('back-to-top');
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
