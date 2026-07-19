/* ============================================
   GALLERY.JS - Gallery & Modal Logic
   Architecture: data.js → navigation.js → contact.js → gallery.js → app.js

   Functions (from architecture):
   - openModal(propertyId)
   - closeModal()
   - nextImage()
   - prevImage()
   - setActiveImage(index)
   - renderThumbnails()

   Event Listeners:
   - Escape → closeModal
   - ArrowLeft → prevImage
   - ArrowRight → nextImage
   - Backdrop click → closeModal
   - Thumbnail click → setActiveImage
   ============================================ */

/**
 * Gallery Controller
 * Manages the photo gallery modal, image navigation, and thumbnails
 */
const Gallery = (function() {
    'use strict';

    // ============================================
    // PRIVATE STATE (GalleryState from architecture)
    // ============================================
    const state = {
        activePropertyId: null,
        activeImageIndex: 0,
        isOpen: false,
        currentProperty: null,
        touchStartX: 0,
        touchEndX: 0
    };

    let isInitialized = false;

    // DOM Elements (cached on init)
    const elements = {
        overlay: null,
        container: null,
        closeBtn: null,
        title: null,
        address: null,
        descriptionToggle: null,
        descriptionContent: null,
        descText: null,
        propertyDetails: null,
        mainImage: null,
        imageCounter: null,
        prevBtn: null,
        nextBtn: null,
        thumbnailStrip: null
    };

    // ============================================
    // PRIVATE METHODS
    // ============================================

    /**
     * Open the modal with a specific property
     * @param {string} propertyId - ID of the property to display
     */
    function openModal(propertyId) {
        // Get property data from store
        const property = window.PropertyStore.getProperty(propertyId);
        if (!property) {
            console.error(`[Gallery] Property not found: ${propertyId}`);
            return;
        }

        // Update state
        state.activePropertyId = propertyId;
        state.activeImageIndex = 0;
        state.isOpen = true;
        state.currentProperty = property;

        // Populate modal content
        populateModalContent(property);

        // Render thumbnails
        renderThumbnails(property.images);

        // Set first image as active
        setActiveImage(0);

        // Show modal
        elements.overlay.classList.add('active');
        document.body.classList.add('modal-open');

        // Add event listeners
        document.addEventListener('keydown', handleKeyDown);

        console.log(`[Gallery] Opened modal for: ${property.name}`);
    }

    /**
     * Close the modal
     */
    function closeModal() {
        if (!state.isOpen) return;

        // Hide modal
        elements.overlay.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Update state
        state.isOpen = false;
        state.activePropertyId = null;
        state.currentProperty = null;

        // Remove event listeners
        document.removeEventListener('keydown', handleKeyDown);

        console.log('[Gallery] Modal closed');
    }

    /**
     * Populate modal content with property data
     * @param {Object} property - Property object
     */
    function populateModalContent(property) {
        // Title and address
        if (elements.title) {
            elements.title.textContent = property.name;
        }
        if (elements.address) {
            elements.address.textContent = property.address;
        }

        // Description
        if (elements.descText) {
            elements.descText.textContent = property.description;
        }

        // Property details (metrics)
        if (elements.propertyDetails) {
            elements.propertyDetails.innerHTML = generatePropertyDetailsHTML(property.details);
        }

        // Reset description panel to expanded state
        if (elements.descriptionToggle) {
            elements.descriptionToggle.classList.remove('collapsed');
        }
        if (elements.descriptionContent) {
            elements.descriptionContent.classList.remove('collapsed');
        }
    }

    /**
     * Generate HTML for property details metrics
     * @param {Object} details - Property details object
     * @returns {string} HTML string
     */
    function generatePropertyDetailsHTML(details) {
        if (!details) return '';

        const items = [];

        if (details.type) {
            items.push(`
                <div class="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    <span><strong>${details.type}</strong></span>
                </div>
            `);
        }

        if (details.bedrooms) {
            items.push(`
                <div class="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 4v16"/>
                        <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
                        <path d="M2 17h20"/>
                        <path d="M6 8v9"/>
                    </svg>
                    <span><strong>${details.bedrooms}</strong> Beds</span>
                </div>
            `);
        }

        if (details.bathrooms) {
            items.push(`
                <div class="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/>
                        <path d="M6 12V5a2 2 0 0 1 2-2h3v2.25"/>
                    </svg>
                    <span><strong>${details.bathrooms}</strong> Baths</span>
                </div>
            `);
        }

        if (details.sqft) {
            items.push(`
                <div class="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                    <span><strong>${details.sqft.toLocaleString()}</strong> sq ft</span>
                </div>
            `);
        }

        if (details.rent) {
            items.push(`
                <div class="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <span><strong>$${details.rent.toLocaleString()}</strong>/mo</span>
                </div>
            `);
        }

        return items.join('');
    }

    /**
     * Render thumbnail images
     * @param {Array} images - Array of image paths
     */
    function renderThumbnails(images) {
        if (!elements.thumbnailStrip || !images) return;

        const thumbnailsHTML = images.map((imagePath, index) => `
            <button
                class="thumbnail-item ${index === 0 ? 'active' : ''}"
                data-index="${index}"
                aria-label="View image ${index + 1}"
            >
                <img src="${imagePath}" alt="Thumbnail ${index + 1}" loading="lazy">
            </button>
        `).join('');

        elements.thumbnailStrip.innerHTML = thumbnailsHTML;
    }

    /**
     * Set the active image by index
     * @param {number} index - Image index
     */
    function setActiveImage(index) {
        const property = state.currentProperty;
        if (!property || !property.images) return;

        const totalImages = property.images.length;

        // Clamp index to valid range
        if (index < 0) index = 0;
        if (index >= totalImages) index = totalImages - 1;

        state.activeImageIndex = index;

        // Update main image
        const imagePath = property.images[index];
        if (elements.mainImage) {
            // Add loading state
            elements.mainImage.classList.add('loading');

            // Create new image to preload
            const img = new Image();
            img.onload = () => {
                elements.mainImage.src = imagePath;
                elements.mainImage.alt = `${property.name} - Image ${index + 1}`;
                elements.mainImage.classList.remove('loading');
                elements.mainImage.classList.add('slide-in');

                // Remove animation class after it completes
                setTimeout(() => {
                    elements.mainImage.classList.remove('slide-in');
                }, 300);
            };
            img.onerror = () => {
                console.error(`[Gallery] Failed to load image: ${imagePath}`);
                elements.mainImage.classList.remove('loading');
            };
            img.src = imagePath;
        }

        // Update counter
        if (elements.imageCounter) {
            elements.imageCounter.textContent = `${index + 1} / ${totalImages}`;
        }

        // Update thumbnail active state
        updateActiveThumbnail(index);

        // Update arrow button states
        updateArrowStates(index, totalImages);

        // Scroll thumbnail into view
        scrollThumbnailIntoView(index);
    }

    /**
     * Update which thumbnail is marked as active
     * @param {number} index - Active image index
     */
    function updateActiveThumbnail(index) {
        if (!elements.thumbnailStrip) return;

        const thumbnails = elements.thumbnailStrip.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    /**
     * Update prev/next arrow disabled states
     * @param {number} index - Current image index
     * @param {number} total - Total number of images
     */
    function updateArrowStates(index, total) {
        if (elements.prevBtn) {
            elements.prevBtn.disabled = index === 0;
        }
        if (elements.nextBtn) {
            elements.nextBtn.disabled = index === total - 1;
        }
    }

    /**
     * Scroll the active thumbnail into view
     * @param {number} index - Active thumbnail index
     */
    function scrollThumbnailIntoView(index) {
        if (!elements.thumbnailStrip) return;

        const thumbnail = elements.thumbnailStrip.querySelector(`[data-index="${index}"]`);
        if (thumbnail) {
            thumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    /**
     * Go to the next image
     */
    function nextImage() {
        if (!state.currentProperty) return;

        const totalImages = state.currentProperty.images.length;
        if (state.activeImageIndex < totalImages - 1) {
            setActiveImage(state.activeImageIndex + 1);
        }
    }

    /**
     * Go to the previous image
     */
    function prevImage() {
        if (state.activeImageIndex > 0) {
            setActiveImage(state.activeImageIndex - 1);
        }
    }

    /**
     * Handle keyboard events
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleKeyDown(event) {
        if (!state.isOpen) return;

        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                closeModal();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextImage();
                break;
        }
    }

    /**
     * Handle thumbnail click
     * @param {Event} event - Click event
     */
    function handleThumbnailClick(event) {
        const thumbnail = event.target.closest('.thumbnail-item');
        if (!thumbnail) return;

        const index = parseInt(thumbnail.dataset.index, 10);
        if (!isNaN(index)) {
            setActiveImage(index);
        }
    }

    /**
     * Handle backdrop click to close
     * @param {Event} event - Click event
     */
    function handleBackdropClick(event) {
        // Only close if clicking directly on overlay (not content inside)
        if (event.target === elements.overlay) {
            closeModal();
        }
    }

    /**
     * Handle touch start for swipe detection
     * @param {TouchEvent} event - Touch event
     */
    function handleTouchStart(event) {
        state.touchStartX = event.touches[0].clientX;
    }

    /**
     * Handle touch end for swipe detection
     * @param {TouchEvent} event - Touch event
     */
    function handleTouchEnd(event) {
        state.touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    }

    /**
     * Process swipe gesture
     */
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const diff = state.touchStartX - state.touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        if (diff > 0) {
            // Swiped left - go to next image
            nextImage();
        } else {
            // Swiped right - go to previous image
            prevImage();
        }
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Initialize gallery
     */
    function init() {
        if (isInitialized) return;

        // Cache DOM elements
        elements.overlay = document.getElementById('modalOverlay');
        elements.container = document.getElementById('modalContainer');
        elements.closeBtn = document.getElementById('modalClose');
        elements.title = document.getElementById('modalTitle');
        elements.address = document.getElementById('modalAddress');
        elements.descriptionToggle = document.getElementById('descriptionToggle');
        elements.descriptionContent = document.getElementById('descriptionContent');
        elements.descText = document.getElementById('modalDescText');
        elements.propertyDetails = document.getElementById('propertyDetails');
        elements.mainImage = document.getElementById('mainImage');
        elements.imageCounter = document.getElementById('imageCounter');
        elements.prevBtn = document.getElementById('prevImage');
        elements.nextBtn = document.getElementById('nextImage');
        elements.thumbnailStrip = document.getElementById('thumbnailStrip');

        // Validate required elements
        if (!elements.overlay || !elements.container) {
            console.warn('[Gallery] Required modal elements not found');
            return;
        }

        // Bind event listeners

        // Close button
        if (elements.closeBtn) {
            elements.closeBtn.addEventListener('click', closeModal);
        }

        // Backdrop click
        elements.overlay.addEventListener('click', handleBackdropClick);

        // Prevent clicks inside container from closing
        elements.container.addEventListener('click', (e) => e.stopPropagation());

        // Navigation arrows
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', prevImage);
        }
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', nextImage);
        }

        // Thumbnail clicks
        if (elements.thumbnailStrip) {
            elements.thumbnailStrip.addEventListener('click', handleThumbnailClick);
        }

        // Description toggle
        if (elements.descriptionToggle) {
            elements.descriptionToggle.addEventListener('click', () => {
                elements.descriptionToggle.classList.toggle('collapsed');
                if (elements.descriptionContent) {
                    elements.descriptionContent.classList.toggle('collapsed');
                }
            });
        }

        // Touch events for swipe (on main image area)
        const imageArea = document.querySelector('.modal-main-image');
        if (imageArea) {
            imageArea.addEventListener('touchstart', handleTouchStart, { passive: true });
            imageArea.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        isInitialized = true;
        console.log('[Gallery] Initialized');
    }

    /**
     * Open modal for a property (public method)
     * @param {string} propertyId - Property ID
     */
    function open(propertyId) {
        openModal(propertyId);
    }

    /**
     * Close modal (public method)
     */
    function close() {
        closeModal();
    }

    /**
     * Go to next image (public method)
     */
    function next() {
        nextImage();
    }

    /**
     * Go to previous image (public method)
     */
    function prev() {
        prevImage();
    }

    /**
     * Check if modal is currently open
     * @returns {boolean} True if open
     */
    function getIsOpen() {
        return state.isOpen;
    }

    // Expose public API
    return {
        init,
        open,
        close,
        next,
        prev,
        isOpen: getIsOpen
    };
})();

// Make available globally for other modules
window.Gallery = Gallery;
