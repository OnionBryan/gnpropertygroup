/* ============================================
   CONTACT.JS - Contact Panel Toggle
   Architecture: data.js → navigation.js → contact.js → gallery.js → app.js

   Sequence Flow (from architecture):
   1. User clicks Contact Button
   2. toggleContactPanel() called
   3. Add .expanded class to panel
   4. Panel slides up
   5. User clicks outside panel
   6. handleOutsideClick()
   7. Remove .expanded class
   8. Panel slides down
   ============================================ */

/**
 * Contact Panel Controller
 * Manages the floating contact button and expandable panel
 */
const ContactPanel = (function() {
    'use strict';

    // ============================================
    // PRIVATE STATE
    // ============================================
    let isInitialized = false;
    let isExpanded = false;

    // DOM Elements (cached on init)
    let wrapper = null;
    let contactBtn = null;
    let panel = null;
    let closeBtn = null;
    let navContactBtn = null;

    // ============================================
    // PRIVATE METHODS
    // ============================================

    /**
     * Open the contact panel
     * Adds expanded class and hides the floating button
     */
    function openPanel() {
        if (isExpanded || !panel || !contactBtn) return;

        panel.classList.add('expanded');
        contactBtn.classList.add('hidden');
        isExpanded = true;

        // Add document click listener for outside clicks
        // Use setTimeout to prevent immediate trigger from the opening click
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleKeyDown);
        }, 10);
    }

    /**
     * Close the contact panel
     * Removes expanded class and shows the floating button
     */
    function closePanel() {
        if (!isExpanded || !panel || !contactBtn) return;

        panel.classList.remove('expanded');
        contactBtn.classList.remove('hidden');
        isExpanded = false;

        // Remove document listeners
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('keydown', handleKeyDown);
    }

    /**
     * Toggle the contact panel open/closed
     */
    function togglePanel() {
        if (isExpanded) {
            closePanel();
        } else {
            openPanel();
        }
    }

    /**
     * Handle clicks outside the panel to close it
     * @param {Event} event - Click event
     */
    function handleOutsideClick(event) {
        if (!wrapper || !isExpanded) return;

        // Check if click was inside the panel wrapper
        const isInsideWrapper = wrapper.contains(event.target);

        // If click is outside, close the panel
        if (!isInsideWrapper) {
            closePanel();
        }
    }

    /**
     * Handle keyboard events
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleKeyDown(event) {
        // Close on Escape key
        if (event.key === 'Escape' && isExpanded) {
            event.preventDefault();
            closePanel();
        }
    }

    /**
     * Handle contact button click
     * @param {Event} event - Click event
     */
    function handleContactBtnClick(event) {
        event.preventDefault();
        event.stopPropagation(); // Prevent outside click handler from firing
        togglePanel();
    }

    /**
     * Handle close button click
     * @param {Event} event - Click event
     */
    function handleCloseBtnClick(event) {
        event.preventDefault();
        event.stopPropagation();
        closePanel();
    }

    /**
     * Handle nav contact button click (in header)
     * @param {Event} event - Click event
     */
    function handleNavContactClick(event) {
        event.preventDefault();
        event.stopPropagation();

        // If panel is not expanded, open it
        // First scroll to bottom of page so panel is visible
        if (!isExpanded) {
            openPanel();
        } else {
            closePanel();
        }
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Initialize contact panel
     */
    function init() {
        if (isInitialized) return;

        // Cache DOM elements
        wrapper = document.getElementById('contactWrapper');
        contactBtn = document.getElementById('contactBtn');
        panel = document.getElementById('contactPanel');
        closeBtn = document.getElementById('contactPanelClose');
        navContactBtn = document.getElementById('navContactBtn');

        // Validate required elements exist
        if (!wrapper || !contactBtn || !panel) {
            console.warn('[ContactPanel] Required elements not found');
            return;
        }

        // Bind event listeners
        contactBtn.addEventListener('click', handleContactBtnClick);

        if (closeBtn) {
            closeBtn.addEventListener('click', handleCloseBtnClick);
        }

        if (navContactBtn) {
            navContactBtn.addEventListener('click', handleNavContactClick);
        }

        // Prevent clicks inside panel from bubbling to outside click handler
        panel.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        isInitialized = true;
        console.log('[ContactPanel] Initialized');
    }

    /**
     * Open the panel (public method)
     */
    function open() {
        openPanel();
    }

    /**
     * Close the panel (public method)
     */
    function close() {
        closePanel();
    }

    /**
     * Toggle the panel (public method)
     */
    function toggle() {
        togglePanel();
    }

    /**
     * Check if panel is currently expanded
     * @returns {boolean} True if expanded
     */
    function getIsExpanded() {
        return isExpanded;
    }

    // Expose public API
    return {
        init,
        open,
        close,
        toggle,
        isExpanded: getIsExpanded
    };
})();

// Make available globally for other modules
window.ContactPanel = ContactPanel;
