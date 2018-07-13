
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
import com.system.mapper.BorrowMapper;
import com.system.model.Borrow;
import com.system.model.BorrowExample;
import com.system.model.BorrowExample.Criteria;
@Controller
@RequestMapping("borrow")
public class BorrowController {
	@Autowired
	private BorrowMapper borrowMapper = null;
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return Util.getResult(1, "success",borrowMapper.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return Util.getResult(1, "success",borrowMapper.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		borrowMapper.deleteByPrimaryKey(id);

		return Util.getResult(1, "success","");
	}

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add(Integer id,String num,String usernum,String name,String borrowdate,String level,String address){
		Borrow o = new Borrow();
		if(id!=null){
			o.setId(id);
		}
					
		if(num!=null){
			o.setNum(num);
		}
					
		if(usernum!=null){
			o.setUsernum(usernum);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
		if(borrowdate!=null){
			o.setBorrowdate(borrowdate);
		}
					
		if(level!=null){
			o.setLevel(level);
		}
					
		if(address!=null){
			o.setAddress(address);
		}
					
			borrowMapper.insert(o);
			return Util.getResult(1, "添加成功","");
			
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,String num,String usernum,String name,String borrowdate,String level,String address){
		
		Borrow o = borrowMapper.selectByPrimaryKey(id);
		Borrow o_back = borrowMapper.selectByPrimaryKey(id);
		
		if(id!=null){
			o.setId(id);
		}
					
		if(num!=null){
			o.setNum(num);
		}
					
		if(usernum!=null){
			o.setUsernum(usernum);
		}
					
		if(name!=null){
			o.setName(name);
		}
					
		if(borrowdate!=null){
			o.setBorrowdate(borrowdate);
		}
					
		if(level!=null){
			o.setLevel(level);
		}
					
		if(address!=null){
			o.setAddress(address);
		}
					
		borrowMapper.updateByPrimaryKey(o);
		return Util.getResult(1, "修改成功","");
			
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search(Integer page,Integer pageRow,Integer id,String num,String usernum,String name,String borrowdate,String level,String address){
		
		if(page==null) {
			return Util.getResult(1, "", borrowMapper.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		BorrowExample e = new BorrowExample();
		Criteria c = e.createCriteria();
		
		if(id!=null){
			c.andIdEqualTo(id);
		}
		
		if(num!=null){
			c.andNumLike("%"+num+"%");
		}
		
		if(usernum!=null){
			c.andUsernumLike("%"+usernum+"%");
		}
		
		if(name!=null){
			c.andNameLike("%"+name+"%");
		}
		
		if(borrowdate!=null){
			c.andBorrowdateLike("%"+borrowdate+"%");
		}
		
		if(level!=null){
			c.andLevelLike("%"+level+"%");
		}
		
		if(address!=null){
			c.andAddressLike("%"+address+"%");
		}
		
		PageHelper.startPage(page, pageRow);
		List<Borrow> alllist = borrowMapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		
	}
	
	
}
				