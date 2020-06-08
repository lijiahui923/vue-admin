/**
 * 过滤特殊字符
 */
/**
 * RegExp 对象表示正则表达式，它是对字符串执行模式匹配的强大工具。
 * test() 方法用于检测一个字符串是否匹配某个模式.true/false
 * 
 */
export function stripscript (s) {
    let pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 验证邮箱
 */
export function validateEmail (value) {
    let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    return reg.test(value);
}

/**
 * 验证密码 6至20位的字母+数字
 */
export function validatePassword (value) {
    let reg = /^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/;
    return reg.test(value);
}

/**
 * 验证验证码
 */
export function validateCode (value) {
    let reg = /^[a-z0-9]{6}$/;
    return reg.test(value);
}

export const ACCEPT_CONFIG = {
    image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    video: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv'],
    document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
    getAll(){
        return [...this.image, ...this.video, ...this.document]
    }
};