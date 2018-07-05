const RULE = require('../../Mysql_Field_Design_Rule')
//生成方法的参数 ---> (Integer id,String title)
function fieldsCommentMapToJavaParamsStr(commentMap, method) {
	let result = ''
	let isUpload = false
	if (method == RULE.field.not_in_param.search) {
		result += 'Integer page,Integer pageRow,'
	}
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
//生成方法的参数 ---> (Integer id,String title)
function fieldsCommentMapToJavaParamsStrIn(commentMap, param) {
	let result = ''
	let isUpload = false
	commentMap.forEach(function(val, key) {
		if (val[param]) {
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

// Integer-->and[filedName]EqualTo([filedName]);  String-->and[filedName]Like("%"+[filedName]+"%");
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
	if (method == RULE.field.not_in_param.search) {
		first = `
		if(page==null) {
			return Util.getResult(1, "", ${mapper}.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		${tableName}Example e = new ${tableName}Example();
		Criteria c = e.createCriteria();

		`
	}
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
			if (method == RULE.field.not_in_param.search) {
				lineStr = fieldTypeGetSearchType(val)
			} else {
				if (val.java_type != 'upload') {
					lineStr = `
		if(${key}!=null){
			o.set${G.util.firstWordUpper(key)}(${key});
		}`
				} else {
					lineStr = `
		if(${key}!=null){
			o.set${G.util.firstWordUpper(key)}(path);
		}`
				}
			}
			middle += lineStr
		}
	})
	if (isUpload) {
		first += `
		String path = "";
		if(${uploadKey}!=null){path = UploadUtils.upload(request, ${uploadKey}, "/pic");}
		`
	}
	let addUniqueObj =
		_.filter([...commentMap.values()], item => item.login_id)[0] || null
	let footer = ''
	if (method == RULE.field.not_in_param.edit) {
		footer = `
		${mapper}.updateByPrimaryKey(o);`
	} else {
		if (addUniqueObj) {
			//存在唯一的标识
			footer = `
		${tableName}Example e = new ${tableName}Example();
		Criteria c = e.createCriteria();
		c.and${G.util.firstWordUpper(addUniqueObj.feild_name)}EqualTo(${
				addUniqueObj.feild_name
			});
		List<${tableName}> list = ${mapper}.selectByExample(e);
		if(list.isEmpty()){
			${mapper}.insert(o);
			return Util.getResult(1, "success","");
		}else{
			return Util.getResult(0, "error","用户已存在");
		}

			`
		} else {
			footer = `${mapper}.insert(o);`
		}
	}
	let result = `
		return Util.getResult(1, "success","");`

	if (method == RULE.field.not_in_param.search) {
		footer = ''
		result = `

		PageHelper.startPage(page, pageRow);
		List<${tableName}> alllist = ${tableName.toLowerCase()}Mapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);

		return Util.getResult(1, "",list);
			`
	}
	if (addUniqueObj) {
		result = ''
	}
	return first + middle + footer + result
}

function getFormParams(table, type) {
	let params = new Map([...table._commentMap].filter(([k, v]) => v[type]))
	return [...params.values()]
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
			/* -------------------------------------------------PACKAGE--------------------------------------------------------- */

			//write globle and package name
			this.writeToFile(
				index,
				`package ${config.ssm.packegeName}.controller;`,
				true
			)
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
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import java.util.List;

			`
			)
			/* -------------------------------------------------MODEL & EXAMPLE--------------------------------------------------------- */

			//write mapper and model and example
			this.writeToFile(
				index,
				`
import ${config.ssm.packegeName}.util.UploadUtils;
import ${config.ssm.packegeName}.util.Result;
import ${config.ssm.packegeName}.util.Util;
import ${config.ssm.packegeName}.mapper.${index}Mapper;
import ${config.ssm.packegeName}.model.${index};
import ${config.ssm.packegeName}.model.${index}Example;
import ${config.ssm.packegeName}.model.${index}Example.Criteria;
			`
			)
			/* -------------------------------------------------TOP--------------------------------------------------------- */
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
			/* -------------------------------------------------GET ID | ALL | DEL--------------------------------------------------------- */
			//write rest interface of static param function
			this.writeToFile(
				index,
				`
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
	}`
			)
			/* -------------------------------------------------ADD--------------------------------------------------------- */
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

			/* -------------------------------------------------EDIT--------------------------------------------------------- */
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
			/* -------------------------------------------------SEARCH--------------------------------------------------------- */

			//write search function
			this.writeToFile(
				index,
				`
	@ResponseBody
	@RequestMapping(value="search.do")
	public String search${fieldsCommentMapToJavaParamsStr(
		val._commentMap,
		RULE.field.not_in_param.search
	)}{
		${fieldsCommentMapToMethodContent(
			val._commentMap,
			RULE.field.not_in_param.search,
			index,
			mapper
		)}
	}
`
			)
			/* -------------------------------------------------LOGIN--------------------------------------------------------- */

			//判断表是否包含登录功能
			if (
				val.tableComment.func &&
				_.includes(val.tableComment.func, 'login')
			) {
				let loginParams = getFormParams(val, 'login_form')
				let funcParams = _.join(
					_.map(
						loginParams,
						item => `${item.java_type} ${item.feild_name}`
					),
					', '
				)

				let funcJurgePart = _.join(
					_.map(
						loginParams,
						item =>
							`c.and${G.util.firstWordUpper(
								item.feild_name
							)}EqualTo(${item.feild_name});`
					),
					'\n\t\t'
				)
				this.writeToFile(
					index,
					`
	@ResponseBody
	@RequestMapping("login.do")
	public String login(${funcParams}){
		${index}Example e = new ${index}Example();
		Criteria c = e.createCriteria();
		${funcJurgePart}
		return JSON.toJSONString(${mapper}.selectByExample(e));
	}
				`
				)
			}

			/* -------------------------------------------------REGISTER--------------------------------------------------------- */

			//判断表是否包含注册功能
			if (
				val.tableComment.func &&
				_.includes(val.tableComment.func, 'register')
			) {
				let registerParams = getFormParams(val, 'register_form')
				let registerUniqueObj = _.filter(
					registerParams,
					item => item.login_id
				)[0]
				let funcParams = fieldsCommentMapToJavaParamsStrIn(
					val._commentMap,
					'register_form'
				)
				let funcJurgePart = _.join(
					_.map(registerParams, item => {
						if (item.java_type == 'upload') {
							return `o.set${G.util.firstWordUpper(
								item.feild_name
							)}(path);`
						} else {
							return `o.set${G.util.firstWordUpper(
								item.feild_name
							)}(${item.feild_name});`
						}
					}),
					'\n\t\t\t'
				)
				this.writeToFile(
					index,
					`
	@ResponseBody
	@RequestMapping("register.do")
	public String register${funcParams}
		${index}Example e = new ${index}Example();
		Criteria c = e.createCriteria();
		c.and${G.util.firstWordUpper(registerUniqueObj.feild_name)}EqualTo(${
						registerUniqueObj.feild_name
					});
		String path = "";
		if(img!=null){path = UploadUtils.upload(request, img, "/pic");}
		List<${index}> list = ${mapper}.selectByExample(e);
		if(list.isEmpty()){
			${index} o = new ${index}();
			${funcJurgePart}
			${mapper}.insert(o);
			return "1";//注册成功

		}else{
			return "0";//注册失败
		}
	}
				`
				)
			}

			/*

			@ResponseBody
	@RequestMapping("register.do")
	public String ref(String num,String name,Integer tid){
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		c.andNumEqualTo(num);
		List<User> list = userm.selectByExample(e);
		if(list.isEmpty()){
			User u = new User();
			u.setNum(num);
			u.setName(name);
			u.setPass(num);
			u.setTid(tid);
			Integer uid = userm.insert(u);
			Score s = new Score();
			s.setUid(uid);
			sserm.insert(s);
			return "1";//注册成功

		}else{
			return "0";//注册失败，有相同的学号
		}


	}

			*/
			/* -------------------------------------------------END--------------------------------------------------------- */

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
