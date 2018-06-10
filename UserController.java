package com.system.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.system.mapper.UserMapper;
import com.system.model.User;
import com.system.model.UserExample;
import com.system.model.UserExample.Criteria;


@Controller
@RequestMapping("user")
public class UserController {
	@Autowired
	private UserMapper userm = null;
	
	@ResponseBody
	@RequestMapping("login.do")
	public String login(String num,String pass){	
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		c.andNumEqualTo(num);
		c.andPassEqualTo(pass);
		return JSON.toJSONString(userm.selectByExample(e));
	}
	

	@ResponseBody
	@RequestMapping("register.do")
	public String ref(String num,String name){	
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		c.andNumEqualTo(num);
		List<User> list = userm.selectByExample(e);
		if(list.isEmpty()){
			User u = new User();
			u.setNum(num);
			u.setName(name);
			u.setPass(num);
			userm.insert(u);
			return "1";//注册成功
			
		}else{
			return "0";//注册失败，有相同的学号
		}
		
		
	}
	
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){
		return JSON.toJSONString(userm.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("search.do")
	//pattern  -1：all 0：模糊模式   1：确定模式   默认-1
	public String search(Integer pattern,Integer page,Integer row,Integer id,String name,String num,String pass,String score0,String score1,String score2){
		if(pattern==null)pattern=-1;
		if(page==null)page=1;
		if(row==null)row=10;
		PageHelper.startPage(page,row);
		
		UserExample e = new UserExample();
		Criteria c = e.createCriteria();
		//Integer类型无法使用模糊
		if(id!=null){
			c.andIdEqualTo(id);
		}
		
		if(pattern==0){//模糊模式   
			if(name!=null){
				c.andNameLike(name);
			}
			if(num!=null){
				c.andNumLike(num);
			}
			if(pass!=null){
				c.andPassLike(pass);
			}
			if(score0!=null){
				c.andScore0Like(score0);
			}
			if(score1!=null){
				c.andScore0Like(score1);
			}
			if(score2!=null){
				c.andScore2Like(score2);
			}
		}
		
		if(pattern==1){//确定模式   
			if(name!=null){
				c.andNameEqualTo(name);
			}
			if(num!=null){
				c.andNumEqualTo(num);
			}
			if(pass!=null){
				c.andPassEqualTo(pass);
			}
			if(score0!=null){
				c.andScore0EqualTo(score0);
			}
			if(score1!=null){
				c.andScore0EqualTo(score1);
			}
			if(score2!=null){
				c.andScore2EqualTo(score2);
			}
		}
		
		List<User> list = userm.selectByExample(pattern==-1?null:e);
		PageInfo pageInfo = new PageInfo(list);
		return JSON.toJSONString(pageInfo);
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		userm.deleteByPrimaryKey(id);

		return "success";
	}
	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add(String name,String num,String pass){
		
		User o = new User();
	
		o.setName(name);
		o.setNum(num);
		o.setPass(pass);
		userm.insert(o);

		return "success";
	}
	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,String name,String num,String pass,String score0,String score1,String score2){
		
		User o = userm.selectByPrimaryKey(id);
	
		o.setName(name);
		o.setNum(num);
		o.setPass(pass);
		if(score0!=null){
			o.setScore0(score0);
		}
		if(score1!=null){
			o.setScore1(score1);
		}
		if(score2!=null){
			o.setScore2(score2);
		}
		
		userm.updateByPrimaryKey(o);

		return "success";
	}
}
