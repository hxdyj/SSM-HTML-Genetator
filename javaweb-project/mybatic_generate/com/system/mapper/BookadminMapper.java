package com.system.mapper;

import com.system.model.Bookadmin;
import com.system.model.BookadminExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BookadminMapper {
    int countByExample(BookadminExample example);

    int deleteByExample(BookadminExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Bookadmin record);

    int insertSelective(Bookadmin record);

    List<Bookadmin> selectByExample(BookadminExample example);

    Bookadmin selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Bookadmin record, @Param("example") BookadminExample example);

    int updateByExample(@Param("record") Bookadmin record, @Param("example") BookadminExample example);

    int updateByPrimaryKeySelective(Bookadmin record);

    int updateByPrimaryKey(Bookadmin record);
}