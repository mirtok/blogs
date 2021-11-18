---
title: Springboot整合shiro(完整版)
date: 2021-10-15
tags:
  - Java
  - Spring Boot
categories:
  - Java
---

### 1.shiro是什么?
##### Shiro是Apache下的一个开源项目。shiro属于轻量级框架，相对于SpringSecurity简单的多，也没有SpringSecurity那么复杂。以下是我自己学习之后的记录。
##### 官方架构图如下：
![官方架构图](http://www.lxit365.com/fileUpload/static/upload/image/20201215/705c0d35f90e474d8167d4d1be1ae459.png)
### 2.主要功能
##### shiro主要有三大功能模块：
##### 1.Subject：主体，一般指用户。
##### 2.SecurityManager：安全管理器，管理所有Subject，可以配合内部安全组件。(类似于SpringMVC中的DispatcherServlet)
##### 3.Realms：用于进行权限信息的验证，一般需要自己实现。
### 3.细分功能
##### 1. Authentication：身份认证/登录(账号密码验证)。
##### 2. Authorization：授权，即角色或者权限验证。
##### 3. Session Manager：会话管理，用户登录后的session相关管理。
##### 4. Cryptography：加密，密码加密等。
#####5. Web Support：Web支持，集成Web环境。
##### 6. Caching：缓存，用户信息、角色、权限等缓存到如redis等缓存中。
##### 7. Concurrency：多线程并发验证，在一个线程中开启另一个线程，可以把权限自动传播过去。
##### 8. Testing：测试支持；
##### 9. Run As：允许一个用户假装为另一个用户（如果他们允许）的身份进行访问。
##### 10. Remember Me：记住我，登录后，下次再来的话不用登录了。
### 4.上代码
##### 1.目录结构
![QQ截图20201215175856.png](http://www.lxit365.com/fileUpload/static/upload/image/20201215/de7d000b57d24dacac710985e2ffa3db.png)
##### 2.pom.xml
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.shiro</groupId>
    <artifactId>spring-shiro</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-shiro</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.49</version>
        </dependency>


        <!--热部署依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!--shiro-->
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring</artifactId>
            <version>1.6.0</version>
        </dependency>

        <!--druid-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.22</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.68</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- 解决现spring boot Configuration Annotation Proessor not found in classpath 在Maven中添加如下依赖即可 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <fork>true</fork> <!-- 如果没有该配置，devtools不会生效 -->
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.20.1</version>
                <configuration>
                    <skipTests>true</skipTests>
                </configuration>
            </plugin>
        </plugins>
        <!--下面主要是设置在java包里面也让springboot扫描xml类型的配置文件-->
        <resources>
            <resource>
                <directory>src/main/resources</directory>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
</project>
```
##### 3. ShiroConfig.java 配置Shiro
```java
@Configuration
public class ShiroConfig {

    /**
     * 创建ShiroFilterFactoryBean
     * Filter工厂，设置对应的过滤条件和跳转条件
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(@Qualifier("securityManager") DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        // 设置安全管理器
        shiroFilterFactoryBean.setSecurityManager(securityManager);

        // 添加Shiro 内置过滤器
        /**
         * Shiro 常用过滤器：
         *      anon： 无需认证(登录)可以访问
         *      authc：必须认证才能访问
         *      user: 如果使用rememberMe 的功能可以直接访问
         *      perms：该资源必须授权才能访问
         *      role: 该资源必须得到角色权限才可以访问
         *      logout: 退出登录
         */
        Map<String, String> map = new LinkedHashMap<>();
        map.put("/users/**","anon");
        map.put("/pages/index","anon");
        map.put("/pages/add","authc");
        map.put("/pages/update","authc");

        // 授权过滤器
        map.put("/pages/add","perms[user:add]");
        map.put("/pages/update","perms[user:update]");
        // 登录
        shiroFilterFactoryBean.setLoginUrl("/pages/login");
        // 首页
        shiroFilterFactoryBean.setSuccessUrl("/pages/index");
        // 错误页面，认证不通过跳转
        shiroFilterFactoryBean.setUnauthorizedUrl("/pages/error");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        return shiroFilterFactoryBean;
    }

    /**
     * 创建DefaultWebSecurityManager
     * 权限管理，配置主要是Realm的管理认证
     */
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm realm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 关联realm
        securityManager.setRealm(realm);
        return securityManager;
    }

    /**
     * 将自己的验证方式加入Bean容器
     */
    @Bean(name = "userRealm")
    public UserRealm getRealm(){
        return new UserRealm();
    }
}
```
##### 4.自定义Realm用于查询用户的角色和权限信息并保存到权限管理器
```java

/**
 * 自定义Realm
 */
@Slf4j
public class UserRealm extends AuthorizingRealm {
    @Autowired
    private UserServiceImpl userService;

    /**
     * 执行授权逻辑
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行授权逻辑");

        // 给资源进行授权
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

        // 获取当前登录用户
        Subject subject = SecurityUtils.getSubject();
        UserEntity user = (UserEntity)subject.getPrincipal();
        // 数据库查找对应权限
        UserEntity dbUser = userService.findById(user.getId());
        // 添加资源的授权字符串
        info.addStringPermission(dbUser.getPerms());
        return info;
    }

    /**
     * 执行认证逻辑
     * @param authToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authToken) throws AuthenticationException {
        System.out.println("执行认证逻辑");
        UsernamePasswordToken token = (UsernamePasswordToken)authToken;
        UserEntity userEntity = userService.findByName(token.getUsername());
        if(userEntity == null){
            return null; //用户名不存在, Shiro底层会抛出UnKnowAccountException
        }
        //判断密码
        return new SimpleAuthenticationInfo(userEntity,userEntity.getPassword(),"");
    }
}
```
### 5.最后加一些常见的shiro异常：
#### 1. AuthenticationException 认证异常
#### Shiro在登录认证过程中，认证失败需要抛出的异常。 AuthenticationException包含以下子类：

##### 1.1. CredentitalsException 凭证异常
1. IncorrectCredentialsException 不正确的凭证
2. ExpiredCredentialsException 凭证过期

##### 1.2. AccountException 账号异常
1. ConcurrentAccessException: 并发访问异常（多个用户同时登录时抛出）
2. UnknownAccountException: 未知的账号
3. ExcessiveAttemptsException: 认证次数超过限制
4. DisabledAccountException: 禁用的账号
5. LockedAccountException: 账号被锁定
6. UnsupportedTokenException: 使用了不支持的Token

#### 2. AuthorizationException: 授权异常
#### Shiro在登录认证过程中，授权失败需要抛出的异常。 AuthorizationException包含以下子类：
##### 2.1. UnauthorizedException:
抛出以指示请求的操作或对请求的资源的访问是不允许的。

##### 2.2. UnanthenticatedException:
当尚未完成成功认证时，尝试执行授权操作时引发异常

### 6.源码地址
[项目地址](https://gitee.com/mrosunset/spring-shiro.git)