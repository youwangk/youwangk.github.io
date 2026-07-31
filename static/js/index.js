window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Mobile hamburger nav
    $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
          slidesToScroll: 1,
          slidesToShow: 1,
          loop: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 3000,
    }

    bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();
});