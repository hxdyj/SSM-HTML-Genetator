const RULE = require('../../Mysql_Field_Design_Rule')
//生成方法的参数 ---> (Integer id,String title)
function fieldsCommentMapToJavaParamsStr(commentMap, method) {
	let result = ''
	let isUpload = false
	commentMap.forEach(function(val, key) {
		//if this method not in val.not_in_param, don't append it.
		//将not_in_param属性中不包含method的字段添加到对应的方法中
		if (!_.includes(val.not_in_param, method)) {
			let type = val.java_type
			if (type == RULE.field.java_type.upload.key) {
				type = RULE.field.java_type.upload.value
				isUpload = true
			}
			result += `${type} ${key},`
		}
	})
	return `(${result.substring(0, result.length - 1)}${
		isUpload
			? ', HttpServletRequest request)throws IllegalStateException, IOException'
			: ')'
	}`
}

// tid--->Tid   while o.setFile(path) use this function.
function firstWordUpper(word) {
	return word.substring(0, 1).toUpperCase() + word.substring(1, word.length)
}
//生成方法的内容 ---> Chat o = new Chat();o.setFile(path);
function fieldsCommentMapToMethodContent(
	commentMap,
	method,
	tableName,
	mapper
) {
	let first = `
		${tableName} o = ${
		method == RULE.field.not_in_param.edit
			? `${mapper}.selectByPrimaryKey(id)`
			: `new ${tableName}()`
	};
	`
	isUpload = false
	uploadKey = null
	let middle = ''
	commentMap.forEach(function(val, key) {
		//if this method not in val.not_in_param, append it.
		if (!_.includes(val.not_in_param, method)) {
			let lineStr = ''
			let type = val.java_type
			let fieldIsUpload = type == RULE.field.java_type.upload.key
			if (fieldIsUpload) {
				isUpload = true
				uploadKey = key
			}
			lineStr = `
		o.set${firstWordUpper(key)}(${fieldIsUpload ? 'path' : key});`
			middle += lineStr
		}
	})
	if (isUpload) {
		first += `
		String path = "";
		if(${uploadKey}!=null){path = UploadUtils.upload(request, ${uploadKey}, "/pic");}
		`
	}

	let footer = `
		${mapper}.${
		method == RULE.field.not_in_param.edit ? 'updateByPrimaryKey' : 'insert'
	}(o);


		return "success";`
	return first + middle + footer
}
module.exports = {
	writeToFile(tableName, line, isReWrite) {
		let fileName =
			config.generateDirs.ssm_controller + tableName + 'Controller.java'
		file_utils.writeLineToFile(line, fileName, isReWrite)
	},
	writeToFiles(commonData) {
		_.forEach(commonData.tablesDesc, (val, index) => {
			//index-->tableName
			/* ----------- forEach Start ----------- */
			let lowerIndex = index.toLowerCase()
			let mapper = lowerIndex + 'Mapper'
			//write globle and package name
			this.writeToFile(index, `package ${config.ssm.packegeName};`, true)
			this.writeToFile(
				index,
				`
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.alibaba.fastjson.JSON;
import com.cultral.util.UploadUtils;
			`
			)
			//write mapper and model and example
			this.writeToFile(
				index,
				`
import com.cultral.mapper.${index}Mapper;
import com.cultral.model.${index};
import com.cultral.model.${index}Example;
import com.cultral.model.${index}Example.Criteria;
			`
			)
			//write top
			this.writeToFile(
				index,
				`
@Controller
@RequestMapping("${lowerIndex}")
public class ${index}Controller {
	@Autowired
	private ${index}Mapper ${mapper} = null;
			`
			)

			//write rest interface of static param function
			this.writeToFile(
				index,
				`
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return JSON.toJSONString(${mapper}.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return JSON.toJSONString(${mapper}.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		${mapper}.deleteByPrimaryKey(id);

		return "success";
	}`
			)
			//write add function
			this.writeToFile(
				index,
				`

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add${fieldsCommentMapToJavaParamsStr(
		val._commentMap,
		RULE.field.not_in_param.add
	)}{
		${fieldsCommentMapToMethodContent(
			val._commentMap,
			RULE.field.not_in_param.add,
			index,
			mapper
		)}
	}`
			)
			//write edit function
			this.writeToFile(
				index,
				`

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit${fieldsCommentMapToJavaParamsStr(
		val._commentMap,
		RULE.field.not_in_param.edit
	)}{
		${fieldsCommentMapToMethodContent(
			val._commentMap,
			RULE.field.not_in_param.edit,
			index,
			mapper
		)}
	}
			`
			)
			//End
			this.writeToFile(
				index,
				`
}
			`
			)

			/* ----------- forEach End ----------- */
		})
	}
}
