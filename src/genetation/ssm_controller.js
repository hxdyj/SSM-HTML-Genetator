module.exports = {
	writeToFile(tableName, line, isReWrite) {
		let fileName =
			config.generateDirs.ssm_controller + tableName + 'Controller.java';
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(tablesDesc) {
		_.forEach(tablesDesc, (val, index) => {
			//index-->tableName
			/* ----------- forEach Start ----------- */
			let lowerIndex = index.toLowerCase();
			//write globle and package name
			this.writeToFile(index, `package ${config.ssm.packegeName};`, true);
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
			);
			//write mapper and model and example
			this.writeToFile(
				index,
				`
import com.cultral.mapper.${index}Mapper;
import com.cultral.model.${index};
import com.cultral.model.${index}Example;
import com.cultral.model.${index}Example.Criteria;
			`
			);
			//write top
			this.writeToFile(
				index,
				`
@Controller
public class ${index}Controller {
	@Autowired
	private ${index}Mapper ${lowerIndex}Mapper = null;
			`
			);

			//write rest interface
			this.writeToFile(
				index,
				`
	@ResponseBody
	@RequestMapping("${lowerIndex}/get/id.do")
	public String getbyid(Integer id){
		return JSON.toJSONString(${lowerIndex}Mapper.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("${lowerIndex}/del.do")
	public String del(Integer id){
		 ${lowerIndex}Mapper.deleteByPrimaryKey(id);
		return "success";
	}
			`
			);
			//End
			this.writeToFile(
				index,
				`
}
			`
			);

			/* ----------- forEach End ----------- */
		});
	}
};
