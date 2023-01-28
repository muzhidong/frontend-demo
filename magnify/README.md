# magnify
## 用途
基于html2canvas的实现对网页的放大镜效果。点击窗口出现放大镜，再点击则关闭。随着鼠标移动，放大位置目标内容。

## 使用
- 将html2canvas.min.js和magnify.js引入到目标html文件。示例如下，
```html
<!-- 假设js和html置于同一目录 -->
<script src="html2canvas.min.js"></script>
<script src="magnify.js"></script>
```

## 存在问题
- 仅支持静止网页，无法响应动态网页
- 有些网页报如下错误，

> Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported. 
