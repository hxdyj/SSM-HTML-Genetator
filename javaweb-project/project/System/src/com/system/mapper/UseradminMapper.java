package com.system.mapper;

import com.system.model.Useradmin;
import com.system.model.UseradminExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UseradminMapper {
    int countByExample(UseradminExample example);

    int deleteByExample(UseradminExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Useradmin record);

    int insertSelective(Useradmin record);

    List<Useradmin> selectByExample(UseradminExample example);

    Useradmin selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Useradmin record, @Param("example") UseradminExample example);

    int updateByExample(@Param("record") Useradmin record, @Param("example") UseradminExample example);

    int updateByPrimaryKeySelective(Useradmin record);

    int updateByPrimaryKey(Useradmin record);
}