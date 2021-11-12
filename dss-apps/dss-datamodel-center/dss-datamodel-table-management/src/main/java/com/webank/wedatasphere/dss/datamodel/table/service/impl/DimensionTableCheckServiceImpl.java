package com.webank.wedatasphere.dss.datamodel.table.service.impl;


import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.webank.wedatasphere.dss.datamodel.center.common.service.DimensionTableCheckService;
import com.webank.wedatasphere.dss.datamodel.table.entity.DssDatamodelTableColumns;
import com.webank.wedatasphere.dss.datamodel.table.entity.DssDatamodelTableVersion;
import com.webank.wedatasphere.dss.datamodel.table.service.TableColumnsService;
import com.webank.wedatasphere.dss.datamodel.table.service.TableVersionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class DimensionTableCheckServiceImpl implements DimensionTableCheckService {

    @Resource
    private TableColumnsService tableColumnsService;

    @Resource
    private TableVersionService tableVersionService;


    @Override
    public Boolean referenceCase(String name) {
        int columnCount = tableColumnsService.getBaseMapper().selectCount(
                Wrappers.<DssDatamodelTableColumns>lambdaQuery()
                        .eq(DssDatamodelTableColumns::getModelType, 0)
                        .eq(DssDatamodelTableColumns::getModelName, name));
        int columnVersionCount = getColumnVersionCount(name);
        return columnCount > 0 || columnVersionCount>0 ;
    }


    @Override
    public Boolean referenceCaseEn(String name) {
        int columnCount = tableColumnsService.getBaseMapper().selectCount(
                Wrappers.<DssDatamodelTableColumns>lambdaQuery()
                        .eq(DssDatamodelTableColumns::getModelType, 0)
                        .eq(DssDatamodelTableColumns::getModelNameEn, name));
        int columnVersionCount = getColumnVersionCount(name);
        return columnCount > 0 || columnVersionCount>0 ;
    }

    private int getColumnVersionCount(String name) {
        return tableVersionService.getBaseMapper().selectCount(
                Wrappers.<DssDatamodelTableVersion>lambdaQuery()
                        .like(DssDatamodelTableVersion::getColumns, "\"" + name + "\""));
    }
}
