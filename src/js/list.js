document.addEventListener('DOMContentLoaded',(e) => {
	let statusCode = [200,304];
	let list = document.querySelector('.list');
	let page = document.querySelector('#page');
	let sort = document.querySelector('.sort-bar');
		//初始化商品界面
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			if(statusCode.indexOf(xhr.status)>=0){
				let data = JSON.parse(xhr.responseText);
				console.log(data);
					 			//分页数量
					 			let len = Math.ceil(data.total/data.qty);
					 			page.innerHTML='';
					 			for(let i=0;i<len;i++){
					 				let span = document.createElement('span');
					 				span.innerText = i+1;
					 				if(i===data.pageNo-1){
					 					span.className='active';
					 				}
					 				page.appendChild(span);
					 			}
					 			let ul = document.createElement('ul');
					 			ul.innerHTML = data.data.map((item) => {
					 				return `
					 				<li data-guid="${item.goodid}">
					 				<a href="goods.html" calss='big'><img src="${item.imgurl1}" 
					 				style="width:190px;height:190px;"></a>
					 				<div calss="sku-color">
					 				<a href="#"><img src="${item.imgurl2}"style="width:50px;
					 				height:50px;"></a>
					 				</div>
					 				<span>${item.title}</span>
					 				<b>￥${item.price}</b>
					 				<p>已有${item.evalute}人评价</p>
					 				<s>该商品可以分${item.fenqi}期</s>
					 				</li>
					 				`;
					 			}).join('');
					 			list.innerHTML='';
					 			list.appendChild(ul);
					 		}
					 	}
					 	xhr.open('get',`../api/list.php?page=1&qty=8`);
					 	xhr.send();
	//点击切换页面
	page.onclick = e=>{
		if(e.target.tagName.toLowerCase() === 'span');
		let pageNo = e.target.innerText;
		xhr.open('get',`../api/list.php?page=${pageNo}&qty=8`);
		xhr.send();
	}

	//排序
	let desc = false;
	sort.onclick=e=>{
		if(e.target.parentNode.id==='zonghe'){
			desc=!desc;
			xhr.open('get','../api/list.php?sort=hot' + (desc?'&desc':''));
			xhr.send();
		}
		if(e.target.parentNode.id==='price'){
			desc=!desc;
			xhr.open('get','../api/list.php?sort=price' + (desc?'&desc':''));
			xhr.send();
		}
		if(e.target.parentNode.id==='newgoods'){
			desc=!desc;
			xhr.open('get','../api/list.php?sort=evalute' + (desc?'&desc':''));
			xhr.send();
		}
	}

	//cookie存储
	list.onclick =function(e){
		let goodslist = Cookie.get('goodslist');//[{},{}], ''

		if(goodslist === ''){
			goodslist = [];
		}else{
			goodslist = JSON.parse(goodslist);
		}

		//判断点击li,获取信息存入对象
		if(e.target.parentNode.parentNode.tagName==='LI'){
			let currentLi = e.target.parentNode.parentNode;
			let guid = currentLi.getAttribute('data-guid');
			let goodslist = [];
			let obj ={
				guid:guid,
				price:currentLi.children[3].innerText,
				title:currentLi.children[2].innerText,
				imgurl:currentLi.children[0].children[0].src,
				pingjia:currentLi.children[4].innerText,
				discount:"官网直降200元"
			};
			goodslist.push(obj);
			console.log(goodslist);
			Cookie.set('goodslist',JSON.stringify(goodslist));
		}
	}
});