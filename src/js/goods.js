document.addEventListener('DOMContentLoaded',(e) => {
	  let goodslist = Cookie.get('goodslist');
	  console.log(goodslist);
	  if(goodslist===''){
	  	goodslist=[];
	  }else{
	  	goodslist=JSON.parse(goodslist);
	  }
	  console.log(goodslist);
	  
	  let big = document.querySelector('.bigpic');
	  let small = big.children[0];
	  let img = document.createElement('img');
	  img.src=goodslist.map((item) => {
	  	return item.imgurl;
	  })
	  small.appendChild(img);
});