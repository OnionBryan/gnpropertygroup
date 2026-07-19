/* ============================================
   NAVIGATION.JS - Navigation Logic
   Architecture: data.js → navigation.js → contact.js → gallery.js → app.js

   Functions (from architecture):
   - handleScroll (sticky nav state)
   - smoothScrollTo(section)
   - setActiveNavItem
   - toggleSection (collapsible sections)
   ============================================ */

/**
 * Navigation Controller
 * Handles sticky nav, smooth scrolling, and active states
 */
const Navigation = (function() {
    'use strict';

    // ============================================
    // PRIVATE STATE
    // ============================================
    let isInitialized = false;
    let lastScrollY = 0;
    let ticking = false;

    // DOM Elements (cached on init)
    let header = null;
    let navLinks = null;
    let sections = null;

    // ============================================
    // PRIVATE METHODS
    // ============================================

    /**
     * Handle scroll events for sticky nav styling
     * Adds 'scrolled' class when page is scrolled down
     */
    function handleScroll() {
        lastScrollY = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavState();
                updateActiveNavItem();
                ticking = false;
            });
            ticking = true;
        }
    }

    /**
     * Update nav visual state based on scroll position
     */
    function updateNavState() {
        if (!header) return;

        if (lastScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * Update active nav item based on scroll position
     */
    function updateActiveNavItem() {
        if (!sections || !navLinks) return;

        const scrollPosition = lastScrollY + 100; // Offset for sticky nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                setActiveNavItem(sectionId);
            }
        });
    }

    /**
     * Set a specific nav item as active
     * @param {string} sectionId - ID of the section to activate
     */
    function setActiveNavItem(sectionId) {
        if (!navLinks) return;

        navLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Smooth scroll to a section
     * @param {string} targetId - ID of target section (without #)
     */
    function smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update active state immediately for better UX
        setActiveNavItem(targetId);
    }

    /**
     * Handle nav link clicks
     * @param {Event} event - Click event
     */
    function handleNavClick(event) {
        const link = event.target.closest('.nav-link');
        if (!link) return;

        const href = link.getAttribute('href');

        // Only handle anchor links - let page links work normally
        if (href && href.startsWith('#')) {
            event.preventDefault();
            const targetId = href.substring(1);
            smoothScrollTo(targetId);
        }
        // External/page links (like macon.html) proceed normally
    }

    /**
     * Handle logo click - scroll to top
     * @param {Event} event - Click event
     */
    function handleLogoClick(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Toggle collapsible section
     * @param {HTMLElement} toggleButton - The toggle button element
     */
    function toggleSection(toggleButton) {
        const content = toggleButton.nextElementSibling;
        if (!content) return;

        const isCollapsed = toggleButton.classList.contains('collapsed');

        if (isCollapsed) {
            // Expand
            toggleButton.classList.remove('collapsed');
            content.classList.remove('collapsed');
        } else {
            // Collapse
            toggleButton.classList.add('collapsed');
            content.classList.add('collapsed');
        }
    }

    /**
     * Initialize collapsible sections
     */
    function initCollapsibleSections() {
        const toggleButtons = document.querySelectorAll('.description-toggle');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                toggleSection(button);
            });
        });
    }

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Initialize navigation
     */
    function init() {
        if (isInitialized) return;

        // Cache DOM elements
        header = document.getElementById('header');
        navLinks = document.querySelectorAll('.nav-link[data-section]');
        sections = document.querySelectorAll('section[id]');

        // Bind scroll handler
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Bind nav link clicks
        const navContainer = document.querySelector('.nav-links');
        if (navContainer) {
            navContainer.addEventListener('click', handleNavClick);
        }

        // Bind logo click
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.addEventListener('click', handleLogoClick);
        }

        // Bind scroll indicator click
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', (e) => {
                e.preventDefault();
                const href = scrollIndicator.getAttribute('href');
                if (href && href.startsWith('#')) {
                    smoothScrollTo(href.substring(1));
                }
            });
        }

        // Initialize collapsible sections
        initCollapsibleSections();

        // Set initial state
        updateNavState();
        updateActiveNavItem();

        isInitialized = true;
        console.log('[Navigation] Initialized');
    }

    /**
     * Scroll to a specific section (public method)
     * @param {string} sectionId - ID of target section
     */
    function scrollTo(sectionId) {
        smoothScrollTo(sectionId);
    }

    /**
     * Toggle a specific section by button reference
     * @param {HTMLElement} button - Toggle button element
     */
    function toggle(button) {
        toggleSection(button);
    }

    // Expose public API
    return {
        init,
        scrollTo,
        toggle,
        setActive: setActiveNavItem
    };
})();

// Make available globally for other modules
window.Navigation = Navigation;
