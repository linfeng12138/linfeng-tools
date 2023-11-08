package vip.linfeng.util;

import java.util.UUID;

/**
 * @author linfeng
 * @version 1.0
 * @createTime 2023/8/27 9:01
 * @apiNote
 */
public class MyUUID {
    /**
     * 返回十位数的随机值
     */
    public static int tenUuid(){
        int hashCode = UUID.randomUUID().toString().hashCode();
        if (hashCode <0){
            hashCode=-hashCode;
        }
        // 0 代表前面补充0
        // 10 代表长度为10
        // d 代表参数为正数型
        return Integer.parseInt(String.format("%010d", hashCode).substring(0,10));
    }

    /**
     * 获取十进制的时间戳
     * @return 返回时间戳
     */
    public static long now(){
        return System.currentTimeMillis();
    }

    /**
     * 生成uuid
     * @return 返回字符串的原本形式的uuid
     */
    public static String uuid(){
        return UUID.randomUUID().toString();
    }

    /**
     * 生成不带-的uuid
     * @return 返回字符串形式的uuid
     */
    public static String uuid2(){
        return UUID.randomUUID().toString().replace("-", "");
    }

}
