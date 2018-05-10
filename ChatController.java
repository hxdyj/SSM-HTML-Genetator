package com.cultral.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;

import com.cultral.mapper.ChatMapper;
import com.cultral.model.Chat;
import com.cultral.model.ChatExample;
import com.cultral.model.ChatExample.Criteria;
import com.cultral.util.UploadUtils;



@Controller
public class ChatController {
	@Autowired
	private ChatMapper chatm = null;
	
	@ResponseBody
	@RequestMapping("chat/tid.do")
	public String getbytid(Integer tid){	
		ChatExample e = new ChatExample();
		Criteria c =  e.createCriteria();
		c.andTidEqualTo(tid);
		return JSON.toJSONString(chatm.selectByExample(e));
	}
	
	@ResponseBody
	@RequestMapping(value="chat/add.do",method = RequestMethod.POST)
	public String getbyid(Integer tid,Integer uid,MultipartFile file,String content,String sendtime,HttpServletRequest request)throws IllegalStateException, IOException{	
		String path = "";
		if(file!=null){path = UploadUtils.upload(request, file, "/pic");}
		if(content!=null){}else{content="";}
		Chat o = new Chat();
		o.setFile(path);
		o.setSendtime(sendtime);
		o.setTid(tid);
		o.setUid(uid);
		o.setContent(content);
		chatm.insert(o);
		return "success";
	}
	
	@ResponseBody
	@RequestMapping("chat/del.do")
	public String del(Integer id){	
		chatm.deleteByPrimaryKey(id);
		return "success";
	}
}
