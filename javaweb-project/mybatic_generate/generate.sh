rm -rf com
javac -cp mybatis-3.2.3.jar:mybatis-generator-core-1.3.2.jar:mysql-connector-java-5.1.28-bin.jar  GeneratorSqlmap.java
java -cp .:mybatis-3.2.3.jar:mybatis-generator-core-1.3.2.jar:mysql-connector-java-5.1.28-bin.jar GeneratorSqlmap
