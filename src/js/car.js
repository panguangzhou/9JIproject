$(function(){
	let goodslist = Cookie.get('goodslist');
	if(goodslist===''){
		goodslist=[];
	}else{
		goodslist=JSON.parse(goodslist);
	}
		//根据数据生成页面
		let ul =document.querySelector('.cart-buy');
		let li = document.createElement('li');
		li.innerHTML =goodslist.map((item) => {
			return `
			<p class="good_check"><input type="checkbox" name="good" id="" value=""/></p>
			<p class="good_img"><img src="${item.imgurl}" alt="" style="width:40px;height: 40px;"/></p>
			<p class="good_name">${item.title}</p>
			<p class="good_price">${item.price}</p>
			<p class="num">
			<span class="cutnum">-</span>
			<input class="nownum" type="text" value="1" />
			<span class="addnum">+</span>
			</p>
			<p class="good_total">${item.price}</p>
			<p class="good_del">
			<a href="javascript:;">删除</a>
			</p>
			`;
		}).join('');
		ul.appendChild(li);
		//请求数据
		let statusCode =[200,304];
		let xhr =new XMLHttpRequest();
		xhr.onload = function(){
			if(statusCode.indexOf(xhr.status)>=0){
				let data = JSON.parse(xhr.responseText);
						//news生成喜欢的商品
						let news = document.querySelector('.news');
						news.innerHTML = data.map((item) => {
							return `<a href="javascript:;">
							<img src="../${item.imgurl}" />
							<p>${item.title}</p>
							<span>${item.price}</span>
							</>`;
						}).join('');
					}
				}
				xhr.open('get','../api/list-2.php');
				xhr.send();


		//添加
		$('.cart-buy').on('click','.addnum',function(){
			let val = $(this).prev().val();
			val++;
			if(val===100){
				val=100;
			};
			$(this).prev().val(val);
			total($(this));
			let arr =checkNum()
			allPrice(arr);
			allnum(arr);
		});
		//删除
		$('.cart-buy').on('click','.cutnum',function(){
			let val = $(this).next().val();
			val--;
			if(val<1){
				val=1;
			}
			$(this).next().val(val);
			total($(this));
			let arr =checkNum()
			allPrice(arr);
			allnum(arr)
		});

		//点击单个删除按钮
		$('.cart-buy').on('click','.good_del',function(){
			$(this).parent().remove();
			if($('.good_del').size()===0){
				$('#del').remove();
			}
			let arr =checkNum()
			allPrice(arr);
			allnum(arr)
		});

		//全选按钮
		let isChecked = true
		$('#allchecked').on('click',function(){
			if(isChecked){
				$('#allchecked input').prop('checked','checked');
				$('.good_check input').prop('checked','checked');
			}else{
				$('#allchecked input').removeAttr('checked');
				$('.good_check input').removeAttr('checked');
			}
			isChecked=!isChecked;
			checkNum();
			let arr =checkNum()
			allPrice(arr);
			allnum(arr)
		})

		//全部删除按钮
		$('#delall').on('click',function(){
			let arr = checkNum();
			for(let i=arr.length;i>=0;i--){
				$('.good_check').eq(arr[i]).parent().remove();
			}
			if($('.good_del').size()===0){
				$('#del').remove();
			}
		});
		//全选补全
		$('.cart-buy').on('click','.good_check',function(){
			let arr = checkNum();
			if(arr.length===$('.good_check input').size()){
				$('#allchecked input').prop('checked','checked');
			}else{
				$('#allchecked input').removeAttr('checked');
			}
			allnum(arr);
			allPrice(arr);
		})

		//封装小计
		function total(now){
			let price = now.parent().prev().text();
			price=$.trim(price);
			price=price.substring(2);
			let val = now.parent().find('.nownum').val();
			let total = val*parseInt(price);
			now.parent().next().html('￥&nbsp;'+total.toFixed(2));
		};

		//封装选中的数量
		function checkNum(){
			let arr =[];
			let num=$('.good_check input').size();
			for(let i=0;i<num;i++){
				if($('.good_check input').eq(i).prop('checked')){
					arr.push(i);
				}
			}
			return arr;
		}

	//封装商品数量
	function allnum(arr){
		let num =0;
		for(let i=0;i<arr.length;i++){
			num+=parseInt($('.nownum').eq(arr[i]).val());
		}
		$('#allnum').html('已选'+num+'件商品');
	}
		//总价
		function allPrice(arr){
			let price = 0;
			for(let i =0;i<arr.length;i++){
				let txt = $('.good_total').eq(arr[i]).text();
				txt =$.trim(txt);
				txt = txt.substring(2);
				price+=parseInt(txt);
			}
			$('#numprice').html('总计（不含运费）：￥'+price.toFixed(2));
		}
	});