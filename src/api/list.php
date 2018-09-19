<?php

    //引入连接数据库
    require('connect.php');

    //分页与数量
    $page = isset($_GET['page'])?$_GET['page']:1;
    $qty = isset($_GET['qty'])?$_GET['qty']:8;
    $sort =isset($_GET['sort'])?$_GET['sort']:null;
    $desc = isset($_GET['desc'])?true:false;
     	//数据生成页面
    $sql = "select * from sheet1";

    if($sort){
        $sql .=" order by $sort*1";

        //降序
        if($desc){
            $sql .=" desc";
        }
    }

    //查询结果集
    $result = $conn->query($sql);

    //获取所有结果集
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    $res = array(
        'total' => count($rows),
        'pageNo' => $page*1,
        'qty' => $qty*1,
        'data' => array_slice($rows, ($page-1)*$qty,$qty)
    );

    //关闭查询结果集，避免资源浪费
    $result->close();

    //向前端输出数据
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    //关闭数据库，避免资源浪费
    $conn->close();

?>