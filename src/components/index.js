// 使用webpack提供的require方法循环遍历但钱文件夹下所有index.js或index.vue文件
const context = require.context('./', true, /index\.(vue|js)$/);
// 返回值为目标文件的相对路径数组
const keys = context.keys();
// 声明所有数组
let components = [];
// 支持按需引入的组件对象
let requiredComponent = {};

// 判断数据类型
const toString = Object.prototype.toString;
let getType = value => {
    return toString.call(value).replace(/^\[object\s|\]$g/, '');
}
const isObject = value => {
    return getType(value) === 'Object';
}
const isArray = value => {
    return getType(value) === 'Array';
}
// 循环遍历 全局注册组件
keys.forEach(key => {
    // 排除根目录下的index.js
    if (key.startsWith('./index')) {
        return false;
    }
    // 根据组件路径 获取组件资源
    const compiledComponent = context(key);
    // 兼容export default 和 module.export 两种写法
    const matchComponent = compiledComponent.default || compiledComponent;
    if (matchComponent.name) {
        // 如果当前匹配组件在name属性
        // 则当前组件为单文件组件 可立即注册
        requiredComponent[matchComponent.name] = matchComponent;
        components.push(matchComponent);
    } else if (isObject(matchComponent)) {
        for (const key in matchComponent) {
            const item = matchComponent[key];
            if (item.name) {
                components.push(item);
                requiredComponent[item.name] = item;
            }
        }
    } else if (isArray(matchComponent)) {
        matchComponent.forEach( item => {
            if (item.name) {
                components.push(item);
                requiredComponent[item.name] = item;
            }
        })
    } else {
        console.log(`Component registry error! path is:${key}`);
    }
});

const install = Vue => {
    components.forEach(component => {
        // 根节点App组件不执行全局注册
        if (component.name && component.name !== 'App') {
            Vue.component(component.name, component);
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ...requiredComponent
}