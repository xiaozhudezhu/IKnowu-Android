export class Constants {

    public static currentUser;

    public static isLogin: boolean = false;

    public static isPatternLockEnabled: boolean = true;

    public static lockPattern: string = '12345';
    public static URL_ROOT: string = '47.96.161.119/iknowu-server';
    //public static URL_ROOT: string = '193.112.206.28:8080/iknowu-server';
    //public static URL_ROOT: string = 'localhost:9090/iknowu-server';
    public static URL_LOGIN: string = '/login';
    public static URL_REGISTER: string = '/register';
    public static URL_MASTER_SEARCH: string = '/master/search';
    public static URL_ORDER_CREATE: string = '/order/create';
    public static URL_BLOCKCHAIN_GETACCOUNTS: string = '/blockchain/getAccounts';
    public static URL_BLOCKCHAIN_NEWACCOUNT: string = '/blockchain/newAccount';
    public static URL_BLOCKCHAIN_GETUFOBALANCE: string = '/blockchain/getUFOBalance';
    public static URL_BLOCKCHAIN_SENDUFOTRANSACTION: string = '/blockchain/sendUFOTransaction';


}