// // // 返回数组的最小值及最小值的下标
function arrMin(arr) {
	var min = arr[0];
	var index = 0;
	for(var i = 1, len = arr.length; i < len; i++) {
		if(min > arr[i]) {
			min = arr[i];
			index = i;
		}
	}
	return {
		value: min,
		index: index
	}
}
// // // 获取元素到左上角的距离
function getPos(obj) {
	console.log(6)
	var pos = { left: 0, top: 0 };
	while(obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
		console.log(obj)
	}
	return pos;
}
window.onload = function() {
    var data = []
    for (var i = 1; i <= 24; i++) {
        data.push('./img1/' + i + '.jpg')
	}
	var oBox = document.getElementById("box")
	
	var clientHeight = document.documentElement.clientHeight;//网页可见区域高度
	
    fun()
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		// var aImgBox = getElementsByClassName(oBox, "imgBox")
		var aImgBox= document.querySelectorAll('.imgBox')
		var lastImgTop = getPos(aImgBox[aImgBox.length - 1]).top;
        if (lastImgTop < scrollTop + clientHeight) {
            for (var i = 1; i < data.length; i++) {
                var oDiv = document.createElement("oBox")
                oDiv.className = "imgBox"
                oDiv.innerHTML = '<div><img src="./img1/' + i + '.jpg"></div>'
                oBox.appendChild(oDiv)
            }
            fun()
        }
    }

    function fun() {
		var winWidth = document.documentElement.clientWidth; // 浏览器宽
		var aImgBox= document.querySelectorAll('.imgBox')
		// var aImgBox = getElementsByClassName(oBox, 'imgBox'); // 所有的图片元素
		var imgWidth = aImgBox[0].offsetWidth; // 单个元素宽
		
		var num = Math.floor(winWidth / imgWidth); // 能放几列
		
        var arrHeight = [];
        oBox.style.width = num * imgWidth + 'px'; // 大盒子的宽度

        for (var i = 0, len = aImgBox.length; i < len; i++) {
			var oImg = aImgBox[i]; // 当前这个元素
			// console.log(oImg)//每一个
			
            var imgHeight = oImg.offsetHeight; // 当前这个元素的高
            if (i < num) {
                // 即第一排时
				arrHeight.push(imgHeight);
            } else {
                // 第二排及以后
                // 返回arrHeight这个数组的最小值及下标，value为最小值，index为下标
				var minObj = arrMin(arrHeight)
				console.log(minObj)
                oImg.style.position = 'absolute'
                oImg.style.left = minObj.index * imgWidth + "px"
                oImg.style.top = minObj.value + "px"
                arrHeight[minObj.index] += imgHeight
            }
        }
    }
}