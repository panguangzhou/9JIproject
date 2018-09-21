$(function(){
	$('#phone').on('click',function(){
		$('.item_phone').removeClass('active');
		$('.item_reg').addClass('active');
		$('erweima').addClass('active');
	});

	$('#common').on('click',function(){
		$('.item_reg').removeClass('active');
		$('.item_phone').addClass('active');
		$('erweima').addClass('active');
	});
	$('.code').on('click',function(){
		$('.erweima').removeClass('active');
		$('.item_reg').addClass('active');
		$('.item_phone').addClass('active');
	});
	$('.erweima_code').on('click',function(){
		$('.erweima').addClass('active');
		$('.item_reg').removeClass('active');
		$('.item_phone').addClass('active');
	});
	let statusCode = [200,304];
	let xhr = new XMLHttpRequest();
	xhr.onload=function(){
		if(statusCode.indexOf(xhr.status)>=0){
			let data = xhr.responseText;
			console.log(data)
			if(data === 'sueecss'){
				location.href='../index.html';
			}else if(data==='fail'){
				alert('没有该用户');
			}
		}
	}
	//用户注册页面
	$('#btn').on('click',function(e){
		if(e.target.parentNode.parentNode.parentNode.className==='item_reg'){
			if($('#username').val()!==''){
				if($('#password').val()!==''){
					let _username = $('#username').val();
					let _passowrd = $('#password').val();
					xhr.open('get',`../api/login.php?username=${_username}&password=${_passowrd}`,true);
					xhr.send();
				}
			}
		}
	})
})