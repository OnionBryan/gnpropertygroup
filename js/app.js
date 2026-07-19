/* ============================================
   APP.JS - Main Application Controller
   Architecture: data.js → navigation.js → contact.js → gallery.js → app.js

   Functions (from architecture):
   - init
   - LOAD_DATA (load property data from PropertyStore)
   - INIT_NAV (initialize Navigation module)
   - INIT_GALLERY (initialize Gallery module)
   - INIT_CONTACT (initialize ContactPanel module)
   - RENDER_CARDS (render property cards to grid)
   ============================================ */

/**
 * Main Application Controller
 * Initializes all modules and renders the property grid
 */
const App = (function() {
    'use strict';

    // ============================================
    // PRIVATE STATE
    // ============================================
    let isInitialized = false;

    // DOM Elements
    let propertyGrid = null;

    // ============================================
    // PRIVATE METHODS
    // ============================================

    /**
     * Load property data from store
     * @returns {Array} Array of property objects
     */
    function loadData() {
        if (!window.PropertyStore) {
            console.error('[App] PropertyStore not available');
            return [];
        }

        const properties = window.PropertyStore.getAllProperties();
        console.log(`[App] Loaded ${properties.length} properties`);
        return properties;
    }

    /**
     * Initialize Navigation module
     */
    function initNav() {
        if (window.Navigation) {
            window.Navigation.init();
        } else {
            console.warn('[App] Navigation module not available');
        }
    }

    /**
     * Initialize Gallery module
     */
    function initGallery() {
        if (window.Gallery) {
            window.Gallery.init();
        } else {
            console.warn('[App] Gallery module not available');
        }
    }

    /**
     * Initialize Contact Panel module
     */
    function initContact() {
        if (window.ContactPanel) {
            window.ContactPanel.init();
        } else {
            console.warn('[App] ContactPanel module not available');
        }
    }

    /**
     * Render property cards to the grid
     * @param {Array} properties - Array of property objects
     */
    function renderCards(properties) {
        if (!propertyGrid) {
            console.warn('[App] Property grid element not found');
            return;
        }

        if (!properties || properties.length === 0) {
            propertyGrid.innerHTML = `
                <div class="empty-state">
                    <p>No properties available</p>
                </div>
            `;
            return;
        }

        const cardsHTML = properties.map(property => generateCardHTML(property)).join('');
        propertyGrid.innerHTML = cardsHTML;

        // Bind click events to cards
        bindCardEvents();

        console.log(`[App] Rendered ${properties.length} property cards`);
    }

    /**
     * Generate HTML for a single property card
     * @param {Object} property - Property object
     * @returns {string} HTML string
     */
    function generateCardHTML(property) {
        const imageCount = property.images ? property.images.length : 0;
        const rentDisplay = property.details && property.details.rent
            ? `$${property.details.rent.toLocaleString()}/mo`
            : '';
        const typeDisplay = property.details && property.details.type
            ? property.details.type
            : '';

        // Clean short address for card
        const shortAddress = property.address ? property.address.split(',')[0] : '';

        return `
            <article class="property-card" data-property-id="${property.id}">
                <div class="card-image-wrapper">
                    <img
                        src="${property.thumbnail}"
                        alt="${property.name}"
                        class="card-image"
                        loading="lazy"
                    >
                    <div class="card-badge">${imageCount} Photos</div>
                    <div class="card-overlay">
                        <h3 class="card-title">${property.name}</h3>
                        <p class="card-subtitle">${shortAddress}</p>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-meta">${typeDisplay}${rentDisplay ? ' · ' + rentDisplay : ''}</div>
                </div>
            </article>
        `;
    }

    /**
     * Bind click events to property cards
     */
    function bindCardEvents() {
        const cards = propertyGrid.querySelectorAll('.property-card');

        cards.forEach(card => {
            card.addEventListener('click', handleCardClick);

            // Keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View ${card.querySelector('.card-title')?.textContent || 'property'} gallery`);

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleCardClick(event);
                }
            });
        });
    }

    /**
     * Handle property card click
     * @param {Event} event - Click event
     */
    function handleCardClick(event) {
        const card = event.currentTarget;
        const propertyId = card.dataset.propertyId;

        if (propertyId && window.Gallery) {
            window.Gallery.open(propertyId);
        }
    }

    /**
     * Preload critical images for better UX
     * @param {Array} properties - Array of property objects
     */
    function preloadThumbnails(properties) {
        properties.forEach(property => {
            if (property.thumbnail) {
                const img = new Image();
                img.src = property.thumbnail;
            }
        });
    }

    /**
     * Initialize Theme Toggle - Forged Light default, no glass/dark first
     */
    function initTheme() {
        const toggleBtn = document.getElementById('themeToggleBtn');
        if (!toggleBtn) return;
        
        // Default to light (forged-light). Only override if explicitly saved dark
        const savedTheme = localStorage.getItem('theme');
        let currentTheme = (savedTheme === 'dark') ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        toggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Initialize the application
     */
    function init() {
        if (isInitialized) {
            console.warn('[App] Already initialized');
            return;
        }

        console.log('[App] Initializing Napier Properties...');

        // Cache DOM elements
        propertyGrid = document.getElementById('propertyGrid');

        // Initialize modules in order (per architecture)
        initTheme();
        initNav();
        initContact();
        initGallery();

        // Load property data
        const properties = loadData();

        // Render property cards
        renderCards(properties);

        // Preload thumbnails for smoother gallery experience
        preloadThumbnails(properties);

        isInitialized = true;
        console.log('[App] Initialization complete');
    }

    // Expose public API
    return {
        init
    };
})();

// ============================================
// DOM READY - Initialize Application
// ============================================
(function() {
    'use strict';

    /**
     * Initialize when DOM is ready
     */
    function onDOMReady() {
        App.init();
    }

    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
        // DOM already loaded
        onDOMReady();
    }
})();

// Make App available globally (optional, for debugging)
window.App = App;
