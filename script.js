document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع بنجاح');

    // ============================================================================
    // ★★★  التعديل رقم (2): المكتبة الرقمية (مجموعات Google Drive)  ★★★
    // ----------------------------------------------------------------------------
    //  التعليمات للمدرسة:
    //  1) أنشئ في Google Drive مجلداً لكل قسم ومرحلة (9 مجلدات).
    //  2) اجعل مشاركة كل مجلد: "أي شخص لديه الرابط يمكنه العرض".
    //  3) انسخ رابط كل مجلد والصقه داخل driveLink: '' في المكان المناسب.
    //  4) أي مجموعة تتركها فارغة '' ستظهر للزائر بعبارة "الرابط قريباً".
    // ============================================================================
    const libraryCollections = [
        // ============ قسم الأجهزة الطبية ============
        { id: 1, department: 'أجهزة-طبية', level: 'الأول',  driveLink: 'https://drive.google.com/drive/folders/106J1XQ21YL7SlV4ZBkFyow1UffrYw774' },   // ← ضع رابط المرحلة الأولى - أجهزة طبية
        { id: 2, department: 'أجهزة-طبية', level: 'الثاني', driveLink: 'https://drive.google.com/drive/folders/17sudqTFY941lDl9oSLOKgzOPrfQx2hCW' },   // ← ضع رابط المرحلة الثانية - أجهزة طبية
        { id: 3, department: 'أجهزة-طبية', level: 'الثالث', driveLink: 'https://drive.google.com/drive/folders/1XYNW2jYSw4R813Zv-3Id78wsDyusyrv9' },   // ← ضع رابط المرحلة الثالثة - أجهزة طبية

        // ============ قسم الاتصالات ============
        { id: 4, department: 'اتصالات', level: 'الأول',  driveLink: 'https://drive.google.com/drive/folders/1xDVZqgo1OYDPOaJsQrGfKFit--29GVfq' },      // ← ضع رابط المرحلة الأولى - اتصالات
        { id: 5, department: 'اتصالات', level: 'الثاني', driveLink: 'https://drive.google.com/drive/folders/1NtOU5rWpTuGVRpDY2j8J1rHVy1b4tLvD' },      // ← ضع رابط المرحلة الثانية - اتصالات
        { id: 6, department: 'اتصالات', level: 'الثالث', driveLink: 'https://drive.google.com/drive/folders/1qJeCGYi1Au98vk0fmqCnCtzzYQhcxgtA' },      // ← ضع رابط المرحلة الثالثة - اتصالات

        // ============ قسم تجميع الحاسوب ============
        { id: 7, department: 'تجميع', level: 'الأول',  driveLink: 'https://drive.google.com/drive/folders/1uSIMEMFmCQv9nn5CQEi3eyCC8H5twHIs' },        // ← ضع رابط المرحلة الأولى - تجميع
        { id: 8, department: 'تجميع', level: 'الثاني', driveLink: 'https://drive.google.com/drive/folders/1hyfuig5vlZRQ7WmOeFzCDxwxx-7fKyg6' },        // ← ضع رابط المرحلة الثانية - تجميع
        { id: 9, department: 'تجميع', level: 'الثالث', driveLink: 'https://drive.google.com/drive/folders/1ztwavQ4XQTGm2zmm2WRPpOgUQQiEnirr' }         // ← ضع رابط المرحلة الثالثة - تجميع
    ];
    // ★★★  نهاية التعديل رقم (2)  ★★★
    // ============================================================================


    try {
        // ===================================================
        // القائمة المتنقلة
        // ===================================================
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(n => {
                n.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // ===================================================
        // دالة التمرير السلس
        // ===================================================
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        const btnAbout = document.getElementById('btn-about');
        const btnLibrary = document.getElementById('btn-library');

        if (btnAbout) {
            btnAbout.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('about');
            });
        }

        if (btnLibrary) {
            btnLibrary.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('library');
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    scrollToSection(targetId);
                }
            });
        });

        // ===================================================
        // السلايدر (كلاس عام)
        // ===================================================
        class SimpleSlider {
            constructor(sliderElement, options = {}) {
                this.slider = sliderElement;
                this.slides = sliderElement.querySelectorAll('.slide');
                this.dots = sliderElement.querySelectorAll('.dot');

                const prevSelector = options.prevSelector || '.prev-btn';
                const nextSelector = options.nextSelector || '.next-btn';
                this.prevBtn = sliderElement.querySelector(prevSelector);
                this.nextBtn = sliderElement.querySelector(nextSelector);

                this.currentSlide = 0;
                this.totalSlides = this.slides.length;
                this.slideInterval = null;
                this.autoPlayDelay = options.autoPlayDelay || 5000;
                this.hasControls = options.hasControls !== undefined ? options.hasControls : true;

                this.init();
            }

            init() {
                this.slides.forEach((slide, index) => {
                    if (index === 0) {
                        slide.classList.add('active');
                        slide.style.opacity = '1';
                        slide.style.visibility = 'visible';
                    } else {
                        slide.classList.remove('active');
                        slide.style.opacity = '0';
                        slide.style.visibility = 'hidden';
                    }
                });

                this.dots.forEach((dot, index) => {
                    if (index === 0) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                this.addEventListeners();
                this.startAutoPlay();
                console.log('تم تهيئة السلايدر');
            }

            addEventListeners() {
                if (this.prevBtn && this.hasControls) {
                    this.prevBtn.addEventListener('click', () => this.prevSlide());
                }
                if (this.nextBtn && this.hasControls) {
                    this.nextBtn.addEventListener('click', () => this.nextSlide());
                }

                this.dots.forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        const index = parseInt(e.currentTarget.getAttribute('data-index'));
                        this.goToSlide(index);
                    });
                });

                this.slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
                this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
            }

            goToSlide(index) {
                this.slides[this.currentSlide].classList.remove('active');
                this.slides[this.currentSlide].style.opacity = '0';
                this.slides[this.currentSlide].style.visibility = 'hidden';
                this.dots[this.currentSlide].classList.remove('active');

                this.currentSlide = index;
                this.slides[this.currentSlide].classList.add('active');
                this.slides[this.currentSlide].style.opacity = '1';
                this.slides[this.currentSlide].style.visibility = 'visible';
                this.dots[this.currentSlide].classList.add('active');

                this.handleVideoPlay(index);
                this.restartAutoPlay();
            }

            handleVideoPlay(index) {
                const slide = this.slides[index];
                const video = slide.querySelector('video');
                if (video) {
                    this.slides.forEach((s, i) => {
                        if (i !== index) {
                            const otherVideo = s.querySelector('video');
                            if (otherVideo) {
                                otherVideo.pause();
                            }
                        }
                    });
                    video.play().catch(() => {});
                } else {
                    this.slides.forEach(s => {
                        const v = s.querySelector('video');
                        if (v) v.pause();
                    });
                }
            }

            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(nextIndex);
            }

            prevSlide() {
                const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.goToSlide(prevIndex);
            }

            startAutoPlay() {
                this.slideInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
            }

            pauseAutoPlay() {
                if (this.slideInterval) {
                    clearInterval(this.slideInterval);
                    this.slideInterval = null;
                }
            }

            restartAutoPlay() {
                this.pauseAutoPlay();
                this.startAutoPlay();
            }
        }

        // تهيئة السلايدر الرئيسي (بدون أزرار)
        setTimeout(() => {
            const heroSlider = document.getElementById('hero-slider');
            if (heroSlider) {
                window.heroSlider = new SimpleSlider(heroSlider, {
                    autoPlayDelay: 5000,
                    hasControls: false
                });
            }
            enhanceImageLoading();
        }, 100);

        // تهيئة سلايدر "عن المدرسة" (مع أزرار)
        setTimeout(() => {
            const aboutSlider = document.getElementById('about-slider');
            if (aboutSlider) {
                window.aboutSlider = new SimpleSlider(aboutSlider, {
                    prevSelector: '.prev-btn',
                    nextSelector: '.next-btn',
                    autoPlayDelay: 4000,
                    hasControls: true
                });

                const videoControlBtn = document.getElementById('aboutVideoControl');
                const aboutVideo = document.getElementById('about-video');
                if (videoControlBtn && aboutVideo) {
                    videoControlBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (aboutVideo.paused) {
                            aboutVideo.play();
                            this.innerHTML = '<i class="fas fa-pause"></i>';
                        } else {
                            aboutVideo.pause();
                            this.innerHTML = '<i class="fas fa-play"></i>';
                        }
                    });

                    aboutVideo.addEventListener('pause', function() {
                        videoControlBtn.innerHTML = '<i class="fas fa-play"></i>';
                    });
                    aboutVideo.addEventListener('play', function() {
                        videoControlBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    });
                }
            }
        }, 200);

        function enhanceImageLoading() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.closest('.slide-media')) {
                    img.style.opacity = '1';
                    return;
                }
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                img.addEventListener('error', function() {
                    console.warn('فشل تحميل الصورة:', this.src);
                    this.style.opacity = '1';
                });
            });
        }

        // ===================================================
        // ★ التعديل رقم (2): عرض مجموعات المكتبة ★
        // ===================================================
        const departmentIcons = {
            'اتصالات': 'fas fa-broadcast-tower',
            'تجميع': 'fas fa-laptop-code',
            'أجهزة-طبية': 'fas fa-stethoscope'
        };

        const departmentNames = {
            'اتصالات': 'قسم الاتصالات',
            'تجميع': 'قسم تجميع الحاسوب',
            'أجهزة-طبية': 'قسم الأجهزة الطبية'
        };

        const levelNames = {
            'الأول': 'المرحلة الأولى',
            'الثاني': 'المرحلة الثانية',
            'الثالث': 'المرحلة الثالثة'
        };

        const departmentsInfo = {
            all: {
                name: "جميع الأقسام",
                description: "اختر القسم والمرحلة الدراسية للوصول إلى ملفات الكتب على Google Drive"
            },
            اتصالات: {
                name: "قسم الاتصالات",
                description: "كتب ومراجع قسم الاتصالات موزعة على المراحل الدراسية الثلاث."
            },
            تجميع: {
                name: "قسم تجميع الحاسوب",
                description: "كتب ومراجع قسم تجميع الحاسوب موزعة على المراحل الدراسية الثلاث."
            },
            "أجهزة-طبية": {
                name: "قسم الأجهزة الطبية",
                description: "كتب ومراجع قسم الأجهزة الطبية موزعة على المراحل الدراسية الثلاث."
            }
        };

        let currentCategory = 'all';
        let currentLevel = 'all';
        let currentSearchTerm = '';

        function displayCollections() {
            const grid = document.getElementById('collectionsGrid');
            if (!grid) return;
            grid.innerHTML = '';

            const filtered = libraryCollections.filter(item => {
                const categoryMatch = currentCategory === 'all' || item.department === currentCategory;
                const levelMatch = currentLevel === 'all' || item.level === currentLevel;

                const deptName = (departmentNames[item.department] || '').toLowerCase();
                const lvlName  = (levelNames[item.level] || '').toLowerCase();
                const searchMatch = !currentSearchTerm ||
                    deptName.includes(currentSearchTerm) ||
                    lvlName.includes(currentSearchTerm);

                return categoryMatch && levelMatch && searchMatch;
            });

            const resultsCount = document.getElementById('resultsCount');
            if (resultsCount) resultsCount.textContent = filtered.length;

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>لا توجد نتائج</h3>
                        <p>لم نتمكن من العثور على مجموعات تطابق بحثك.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(item => {
                const hasLink = item.driveLink && item.driveLink.trim() !== '';

                const card = document.createElement('div');
                card.className = 'collection-card';

                card.innerHTML = `
                    <div class="collection-icon">
                        <i class="${departmentIcons[item.department] || 'fas fa-folder-open'}"></i>
                    </div>
                    <h3 class="collection-title">${departmentNames[item.department] || item.department}</h3>
                    <span class="collection-level">${levelNames[item.level] || item.level}</span>
                    ${hasLink
                        ? `<a class="collection-btn" href="${item.driveLink}" target="_blank" rel="noopener noreferrer">
                               <i class="fab fa-google-drive"></i> فتح المجلد
                           </a>`
                        : `<button class="collection-btn disabled" type="button" disabled>
                               <i class="fas fa-clock"></i> الرابط قريباً
                           </button>`
                    }
                `;

                grid.appendChild(card);
            });
        }

        function updateDepartmentInfo(category) {
            const info = departmentsInfo[category];
            if (!info) return;
            const nameEl = document.getElementById('departmentName');
            const descEl = document.getElementById('departmentDescription');
            if (nameEl) nameEl.textContent = info.name;
            if (descEl) descEl.textContent = info.description;
        }

        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentCategory = card.getAttribute('data-category');
                updateDepartmentInfo(currentCategory);
                displayCollections();
            });
        });

        document.querySelectorAll('.level-dropdown-content a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const dropbtn = document.querySelector('.level-dropbtn span');
                if (dropbtn) dropbtn.textContent = link.textContent;
                currentLevel = link.getAttribute('data-level');
                displayCollections();
            });
        });

        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');

        function performSearch() {
            currentSearchTerm = searchInput.value.trim().toLowerCase();
            displayCollections();
        }

        if (searchButton) searchButton.addEventListener('click', performSearch);
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }

        // أزرار الأقسام (توجيه إلى المكتبة)
        document.querySelectorAll('.card-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.department-card');
                if (!card) return;
                const dept = card.getAttribute('data-department');
                let arabicCategory = '';
                switch(dept) {
                    case 'communications': arabicCategory = 'اتصالات'; break;
                    case 'computer-assembly': arabicCategory = 'تجميع'; break;
                    case 'medical-devices': arabicCategory = 'أجهزة-طبية'; break;
                    default: arabicCategory = dept;
                }
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                const targetCard = document.querySelector(`.category-card[data-category="${arabicCategory}"]`);
                if (targetCard) targetCard.classList.add('active');
                currentCategory = arabicCategory;
                updateDepartmentInfo(arabicCategory);
                displayCollections();
                const libSection = document.querySelector('#library');
                if (libSection) libSection.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // تأثير تمرير شريط التنقل
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.padding = '0.5rem 0';
                    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.padding = '1rem 0';
                    navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }
            }
        });

        // التهيئة النهائية
        displayCollections();
        console.log('تم تهيئة المكتبة بنجاح مع ' + libraryCollections.length + ' مجموعة');

    } catch (error) {
        console.error('حدث خطأ أثناء تهيئة الموقع:', error);
    }
});