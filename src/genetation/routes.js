module.exports = {
	writeToFile(tableName, line, isReWrite) {
		let fileName = config.generateDirs.route + tableName + '.route.js';
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(tablesDesc) {
		_.forEach(tablesDesc, (val, index) => {
			this.writeToFile(
				index,
				`const Test = require("${
					config.serviceRequireBasePath
				}${index}.entity")`,
				true
			);

			this.writeToFile(index, `class ${index}Service {`);

			this.writeToFile(
				index,
				`\tstatic getInstance(mysqlConnect) {
		if (!${index}Service.instance) {
			${index}Service.instance = new ${index}Service();
			${index}Service.prototype.mysqlConnect = mysqlConnect
		}
		return ${index}Service.instance;
	}`
			);

			this.writeToFile(
				index,
				`
	add(${index.toLowerCase()}){
		return this.mysqlConnect.getRepository(${index}).save(${index.toLowerCase()}).then(${index.toLowerCase()} => {
			console.log("${index} has been saved: ", ${index.toLowerCase()});
			return ${index.toLowerCase()}
		});
	}`
			);

			this.writeToFile(
				index,
				`
	getById(id){
		return this.mysqlConnect.getRepository(${index}).createQueryBuilder("${index.toLowerCase()}").where(
			"${index.toLowerCase()}.id = :id", {id: id}).getOne()
	}`
			);

			this.writeToFile(
				index,
				`
	delById(id){
		return this.mysqlConnect.getRepository(${index}).createQueryBuilder().delete().from(${index}).where(
			"id = :id", {id: id}).execute()
	}`
			);

			this.writeToFile(index, `}`);
			this.writeToFile(index, `module.exports = ${index}Service`);
		});
	}
};
