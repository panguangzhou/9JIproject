<?php

include 'connect.php';

$username = isset($_GET['username'])?$_GET['username']:null;
$password = isset($_GET['password'])?$_GET['password']:null;
$phone = isset($_GET['phone'])?$_GET['phone']:null;
$email = isset($_GET['email'])?$_GET['email']:null;
// echo "$username";
// echo "$password";
// echo "$phone";
// echo "$email";

$conn->set_charset('utf8');

	$sql = "select * from admin where user='$username'";

	$result = $conn->query($sql);

	if($result->num_rows>0){
		echo 'fail';
	}else{
		$password = md5($password);

		$sql = "insert into admin(user,paw,email,phone) values('$username','$password','$email','$phone')";

		// $sql = 'insert into admin(user,paw,email,phone) values("12323","14124","14144","141414414")';

		$result = $conn->query($sql);

		if($result){
			echo "success";
		}
		else{
			echo "fail";
		}
	}
?>