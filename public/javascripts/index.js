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
