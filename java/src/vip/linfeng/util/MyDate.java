package vip.linfeng.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author linfeng
 * @version 1.0
 * @createTime 2023/8/27 9:05
 * @apiNote
 */
public class MyDate {
    public final static String DEFAULT_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public final static SimpleDateFormat FORMAT;
    static {
        FORMAT = new SimpleDateFormat(DEFAULT_FORMAT);
    }

    /**
     * 获取现在格式化后的时间
     * @return 以字符串形式返回格式化后的时间
     */
    public static String now(){
        return format(new Date());
    }

    /**
     * 获取格式化后的时间
     * @param date 需要格式化的时间对象
     * @return 以字符串形式返回格式化后的时间
     */
    public static String format(Date date){
        return FORMAT.format(date);
    }

    /**
     * 根据字符串转为date类型
     * @param dateTime 需要转换的字符串
     * @return 返回date类型的时间
     * @throws ParseException 转换失败的异常
     */
    public static Date toDate(String dateTime) throws ParseException {
        return FORMAT.parse(dateTime);
    }
}
