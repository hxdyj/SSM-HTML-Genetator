
package com.system.controller;
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
import com.system.util.UploadUtils;
import com.system.util.Result;
import com.system.util.Util;
import com.system.mapper.AdminMapper;
import com.system.model.Admin;
import com.system.model.AdminExample;
import com.system.model.AdminExample.Criteria;
@Controller
@RequestMapping("admin")
public class AdminController {
	@Autowired
	private AdminMapper adminMapper = null;
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return Util.getResult(1, "success",adminMapper.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return Util.getResult(1, "success",adminMapper.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		adminMapper.deleteByPrimaryKey(id);

		return Util.getResult(1, "success","");
	}

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add(Integer id,Integer num,String pass,String name){
		Admin o = new Admin();
		if(id!=null){
			o.setId(id);
		}
					
		if(num!=null){
			o.setNum(num);
		}
					
		if(pass!=null){
			o.setPass(pass);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
			AdminExample e = new AdminExample();
			Criteria c = e.createCriteria();
			c.andNumEqualTo(num);
			List<Admin> list = adminMapper.selectByExample(e);
			if(list.isEmpty()){
				adminMapper.insert(o);
				return Util.getResult(1, "添加成功","");
			}else{
				return Util.getResult(0, "用户已存在","");
			}

			
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,Integer num,String pass,String name){
		
		Admin o = adminMapper.selectByPrimaryKey(id);
		Admin o_back = adminMapper.selectByPrimaryKey(id);
		
		if(id!=null){
			o.setId(id);
		}
					
		if(num!=null){
			o.setNum(num);
		}
					
		if(pass!=null){
			o.setPass(pass);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
		List<Admin> list = null;
		if(num!=null){
			AdminExample e = new AdminExample();
			Criteria c = e.createCriteria();
			c.andNumEqualTo(num);
			list = adminMapper.selectByExample(e);
		}
		if((list!=null&&list.isEmpty())||!o_back.getNum().equals(num)){
			adminMapper.updateByPrimaryKey(o);
			return Util.getResult(1, "修改成功","");
		}else{
			return Util.getResult(0, "用户已存在","");
		}
		
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search(Integer page,Integer pageRow,Integer id,Integer num,String pass,String name){
		
		if(page==null) {
			return Util.getResult(1, "", adminMapper.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		AdminExample e = new AdminExample();
		Criteria c = e.createCriteria();
		
		if(id!=null){
			c.andIdEqualTo(id);
		}
		
		if(num!=null){
			c.andNumEqualTo(num);
		}
		
		if(pass!=null){
			c.andPassLike("%"+pass+"%");
		}
		
		if(name!=null){
			c.andNameLike("%"+name+"%");
		}
		
		PageHelper.startPage(page, pageRow);
		List<Admin> alllist = adminMapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		
	}
	
	@ResponseBody
	@RequestMapping("login.do")
	public String login(Integer num,String pass){
		
		AdminExample e = new AdminExample();
		Criteria c = e.createCriteria();
		
		c.andNumEqualTo(num);
			
		c.andPassEqualTo(pass);
			
		return JSON.toJSONString(adminMapper.selectByExample(e));
		
	}
	
	
}
				