import Vue from 'vue';

//const MessageConstructor = Vue.extend(require('./main.vue').default); // 直接将Vue组件作为Vue.extend的参数:构造函数

import MessageVue from './main.vue';
const MessageConstructor = Vue.extend(MessageVue); // 直接将Vue组件作为Vue.extend的参数:构造函数
let instance; //保存实例（作用域外）

const Message = (options) => {
    if (!options) options = {};
    let IdName = 'wrap-message-plugin';
    if (!document.getElementById(IdName)) {
        //实例化（创建实例）
        instance = new MessageConstructor({
            data: options
        });

        instance.vm = instance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
        document.body.appendChild(instance.vm.$el); // 将dom插入body
        instance.$el.id = IdName;
    }
    instance.vm.visible = true;
    instance.vm.message = options.message || '请传入提示信息！';
    return instance.vm;
}

Message.close = function() {
    instance.vm.close(); //调用Message.vue组件内的方法
}


export default {
    install: Vue => {
        Vue.prototype.$message = Message; // 将Notice组件暴露出去，并挂载在Vue的prototype上
    }
}




//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
/*
const NoticeConstructor = Vue.extend(require('./Notice.vue')) // 直接将Vue组件作为Vue.extend的参数




let nId = 1

const Notice = (content) => {
  let id = 'notice-' + nId++

  const NoticeInstance = new NoticeConstructor({
    data: {
      content: content
    }
  }) // 实例化一个带有content内容的Notice

  NoticeInstance.id = id
  NoticeInstance.vm = NoticeInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  NoticeInstance.vm.visible = true
  NoticeInstance.dom = NoticeInstance.vm.$el
  document.body.appendChild(NoticeInstance.dom) // 将dom插入body
  NoticeInstance.dom.style.zIndex = nId + 1001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
  return NoticeInstance.vm
}

export default {
  install: Vue => {
    Vue.prototype.$notice = Notice // 将Notice组件暴露出去，并挂载在Vue的prototype上
  }
}
*/