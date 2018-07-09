
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
import com.system.mapper.UserMapper;
import com.system.model.User;
import com.system.model.UserExample;
import com.system.model.UserExample.Criteria;
@Controller
@RequestMapping("user")
public class UserController {
	@Autowired
	private UserMapper userMapper = null;
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return Util.getResult(1, "success",userMapper.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return Util.getResult(1, "success",userMapper.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		userMapper.deleteByPrimaryKey(id);

		return Util.getResult(1, "success","");
	}

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add(Integer id,Integer num,String pass,String name,MultipartFile img,String school,String birth,String nation,String health,String politic,String edu, HttpServletRequest request)throws IllegalStateException, IOException{
		User o = new User();
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
					
		if(img!=null){
			o.setImg(UploadUtils.upload(request, img, "/pic"));
		}
					
		if(school!=null){
			o.setSchool(school);
		}
					
		if(birth!=null){
			o.setBirth(birth);
		}
					
		if(nation!=null){
			o.setNation(nation);
		}
					
		if(health!=null){
			o.setHealth(health);
		}
					
		if(politic!=null){
			o.setPolitic(politic);
		}
					
		if(edu!=null){
			o.setEdu(edu);
		}
					
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		c.andNumEqualTo(num);
		List<User> list = userMapper.selectByExample(e);
		if(list.isEmpty()){
			userMapper.insert(o);
			return Util.getResult(1, "注册成功","");
		}else{
			return Util.getResult(0, "用户已存在","");
		}

		
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,Integer num,String pass,String name,MultipartFile img,String school,String birth,String nation,String health,String politic,String edu, HttpServletRequest request)throws IllegalStateException, IOException{
		
		User o = userMapper.selectByPrimaryKey(id);
		User o_back = userMapper.selectByPrimaryKey(id);
		
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
					
		if(img!=null){
			o.setImg(UploadUtils.upload(request, img, "/pic"));
		}
					
		if(school!=null){
			o.setSchool(school);
		}
					
		if(birth!=null){
			o.setBirth(birth);
		}
					
		if(nation!=null){
			o.setNation(nation);
		}
					
		if(health!=null){
			o.setHealth(health);
		}
					
		if(politic!=null){
			o.setPolitic(politic);
		}
					
		if(edu!=null){
			o.setEdu(edu);
		}
					
		List<User> list = null;
		if(num!=null){
			UserExample e = new UserExample();
			Criteria c = e.createCriteria();
			c.andNumEqualTo(num);
			list = userMapper.selectByExample(e);
		}
		if((list!=null&&list.isEmpty())||!o_back.getNum().equals(num)){
			userMapper.updateByPrimaryKey(o);
			return Util.getResult(1, "修改成功","");
		}else{
			return Util.getResult(0, "用户已存在","");
		}
		
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search(Integer page,Integer pageRow,Integer id,Integer num,String pass,String name,String school,String birth,String nation,String health,String politic,String edu){
		
		if(page==null) {
			return Util.getResult(1, "", userMapper.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		UserExample e = new UserExample();
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
		
		if(school!=null){
			c.andSchoolLike("%"+school+"%");
		}
		
		if(birth!=null){
			c.andBirthLike("%"+birth+"%");
		}
		
		if(nation!=null){
			c.andNationLike("%"+nation+"%");
		}
		
		if(health!=null){
			c.andHealthLike("%"+health+"%");
		}
		
		if(politic!=null){
			c.andPoliticLike("%"+politic+"%");
		}
		
		if(edu!=null){
			c.andEduLike("%"+edu+"%");
		}
		
		PageHelper.startPage(page, pageRow);
		List<User> alllist = userMapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		
	}
	
	@ResponseBody
	@RequestMapping("login.do")
	public String login(Integer num,String pass){
		
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		
		c.andNumEqualTo(num);
			
		c.andPassEqualTo(pass);
			
		return JSON.toJSONString(userMapper.selectByExample(e));
		
	}
	
	
	@ResponseBody
	@RequestMapping("register.do")
	public String register(Integer num,String pass,String name,MultipartFile img,String school,String birth,String nation,String health,String politic,String edu, HttpServletRequest request)throws IllegalStateException, IOException{
		
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		
		c.andNumEqualTo(num);
		List<User> list = userMapper.selectByExample(e);
		if(list.isEmpty()){
			User o = new User();
		
			o.setNum(num);
						
			o.setPass(pass);
						
			o.setName(name);
						
			o.setImg(UploadUtils.upload(request, img, "/pic"));
						
			o.setSchool(school);
						
			o.setBirth(birth);
						
			o.setNation(nation);
						
			o.setHealth(health);
						
			o.setPolitic(politic);
						
			o.setEdu(edu);
						
			userMapper.insert(o);
			return "1";//注册成功
		}else{
			return "0";//注册失败
		}
			
	}
	
}
				