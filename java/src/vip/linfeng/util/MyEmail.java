package vip.linfeng.util;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author linfeng
 * @version 1.0
 * @createTime 2023/8/15 20:11
 * @apiNote
 */
public class MyEmail {
    /**
     * 发件人电子邮箱
     */
    static private final String FROM;

    /**
     * 发送邮件的主机
     */
    static private final String HOST;

    /**
     * 授权码
     */
    static private final String AUTH_CODE;

    static {
        Properties properties = new Properties();
        ClassLoader classLoader = MyEmail.class.getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("config.properties");
        try {
            properties.load(resourceAsStream);
            FROM = properties.getProperty("email_from");
            HOST = properties.getProperty("email_host");
            AUTH_CODE = properties.getProperty("email_auth_code");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    /**
     * 发送验证码进行身份验证
     * @param to 收件人
     * @param str 发邮件提示信息
     * @param code 验证码
     * @return 返回是否发送成功
     */
    public static boolean sendAuthCodeMail(String to, String str, String code){
        return sendMail(to, "六度空间认证邮件", """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        *{
                            padding: 0;
                            margin: 0;
                        }
                        h1{
                            font-size: 40px;
                            line-height: 80px;
                            padding: 40px;
                        }
                        body{
                            overflow: hidden;
                            background-image: url("http://192.168.141.42:8080/static/images/logo.jpg");
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                        h1{
                            text-align: center;
                            line-height: 40px;
                            /* color: greenyellow; */
                        }
                        h2, h3{
                            padding: 20px;
                            line-height: 40px;
                        }
                        .code {
                            width: 400px;
                            height: 150px;
                            margin: auto;
                            border-radius: 10px;
                            font-size: 100px;
                            color: #ffffffc5;
                            text-align: center;
                            background-color: rgba(0, 0, 0, 0.637);
                        }
                    </style>
                    <title>Document</title>
                </head>
                <body>
                    <h1>六度空间登录认证</h1>
                    <h2>您正在尝试%s,本次验证码为：</h2>
                    <div class="code">%s</div>
                    <h2>验证码有效期为五分钟，请及时使用，若非本人操作可不用理会。</h2>
                    <h3>林风提醒：请勿将验证码随意发给他人哦~</h3>
                </body>
                </html>
                """.formatted(str, code));
    }

    /**
     * 发送邮件
     * @param to 收件人邮箱
     * @param title 邮件标题
     * @param content 邮件体
     * @return 返回布尔值，表示是否成功发出邮件
     */
    public static boolean sendMail(String to, String title, String content) {
        // 获取系统属性
        Properties properties = System.getProperties();
        // 设置邮件服务器
        properties.setProperty("mail.smtp.host", HOST);
        // 开启认证
        properties.put("mail.smtp.auth", "true");
        // 获取默认session对象
        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                //发件人邮件用户名、授权码
                return new PasswordAuthentication(FROM, AUTH_CODE);
            }
        });
        try {
            // 创建默认的 MimeMessage 对象
            MimeMessage message = new MimeMessage(session);
            // Set From: 头部头字段
            message.setFrom(new InternetAddress(FROM));
            // Set To: 头部头字段
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(to));
            // Set Subject: 头部头字段
            message.setSubject(title);
            // 设置消息体
            message.setContent(content, "text/html;charset=utf-8");
            // 发送消息
            Transport.send(message);
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }
}
