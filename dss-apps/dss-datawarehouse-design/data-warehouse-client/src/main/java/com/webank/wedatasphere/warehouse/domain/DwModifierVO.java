package com.webank.wedatasphere.warehouse.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Setter
@Getter
@ToString
public class DwModifierVO {
    private Long id;
    private String modifierType;
    private String modifierTypeEn;
    private String layerArea;
    private String layerAreaEn;
    private String themeArea;
    private String themeAreaEn;
    private String description;
    private Boolean isAvailable;
    private Date createTime;
    private Date updateTime;
//    private int referenceCount;
}
