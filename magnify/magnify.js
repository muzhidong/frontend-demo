(function(window,document){
    
    var show   =  false;
    var scrolling = false;

    var scrollTop = 0;
    var scrollLeft = 0;
    var currentScrollTop = 0;
    var currentScrollLeft =0;
    
    var root;
    var image;
    var mirror;
    var context;

    window.addEventListener("load",function(){

      root = document.body;  

      //1.生成网页图片
      html2canvas(root.parentNode,{"scale":2}).then(function(canvas) {     
        image = new Image();
        image.src = canvas.toDataURL("image/png");
        image.addEventListener("load",function(){
           //4.添加监听事件 
           // 放大镜点击事件监听
           mirror.addEventListener("click",function(event){
              var e = event||window.event;
              e.stopPropagation();
              if(show){
                mirror.style.display = "none";
                show = !show; 
              } 
            },false);
           // 页面点击事件监听
           document.addEventListener("click",function(event){
            if(!show){
              mirror.style.display = "block";
              show = !show;
              var e = event||window.event;
              mirror.style.left = parseInt(e.clientX - mirror.offsetWidth/2 +  document.documentElement.scrollLeft)+"px";
              mirror.style.top = parseInt(e.clientY - mirror.offsetHeight/2 +  document.documentElement.scrollTop) +"px";
              enlarge(e);
            }   
          },false);
          //鼠标事件监听
          document.addEventListener("mousemove",function(event){
            if(show&&!scrolling){
              var e = event||window.event;
              mirror.style.left = parseInt(e.clientX - mirror.offsetWidth/2 +  document.documentElement.scrollLeft)+"px";
              mirror.style.top = parseInt(e.clientY - mirror.offsetHeight/2 +  document.documentElement.scrollTop) +"px";      
              //放大
              enlarge(e);
            }   
          },false);
          // 滚动监听
          document.addEventListener("scroll",function(){
            if(show){
              scrolling = true;
              //消抖
              setTimeout(function(){
                  currentScrollTop = document.documentElement.scrollTop;
                  currentScrollLeft = document.documentElement.scrollLeft;
                  mirror.style.top = parseInt(mirror.offsetTop + currentScrollTop - scrollTop)+"px";
                  mirror.style.left = parseInt(mirror.offsetLeft + currentScrollLeft - scrollLeft)+"px";
                  scrollTop =  currentScrollTop;
                  scrollLeft =  currentScrollLeft;
                  scrolling = false;
              },30);      
            }
          },false);
        });
      });

       //2.添加放大镜元素并默认隐藏
      mirror =  document.createElement("div");
      mirror.style.position = "absolute";
      mirror.style.top= 0;
      mirror.style.left =0;
      mirror.style.width = "180px";
      mirror.style.height = "180px";
      mirror.style.border = "4px solid #fff";
      mirror.style.borderRadius =  "90px";
      mirror.style.zIndex = 999;
      mirror.style.cursor = "none";
      mirror.style.display = "none";  
      root.appendChild(mirror);
     
      //3.添加画布元素并创建上下文对象
      var canvas =  document.createElement("canvas"); 
      canvas.setAttribute("width","180");
      canvas.setAttribute("height","180");
      mirror.appendChild(canvas);
      context = canvas.getContext("2d");     

    });   

  
    function enlarge(event){
      //获取鼠标在原图片上的x和y的位置
      var x = event.clientX + document.documentElement.scrollLeft;
      var y = event.clientY + document.documentElement.scrollTop;
      //计算获取对应的放大图片上的x和y的位置
      var newx = 2*x;
      var newy = 2*y;
      //3.通过画布以圆形状截取放大图片上的相应位置
      //保存状态
      context.save();
      //重置画布
      // canvas.width =canvas.width;
      context.clearRect(0, 0, mirror.clientWidth, mirror.clientHeight); 
      //画圆
      context.translate(mirror.clientWidth/2,mirror.clientHeight/2);  
      context.arc(0,0,mirror.clientWidth/2,0,Math.PI*2,true);
      context.clip();//要使该函数有效，后面的绘制必须在同一状态期间，即在同一save和restore范围内
      context.fillStyle ="#FFF";//使用填充的方式，而不能使用轮廓的方式
      context.fill();
      //画图
      context.translate(-mirror.clientWidth/2,-mirror.clientHeight/2);
      context.drawImage(image,newx-mirror.clientWidth/2,newy-mirror.clientHeight/2,
            mirror.clientWidth,mirror.clientHeight,0,0,mirror.clientWidth,mirror.clientHeight);
      //恢复状态
      context.restore();            
    }   
})(window,document);