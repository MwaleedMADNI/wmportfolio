/* ─────────────────────────────────────────────────────────────
   BUZZINTECH GLOBAL INTERACTION SYSTEM
   Core Scripts, Canvas Animation, and Parallax (Mockup v4)
   ───────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    // Accessibility check: user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize layout animations & modules
    initScrollReveal(prefersReducedMotion);
    initCountUps();
    initMouseParallax(prefersReducedMotion);
    initScrollParallax(prefersReducedMotion);
    initCanvasMesh(prefersReducedMotion);
    initModalControls();
    initMobileNav();
    initMegaMenu();
    initHeroTypewriter(prefersReducedMotion);
    initHeroStoryboard(prefersReducedMotion);
    initCapabilityOverviewScene(prefersReducedMotion);
    initSubCapabilityStackReel(prefersReducedMotion);
    initStickyDeliveryChapters();
    initDdaasScrollAnimations(prefersReducedMotion);
    initLeakDashboard();
    initMascotInteractions(prefersReducedMotion);
});

/**
 * 1. Scroll-triggered reveals via IntersectionObserver
 */
function initScrollReveal(reducedMotion) {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .flex-visual, .ok-reveal');
    if (revealEls.length === 0) return;

    if (reducedMotion) {
        // Instant show if reduced motion is preferred
        revealEls.forEach(el => el.classList.add('in'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => io.observe(el));
}

/**
 * 2. Animated count-up numbers
 */
function initCountUps() {
    const countEls = document.querySelectorAll('[data-count]');
    if (countEls.length === 0) return;

    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || (el.parentElement.querySelector('.lbl') ? '+' : '');
        const dur = 1100;
        const start = performance.now();

        function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3); // Cubic ease out
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const countIo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCount(e.target);
                countIo.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });

    countEls.forEach(el => countIo.observe(el));
}

/**
 * 3. Mouse-parallax on Hero visuals
 * Automatically disabled on touch screens to prevent stutter/jerkiness
 */
function initMouseParallax(reducedMotion) {
    const heroVisual = document.getElementById('heroVisual');
    const sigBlock = document.getElementById('sigBlock');
    const pStat1 = document.getElementById('pStat1');
    const pStat2 = document.getElementById('pStat2');
    const pStat3 = document.getElementById('pStat3');

    if (!heroVisual || reducedMotion) return;

    // Quick touch screen capability detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        sigBlock.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
        if (pStat1) pStat1.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
        if (pStat2) pStat2.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
        if (pStat3) pStat3.style.transform = `translate(${x * 22}px, ${y * 22}px)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        sigBlock.style.transform = 'translate(0,0)';
        if (pStat1) pStat1.style.transform = 'translate(0,0)';
        if (pStat2) pStat2.style.transform = 'translate(0,0)';
        if (pStat3) pStat3.style.transform = 'translate(0,0)';
    });
}

/**
 * 4. Scroll-parallax on drifting decorative shards
 */
function initScrollParallax(reducedMotion) {
    const shards = document.querySelectorAll('.shard');
    if (shards.length === 0 || reducedMotion) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                shards.forEach((s, i) => {
                    const speed = 0.05 + (i % 3) * 0.03;
                    s.style.marginTop = `${y * speed * -1}px`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * 5. Animated canvas mesh gradient system
 */
function initCanvasMesh(reducedMotion) {
    const canvas = document.getElementById('meshCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (reducedMotion) {
        // Draw static frame for reduced motion preference
        ctx.fillStyle = 'rgba(143,163,240,0.06)';
        ctx.fillRect(0, 0, w, h);
        return;
    }

    const palette = [
        { r: 143, g: 163, b: 240 }, // blue
        { r: 240, g: 175, b: 199 }, // pink
        { r: 139, g: 111, b: 224 }, // violet
        { r: 155, g: 31, b: 232 }   // purple
    ];

    const blobs = palette.map((c, i) => ({
        color: c,
        baseX: 0.15 + i * 0.28,
        baseY: 0.1 + (i % 2) * 0.5,
        radius: 340 + i * 40,
        speed: 0.00012 + i * 0.00004,
        phase: i * 2.1,
        ampX: 120 + i * 20,
        ampY: 90 + i * 15
    }));

    let scrollOffset = 0;
    window.addEventListener('scroll', () => {
        scrollOffset = window.scrollY * 0.15;
    }, { passive: true });

    function draw(t) {
        // A hidden or zero-height viewport leaves h at 0, and the `% h` below
        // then yields NaN. createRadialGradient throws on a non-finite value,
        // and because that escapes draw() the requestAnimationFrame at the end
        // never runs — the animation dies for the rest of the page's life.
        // Skip the frame and try again instead.
        if (!w || !h) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, w, h);
        blobs.forEach(b => {
            const x = b.baseX * w + Math.sin(t * b.speed + b.phase) * b.ampX;
            const y = (b.baseY * h + Math.cos(t * b.speed * 1.3 + b.phase) * b.ampY - scrollOffset + h) % h;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, b.radius);
            grad.addColorStop(0, `rgba(${b.color.r},${b.color.g},${b.color.b},0.16)`);
            grad.addColorStop(1, `rgba(${b.color.r},${b.color.g},${b.color.b},0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        });
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
}

/**
 * 6. Contact modal controls & AJAX submission
 */
function initModalControls() {
    const modalOverlay = document.getElementById('plannerModal');
    const openBtns = document.querySelectorAll('a[href="#popup"], button[href="#popup"]');
    const closeBtn = document.getElementById('plannerModalClose');
    const serviceField = document.getElementById('m-service');
    const titleEl = document.getElementById('modalQuickTitle');
    let lastTrigger = null;

    if (!modalOverlay) return;

    function getFocusable() {
        return modalOverlay.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    }

    function openModal(e) {
        if (e) e.preventDefault();
        lastTrigger = e ? e.currentTarget : document.activeElement;
        const trigger = e ? e.currentTarget : null;
        const service = trigger && trigger.dataset ? (trigger.dataset.service || '') : '';

        if (serviceField) serviceField.value = service;
        if (titleEl) titleEl.textContent = service ? `Start Your ${service} Project` : 'Start Your Project';

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (window.BTAnalytics) window.BTAnalytics.track('modal_open', { modal_name: 'project_planner', page_type: document.body.dataset.pageType || 'page' });

        if (typeof initCalInlineEmbed === 'function') setTimeout(initCalInlineEmbed, 150);
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    }

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!modalOverlay.classList.contains('active')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }
        if (e.key === 'Tab') {
            const focusable = Array.from(getFocusable());
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    const fullForm = document.getElementById('contactForm');
    if (fullForm) bindLeadForm(fullForm, '/api/leads.php', "Thanks — we've got your project details. We'll be in touch within 48 hours with next steps.");

    const quickForm = document.getElementById('modalQuickForm');
    if (quickForm) bindLeadForm(quickForm, '/api/quick-leads.php', "Thanks — we've got it. We'll be in touch soon.");
}

/**
 * Wires a lead-capture form's submit handler to the given API endpoint.
 */
function bindLeadForm(form, endpoint, successMessage) {
    form.addEventListener('focusin', () => {
        if (!form.dataset.btStarted && window.BTAnalytics) {
            form.dataset.btStarted = 'true';
            window.BTAnalytics.track('form_start', {
                form_name: form.id === 'contactForm' ? 'contact_audit' : 'quick_project',
                page_type: document.body.dataset.pageType || 'page'
            });
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const statusEl = form.previousElementSibling; // Expecting status container just before <form>

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Sending...";
        }

        if (statusEl) {
            statusEl.style.display = 'none';
            statusEl.className = 'form-status';
        }

        const formData = new FormData(form);
        const data = {};
        formData.forEach((val, key) => data[key] = val);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const res = await response.json();

            if (response.ok && res.success) {
                if (statusEl) {
                    statusEl.innerHTML = res.message || successMessage;
                    statusEl.className = 'form-status success';
                    statusEl.style.display = 'block';
                }
                if (typeof window.setModalMascotState === 'function') {
                    window.setModalMascotState('success');
                }
                if (window.BTAnalytics) {
                    window.BTAnalytics.track('generate_lead', {
                        form_name: form.id === 'contactForm' ? 'contact_audit' : 'quick_project',
                        lead_type: form.id === 'contactForm' ? 'technical_audit' : 'project_enquiry'
                    });
                }
                form.reset();
            } else {
                throw new Error(res.error || "Form submission failed.");
            }
        } catch (err) {
            if (typeof window.setModalMascotState === 'function') {
                window.setModalMascotState('error');
            }
            if (statusEl) {
                statusEl.innerHTML = err.message || "An unexpected error occurred. Please try again.";
                statusEl.className = 'form-status error';
                statusEl.style.display = 'block';
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtn.dataset.originalText;
            }
        }
    });
}

/**
 * 7. Mobile hamburger nav toggle
 * Opens/closes nav drawer, animates bars → X, closes on outside click or link click
 */
function initMobileNav() {
    const toggle = document.getElementById('mobileNavToggle');
    const nav = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    function openNav() {
        nav.classList.add('nav-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-overlay-active');
    }

    function closeNav() {
        nav.classList.remove('nav-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-overlay-active');
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = nav.classList.contains('nav-open');
        isOpen ? closeNav() : openNav();
    });

    // Close on any nav link click (smooth SPA-like behaviour)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== toggle) {
            closeNav();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
            closeNav();
            toggle.focus();
        }
    });
}

/**
 * 8. Desktop Services Popover Menu with hover-intent & clean close
 */
function initMegaMenu() {
    const megaItem = document.querySelector('.ok-nav-item-has-mega');
    if (!megaItem) return;

    const trigger = megaItem.querySelector('.ok-nav-mega-trigger');
    if (!trigger) return;

    let openTimer = null;
    let closeTimer = null;

    function openMenu() {
        clearTimeout(closeTimer);
        openTimer = setTimeout(() => {
            megaItem.classList.add('mega-open');
            trigger.setAttribute('aria-expanded', 'true');
        }, 90);
    }

    function closeMenu() {
        clearTimeout(openTimer);
        closeTimer = setTimeout(() => {
            megaItem.classList.remove('mega-open');
            trigger.setAttribute('aria-expanded', 'false');
        }, 120);
    }

    megaItem.addEventListener('mouseenter', openMenu);
    megaItem.addEventListener('mouseleave', closeMenu);

    // Close immediately on link click inside menu
    megaItem.querySelectorAll('.ok-mega-menu a').forEach(a => {
        a.addEventListener('click', () => {
            megaItem.classList.remove('mega-open');
            trigger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaItem.classList.contains('mega-open')) {
            megaItem.classList.remove('mega-open');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
        }
    });
}

/**
 * 9. Hero Headline Typewriter Rotator
 * Cycles through phrases with typing (75ms) -> pausing (2200ms) -> deleting (40ms) -> switching (350ms)
 */
function initHeroTypewriter(reducedMotion) {
    const el = document.getElementById('heroTypewriter');
    if (!el || reducedMotion) return;

    let phrases = [];
    try {
        phrases = JSON.parse(el.dataset.phrases || '[]');
    } catch (err) {
        phrases = ['own company', 'own revenue', 'own product', 'own reputation'];
    }
    if (phrases.length < 2) return;

    let phraseIdx = 0;
    let charIdx = phrases[0].length;
    let phase = 'pausing'; // typing | pausing | deleting | switching

    function step() {
        const currentPhrase = phrases[phraseIdx];
        if (phase === 'pausing') {
            phase = 'deleting';
            setTimeout(step, 2200);
            return;
        }
        if (phase === 'deleting') {
            charIdx--;
            el.textContent = currentPhrase.slice(0, Math.max(0, charIdx));
            if (charIdx <= 0) {
                phase = 'switching';
                setTimeout(step, 320);
            } else {
                setTimeout(step, 40);
            }
            return;
        }
        if (phase === 'switching') {
            phraseIdx = (phraseIdx + 1) % phrases.length;
            charIdx = 0;
            phase = 'typing';
            setTimeout(step, 75);
            return;
        }
        if (phase === 'typing') {
            const nextPhrase = phrases[phraseIdx];
            charIdx++;
            el.textContent = nextPhrase.slice(0, charIdx);
            if (charIdx >= nextPhrase.length) {
                phase = 'pausing';
                setTimeout(step, 100);
            } else {
                setTimeout(step, 75);
            }
        }
    }

    setTimeout(step, 2400);
}

/**
 * 10. Homepage 6-Stage SVG Product Continuity Storyboard
 * Auto-advances through 01 Design -> 02 Code -> 03 SQA -> 04 Deploy -> 05 Grow -> 06 AI Ops
 * with interactive stage tabs and IntersectionObserver pause/resume.
 */
function initHeroStoryboard(reducedMotion) {
    const root = document.getElementById('heroStoryboard');
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll('.ok-sb-tab'));
    const scenes = Array.from(root.querySelectorAll('.ok-sb-scene'));
    const stageLabel = document.getElementById('sbStageLabel');
    const progressBar = document.getElementById('sbProgressBar');

    const STAGE_CAPTIONS = [
        '01 / DFD LEVEL 1 — Client Upload • Base64 Encode • API Gateway • Server Preprocessing',
        '02 / SEQUENCE PIPELINE — Actor → UI → API → Feature Extraction → Model Ingestion',
        '03 / ACTIVITY LIFECYCLE — User Auth • Preprocessing • Deepfake Detection • Spatial Localization',
        '04 / DUAL-STREAM CNN — Spatial ResNet-50 Feature Map + Fast Fourier Transform (FFT) Frequency Analysis',
        '05 / FORENSIC HEATMAP — 95.4% Detection Precision • Bounding Box ROI • Sub-84ms GPU Latency',
        '06 / FYP DRIVE & DEMO — Google Drive Thesis Documentation, Live Screenshots & GitHub Repository'
    ];

    const STAGE_DURATION = 4400; // ms per stage
    let activeStage = 0;
    let stageStartTime = performance.now();
    let isVisible = true;
    let isHovered = false;

    function setStage(idx) {
        activeStage = (idx + scenes.length) % scenes.length;
        stageStartTime = performance.now();

        tabs.forEach((tab, i) => {
            const isCurrent = i === activeStage;
            tab.classList.toggle('active', isCurrent);
            tab.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        });

        scenes.forEach((scene, i) => {
            scene.classList.toggle('active', i === activeStage);
        });

        if (stageLabel && STAGE_CAPTIONS[activeStage]) {
            stageLabel.textContent = STAGE_CAPTIONS[activeStage];
        }
        if (progressBar) {
            progressBar.style.width = `${((activeStage + 1) / scenes.length) * 100}%`;
        }
    }

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            setStage(idx);
        });
    });

    root.addEventListener('mouseenter', () => { isHovered = true; });
    root.addEventListener('mouseleave', () => {
        isHovered = false;
        stageStartTime = performance.now();
    });

    if (reducedMotion) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible) stageStartTime = performance.now();
        });
    }, { threshold: 0.15 });
    io.observe(root);

    function tick(now) {
        if (isVisible && !isHovered) {
            const elapsed = now - stageStartTime;
            const stageProgress = Math.min(elapsed / STAGE_DURATION, 1);
            if (progressBar) {
                const overallPct = ((activeStage + stageProgress) / scenes.length) * 100;
                progressBar.style.width = `${overallPct.toFixed(1)}%`;
            }
            if (elapsed >= STAGE_DURATION) {
                setStage(activeStage + 1);
            }
        }
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

/**
 * 11. Single-Service Page: Scroll-Scrubbed Geometric Overview Scene
 * Rotates (-28deg to +22deg) and scales (0.86 to 1.04) the thin-stroke SVG vector on scroll.
 */
function initCapabilityOverviewScene(reducedMotion) {
    const scene = document.querySelector('[data-cap-overview]');
    if (!scene || reducedMotion) return;

    const vector = scene.querySelector('[data-cap-vector]');
    const title = scene.querySelector('[data-cap-shift]');
    if (!vector) return;

    let ticking = false;
    function update() {
        const rect = scene.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        const deg = -28 + progress * 50;
        const scale = 0.86 + progress * 0.18;
        vector.style.transform = `rotate(${deg.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        if (title) {
            const shiftX = (1 - progress) * 14;
            title.style.transform = `translateX(${shiftX.toFixed(1)}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
}

/**
 * 12. Single-Service Page: 4-Pillar x 4-Deliverable Vertical Stacking Reel & Mobile Rail
 */
function initSubCapabilityStackReel(reducedMotion) {
    const section = document.querySelector('[data-subcap-reel]');
    if (!section) return;

    const track = section.querySelector('[data-subcap-track]');
    const cards = Array.from(section.querySelectorAll('[data-subcap-card]'));
    const counter = section.querySelector('[data-subcap-counter]');
    const prevBtn = section.querySelector('[data-subcap-prev]');
    const nextBtn = section.querySelector('[data-subcap-next]');
    if (!track || cards.length === 0) return;

    let activeIdx = 0;

    function updateActiveCard(idx) {
        activeIdx = Math.min(Math.max(idx, 0), cards.length - 1);
        if (counter) {
            counter.textContent = `0${activeIdx + 1} / 0${cards.length}`;
        }
        cards.forEach((c, i) => {
            c.classList.toggle('is-active-pillar', i === activeIdx);
            if (!reducedMotion && window.innerWidth > 1024 && window.innerHeight >= 740) {
                const depth = Math.max(0, activeIdx - i);
                const scale = 1 - depth * 0.022;
                c.style.transform = depth > 0 ? `scale(${scale.toFixed(3)})` : 'scale(1)';
            } else {
                c.style.transform = '';
            }
        });
    }

    function scrollToCard(idx) {
        const targetIdx = (idx + cards.length) % cards.length;
        const card = cards[targetIdx];
        if (!card) return;
        const y = card.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: y, behavior: 'smooth' });
        updateActiveCard(targetIdx);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => scrollToCard(activeIdx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToCard(activeIdx + 1));

    // Scroll spy for vertical stack
    window.addEventListener('scroll', () => {
        let current = 0;
        cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            if (r.top <= 240) current = i;
        });
        if (current !== activeIdx) updateActiveCard(current);
    }, { passive: true });

    updateActiveCard(0);
}

/**
 * 13. Single-Service Page: Sticky 6-Stage Delivery Chapters Scroll-Spy
 */
function initStickyDeliveryChapters() {
    const section = document.querySelector('[data-delivery-chapters]');
    if (!section) return;

    const links = Array.from(section.querySelectorAll('[data-chapter-link]'));
    const cards = Array.from(section.querySelectorAll('[data-chapter-card]'));
    if (links.length === 0 || cards.length === 0) return;

    function setActive(idx) {
        links.forEach((l, i) => l.classList.toggle('active', i === idx));
        cards.forEach((c, i) => c.classList.toggle('active-chapter', i === idx));
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = parseInt(entry.target.dataset.chapterCard, 10);
                if (!Number.isNaN(idx)) setActive(idx);
            }
        });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0.1 });

    cards.forEach(card => io.observe(card));
}

/**
 * 14. DDaaS Page Scroll Choreography
 * - Lens-Focus convergence cards ([data-ddaas-lens])
 * - Folio Deck fan-out ([data-ddaas-folio])
 * - Case Files Dossier untilt ([data-ddaas-dossiers])
 */
function initDdaasScrollAnimations(reducedMotion) {
    const lensSection = document.querySelector('[data-ddaas-lens]');
    const folioSection = document.querySelector('[data-ddaas-folio]');
    const dossierSection = document.querySelector('[data-ddaas-dossiers]');

    if (!lensSection && !folioSection && !dossierSection) return;

    if (reducedMotion) {
        if (folioSection) folioSection.classList.add('folio-fanned');
        if (dossierSection) dossierSection.classList.add('dossiers-aligned');
        return;
    }

    // Folio Deck & Dossier IntersectionObserver triggers
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === folioSection && entry.isIntersecting) {
                folioSection.classList.add('folio-fanned');
            }
            if (entry.target === dossierSection && entry.isIntersecting) {
                dossierSection.classList.add('dossiers-aligned');
            }
        });
    }, { threshold: 0.22 });

    if (folioSection) io.observe(folioSection);
    if (dossierSection) io.observe(dossierSection);

    // Continuous scroll-scrubbed Lens-Focus convergence
    if (lensSection && window.innerWidth > 900) {
        const leftCard = lensSection.querySelector('[data-lens-card="left"]');
        const centerCard = lensSection.querySelector('[data-lens-card="center"]');
        const rightCard = lensSection.querySelector('[data-lens-card="right"]');

        function updateLens() {
            const rect = lensSection.getBoundingClientRect();
            const vh = window.innerHeight || 800;
            const raw = (vh - rect.top) / (vh * 0.75);
            const p = Math.min(Math.max(raw, 0), 1);
            const inv = 1 - p;
            const scale = (0.86 + p * 0.14).toFixed(3);
            if (leftCard) leftCard.style.transform = `translateX(${(inv * 34).toFixed(1)}px) scale(${scale})`;
            if (centerCard) centerCard.style.transform = `scale(${(0.9 + p * 0.1).toFixed(3)})`;
            if (rightCard) rightCard.style.transform = `translateX(${(inv * -34).toFixed(1)}px) scale(${scale})`;
        }

        window.addEventListener('scroll', () => requestAnimationFrame(updateLens), { passive: true });
        updateLens();
    }
}

/**
 * 15. Homepage Industry Bottleneck & Revenue Leak Diagnostic Dashboard
 */
function initLeakDashboard() {
    const root = document.querySelector('[data-leak-dashboard]');
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll('[data-leak-tab]'));
    const panels = Array.from(root.querySelectorAll('[data-leak-panel]'));
    if (tabs.length === 0 || panels.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetIdx = tab.dataset.leakTab;
            tabs.forEach(t => {
                const isActive = t.dataset.leakTab === targetIdx;
                t.classList.toggle('active', isActive);
                t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            panels.forEach(p => {
                p.classList.toggle('active', p.dataset.leakPanel === targetIdx);
            });
        });
    });
}

/**
 * 16. Interactive Multi-State Mascot Rig ("Volt")
 * - Controls Modal Mascot states (Greeting -> Thinking -> Working -> Jump/Success)
 * - Controls Floating Corner Mascot ("Ask Volt") nudge & dismiss
 * - Controls Branding & Identity Page Interactive Character Studio
 */
function initMascotInteractions(reducedMotion) {
    // A. Modal Mascot Companion States
    const modalMascotRig = document.getElementById('modalMascotRig');
    const modalMascotTag = document.getElementById('modalMascotTagText');
    const modalMascotSpeech = document.getElementById('modalMascotSpeech');
    const modalChips = document.querySelectorAll('[data-modal-chip]');
    const serviceInput = document.getElementById('m-service');
    const quickForm = document.getElementById('modalQuickForm');

    const MASCOT_STATES = {
        greeting: {
            state: 'greeting',
            tag: 'VOLT // ONLINE',
            speech: 'Pick a focus area or drop your details below — a senior architect replies within 24 hours.'
        },
        thinking: {
            state: 'thinking',
            tag: 'VOLT // SCOPING STACK',
            speech: 'Mapping the right senior engineers and growth specialists for your scope...'
        },
        working: {
            state: 'working',
            tag: 'VOLT // HUD ACTIVE',
            speech: 'Logging your contact coordinates directly to our lead engineering channel.'
        },
        success: {
            state: 'jump',
            tag: 'VOLT // BRIEF DISPATCHED',
            speech: 'Locked in! Your brief is with our technical director — check your inbox shortly.'
        },
        error: {
            state: 'surprised',
            tag: 'VOLT // SIGNAL DROP',
            speech: 'Please check your required fields so we can route your brief.'
        }
    };

    window.setModalMascotState = function(stateKey, customSpeech) {
        if (!MASCOT_STATES[stateKey]) return;
        const st = MASCOT_STATES[stateKey];
        if (modalMascotRig) {
            modalMascotRig.dataset.voltState = st.state;
        }
        if (modalMascotTag) modalMascotTag.textContent = st.tag;
        if (modalMascotSpeech) modalMascotSpeech.textContent = customSpeech || st.speech;
    };

    if (modalChips.length > 0) {
        modalChips.forEach(chip => {
            chip.addEventListener('mouseenter', () => {
                window.setModalMascotState('thinking', `Scoping ${chip.dataset.modalChip} architecture and timeline...`);
            });
            chip.addEventListener('click', () => {
                modalChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                const val = chip.dataset.modalChip;
                if (serviceInput) serviceInput.value = val;
                const titleEl = document.getElementById('modalQuickTitle');
                if (titleEl) titleEl.textContent = `Start Your ${val} Project`;
                window.setModalMascotState('working', `${val} selected. Enter your contact details below to lock your scope call.`);
            });
        });
    }

    if (quickForm) {
        quickForm.querySelectorAll('input').forEach(inp => {
            inp.addEventListener('focus', () => {
                window.setModalMascotState('working');
            });
        });
    }

    // B. Floating Corner Mascot ("Ask Volt")
    const voltLauncher = document.getElementById('voltLauncher');
    const voltDismiss = document.getElementById('voltDismiss');
    const voltBtn = document.getElementById('voltBtn');
    const voltBtnRig = document.getElementById('voltBtnRig');

    if (voltLauncher) {
        if (sessionStorage.getItem('bt_volt_dismissed') === '1') {
            voltLauncher.setAttribute('hidden', '');
        } else if (!reducedMotion) {
            setTimeout(() => {
                voltLauncher.classList.add('is-nudging');
                setTimeout(() => voltLauncher.classList.remove('is-nudging'), 6500);
            }, 3500);
        }

        if (voltDismiss) {
            voltDismiss.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                voltLauncher.setAttribute('hidden', '');
                sessionStorage.setItem('bt_volt_dismissed', '1');
            });
        }

        if (voltBtn && voltBtnRig) {
            voltBtn.addEventListener('mouseenter', () => {
                voltBtnRig.dataset.voltState = 'jump';
            });
            voltBtn.addEventListener('mouseleave', () => {
                voltBtnRig.dataset.voltState = 'greeting';
            });
        }
    }

    // C. Branding & Identity Page: Interactive Character Studio
    const studio = document.querySelector('[data-char-studio]');
    if (studio) {
        const stageRig = studio.querySelector('[data-char-stage-rig]');
        const stageBadge = studio.querySelector('[data-char-stage-badge]');
        const stageTitle = studio.querySelector('[data-char-stage-title]');
        const stageSub = studio.querySelector('[data-char-stage-sub]');
        const btns = Array.from(studio.querySelectorAll('[data-char-state]'));

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const state = btn.dataset.charState || 'greeting';
                const cat = btn.dataset.charCat || 'RIG STATE';
                const title = btn.dataset.charTitle || 'Volt Mascot';
                const sub = btn.dataset.charSub || '';

                if (stageRig) {
                    stageRig.dataset.voltState = state;
                }
                if (stageBadge) stageBadge.textContent = cat;
                if (stageTitle) stageTitle.textContent = title;
                if (stageSub) stageSub.textContent = sub;
            });
        });
    }
}
