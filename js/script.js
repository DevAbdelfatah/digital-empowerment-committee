/* =========================================================
   Digital Empowerment Committee
   HTI Matrouh Branch
   Main JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL CONFIG
   ========================================================= */

const CONFIG = {
    themeKey: "digitalEmpowermentTheme",

    projects: [
        {
            id: 1,
            title: "منصة لجنة التمكين الرقمي",
            category: "Web Development",
            description:
                "منصة رقمية لعرض أنشطة اللجنة والمشروعات والتدريبات والمهارات التي يتم تنفيذها.",
            image: "assets/projects/project-1.jpg",
            tags: ["HTML", "CSS", "JavaScript"]
        },
        {
            id: 2,
            title: "نظام إدارة أعمال",
            category: "Programming",
            description:
                "مشروع تدريبي يركز على بناء نظام يساعد في تنظيم وإدارة البيانات والعمليات.",
            image: "assets/projects/project-2.jpg",
            tags: ["Programming", "Database", "Web"]
        },
        {
            id: 3,
            title: "هوية بصرية رقمية",
            category: "Graphic Design",
            description:
                "تطبيق عملي على تصميم الهوية البصرية والمواد الرقمية باستخدام أدوات التصميم.",
            image: "assets/projects/project-3.jpg",
            tags: ["Design", "Branding", "UI"]
        }
    ],

    activities: [
        {
            id: 1,
            title: "تدريب ICDL",
            category: "ICDL",
            description:
                "تدريب عملي على أساسيات التعامل مع برامج Microsoft Office والمهارات الرقمية الأساسية."
        },
        {
            id: 2,
            title: "ورشة البرمجة",
            category: "Programming",
            description:
                "تطبيقات عملية تساعد الطلاب على فهم البرمجة وبناء مشاريع حقيقية."
        },
        {
            id: 3,
            title: "ورشة تصميم المواقع",
            category: "Web Development",
            description:
                "التعرف على أساسيات تصميم وتطوير المواقع باستخدام تقنيات الويب الحديثة."
        },
        {
            id: 4,
            title: "الذكاء الاصطناعي",
            category: "AI",
            description:
                "التعرف على استخدامات الذكاء الاصطناعي وأدواته في الدراسة والعمل."
        },
        {
            id: 5,
            title: "الجرافيك والديزاين",
            category: "Graphic Design",
            description:
                "تطبيقات عملية في التصميم وإنشاء الأعمال التي يمكن إضافتها إلى Portfolio."
        },
        {
            id: 6,
            title: "العمل الحر",
            category: "Freelancing",
            description:
                "التعرف على العمل الحر وتجهيز الحساب الشخصي وكتابة العروض والتعامل مع العملاء."
        }
    ]
};


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();
    initializeTheme();
    initializeMobileMenu();
    initializeHeader();
    initializeNavigation();
    initializeProjects();
    initializeActivities();
    initializeSearch();
    initializeFilters();
    initializeModals();
    initializeRevealAnimations();
    initializeBackToTop();
    initializeCounters();
    initializeForms();
    initializeCurrentYear();
});


/* =========================================================
   PAGE LOADER
   ========================================================= */

function initializeLoader() {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 400);

    });
}


/* =========================================================
   THEME
   ========================================================= */

function initializeTheme() {

    const savedTheme = localStorage.getItem(CONFIG.themeKey);

    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    const themeButtons = document.querySelectorAll(
        "[data-theme-toggle], #themeToggle"
    );

    themeButtons.forEach(button => {

        button.addEventListener("click", toggleTheme);

        updateThemeIcon(button);

    });
}


function toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    if (newTheme === "dark") {
        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            CONFIG.themeKey,
            "dark"
        );

    } else {

        document.documentElement.removeAttribute(
            "data-theme"
        );

        localStorage.setItem(
            CONFIG.themeKey,
            "light"
        );
    }

    document
        .querySelectorAll("[data-theme-toggle], #themeToggle")
        .forEach(updateThemeIcon);
}


function updateThemeIcon(button) {

    const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

    const icon = button.querySelector("i");

    if (!icon) return;

    icon.setAttribute(
        "data-lucide",
        isDark ? "sun" : "moon"
    );

    refreshIcons();
}


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshIcons() {

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {
        lucide.createIcons();
    }
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const expanded =
            navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            expanded
        );

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.setAttribute(
                "data-lucide",
                expanded
                    ? "x"
                    : "menu"
            );

            refreshIcons();
        }
    });


    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.setAttribute(
                    "data-lucide",
                    "menu"
                );

                refreshIcons();
            }
        });

    });


    document.addEventListener("click", event => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
}


/* =========================================================
   HEADER
   ========================================================= */

function initializeHeader() {

    const header =
        document.querySelector(".site-header");

    if (!header) return;

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    function updateHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(
            '.nav-link[href^="#"]'
        );

    if (!sections.length || !links.length) return;


    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id =
                        entry.target.getAttribute("id");

                    links.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {
        observer.observe(section);
    });
}


/* =========================================================
   PROJECTS
   ========================================================= */

function initializeProjects() {

    const container =
        document.querySelector(
            "#projectsContainer"
        );

    if (!container) return;

    renderProjects(CONFIG.projects);
}


function renderProjects(projects) {

    const container =
        document.querySelector(
            "#projectsContainer"
        );

    if (!container) return;


    if (!projects.length) {

        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="folder-open"></i>
                <h3>لا توجد مشاريع</h3>
                <p>لم يتم العثور على مشاريع مطابقة.</p>
            </div>
        `;

        refreshIcons();

        return;
    }


    container.innerHTML =
        projects.map(project => {

            const tags =
                project.tags
                    .map(tag => `
                        <span class="project-tag">
                            ${escapeHTML(tag)}
                        </span>
                    `)
                    .join("");


            return `
                <article
                    class="project-card reveal"
                    data-project-id="${project.id}"
                >

                    <div class="project-image">

                        <img
                            src="${escapeAttribute(project.image)}"
                            alt="${escapeAttribute(project.title)}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        >

                    </div>

                    <div class="project-content">

                        <span class="project-category">
                            ${escapeHTML(project.category)}
                        </span>

                        <h3>
                            ${escapeHTML(project.title)}
                        </h3>

                        <p>
                            ${escapeHTML(project.description)}
                        </p>

                        <div class="project-tags">
                            ${tags}
                        </div>

                    </div>

                </article>
            `;

        }).join("");


    refreshIcons();

    observeNewElements();
}


/* =========================================================
   ACTIVITIES
   ========================================================= */

function initializeActivities() {

    const container =
        document.querySelector(
            "#activitiesContainer"
        );

    if (!container) return;

    renderActivities(CONFIG.activities);
}


function renderActivities(activities) {

    const container =
        document.querySelector(
            "#activitiesContainer"
        );

    if (!container) return;


    if (!activities.length) {

        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="calendar-x"></i>
                <h3>لا توجد أنشطة</h3>
                <p>سيتم إضافة الأنشطة قريبًا.</p>
            </div>
        `;

        refreshIcons();

        return;
    }


    container.innerHTML =
        activities.map(activity => {

            return `
                <article
                    class="card activity-card reveal"
                    data-category="${escapeAttribute(activity.category)}"
                >

                    <div class="card-icon">
                        <i data-lucide="${getActivityIcon(activity.category)}"></i>
                    </div>

                    <h3>
                        ${escapeHTML(activity.title)}
                    </h3>

                    <p>
                        ${escapeHTML(activity.description)}
                    </p>

                </article>
            `;

        }).join("");


    refreshIcons();

    observeNewElements();
}


/* =========================================================
   ACTIVITY ICONS
   ========================================================= */

function getActivityIcon(category) {

    const icons = {

        "ICDL": "monitor",

        "Programming": "code-2",

        "Web Development": "globe",

        "Graphic Design": "pen-tool",

        "AI": "brain-circuit",

        "Freelancing": "briefcase-business"

    };

    return icons[category] || "layers";
}


/* =========================================================
   SEARCH
   ========================================================= */

function initializeSearch() {

    const searchInput =
        document.querySelector(
            "#projectSearch"
        );

    if (!searchInput) return;

    searchInput.addEventListener(
        "input",
        debounce(() => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            if (!query) {

                renderProjects(CONFIG.projects);

                return;
            }


            const filtered =
                CONFIG.projects.filter(project => {

                    const searchableText =
                        [
                            project.title,
                            project.category,
                            project.description,
                            ...project.tags
                        ]
                            .join(" ")
                            .toLowerCase();

                    return searchableText.includes(query);
                });


            renderProjects(filtered);

        }, 250)
    );
}


/* =========================================================
   FILTERS
   ========================================================= */

function initializeFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    if (!filterButtons.length) return;


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const filter =
                button.dataset.filter ||
                button.getAttribute("data-category") ||
                "all";


            if (filter === "all") {

                renderProjects(CONFIG.projects);

                return;
            }


            const filtered =
                CONFIG.projects.filter(project => {

                    return (
                        project.category
                            .toLowerCase() ===
                        filter.toLowerCase()
                    );

                });


            renderProjects(filtered);
        });

    });
}


/* =========================================================
   MODALS
   ========================================================= */

function initializeModals() {

    const modalTriggers =
        document.querySelectorAll(
            "[data-modal]"
        );

    const modalCloseButtons =
        document.querySelectorAll(
            ".modal-close"
        );


    modalTriggers.forEach(trigger => {

        trigger.addEventListener("click", event => {

            event.preventDefault();

            const modalId =
                trigger.dataset.modal;

            const modal =
                document.getElementById(modalId);

            if (!modal) return;

            openModal(modal);
        });

    });


    modalCloseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modal =
                button.closest(".modal");

            if (modal) {
                closeModal(modal);
            }

        });

    });


    document.querySelectorAll(".modal").forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal(modal);
            }

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        const activeModal =
            document.querySelector(
                ".modal.active"
            );

        if (activeModal) {
            closeModal(activeModal);
        }

    });
}


function openModal(modal) {

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeModal(modal) {

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function initializeRevealAnimations() {

    observeNewElements();
}


function observeNewElements() {

    const elements =
        document.querySelectorAll(
            ".reveal:not(.reveal-ready)"
        );

    if (!elements.length) return;


    elements.forEach(element => {
        element.classList.add(
            "reveal-ready"
        );
    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initializeBackToTop() {

    const button =
        document.querySelector(
            ".back-to-top"
        );

    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* =========================================================
   COUNTERS
   ========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    animateCounter(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {
        observer.observe(counter);
    });
}


function animateCounter(element) {

    const target =
        Number(
            element.dataset.counter ||
            element.textContent
        );

    if (
        Number.isNaN(target)
    ) return;


    const duration = 1200;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                eased * target
            );


        element.textContent =
            value.toLocaleString("ar-EG");


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target.toLocaleString("ar-EG");
        }
    }


    requestAnimationFrame(update);
}


/* =========================================================
   FORMS
   ========================================================= */

function initializeForms() {

    const forms =
        document.querySelectorAll(
            "form"
        );

    forms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                const action =
                    form.getAttribute(
                        "action"
                    );

                /*
                 * لو الفورم مربوط بخدمة خارجية
                 * نسمح له بالإرسال بشكل طبيعي.
                 */

                if (
                    action &&
                    action !== "#" &&
                    !action.startsWith("javascript:")
                ) {
                    return;
                }


                event.preventDefault();

                showFormMessage(
                    form,
                    "تم استلام البيانات بنجاح."
                );

                form.reset();
            }
        );

    });
}


function showFormMessage(form, message) {

    let messageBox =
        form.querySelector(
            ".form-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );

        messageBox.className =
            "form-message";

        messageBox.style.marginTop =
            "15px";

        messageBox.style.padding =
            "10px 14px";

        messageBox.style.borderRadius =
            "8px";

        messageBox.style.background =
            "rgba(18, 183, 106, 0.1)";

        messageBox.style.color =
            "#12b76a";

        messageBox.style.fontSize =
            "12px";

        form.appendChild(
            messageBox
        );
    }


    messageBox.textContent =
        message;

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initializeCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {
        element.textContent = year;
    });
}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function debounce(callback, delay = 250) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout =
            setTimeout(
                () => callback(...args),
                delay
            );
    };
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}


/* =========================================================
   GLOBAL ERROR HANDLING
   ========================================================= */

window.addEventListener(
    "error",
    event => {

        console.warn(
            "Website error:",
            event.message
        );

    }
);


/* =========================================================
   INITIAL ICON RENDER
   ========================================================= */

refreshIcons();
