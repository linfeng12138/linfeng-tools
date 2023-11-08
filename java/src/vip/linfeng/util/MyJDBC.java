package vip.linfeng.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

/**
 * @author linfeng
 * @version 1.0
 * @createTime 2023/8/22 14:10
 * @apiNote
 */
public class MyJDBC {
    private String driver;
    private String host;
    private String port;
    private String databases;
    private String url;
    private String user;
    private String password;
    private Connection connection;
    private PreparedStatement ps;
    private ResultSet rs = null;

    {
        Properties properties = new Properties();
        ClassLoader classLoader = MyJDBC.class.getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("config.properties");
        try {
            properties.load(resourceAsStream);
            driver = properties.getProperty("driver");
            host = properties.getProperty("host");
            port = properties.getProperty("port");
            databases = properties.getProperty("databases");
            url = "jdbc:mysql://" + host + ":" + port + "/" + databases + "?serverTimezone=Asia/Shanghai";
            user = properties.getProperty("user");
            password = properties.getProperty("password");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 查询语句
     * @param sql 查询sql
     * @param objs 需要填补的占位符
     * @return 返回查询的结果集，取出后记得关流
     * @throws ClassNotFoundException 无法加载却动
     * @throws SQLException 无法建立连接
     */
    public ResultSet select(String sql, Object ...objs) throws ClassNotFoundException, SQLException {
        // 加载驱动
        Class.forName(driver);
        // 建立连接
        connection = DriverManager.getConnection(url, user, password);
        // 创建SQL命令对象
        ps = connection.prepareStatement(sql);
        // 填补占位符
        for(int i = 0;i < objs.length; i ++){
            ps.setObject(i+1, objs[i]);
        }
        // 执行SQL
        rs = ps.executeQuery();
        // 返回结果集
        return rs;
    }

    /**
     * 更新数据
     * @param sql sql命令
     * @param objs 填补的占位符
     * @return 返回受影响的条数
     * @throws ClassNotFoundException 无法加载驱动
     * @throws SQLException 无法连接到数据库
     */
    public int update(String sql, Object ...objs) throws ClassNotFoundException, SQLException {
        // 加载驱动
        Class.forName(driver);
        // 获取连接
        connection = DriverManager.getConnection(url, user, password);
        // 创建SQL命令对象
        ps = connection.prepareStatement(sql);
        // 填补占位符
        for(int i = 0;i < objs.length;i ++){
            ps.setObject(i+1, objs[i]);
        }
        // 执行SQL并获取受影响的条数
        return ps.executeUpdate();
    }

    /**
     * 插入数据，要把查询的id放在第一个位置
     * @param sql sql命令
     * @param objs 填补的占位符
     * @return 返回插入的数据id，若插入失败返回负数
     * @throws ClassNotFoundException 无法加载驱动
     * @throws SQLException 无法连接到数据库
     */
    public int insert(String sql, Object ...objs) throws ClassNotFoundException, SQLException {
        // 加载驱动
        Class.forName(driver);
        // 获取连接
        connection = DriverManager.getConnection(url, user, password);
        // 创建SQL命令对象
        PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        // 填补占位符
        for(int i = 0;i < objs.length;i ++){
            ps.setObject(i+1, objs[i]);
        }
        // 执行SQL
        int i = ps.executeUpdate();
        if(i < 1){
            return i;
        }
        // 获取id
        int id = -1;
        ResultSet rs0 = ps.getGeneratedKeys();
        while(rs0.next()){
            id = rs0.getInt(1);
        }
        System.out.println(id);
        return id;
    }

    /**
     * 关流
     */
    public void close(){
        if(rs != null){
            try {
                rs.close();
                rs = null;
            } catch (SQLException e) {
                System.err.println("结果集关流失败");
                e.printStackTrace();
            }
        }
        if(ps != null){
            try {
                ps.close();
            } catch (SQLException e) {
                System.err.println("命令对象关流失败");
                e.printStackTrace();
            }
        }
        if(connection != null){
            try {
                connection.close();
            } catch (SQLException e) {
                System.err.println("连接关流失败");
                e.printStackTrace();
            }
        }
    }
}
