window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // 1. 내비게이션 바 (모바일 햄버거 메뉴) 처리
    $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    // 2. 캐러셀 옵션 설정
    var options = {
          slidesToScroll: 1,
          slidesToShow: 1, // HTML 구조에 맞게 1로 수정하는 것이 좋습니다 (기존 3)
          loop: true,
          infinite: true,
          autoplay: false, // 자동 재생 끄기
          autoplaySpeed: 3000,
    }

    // 3. 캐러셀 초기화 (bulmaCarousel)
    var carousels = bulmaCarousel.attach('.carousel', options);

    // 캐러셀 이벤트 리스너 (필요 없으면 지워도 되지만, 에러 방지용으로 유지)
    for(var i = 0; i < carousels.length; i++) {
        carousels[i].on('before:show', state => {
           console.log(state);
        });
    }

    // 특정 요소에 대한 리스너 (템플릿 기본 코드, 유지해도 무관)
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
        element.bulmaCarousel.on('before-show', function(state) {
           console.log(state);
        });
    }

    // 4. 슬라이더 초기화 (bulmaSlider) - 필요 없다면 지워도 됨
    bulmaSlider.attach();
});