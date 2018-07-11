package com.system.mapper;

import com.system.model.Borrowadmin;
import com.system.model.BorrowadminExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BorrowadminMapper {
    int countByExample(BorrowadminExample example);

    int deleteByExample(BorrowadminExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Borrowadmin record);

    int insertSelective(Borrowadmin record);

    List<Borrowadmin> selectByExample(BorrowadminExample example);

    Borrowadmin selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Borrowadmin record, @Param("example") BorrowadminExample example);

    int updateByExample(@Param("record") Borrowadmin record, @Param("example") BorrowadminExample example);

    int updateByPrimaryKeySelective(Borrowadmin record);

    int updateByPrimaryKey(Borrowadmin record);
}