package com.system.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

public class UploadUtils {
	public static String upload(HttpServletRequest request,MultipartFile file,String picPath) throws IllegalStateException, IOException{
		String path = request.getSession().getServletContext().getRealPath(picPath);
		File f = new File(path);
		if(!f.exists()){
			f.mkdirs();
		}
		if(!file.isEmpty()){
			String saveName = UUID.randomUUID().toString() + file.getOriginalFilename().substring
					(file.getOriginalFilename().lastIndexOf("."));
			file.transferTo(new File(path + "/" + saveName));
			return saveName;
		}
		return null;
	}
	
	public static void deleteFile(String filePath,HttpServletRequest request){
		try {
			File file = new File(request.getSession().getServletContext().getRealPath("/"+filePath));   
			if(file.exists()){
				 file.delete();
			}else{
				 throw new Exception("file not exist"+filePath);
			}
		} catch (Exception e) {
			 e.printStackTrace();
		}
	}
}
