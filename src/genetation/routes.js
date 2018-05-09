module.exports = {
	writeToRoutes(tableName, line, isReWrite) {
		let fileName = 'route/' + tableName + '.route.js';
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeRoutesToFiles(tablesDesc) {
		_.forEach(tablesDesc, (val, index) => {
			this.writeToRoutes(
				index,
				`const Test = require("${
					config.serviceRequireBasePath
				}${index}.entity")`,
				true
			);

			this.writeToRoutes(index, `class ${index}Service {`);

			this.writeToRoutes(
				index,
				`\tstatic getInstance(mysqlConnect) {
		if (!${index}Service.instance) {
			${index}Service.instance = new ${index}Service();
			${index}Service.prototype.mysqlConnect = mysqlConnect
		}
		return ${index}Service.instance;
	}`
			);

			this.writeToRoutes(
				index,
				`
	add(${index.toLowerCase()}){
		return this.mysqlConnect.getRepository(${index}).save(${index.toLowerCase()}).then(${index.toLowerCase()} => {
			console.log("${index} has been saved: ", ${index.toLowerCase()});
			return ${index.toLowerCase()}
		});
	}`
			);

			this.writeToRoutes(
				index,
				`
	getById(id){
		return this.mysqlConnect.getRepository(${index}).createQueryBuilder("${index.toLowerCase()}").where(
			"${index.toLowerCase()}.id = :id", {id: id}).getOne()
	}`
			);

			this.writeToRoutes(
				index,
				`
	delById(id){
		return this.mysqlConnect.getRepository(${index}).createQueryBuilder().delete().from(${index}).where(
			"id = :id", {id: id}).execute()
	}`
			);

			this.writeToRoutes(index, `}`);
			this.writeToRoutes(index, `module.exports = ${index}Service`);
		});
	}
};
