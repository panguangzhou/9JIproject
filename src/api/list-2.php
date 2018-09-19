<?php

require('connect.php');
$sql = "select * from rightad";

    //查询结果集
    $result = $conn->query($sql);

    //获取所有结果集
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    //关闭查询结果集，避免资源浪费
    $result->close();

    //向前端输出数据
    echo json_encode($rows,JSON_UNESCAPED_UNICODE);

    //关闭数据库，避免资源浪费
    $conn->close();
?>