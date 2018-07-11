
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
	public String add(Integer id,String num,String name,MultipartFile img,String registerdate,String level,String address, HttpServletRequest request)throws IllegalStateException, IOException{
		User o = new User();
		if(id!=null){
			o.setId(id);
		}
					
		if(num!=null){
			o.setNum(num);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
		if(img!=null){
			o.setImg(UploadUtils.upload(request, img, "/pic"));
		}
					
		if(registerdate!=null){
			o.setRegisterdate(registerdate);
		}
					
		if(level!=null){
			o.setLevel(level);
		}
					
		if(address!=null){
			o.setAddress(address);
		}
					
			userMapper.insert(o);
			return Util.getResult(1, "添加成功","");
			
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,String num,String name,MultipartFile img,String registerdate,String level,String address, HttpServletRequest request)throws IllegalStateException, IOException{
		
		User o = userMapper.selectByPrimaryKey(id);
		User o_back = userMapper.selectByPrimaryKey(id);
		
		if(id!=null){
			o.setId(id);
		}
					
		if(num!=null){
			o.setNum(num);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
		if(img!=null){
			o.setImg(UploadUtils.upload(request, img, "/pic"));
		}
					
		if(registerdate!=null){
			o.setRegisterdate(registerdate);
		}
					
		if(level!=null){
			o.setLevel(level);
		}
					
		if(address!=null){
			o.setAddress(address);
		}
					
		userMapper.updateByPrimaryKey(o);
		return Util.getResult(1, "修改成功","");
			
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search(Integer page,Integer pageRow,Integer id,String num,String name,String registerdate,String level,String address){
		
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
			c.andNumLike("%"+num+"%");
		}
		
		if(name!=null){
			c.andNameLike("%"+name+"%");
		}
		
		if(registerdate!=null){
			c.andRegisterdateLike("%"+registerdate+"%");
		}
		
		if(level!=null){
			c.andLevelLike("%"+level+"%");
		}
		
		if(address!=null){
			c.andAddressLike("%"+address+"%");
		}
		
		PageHelper.startPage(page, pageRow);
		List<User> alllist = userMapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		
	}
	
	
}
				