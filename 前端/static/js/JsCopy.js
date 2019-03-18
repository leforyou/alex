//来源：https://blog.csdn.net/u010200033/article/details/81381384
const JsCopy = {
    //原生js复制内容到复制板
    makeCopy(txt) {
        const input = document.createElement('input');
        //防止ios点击复制时屏幕下方会出现白屏抖动，仔细看是拉起键盘又瞬间收起
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', txt)
        document.body.appendChild(input);
        let sysMsg = this.getOs();
        console.log(sysMsg, '检测版本信息')
            //input.select() 在ios下并没有选中全部内容，使用以下来选中内容
        if (sysMsg == 'ios') {
            //ios复制
            let obj = this.iosCopy(txt);
            this.destoryNode(obj.html, obj.style)
                //input.setSelectionRange(0,input.value.length);  
        } else if (sysMsg == 'android') {
            //android选择复制内容
            input.select(txt);
        }
        document.execCommand('copy', true);
        document.body.removeChild(input);

    },
    //  兼容ios复制
    iosCopy(txt) {
        let obj = this.render(txt);

        window.getSelection().removeAllRanges(); //这段代码必须放在前面否则无效
        let content = document.querySelector('.jsCopy');
        console.log(content)

        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(content);
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        document.execCommand('copy');

        // 移除选中的元素
        window.getSelection().removeAllRanges();
        return obj;
    },
    //渲染成ios需要复制的节点并添加样式
    render(txt) {
        var html = document.createElement('div');
        html.className = 'jsCopy';
        html.innerText = txt;
        document.body.appendChild(html)
        var style = document.createElement('style');
        style.innerHTML = 'body{-webkit-user-select:text}.jsCopy{position:absolute;top:0;left:-200px;color:transparent;background:transparent}'
        document.head.appendChild(style)
        let nodeObj = {
            "html": html,
            "style": style
        }
        return nodeObj;
    },
    //方法调用完毕后摧毁节点和多余样式
    destoryNode(html, style) {
        document.body.removeChild(html);
        document.head.removeChild(style);
    },
    //获取操作系统
    getOs() {
        let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios'
        if (/android/i.test(userAgent)) return 'android'
    }
}
export default JsCopy;