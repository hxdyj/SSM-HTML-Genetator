
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
import com.system.mapper.BookMapper;
import com.system.model.Book;
import com.system.model.BookExample;
import com.system.model.BookExample.Criteria;
@Controller
@RequestMapping("book")
public class BookController {
	@Autowired
	private BookMapper bookMapper = null;
	@ResponseBody
	@RequestMapping("get/id.do")
	public String getbyid(Integer id){

		return Util.getResult(1, "success",bookMapper.selectByPrimaryKey(id));
	}

	@ResponseBody
	@RequestMapping("get/all.do")
	public String getall(Integer id){

		return Util.getResult(1, "success",bookMapper.selectByExample(null));
	}

	@ResponseBody
	@RequestMapping("del.do")
	public String del(Integer id){

		bookMapper.deleteByPrimaryKey(id);

		return Util.getResult(1, "success","");
	}

	@ResponseBody
	@RequestMapping(value="add.do",method = RequestMethod.POST)
	public String add(Integer id,String num,String name,MultipartFile img,String publishdate,String level,String press, HttpServletRequest request)throws IllegalStateException, IOException{
		Book o = new Book();
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
					
		if(publishdate!=null){
			o.setPublishdate(publishdate);
		}
					
		if(level!=null){
			o.setLevel(level);
		}
					
		if(press!=null){
			o.setPress(press);
		}
					
			bookMapper.insert(o);
			return Util.getResult(1, "添加成功","");
			
	}

	@ResponseBody
	@RequestMapping(value="edit.do",method = RequestMethod.POST)
	public String edit(Integer id,String num,String name,MultipartFile img,String publishdate,String level,String press, HttpServletRequest request)throws IllegalStateException, IOException{
		
		Book o = bookMapper.selectByPrimaryKey(id);
		Book o_back = bookMapper.selectByPrimaryKey(id);
		
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
					
		if(publishdate!=null){
			o.setPublishdate(publishdate);
		}
					
		if(level!=null){
			o.setLevel(level);
		}
					
		if(press!=null){
			o.setPress(press);
		}
					
		bookMapper.updateByPrimaryKey(o);
		return Util.getResult(1, "修改成功","");
			
	}

	@ResponseBody
	@RequestMapping(value="search.do")
	public String search(Integer page,Integer pageRow,Integer id,String num,String name,String publishdate,String level,String press){
		
		if(page==null) {
			return Util.getResult(1, "", bookMapper.selectByExample(null));
		}
		if(pageRow==null)pageRow=10;

		BookExample e = new BookExample();
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
		
		if(publishdate!=null){
			c.andPublishdateLike("%"+publishdate+"%");
		}
		
		if(level!=null){
			c.andLevelLike("%"+level+"%");
		}
		
		if(press!=null){
			c.andPressLike("%"+press+"%");
		}
		
		PageHelper.startPage(page, pageRow);
		List<Book> alllist = bookMapper.selectByExample(e);
		PageInfo list = new PageInfo(alllist);
		return Util.getResult(1, "",list);
		
	}
	
	
}
				