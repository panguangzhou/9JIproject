<?php

	$servername ='localhost';
	$username = 'root';
	$password ='';
	$dbname='jiuji';

	$conn = new mysqli($servername,$username,$password,$dbname);
	if($conn->connect_error){
		die('连接失败'.$conn->connect_error);
	};

	$user = isset($_GET['username'])?$_GET['username']:null;
	$paw = isset($_GET['password'])?$_GET['password']:null;
	$phone = isset($_GET['phone'])?$_GET['phone']:null;
	$email = isset($_GET['email'])?$_GET['email']:null;
	$conn->set_charset('utf8');

	if($user&&$paw){

		$sql = "select * from admin where user='$user'";

		$result = $conn->query($sql);
 		while ($row = mysqli_fetch_assoc($result))
  		{
    		echo "question_title : {$row['xxx']} <br>";
  		}

		if($result->num_rows>0){
			echo 'fail';
		}else{
			$password = md5($password);

			$sql = "insert into admin (user,paw,phonenum,email) values ('$user','$paw','$phone','$email')";
			$result = $conn->query($sql);

			if($result){
				echo "success";
			}else{
				echo "fail";
			}
		}
	}else{
		echo "无法获取用户名或密码";
	}
?>