"use strict";document.addEventListener("DOMContentLoaded",function(t){var n=document.querySelector(".youlike"),e=[200,304],i=new XMLHttpRequest;i.onload=function(){if(0<=e.indexOf(i.status)){var t=JSON.parse(i.responseText);n.innerHTML=t.map(function(t){return'\n\t\t\t<a href="#">\n  \t\t\t\t<img src="../'+t.imgurl+'" alt="" />\n  \t\t\t\t<div calss=\'flex-child\'>\n  \t\t\t\t<p>'+t.title+'</p>\n  \t\t\t\t<span style="color:red;">￥'+t.price+"</span>\n  \t\t\t\t</div>\n  \t\t\t\t</a>\n  \t\t\t"}).join("")}},i.open("get","../api/list-3.php"),i.send()});