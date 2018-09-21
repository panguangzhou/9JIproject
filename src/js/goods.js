document.addEventListener('DOMContentLoaded',(e) =>{
    let goodslist = Cookie.get('goodslist');
    if(goodslist===''){
     goodslist=[];
 }else{
     goodslist=JSON.parse(goodslist);
 }

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
