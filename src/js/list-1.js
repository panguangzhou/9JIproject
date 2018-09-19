document.addEventListener('DOMContentLoaded',(e) => {
	let statusCode = [200,304];
  let buy = document.querySelector('#collapseTwo');
  	let buybody = buy.children[0];
  	let xhr = new XMLHttpRequest();
  	xhr.onload = function(){
  		if(statusCode.indexOf(xhr.status)>=0){
  			let data = JSON.parse(xhr.responseText);
  			buybody.innerHTML = data.map((item) => {
  				return `
  				<a href="#">
  				<img src="../${item.imgurl}" alt="" />
  				<div calss='flex-child'>
  				<p>${item.title}</p>
  				<span style="color:red;">￥${item.price}</span>
  				</div>
  				</a>
  				`;
  			}).join('');
  		}
  	}
  	xhr.open('get','../api/list-1.php');
  	xhr.send();
});