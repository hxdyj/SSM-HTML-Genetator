
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
import com.system.mapper.BorrowadminMapper;
import com.system.model.Borrowadmin;
import com.system.model.BorrowadminExample;
import com.system.model.BorrowadminExample.Criteria;
@Controller
@RequestMapping("borrowadmin")
public class BorrowadminController {
	@Autowired
	private BorrowadminMapper borrowadminMapper = null;
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return Util.getResult(1, "success",borrowadminMapper.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return Util.getResult(1, "success",borrowadminMapper.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		borrowadminMapper.deleteByPrimaryKey(id);

		return Util.getResult(1, "success","");
	}

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add(Integer id,String login_id,String pass,String name){
		Borrowadmin o = new Borrowadmin();
		if(id!=null){
			o.setId(id);
		}
					
		if(login_id!=null){
			o.setLogin_id(login_id);
		}
					
		if(pass!=null){
			o.setPass(pass);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
			BorrowadminExample e = new BorrowadminExample();
			Criteria c = e.createCriteria();
			c.andLogin_idEqualTo(login_id);
			List<Borrowadmin> list = borrowadminMapper.selectByExample(e);
			if(list.isEmpty()){
				borrowadminMapper.insert(o);
				return Util.getResult(1, "添加成功","");
			}else{
				return Util.getResult(0, "用户已存在","");
			}
	
			
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,String login_id,String pass,String name){
		
		Borrowadmin o = borrowadminMapper.selectByPrimaryKey(id);
		Borrowadmin o_back = borrowadminMapper.selectByPrimaryKey(id);
		
		if(id!=null){
			o.setId(id);
		}
					
		if(login_id!=null){
			o.setLogin_id(login_id);
		}
					
		if(pass!=null){
			o.setPass(pass);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
		List<Borrowadmin> list = null;
		if(login_id!=null){
			BorrowadminExample e = new BorrowadminExample();
			Criteria c = e.createCriteria();
			c.andLogin_idEqualTo(login_id);
			list = borrowadminMapper.selectByExample(e);
		}
		if((list!=null&&list.isEmpty())||!o_back.getLogin_id().equals(login_id)){
			borrowadminMapper.updateByPrimaryKey(o);
			return Util.getResult(1, "修改成功","");
		}else{
			return Util.getResult(0, "用户已存在","");
		}
		
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search(Integer page,Integer pageRow,Integer id,String login_id,String pass,String name){
		
		if(page==null) {
			return Util.getResult(1, "", borrowadminMapper.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		BorrowadminExample e = new BorrowadminExample();
		Criteria c = e.createCriteria();
		
		if(id!=null){
			c.andIdEqualTo(id);
		}
		
		if(login_id!=null){
			c.andLogin_idLike("%"+login_id+"%");
		}
		
		if(pass!=null){
			c.andPassLike("%"+pass+"%");
		}
		
		if(name!=null){
			c.andNameLike("%"+name+"%");
		}
		
		PageHelper.startPage(page, pageRow);
		List<Borrowadmin> alllist = borrowadminMapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		
	}
	
	@ResponseBody
	@RequestMapping("login.do")
	public String login(String login_id){
		
		BorrowadminExample e = new BorrowadminExample();
		Criteria c = e.createCriteria();
		
		c.andLogin_idEqualTo(login_id);
			
		return JSON.toJSONString(borrowadminMapper.selectByExample(e));
		
	}
	
	
}
				