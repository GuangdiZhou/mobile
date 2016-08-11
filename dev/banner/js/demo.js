function Banner(option){
	var position = option.position,
		option = option.option,
		arrAd,
		arrButton,
		currentIndex = 0,
		previousIndex;
	function createBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list,index){
			var ad = document.createElement("a");
			ad.title = list.name;
			ad.href = list.anchorHref;
			ad.style.backgroundImage = "url(" + list.imageUrl +")";
			fragment.appendChild(ad);
			return ad;
		});
		position.appendChild(fragment);
	}
	function createIndicator(){
		var indicator = document.createElement("div");
		indicator.className = "indicator";
		arrButton = option.map(function(list,index){
			var button = document.createElement("em");
			button.appendChild(document.createTextNode(index + 1));
			indicator.appendChild(button);
			button.addEventListener("touchend",function(){
				previousIndex = currentIndex;
				currentIndex = index;
				setView()
				this.classList.add("current");
			}, 0);
			return button;
		});
		arrButton[0].classList.add("current");
		position.appendChild(indicator);
	}
	function setView(){
		arrAd[previousIndex].classList.remove("current");
		arrAd[previousIndex].classList.add("previous");
		arrAd[currentIndex].classList.remove("previous");
		arrAd[currentIndex].classList.add("current");
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentIndex].classList.remove("current");
	}
	function autoChange(){
		var adLen = option.length;
		setInterval(function(){
			currentIndex = currentIndex < adLen -1 ? currentIndex + 1 : 0;
			previousIndex = currentIndex > 0 ? currentIndex - 1 : adLen - 1;
			setView();
		}, 1000);
	}
	createBanner();
	createIndicator();
	autoChange();
}
var banner = document.querySelector(".banner");
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function(data){
		new Banner({
			position : banner,
			option : data.data
		});
	}
});