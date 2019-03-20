//上拉触底加载
function Refresh(CallBackFn) {
    document.body.style.minHeight = document.documentElement.clientHeight + 5 + "px";
    window.onscroll = function () {
        if (this.getScrollTop() + this.getClientHeight() > this.getScrollHeight() - (window.screen.height * 0.6)) {
            if (CallBackFn) CallBackFn(); //回调函数
        }
        if (this.getScrollTop() + this.getClientHeight() == this.getScrollHeight()) {
            if (CallBackFn) CallBackFn(); //回调函数
        }
    }.bind(this);
}
Refresh.prototype.getScrollTop = function () {
    //获取滚动条当前的位置
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
Refresh.prototype.getClientHeight = function () {
    //获取当前可是范围的高度 
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}
Refresh.prototype.getScrollHeight = function () {
    //获取文档完整的高度 
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

/* Es5写法
export default function(params){
    new Refresh(params)
};
*/

export default (params) => {
    new Refresh(params)
};