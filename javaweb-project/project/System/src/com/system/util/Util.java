package com.system.util;

import com.alibaba.fastjson.JSON;

public class Util {
	public static String getResult(Integer code,String msg,Object data){
		return JSON.toJSONString(new Result(code,msg,data));
	};
}
