
(function(){
	$(function(){
	let oLeft = document.querySelector('.lt');
	let aImages = document.querySelectorAll('.box img');
	let oList = document.querySelectorAll('.list li');
	
	let index =0;

	let lastIndex =0;
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
	
	//弹出二维码
	//获取数据库，生成样式
	let statusCode =[200,304];
	let xhr = new XMLHttpRequest();
	xhr.onload=function(){
		if(statusCode.indexOf(xhr.status)>=0){
			let data = JSON.parse(xhr.responseText);
			let ul = document.createElement('ul');
			let shop_list = document.querySelector('.shop-list');
			ul.innerHTML = data.map((item) => {
				return `<li>
					<div class="diy-tip">
						<h3>${item.title}</h3>
						<p>${item.txt}</p>
						<p style="color:rgb(136,78,168);">￥:${item.price}</p>
						<a href="#">
							<img src="${item.imgurl}" alt="" />	
						</a>
					</div>
				</li>`
			}).join('');
			shop_list.appendChild(ul);
		}
	}

	xhr.open('get','api/index.php',true);
	xhr.send();
	rightad();
	//rightad数据
	function rightad(){
	let statusCode =[200,304];
	let xhr = new XMLHttpRequest();
	xhr.onload=function(){
		if(statusCode.indexOf(xhr.status)>=0){
			let data = JSON.parse(xhr.responseText);
			let ul = document.createElement('ul');
			let rightAD = document.querySelector('.rightAD');
			ul.innerHTML = data.map((item) => {
				return `<li>
					<div class="diy-tip">
						<h3>${item.title}</h3>
						<p>${item.txt}</p>
						<a href="#">
							<img src="${item.imgurl}" alt="" />	
						</a>
					</div>
				</li>`
			}).join('');
			rightAD.appendChild(ul);
		}
	}

	xhr.open('get','api/index1.php',true);
	xhr.send();
	}
	moregood();
	//生成更多货物页面
	function moregood (){
		let statusCode = [200,304];
		let xhr = new XMLHttpRequest();
		xhr.onload = function(){
			if(statusCode.indexOf(xhr.status)>=0){
				let data = JSON.parse(xhr.responseText);
				let ul = document.createElement('ul');
				let more_good = document.querySelector('#more_good');
				ul.innerHTML=data.map((item) => {
					return `<li>
						<a href="#">
							<img src="${item.imgrl}" alt="" />
						</a>
						<p>${item.title}</p>
						<span>￥${item.price}</span>
					</li>`
				}).join('');
				more_good.appendChild(ul);
			}
		}
		xhr.open('get',`api/index2.php`);
		xhr.send();
	}

	//鼠标左右点击滑动图片
	let sale_left = document.querySelector('.sale-list');
	let ul = sale_left.children[0];
	let len = ul.children.length;
	let lilen = ul.children[0].clientWidth;
	let max = lilen*len+'px';
	ul.style.width=max;
	//索引值
	let indexs = 0;

	$('.sale-list').on('click',function(e){
		if(e.target.className === 'prev-btn'){
			indexs++;
			show();
		}else if(e.target.className === 'next-btn'){
			indexs--;
			show();
		}
	})
	function show(){
		animate(ul,{left:-indexs * lilen});
	}
})
})();
