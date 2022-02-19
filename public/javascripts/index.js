//SVGの初期設定
var logoVivus1;

//#logoのSVG初期設定
function VivusInit() {
	logoVivus1 = new Vivus('logo', 
		{
			start: 'autostart',
			duration: 100,
			type: 'scenario',
			pathTimingFunction: Vivus.EASE,
		},
		function(obj) {
			$("#logo").attr("class", "done");
		}
	);
	logoVivus1.stop();
}

//スクロールで#logoのSVGが出現する設定
function VivusAnime() {
	var elemPos = $("#logo").offset().top-50;
	var scroll = $(window).scrollTop();
	var windowHeight = $(window).height();
	if (scroll >= elemPos - windowHeight) {
		logoVivus1.play(1);
	}
}

$(window).on('load', function() {
	VivusInit();
	VivusAnime();
});

//ハンバーガーメニュー
$(".openbtn").click(function() {
	$(this).toggleClass('active');
});

//スクロール時の関数
function PageTopCheck() {
	var winScrollTop = $(this).scrollTop();
	var secondTop = $("#area").offset().top - 150;
	if (winScrollTop >= secondTop) {
		$('.js-scroll').removeClass('scroll-view');
		$('.js-pagetop').addClass('scroll-view');
	}
	else {
		$('.js-scroll').addClass('scroll-view');
		$('.js-pagetop').removeClass('scroll-view');
	}
}

$('.scroll-top a').click(function() {
	var elmHash = $(this).attr('href');
	if (elmHash == "#area") {
		var pos = $(elmHash).offset().top;
		$('body,html').animate({scrollTop: pos}, pos);
	}
	else {
		$('body,html').animate({scrollTop: 0}, 500);
	}

	return false;
});

$(window).scroll(function() {
	PageTopCheck();
});
