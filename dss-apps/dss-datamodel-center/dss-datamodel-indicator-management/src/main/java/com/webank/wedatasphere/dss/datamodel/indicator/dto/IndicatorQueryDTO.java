package com.webank.wedatasphere.dss.datamodel.indicator.dto;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class IndicatorQueryDTO {
    private Long id;

    private String name;

    private String fieldIdentifier;

    private String comment;

    /**
     * 数仓主题格式为： theme_domain_name.theme_name
     */
    private String warehouseThemeName;

    private String warehouseThemeNameEn;

    private String themeAreaEn;

    private String layerAreaEn;

    private String owner;

    /**
     * 授权的名字：userName、roleName
     */
    private String principalName;

    private Integer isAvailable;

    private Integer isCoreIndicator;

    /**
     * 空：代表所有，如果是逗号分隔的字符串则代表对应的theme的names
     */
    private String themeArea;

    /**
     * 空：代表所有，如果是逗号分隔的字符串则代表对应的layer的names
     */
    private String layerArea;

    private Date createTime;

    private Date updateTime;

    private String version;

    /**
     * 引用次数
     */
    private Integer refCount = 0;

    private IndicatorContentQueryDTO content;


}
