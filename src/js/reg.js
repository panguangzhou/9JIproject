$(function(){
	//生成随机验证码
	let code =randomCode(4);
	$('.yanzhengCode').text(code);

	// 获取页面数据
	var _username = $('#username').val();
	var txt = $('#password').val();
	var num = $('#number').val();
	var _num = $('#email').val();

	$('.quick').on('click',function(){
		$('.registration').addClass('status');
		$('.quick').removeClass('status');
		$('.regtip').removeClass('active');
		$('.accoune').addClass('active');
	});
	$('.registration').on('click',function(){
		$('.registration').removeClass('status');
		$('.quick').addClass('status');
		$('.regtip').addClass('active');
		$('.accoune').removeClass('active');
	});
	//用户注册
	let statusCode = [200,304];
	let xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(statusCode.indexOf(xhr.status)>=0){
			let data = xhr.responseText;
			if(data === 'fail'){
				$('#username').next().text('名字已经被注册');
			}else{
				location.href='../html/login.html';
			}
		}
	}
	//判断用户名的格式和是否已存在
	$('#username').on('keyup',function(){
		var _username = $('#username').val();
		let reg = /[\w\d]{4,16}/ig;
		$(this).next().text('');
		if(!reg.test(_username)){
			$(this).next().removeClass('glyphicon glyphicon-ok');
			$(this).next().addClass('glyphicon glyphicon-remove');
			$(this).next().text('名字格式不对');
			return false;
		}else{
			$(this).next().removeClass('glyphicon glyphicon-remove')
			$(this).next().addClass('glyphicon glyphicon-ok');
		}
	});
	//输入密码格式
	$('#password').on('keyup',function(){
		let txt = $(this).val();
		let reg = /[\S]{6,12}/ig;
		$(this).next().text('');
		if(!reg.test(txt)){
			$(this).next().removeClass('glyphicon glyphicon-ok')
			$(this).next().addClass('glyphicon glyphicon-remove')
		}else{
			$(this).next().removeClass('glyphicon glyphicon-remove');
			$(this).next().addClass('glyphicon glyphicon-ok');
		}
	});
	//验证两次输入的密码
	$('#confirm').on('keyup',function(){
		let paw = $('#password').val();
		let pawfirm = $(this).val();
		$(this).next().text('');
		if(paw !== pawfirm){
			$(this).next().removeClass('glyphicon glyphicon-ok');
			$(this).next().addClass('glyphicon glyphicon-remove');
			$(this).next().text('两次输入的密码不正确');
			return false;
		}else{
			$(this).next().removeClass('glyphicon glyphicon-remove');
			$(this).next().addClass('glyphicon glyphicon-ok');
		}
	});
	//判断手机输入格式是否正确
	$('#number').on('keyup',function(){
		let num = $(this).val();
		let reg = /^1[34578]\d{9}$/;
		$(this).next().text('');
		if(!reg.test(num)){
			$(this).next().removeClass('glyphicon glyphicon-ok')
			$(this).next().addClass('glyphicon glyphicon-remove');
			$(this).next().text('手机格式不正确');
			return false;
		}else{
			$(this).next().removeClass('glyphicon glyphicon-remove');
			$(this).next().addClass('glyphicon glyphicon-ok');
		}
	});
	//验证邮箱地址
	$('#email').on('keyup',function(){
		let _num = $(this).val();
		let reg = /^[a-z\d][\w\-\.]{2,15}@[a-z\d][a-z\d\-\.]{1,66}(\.[\u2E80-\u9FFFa-z]{2,6}){1,2}$/;
		$(this).next().text('');
		if(!reg.test(_num)){
			$(this).next().removeClass('glyphicon glyphicon-ok')
			$(this).next().addClass('glyphicon glyphicon-remove');
			$(this).next().text('邮箱格式不正确');
			return false;
		}else{
			$(this).next().removeClass('glyphicon glyphicon-remove');
			$(this).next().addClass('glyphicon glyphicon-ok');
		}
	});
	//验证吗
	$('#code').on('keyup',function(){
		let num = $(this).val();
		if(num !== code){
			return false;
		}
	});
	//点击注册
	$('#register_common').on('click',function(){
		let paw = $('#password').val();
		if($('#check').prop('checked')){
			var _username = $('#username').val();
			var txt = $('#password').val();
			var num = $('#number').val();
			var _num = $('#email').val();
			xhr.open('get',`../api/reg.php?username=${_username}&password=${txt}
				&phone=${num}&email=${_num}`,true);
			xhr.send();
		}
	})
})