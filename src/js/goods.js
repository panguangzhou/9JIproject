$(function(){
	let goodslist = Cookie.get('goodslist');

   var objdemo = document.getElementById('demo');
   var objSmallBox = document.getElementById('small-box');
   var objFloatBox = document.getElementById('float-box');
   console.log(objFloatBox);
   var bigBox = document.getElementById('big-box');
   if(goodslist===''){
       goodslist=[];
   }else{
       goodslist=JSON.parse(goodslist);
   }
 objSmallBox.innerHTML=goodslist.map((item) => {
    return `<img src="${item.imgurl}">`;
 })
 bigBox.innerHTML=goodslist.map((item) => {
    return `<img src="${item.imgurl}">`;
 });
var bigImg = bigBox.getElementsByTagName('img')[0];

	  // 放大镜

            // 鼠标进入时显示放大镜和大图片
            objSmallBox.onmouseover = function(){
            	objFloatBox.style.display = 'block';
            	bigBox.style.display = 'block';
            }
            // 鼠标移出时隐藏放大镜和大图片
            objSmallBox.onmouseout = function(){
            	objFloatBox.style.display = 'none';
            	bigBox.style.display ='none';
            }
            //鼠标在小图片移动时
            objSmallBox.onmousemove = function(e){
            	var evt = e || window.event
                //计算放大镜和小图片的位置
                let left = evt.clientX-objdemo.clientLeft-objFloatBox.offsetWidth/2;
                let top  = evt.clientY-objdemo.clientTop-objFloatBox.offsetWidth/2;
                console.log(left)
                console.log(top)
                //判断边界
                if(left <0){
                	left = 0;
                }else if(left>(objSmallBox.offsetWidth- objFloatBox.offsetWidth)){
                	left = objSmallBox.offsetWidth - objFloatBox.offsetWidth;
                }

                if(top < 0){
                	top = 0;
                }else if(top >(objSmallBox.offsetHeight - objFloatBox.offsetHeight)){
                	top = objSmallBox.offsetHeight - objFloatBox.offsetHeight;
                }
                objFloatBox.style.left = left + 'px';
                objFloatBox.style.top = top + 'px';

                //公式  X/(B-A) = Y/(D-C)
                var prantX = left /(objSmallBox.offsetWidth- objFloatBox.offsetWidth);
                var prantY = top / (objSmallBox.offsetHeight - objFloatBox.offsetHeight);

                //大图片与小图片的位置相反
                bigImg.style.left = - prantX * (bigImg.offsetWidth - bigBox.offsetWidth) + 'px';
                bigImg.style.top = - prantY * (bigImg.offsetHeight - bigBox.offsetHeight) + 'px';
            }



        //放大镜下方的滑动图
        let list = document.querySelector('.shopinglist');
        let ullist = list.children[0];
        
        let ullen = ullist.children.length;
        let liw = ullist.children[0];

        ullist.style.width=liw.offsetWidth*ullen+'px';

        //商品id
        let pad = document.querySelector('.padding-bottom');
        let sp = pad.children[0];
        sp.innerHTML = goodslist.map((item) => {
            return '商品编号'+item.guid;
        });
        //商品名称
        let shangpinmingcheng = document.querySelector('.shangpinmingcheng');
        shangpinmingcheng.innerHTML = goodslist.map((item) => {
            return item.title;
        })

        //减价信息
        let discount = document.querySelector('.discount');
        discount.innerHTML=goodslist.map((item) => {
            return item.discount;
        })
        //价格
        let price = document.querySelector('.price');
        let price_span = price.children[0];
        price_span.innerHTML = goodslist.map((item) => {
            return item.price;
        })

        //配件区域
        let pj_img = document.querySelector('.pj_img');
        pj_img.innerHTML= goodslist.map((item) => {
            return `<img src="${item.imgurl}">`;
        })

        //配件区域tab标签切换
        let news_right = document.querySelector('.news-right');
        let nwesul = news_right.children[0];
        let newsli = nwesul.children;
        let bgcolor = news_right.children[1].children;
        for(let i=0;i<newsli.length;i++){
            if(i===0){
                newsli[i].className='active';
            }else{
                bgcolor[i].style.display='none';
            }
            newsli[i].setAttribute('idx',i);

                // 点击切换
                newsli[i].onclick = function(){
                    // 获取点击的索引值
                    var idx = this.getAttribute('idx');

                    for(var i=0;i<newsli.length;i++){
                        if(i == idx){
                            // 高亮当前tab
                            newsli[i].className = 'active';

                            // 显示当前图片
                            bgcolor[i].style.display = 'block';
                        }else{
                            // 隐藏其他高亮
                            newsli[i].className = '';
                            
                            // 先隐藏其他图片
                            bgcolor[i].style.display = 'none';
                        }
                    }


                }
            }

        });
