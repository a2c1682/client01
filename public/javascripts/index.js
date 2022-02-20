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

//program menu
function delayScrollAnime() {
	var time = 0.2;
	var value = time;
	$('.delayScroll').each(function() {
		var parent = this;
		var elemPos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		var childs = $(this).children();

		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {
			$(childs).each(function() {
				if (!$(this).hasClass("fadeUp")) {
					$(parent).addClass("play");
					$(this).css("animation-delay", value + "s");
					$(this).addClass("fadeUp");
					value = value + time;

					var index = $(childs).index(this);
					if ((childs.length-1) == index) {
						$(parent).removeClass("play");
					}
				}
			})
		}
		else {
			$(childs).removeClass("fadeUp");
			value = time;
		}
	})
}

$(window).scroll(function() {
	delayScrollAnime();
});

//波：コンテンツ区切り1
var unit = 100,
	canvasList,
	info = {},
	colorList;

function init() {
	info.seconds = 0;
	info.t = 0;
	canvasList = [];
	colorList = [];

	canvasList.push(document.getElementById("waveCanvas"));
	colorList.push(['#0ff', '#ff0', '#f00', '#00f', '#f0f']);
	canvasList.push(document.getElementById("waveCanvas2"));
	colorList.push(['#43c0e4']);
	canvasList.push(document.getElementById("waveCanvas3"));
	colorList.push(['#666', '#888']);

	for (var canvasIndex in canvasList) {
		var canvas = canvasList[canvasIndex];
		canvas.width = document.documentElement.clientWidth;
		canvas.height = 200;
	
	canvas.contextCache = canvas.getContext("2d");
	}

	update();
}

function update() {
	for (var canvasIndex in canvasList) {
		var canvas = canvasList[canvasIndex];
		draw(canvas, colorList[canvasIndex]);
	}

	info.seconds = info.seconds + .014;
	info.t = info.seconds * Math.PI;
	setTimeout(update, 35);
}

function draw(canvas, color) {
	var context = canvas.contextCache;
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawWave(canvas, color[0], 0.8, 3, 0);
	drawWave(canvas, color[1], 0.5, 4, 0);
	drawWave(canvas, color[2], 0.3, 1.6, 0);
	drawWave(canvas, color[3], 0.2, 3, 100);
	drawWave(canvas, color[4], 0.5, 1.6, 250);
}

function drawWave(canvas, color, alpha, zoom, delay) {
	var context = canvas.contextCache;
	context.strokeStyle = color;
	context.lineWidth = 1;
	context.globalAlpha = alpha;
	context.beginPath();
	drawSine(canvas, info.t / 0.5, zoom, delay);
	context.stroke();
}

function drawSine(canvas, t, zoom, delay) {
	var xAxis = Math.floor(canvas.height / 2);
	var yAxis = 0;
	var context = canvas.contextCache;
	var x = t;
	var y = Math.sin(x) / zoom;
	context.moveTo(yAxis, unit * y + xAxis);
	
	for (i = yAxis; i <= canvas.width + 10; i += 10) {
		x = t + (-yAxis + i) / unit / zoom;
		y = Math.sin(x - delay) / 3;
		context.lineTo(i, unit * y + xAxis);
	}
}

init();

