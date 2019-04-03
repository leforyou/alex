import HowBuy from './HowBuy'; //加载组件
import ProductList from './ProductList'; //加载组件
import NotMoreTip from './NotMoreTip'; //加载组件
import SearchList from './SearchList'; //加载组件 
import SearchListAllWeb from './SearchListAllWeb'; //加载组件 


export default (Vue) => {
    Vue.component('HowBuy', HowBuy);
    Vue.component('List', ProductList);
    Vue.component('NotMoreTip', NotMoreTip);
    Vue.component('SearchList', SearchList);
    Vue.component('SearchListAllWeb', SearchListAllWeb);
}