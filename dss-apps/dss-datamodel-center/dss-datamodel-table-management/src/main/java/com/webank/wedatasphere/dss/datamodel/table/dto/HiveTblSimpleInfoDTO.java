package com.webank.wedatasphere.dss.datamodel.table.dto;


import lombok.Data;

import java.util.Date;

@Data
public class HiveTblSimpleInfoDTO {
    private String guid;
    private String name;
    private String qualifiedName;
    private Date createTime;
    private String owner;
}
