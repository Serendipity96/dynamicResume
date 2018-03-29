var content = `
/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
    transition: all 1s;
}
body{
    background:#eee;
}
#code{
    border:1px solid red;
    padding:16px;
}
/* 给代码加个高亮吧 */
.token.selector{ 
    color: #690; 
}
.token.property{ 
    color: #905; 
}
`

var n = 0
var timerId = setInterval(() => {
    n++;
    code.innerHTML = content.slice(0, n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css');
    if (n >= content.length) {
        styleTag.innerText = content
        clearInterval(timerId)
    }
}, 10)