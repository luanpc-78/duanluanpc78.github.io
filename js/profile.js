// profile.js
function initCardListSwiper() {
  if (window.Swiper && document.querySelector('.card-wrapper')) {
    new Swiper('.card-wrapper', {
      loop: true,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

// Gọi hàm này khi load profile section
function initProfileSlider() {
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.querySelector('.prev-slide');
  const btnNext = document.querySelector('.next-slide');

  if (!slidesContainer || slides.length === 0 || !btnPrev || !btnNext) {
    // Vẫn khởi tạo swiper cho card-list nếu có
    initCardListSwiper();
    return;
  }

  let currentIndex = 0;
  let isTransitioning = false;

  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(firstSlide);
  slidesContainer.insertBefore(lastSlide, slides[0]);

  function updateSlide(transition = true) {
    slidesContainer.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
    slidesContainer.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSlide();
    if (currentIndex >= slides.length) {
      setTimeout(() => {
        currentIndex = 0;
        updateSlide(false);
      }, 500);
    }
    setTimeout(() => isTransitioning = false, 500);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSlide();
    if (currentIndex < 0) {
      setTimeout(() => {
        currentIndex = slides.length - 1;
        updateSlide(false);
      }, 500);
    }
    setTimeout(() => isTransitioning = false, 500);
  }

  let autoSlide = setInterval(nextSlide, 4000);
  slidesContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slidesContainer.addEventListener('mouseleave', () => autoSlide = setInterval(nextSlide, 4000));

  btnNext.addEventListener('click', () => { clearInterval(autoSlide); nextSlide(); });
  btnPrev.addEventListener('click', () => { clearInterval(autoSlide); prevSlide(); });

  updateSlide(false);
  // Sau khi xử lý slider cũ, khởi tạo swiper cho card-list
  initCardListSwiper();
}

export { initProfileSlider };
