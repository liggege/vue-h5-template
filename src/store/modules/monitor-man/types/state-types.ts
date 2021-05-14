
export type MonitorManUserBaseInfo = {
    username?: string; //姓名
    idcard?: string; //身份证
    phone?: string; //手机号
    area?: string; //所在区域名称
    areaCode?: string; //区域code
    addr?: string; //详细地址

}
export interface State {
    userInfo: MonitorManUserBaseInfo
}