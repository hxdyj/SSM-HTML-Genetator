module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.mybatis_generate +
			'ApplicationContext-spring.xml'
		file_utils.writeLineToFile(line, fileName, isReWrite)
	},
	writeToFiles(commonData) {
		this.writeToFile(
			`<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xmlns:mybatis="http://mybatis.org/schema/mybatis-spring"
		xmlns:context="http://www.springframework.org/schema/context"
		xmlns:tx="http://www.springframework.org/schema/tx"
		xmlns:aop="http://www.springframework.org/schema/aop"
		xmlns:mvc="http://www.springframework.org/schema/mvc"
		xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
		http://www.springframework.org/schema/tx  http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
		http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
		http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd  ">

	<!-- 数据源 -->
	<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource">
		<property name="driverClassName">
			<value>com.mysql.jdbc.Driver</value>
		</property>
		<property name="url">
			<value>jdbc:mysql://${config.connect.host}:${config.connect.port}/${
				config.connect.database
			}?characterEncoding=utf8&amp;useUnicode=true</value>
		</property>
		<property name="username">
			<value>${config.connect.user}</value>
		</property>
		<property name="password">
			<value>${config.connect.password}</value>
		</property>
		<property name="validationQuery">
			<value>select 1</value>
		</property>
		<property name="testWhileIdle">
			<value>true</value>
		</property>
		<property name="timeBetweenEvictionRunsMillis">
			<value>3600000</value>
		</property>
		<property name="minEvictableIdleTimeMillis">
			<value>18000000</value>
		</property>
		<property name="testOnBorrow">
			<value>true</value>
		</property>
	</bean>


	<!-- 定义JdbcTemplate的Bean -->
	<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
		<property name="dataSource" ref="dataSource"/>
	</bean>

	<!-- 创建SqlSessionFactory，同时指定数据源 -->
	<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource" />
		<!--configLocation属性指定mybatis的核心配置文件 -->
		<property name="configLocation" value="classpath:Configuration.xml" />
		<!-- 所有配置的mapper文件 -->
		<property name="mapperLocations" value="classpath*:com/system/**/*.xml" />
	</bean>

	<!-- 配置事务管理器 -->
	<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource" ref="dataSource"/>
	</bean>

	<!-- 开启基于注解的事务控制 -->
	<tx:annotation-driven transaction-manager="txManager" />

		<!-- DAO接口所在包名，Spring会自动查找其下的类 -->
	<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
		<property name="basePackage" value="com.system" />
		<property name="sqlSessionFactory" ref="sqlSessionFactory" />
	</bean>


	<!-- 自动扫描controller bean，把作了注解的类转换为bean -->
	<context:component-scan base-package="com.system" />

	<!--通知spring使用CGLIB而不是JDK的来生成代理方法 AOP可以拦截到Controller-->
	<aop:aspectj-autoproxy proxy-target-class="true"/>
	<context:annotation-config />
	<!-- 启动Spring MVC的注解功能，完成请求和注解POJO的映射 -->
	<mvc:annotation-driven />

	<bean id="indexFilter" class="com.system.filter.IndexFilter"></bean>
</beans>
		`,
			true
		)
	}
}
