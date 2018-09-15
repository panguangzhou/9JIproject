<?php

	$servername ='localhost';
	$username = 'root';
	$password ='';
	$dbname='jiuji';

	$conn = new mysqli($servername,$username,$password,$dbname);

	if($conn->connect_error>0){
		die('连接失败'.$conn->connect_error);
	}	
	$conn->set_charset('utf8');

	$username = isset($_GET['username'])?$_GET['username']:null;
	$password = isset($_GET['password'])?$_GET['password']:null;

	$password=md5($password);

	$sql = "select * from jiuji where admin user='$username' and paw='$password'";

	$ruselt =$conn->query($sql);

	if($ruselt->num_rows>0){
		echo "sueecss";
	}else{
		echo "fail";
	};


?>