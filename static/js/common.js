function boxheight() {
	//函数：获取尺寸
	//获取浏览器窗口高度
	var winHeight = 0;
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;

	//通过Document对body进行检测，获取浏览器可视化高度
	if (document.documentElement && document.documentElement.clientHeight)
		winHeight = document.documentElement.clientHeight;


	//DIV高度为浏览器窗口高度
	var topH = document.getElementsByClassName("aside-logo")[0].offsetHeight;
	document.getElementById("Odiv").style.height = winHeight + "px";
	document.getElementById("Adiv").style.height = (winHeight-topH) + "px";
    document.getElementById("contentDiv").style.height = (winHeight-topH) + "px";
	// document.getElementById("aside-menu").style.height = (winHeight-topH-70)+ "px";
    document.getElementById("aside-menu").style.height = (winHeight-topH)+ "px";

    /*var oTabel = document.getElementsByClassName("pre-scrollable")[0];
	var len = document.getElementsByClassName("newRow").length;
	oTabel.style.maxHeight = (winHeight*600/789 - 100-30*len)+'px';

    if (oTabel.offsetHeight < (winHeight*600/789 - 100-30*len)) {
        oTabel.style.overflowY = 'auto';
    }*/



	var aWraper = document.getElementsByClassName("wraper");
	var len = aWraper.length;
	for (var i=0;i<len;i++){
		aWraper[i].style.height = winHeight*590/767 + "px";
	}
}

function setClick() {
	$(document).ready(function() {

		// $(this).addClass("li-active")

		var menuArray = $("#aside-menu>li")


		$(menuArray[0]).on("click", function() {
			$(this).addClass("li-active")
		})


		function clearClass() {
			$("#aside-menu .li-active").find("i.fa-table").removeClass("fa-circle");
			$("#aside-menu .li-active").removeClass("li-active")
		}
		for (var i = 0; i < menuArray.length; i++) {
			$(menuArray[i]).on("click", function() {
				console.log(2)
				clearClass()
				$(this).addClass("li-active")
				$(this).find("i.fa-table").addClass("fa-circle");
			})
		}

	})
}



exports.init = function() {

	$(function() {
		boxheight(); //执行函数
		window.onresize = boxheight; //窗口或框架被调整大小时执行
	});
	//setClick();
}
