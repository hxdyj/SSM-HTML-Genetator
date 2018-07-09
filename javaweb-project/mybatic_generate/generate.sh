cd javaweb-project/mybatic_generate
rm -rf com
javac -cp mybatis-3.2.3.jar:mybatis-generator-core-1.3.2.jar:mysql-connector-java-5.1.28-bin.jar  GeneratorSqlmap.java
output=`java -cp .:mybatis-3.2.3.jar:mybatis-generator-core-1.3.2.jar:mysql-connector-java-5.1.28-bin.jar GeneratorSqlmap`
rm -rf ../project/System/src/com/system/mapper
rm -rf ../project/System/src/com/system/model
cp -r com/system/mapper ../project/System/src/com/system
cp -r com/system/model ../project/System/src/com/system
