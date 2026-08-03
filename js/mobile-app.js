/* ============================================================
   MOBILE APP SHELL
   Deck rail, page-turn transitions, inquire sheet, KPI mirror,
   iframe gating, service worker. No frameworks, no build step.
   Everything degrades to plain navigation.
   ============================================================ */
(function () {
    'use strict';

    var mobile = window.matchMedia('(max-width: 768px)');

    /* ---------- Booklet iframe: desktop only ----------
       The deck replaces it on phones; don't download it there. */
    var frame = document.getElementById('bookletFrame');
    if (frame && frame.dataset.src) {
        if (!mobile.matches) {
            frame.src = frame.dataset.src;
        } else {
            mobile.addEventListener('change', function (e) {
                if (!e.matches && !frame.src) frame.src = frame.dataset.src;
            });
        }
    }

    /* ---------- The Private Showing ---------- */
    var deck = document.getElementById('privateShowing');
    if (deck && mobile.matches) {
        document.documentElement.classList.add('snap-deck');

        var leaves = Array.prototype.slice.call(deck.querySelectorAll('.leaf-page'));
        var railLinks = Array.prototype.slice.call(document.querySelectorAll('.showing-rail a'));

        var seen = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var idx = leaves.indexOf(entry.target);
                if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
                    railLinks.forEach(function (a, i) {
                        a.classList.toggle('current', i === idx);
                    });
                }
            });
        }, { threshold: [0.6] });
        leaves.forEach(function (l) { seen.observe(l); });

        // Rail shows only while the book is on screen
        var deckVisible = new IntersectionObserver(function (entries) {
            document.body.classList.toggle('showing-active', entries[0].isIntersecting);
        }, { threshold: 0.15 });
        deckVisible.observe(deck);

        // ...but not on the cover
        var intro = deck.querySelector('.leaf-intro');
        if (intro) {
            new IntersectionObserver(function (entries) {
                document.body.classList.toggle('on-cover', entries[0].intersectionRatio > 0.4);
            }, { threshold: [0.4] }).observe(intro);
        }

        // The book opens: name the tapped photo so the brochure
        // cover inherits it (cross-document view transition).
        deck.querySelectorAll('a.leaf-plate').forEach(function (plate) {
            plate.addEventListener('click', function () {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                var photo = plate.parentElement.querySelector('.leaf-photo');
                if (photo) photo.style.viewTransitionName = 'showing-photo';
            });
        });
    }

    /* ---------- Inquire bottom sheet ---------- */
    var pill = document.getElementById('inquirePill');
    var scrim = document.getElementById('inquireScrim');
    if (pill) {
        var openSheet = function (open) {
            document.body.classList.toggle('sheet-open', open);
            pill.setAttribute('aria-expanded', open ? 'true' : 'false');
        };
        pill.addEventListener('click', function () {
            openSheet(!document.body.classList.contains('sheet-open'));
        });
        if (scrim) scrim.addEventListener('click', function () { openSheet(false); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') openSheet(false);
        });
    }

    /* ---------- KPI mirror (tool pages) ----------
       <b data-kpi-mirror="#mNpv"> stays in sync with the live model. */
    var mirrors = Array.prototype.slice.call(document.querySelectorAll('[data-kpi-mirror]'));
    if (mirrors.length && mobile.matches) {
        document.body.classList.add('has-kpis');
        mirrors.forEach(function (el) {
            var src = document.querySelector(el.getAttribute('data-kpi-mirror'));
            if (!src) return;
            var sync = function () { el.textContent = src.textContent; };
            sync();
            new MutationObserver(sync).observe(src, { childList: true, characterData: true, subtree: true });
        });
    }

    /* ---------- Slider value balloon (tool pages) ----------
       While dragging, the control's live value floats above the
       thumb in serif — the number you're tuning, where your eye is. */
    if (mirrors.length && mobile.matches) {
        var balloon = document.createElement('div');
        balloon.className = 'slider-balloon';
        balloon.setAttribute('aria-hidden', 'true');
        document.body.appendChild(balloon);
        var hideTimer = null;

        var valueFor = function (slider) {
            var el = document.getElementById(slider.id + 'Val') ||
                     document.getElementById(slider.id.replace('Slider', 'Value'));
            return el ? el.textContent : slider.value;
        };

        var place = function (slider) {
            var r = slider.getBoundingClientRect();
            var min = parseFloat(slider.min) || 0;
            var max = parseFloat(slider.max) || 100;
            var pct = (parseFloat(slider.value) - min) / (max - min || 1);
            var thumb = 26;
            balloon.textContent = valueFor(slider);
            balloon.style.left = (r.left + pct * (r.width - thumb) + thumb / 2) + 'px';
            balloon.style.top = r.top + 'px';
            balloon.classList.add('on');
            clearTimeout(hideTimer);
        };

        var hide = function () {
            hideTimer = setTimeout(function () { balloon.classList.remove('on'); }, 350);
        };

        document.addEventListener('input', function (e) {
            if (e.target.matches && e.target.matches('input[type="range"]')) place(e.target);
        }, false);
        document.addEventListener('pointerdown', function (e) {
            if (e.target.matches && e.target.matches('input[type="range"]')) place(e.target);
        }, true);
        document.addEventListener('pointerup', hide, true);
        document.addEventListener('pointercancel', hide, true);
    }

    /* ---------- Service worker ---------- */
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () { /* no-op */ });
        });
    }
})();
