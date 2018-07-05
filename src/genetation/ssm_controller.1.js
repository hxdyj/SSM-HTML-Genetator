const RULE = require('../../Mysql_Field_Design_Rule')
function fieldTypeGetSearchType(val) {
	if (val.java_type == 'Integer') {
		return `
		if(${val.feild_name}!=null){
			c.and${G.util.firstWordUpper(val.feild_name)}EqualTo(${val.feild_name});
		}

		`
	}
	if (val.java_type == 'String') {
		return `
		if(${val.feild_name}!=null){
			c.and${G.util.firstWordUpper(val.feild_name)}Like("%"+${val.feild_name}+"%");
		}
		`
	}

	return ''
}
function getFuncVals(method, commentMap, tableName, mapper) {
	let methodParams = ''
	let methodMiddle = ''
	let hasUpload = false

	if (method == 'add') {
		methodMiddle += `${tableName} o = new ${tableName}();`
		let uniqueId = null
		commentMap.forEach(function (val, key) {
			if (val.login_id) uniqueId = val
			//if this method not in val.not_in_param, don't append it.
			//将not_in_param属性中不包含method的字段添加到对应的方法中
			if (!_.includes(val.not_in_param, method)) {
				let type = val.java_type
				if (type == RULE.field.java_type.upload.key) {
					type = RULE.field.java_type.upload.value
					hasUpload = true
				}
				methodParams += `${type} ${key},`
				if (val.java_type != RULE.field.java_type.upload.key) {
					methodMiddle += `
		if(${key}!=null){
			o.set${G.util.firstWordUpper(key)}(${key});
		}
					`
				} else {
					methodMiddle += `
		if(${key}!=null){
			o.set${G.util.firstWordUpper(key)}(UploadUtils.upload(request, ${key}, "/pic"));
		}
					`
				}
			}
		})

		methodMiddle += `
		${tableName}Example e = new ${tableName}Example();
		Criteria c = e.createCriteria();
		c.and${G.util.firstWordUpper(uniqueId.feild_name)}EqualTo(${
			uniqueId.feild_name
			});
		List<${tableName}> list = ${mapper}.selectByExample(e);
		if(list.isEmpty()){
			${mapper}.insert(o);
			return Util.getResult(1, "注册成功","");
		}else{
			return Util.getResult(0, "用户已存在","");
		}

		`
	}
	if (method == 'edit') {
		methodMiddle += `${tableName} o = ${mapper}.selectByPrimaryKey(id);`
		let uniqueId = null
		commentMap.forEach(function (val, key) {
			if (val.login_id) uniqueId = val
			//if this method not in val.not_in_param, don't append it.
			//将not_in_param属性中不包含method的字段添加到对应的方法中
			if (!_.includes(val.not_in_param, method)) {
				let type = val.java_type
				if (type == RULE.field.java_type.upload.key) {
					type = RULE.field.java_type.upload.value
					hasUpload = true
				}
				methodParams += `${type} ${key},`
				if (val.java_type != RULE.field.java_type.upload.key) {
					methodMiddle += `
		if(${key}!=null){
			o.set${G.util.firstWordUpper(key)}(${key});
		}
					`
				} else {
					methodMiddle += `
		if(${key}!=null){
			o.set${G.util.firstWordUpper(key)}(UploadUtils.upload(request, ${key}, "/pic"));
		}
					`
				}
			}
		})
		if (uniqueId) {
			methodMiddle += `
		List<${tableName}> list = null;
		if(${uniqueId.feild_name}!=null){
			${tableName}Example e = new ${tableName}Example();
			Criteria c = e.createCriteria();
			c.and${G.util.firstWordUpper(uniqueId.feild_name)}EqualTo(${
				uniqueId.feild_name
				});
			list = ${mapper}.selectByExample(e);
		}
		if(list!=null&&list.isEmpty()){
			${mapper}.updateByPrimaryKey(o);
			return Util.getResult(1, "修改成功","");
		}else{
			return Util.getResult(0, "用户已存在","");
		}
		`
		} else {
			methodMiddle += `
		${mapper}.updateByPrimaryKey(o);
		return Util.getResult(1, "修改成功","");
			`
		}
	}

	if (method == 'search') {
		methodParams += 'Integer page,Integer pageRow,'
		methodMiddle += `
		if(page==null) {
			return Util.getResult(1, "", ${mapper}.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		${tableName}Example e = new ${tableName}Example();
		Criteria c = e.createCriteria();
		`
		commentMap.forEach(function (val, key) {
			//if this method not in val.not_in_param, don't append it.
			//将not_in_param属性中不包含method的字段添加到对应的方法中
			if (!_.includes(val.not_in_param, method)) {
				let type = val.java_type
				if (type == RULE.field.java_type.upload.key) {
					type = RULE.field.java_type.upload.value
				}
				//将upload的字段从search排除出去
				if (val.java_type != RULE.field.java_type.upload.key) {
					methodParams += `${type} ${key},`
					methodMiddle += fieldTypeGetSearchType(val)
				}
			}
		})
		methodMiddle += `
		PageHelper.startPage(page, pageRow);
		List<${tableName}> alllist = ${tableName.toLowerCase()}Mapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		`
	}

	if (method == 'login') {
		methodMiddle += `
		${tableName}Example e = new ${tableName}Example();
		Criteria c = e.createCriteria();
		`
		commentMap.forEach(function (val, key) {
			//if this method not in val.not_in_param, don't append it.
			//将not_in_param属性中不包含method的字段添加到对应的方法中
			if (!_.includes(val.not_in_param, method)) {
				let type = val.java_type
				if (type == RULE.field.java_type.upload.key) {
					type = RULE.field.java_type.upload.value
				}
				//将upload的字段从login排除出去
				if (val.java_type != RULE.field.java_type.upload.key) {
					//包含
					if (val.login_form) {
						methodParams += `${type} ${key},`
						methodMiddle += `
		c.and${G.util.firstWordUpper(key)}EqualTo(${key});
			`
					}
				}
			}
		})

		methodMiddle += `
		return JSON.toJSONString(${mapper}.selectByExample(e));
		`
	}
	if (method == 'register') {
		let uniqueId = null
		let tempMiddle = ''
		methodMiddle += `
		${tableName}Example e = new ${tableName}Example();
		Criteria c = e.createCriteria();
		`
		commentMap.forEach(function (val, key) {
			if (val.login_id) uniqueId = val

			//if this method not in val.not_in_param, don't append it.
			//将not_in_param属性中不包含method的字段添加到对应的方法中
			if (!_.includes(val.not_in_param, method)) {
				let type = val.java_type
				if (type == RULE.field.java_type.upload.key) {
					type = RULE.field.java_type.upload.value
					hasUpload = true
				}
				//包含
				if (val.register_form) {
					methodParams += `${type} ${key},`
					if (val.java_type != RULE.field.java_type.upload.key) {
						tempMiddle += `
			o.set${G.util.firstWordUpper(key)}(${key});
						`
					} else {
						tempMiddle += `
			o.set${G.util.firstWordUpper(key)}(UploadUtils.upload(request, ${key}, "/pic"));
						`
					}
				}

			}
		})
		if (uniqueId) {
			methodMiddle += `
		c.andNumEqualTo(num);
		List<User> list = userMapper.selectByExample(e);
		if(list.isEmpty()){
			User o = new User();
		`
		}
		methodMiddle += tempMiddle
		methodMiddle += `
			userMapper.insert(o);
			return "1";//注册成功
		}else{
			return "0";//注册失败
		}
		`
	}

	return [
		`(${methodParams.substring(0, methodParams.length - 1)}${
		hasUpload
			? ', HttpServletRequest request)throws IllegalStateException, IOException'
			: ')'
		}`,
		methodMiddle
	]
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
			let isLoginTable = G.util.getTableFeildHasSomeVal(
				val,
				'func',
				'login'
			)
			let isRegisterTable = G.util.getTableFeildHasSomeVal(
				val,
				'func',
				'register'
			)
			debugger
			this.writeToFile(
				index,
				`
package ${config.ssm.packegeName}.controller;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import java.util.List;
import ${config.ssm.packegeName}.util.UploadUtils;
import ${config.ssm.packegeName}.util.Result;
import ${config.ssm.packegeName}.util.Util;
import ${config.ssm.packegeName}.mapper.${index}Mapper;
import ${config.ssm.packegeName}.model.${index};
import ${config.ssm.packegeName}.model.${index}Example;
import ${config.ssm.packegeName}.model.${index}Example.Criteria;
@Controller
@RequestMapping("${lowerIndex}")
public class ${index}Controller {
	@Autowired
	private ${index}Mapper ${mapper} = null;
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return Util.getResult(1, "success",${mapper}.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return Util.getResult(1, "success",${mapper}.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		${mapper}.deleteByPrimaryKey(id);

		return Util.getResult(1, "success","");
	}

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add${getFuncVals('add', val._commentMap, index, mapper)[0]}{
		${getFuncVals('add', val._commentMap, index, mapper)[1]}
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit${getFuncVals('edit', val._commentMap, index, mapper)[0]}{
		${getFuncVals('edit', val._commentMap, index, mapper)[1]}
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search${getFuncVals('search', val._commentMap, index, mapper)[0]}{
		${getFuncVals('search', val._commentMap, index, mapper)[1]}
	}
	${
				isLoginTable
					? `
	@ResponseBody
	@RequestMapping("login.do")
	public String login${getFuncVals('login', val._commentMap, index, mapper)[0]}{
		${getFuncVals('login', val._commentMap, index, mapper)[1]}
	}
	`
					: ''
				}
	${
				isRegisterTable
					? `
	@ResponseBody
	@RequestMapping("register.do")
	public String register${
					getFuncVals('register', val._commentMap, index, mapper)[0]
					}{
		${getFuncVals('register', val._commentMap, index, mapper)[1]}
	}
	`
					: ''
				}
}
				`,
				true
			)

			/* ----------- forEach End ----------- */
		})
	}
}
