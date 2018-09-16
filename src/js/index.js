$(function(){
	let oLeft = document.querySelector('.lt');
	let aImages = document.querySelectorAll('.box img');
	let oList = document.querySelectorAll('.list li');
	
	index =0;

	lastIndex =0;
	//自动轮播
	auto();

	function auto(){
		setInterval(rightBtn,2000);
	}
	//右点击
	$('.gt').on('click',rightBtn);

	function rightBtn(){
		change(function(){
			index++;
			index %= aImages.length;
		});
	}
	//左点击
	oLeft.onclick =function(){
		change(function(){
			index--;
			if(index<0){
			index = aImages.length-1;
			}
		});
	};
	//点击小圆点事件
	for(let i=0;i<oList.length;i++){
		oList[i].index=i;
		oList[i].onclick=function(){
			let This = this.index;
			change(function(){
				index=This;
			});
		}
	}

	//封装函数
	function change(callback){
		aImages[lastIndex].className='';
		oList[lastIndex].className='';
		callback();
		aImages[index].className='on';
		oList[index].className='on';
		lastIndex=index;
	}
})