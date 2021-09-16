package com.webank.wedatasphere.dss.datamodel.indicator.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.webank.wedatasphere.dss.datamodel.indicator.entity.DssDatamodelIndicatorContent;
import com.webank.wedatasphere.dss.datamodel.indicator.vo.IndicatorContentVO;
import com.webank.wedatasphere.linkis.common.exception.ErrorException;

/**
 * @author helong
 * @date 2021/9/16
 */
public interface IndicatorContentService extends IService<DssDatamodelIndicatorContent> {

    /**
     * 新增
     *
     * @param vo
     * @return
     */
    int addIndicatorContent(Long indicateId, String version, IndicatorContentVO vo) throws ErrorException;


    /**
     * 修改
     * @param indicateId
     * @param version
     * @param vo
     * @return
     * @throws ErrorException
     */
    int updateIndicatorContent(Long indicateId, String version, IndicatorContentVO vo) throws ErrorException;
}
