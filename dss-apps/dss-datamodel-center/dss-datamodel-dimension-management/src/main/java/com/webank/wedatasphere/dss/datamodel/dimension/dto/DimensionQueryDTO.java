package com.webank.wedatasphere.dss.datamodel.dimension.dto;

import java.util.Date;


public class DimensionQueryDTO {
    private Long id;

    private String name;

    private String fieldIdentifier;

    private String formula;

    private String comment;

    /**
     * 数仓主题格式为： theme_domain_name.theme_name
     */
    private String warehouseThemeName;

    private String owner;

    /**
     * 授权的名字：userName、roleName
     */
    private String principalName;

    private Integer isAvailable;

    private Date createTime;

    private Date updateTime;

    /**
     * 被引用次数
     */
    private Integer refCount =0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFieldIdentifier() {
        return fieldIdentifier;
    }

    public void setFieldIdentifier(String fieldIdentifier) {
        this.fieldIdentifier = fieldIdentifier;
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getWarehouseThemeName() {
        return warehouseThemeName;
    }

    public void setWarehouseThemeName(String warehouseThemeName) {
        this.warehouseThemeName = warehouseThemeName;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getPrincipalName() {
        return principalName;
    }

    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    public Integer getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Integer isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getRefCount() {
        return refCount;
    }

    public void setRefCount(Integer refCount) {
        this.refCount = refCount;
    }
}
