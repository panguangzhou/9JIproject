<?php

	include 'connect.php';

	$username = isset($_GET['username'])?$_GET['username']:null;
	$password = isset($_GET['password'])?$_GET['password']:null;

	// $password=md5($password);

	$sql = "select * from admin where user='$username' and paw='$password'";

	$ruselt =$conn->query($sql);
	
	if($ruselt->num_rows>0){
		echo "sueecss";
	}else{
		echo "fail";
	}
?>