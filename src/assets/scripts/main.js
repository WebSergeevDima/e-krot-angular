window.onload = function() {

  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('scroll-up_show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('scroll-up_show');
    }
  }

  function backToTop() {

    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  let goTopBtn = document.querySelector('[data-btn="scroll"]');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
};
