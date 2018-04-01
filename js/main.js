var content = `
/* 
 * 面试官你好，我叫赵若妃
 * 我用代码来做个自我介绍
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
    font-size: 14px;
}

/* 给代码加个高亮 */

.token.selector{ 
    color: #690; 
}

.token.property{ 
    color: #905; 
}

/* 加点 3D 效果 */

#code{
    transform: rotate(360deg);
}

/* 加一个呼吸效果 */

#code{
  animation: breath 1s infinite alternate-reverse;
}

/* 我需要一张白纸 */

#code-wrapper{
  width: 50%; 
  height: 100%;
  position: fixed;
  left: 0;  
}

#paper > .content {
  display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var contentPaper = `
/* 
 * 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
    `
var md = `
# 自我介绍
我叫 赵若妃 

1996 年 5 月出生

是个女孩子~

现于长沙理工大学计算机科学与技术专业读大三

应聘前端开发工程师 地区不限

# 项目介绍
1. <a href="https://serendipity96.github.io/resume/index.html" target="_blank">个人网页简历</a>
2. <a href="https://serendipity96.github.io/swiper_seamless/index.html" target="_blank">无缝轮播</a>
3. <a href="https://serendipity96.github.io/CanvasPainting/index.html" target="_blank">Canvas 画板</a>
4. <a href="https://serendipity96.github.io/KeyboardStart/index.html" target="_blank">键盘导航</a>

# 荣誉奖项 
湖南省第13届大学生计算机程序设计竞赛应用开发类一等奖（2017年）

第三届湖南省“互联网+”大学生创新创业大赛初创组银奖（2017年）

连续两年获得校一等奖学金，被评为三好学生（2016-2017）

# 代码 & 博客
<a href="https://github.com/Serendipity96" target="_blank">GitHub</a>

<a href="https://juejin.im/user/5a23edfc5188257bfe45aa84/posts" target="_blank">博客</a>

# 联系方式
QQ:    591075865

Email: justserendipity96@gmail.com

手机:    155-8160-0342


#### 如果你喜欢这样的简历，欢迎 <a href="https://github.com/Serendipity96/dynamicResume" target="_blank">star</a> ,另附<a href="https://juejin.im/post/5abca6f0f265da239f0774b2" target="_blank">教程</a>
`
var contentThanks = `
/*
 * 这就是我的动态简历
 * 谢谢观看
 */
`
writeCode('', content, () => {
    createPaper(() => {
        writeMarkdown(md, () => {
            writeCode(content, contentPaper, () => {
                convertMarkdownToHtml(() => {
                    writeCode(content + contentPaper, contentThanks, () => {
                        console.log('success')
                    })
                })
            })
        })
    })
})

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let timerId = setInterval(() => {
        n++;
        domCode.innerHTML =
            Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css');
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            clearInterval(timerId)
            fn().call()
        }
    }, 30)
}


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let timerId = setInterval(() => {
        n++;
        if (markdown[n] === '<') {
            for (n; markdown[n] !== '>'; n++) {
            }
        }
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            clearInterval(timerId)
            fn().call()
        }
    }, 25)
}

function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn.call()
}