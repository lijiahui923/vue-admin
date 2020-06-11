import router from "./index";
import { getToken, removeToken, removeUsername } from "utils/app";
const whiteRouter =['/login'];
// 路由手卫
/**只要路由发生改变就会进入beforeEach
 * to进入的页面
 * from离开的页面
 * next();是空的时候就是直接执行了to这个操作
 */
router.beforeEach( (to, from, next) => {
    // 路由动态添加，分配菜单，每个角色分配不同的菜单
    if (getToken()) {
        if (to.path === '/login') {
            removeToken('token');
            removeUsername('username');
            console.log(to.path);
            next();
        } else {
            next();
        }
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
    // console.log(to, from, next);
    // next();  就是要先调用一次next()才能触发
});