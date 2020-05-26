/**
 * @description: 登录页面相关接口
 * @author: lijiahui
 * @createTime: 2020/05/19
 * @LastEditors: lijiahui
 * @LastEditTime: 2020/05/19
 */
import service from 'utils/request';
//  获取验证码
export function GetSms (data) {
    return service.request({
        method: 'post',
        url: '/getSms/',
        data
    });
}
// 获取用户角色
// 登录
export function Login (data) {
    return service.request({
        method: 'post',
        url: '/login/',
        data
    });
}
// 注册
export function Register (data) {
    return service.request({
        method: 'post',
        url: '/register/',
        data
    });
}