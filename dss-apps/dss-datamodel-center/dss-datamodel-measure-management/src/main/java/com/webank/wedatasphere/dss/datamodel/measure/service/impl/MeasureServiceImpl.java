package com.webank.wedatasphere.dss.datamodel.measure.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.webank.wedatasphere.dss.datamodel.center.common.constant.ErrorCode;
import com.webank.wedatasphere.dss.datamodel.center.common.exception.DSSDatamodelCenterException;
import com.webank.wedatasphere.dss.datamodel.measure.dao.DssDatamodelMeasureMapper;
import com.webank.wedatasphere.dss.datamodel.measure.dto.MeasureQueryDTO;
import com.webank.wedatasphere.dss.datamodel.measure.entity.DssDatamodelMeasure;
import com.webank.wedatasphere.dss.datamodel.measure.service.MeasureService;
import com.webank.wedatasphere.dss.datamodel.measure.vo.MeasureAddVO;
import com.webank.wedatasphere.dss.datamodel.measure.vo.MeasureEnableVO;
import com.webank.wedatasphere.dss.datamodel.measure.vo.MeasureQueryVO;
import com.webank.wedatasphere.dss.datamodel.measure.vo.MeasureUpdateVO;
import com.webank.wedatasphere.linkis.server.Message;
import org.apache.commons.lang.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.stream.Collectors;


@Service
public class MeasureServiceImpl extends ServiceImpl<DssDatamodelMeasureMapper, DssDatamodelMeasure>  implements MeasureService {


    private final ModelMapper modelMapper = new ModelMapper();


    @Override
    @Transactional
    public int addMeasure(MeasureAddVO vo) {
        DssDatamodelMeasure newOne = modelMapper.map(vo,DssDatamodelMeasure.class);
        newOne.setCreateTime(new Date());
        newOne.setUpdateTime(new Date());
        return getBaseMapper().insert(newOne);
    }


    @Override
    @Transactional
    public int enableMeasure(Long id , MeasureEnableVO vo) {
        DssDatamodelMeasure enableOne = new DssDatamodelMeasure();
        enableOne.setIsAvailable(vo.getIsAvailable());
        enableOne.setUpdateTime(new Date());
        return getBaseMapper().update(enableOne, Wrappers.<DssDatamodelMeasure>lambdaUpdate().eq(DssDatamodelMeasure::getId,id));
    }


    @Override
    @Transactional
    public int updateMeasure(Long id, MeasureUpdateVO vo) {
        DssDatamodelMeasure updateOne =modelMapper.map(vo,DssDatamodelMeasure.class);
        updateOne.setUpdateTime(new Date());
        return getBaseMapper().update(updateOne, Wrappers.<DssDatamodelMeasure>lambdaUpdate().eq(DssDatamodelMeasure::getId,id));
    }


    @Override
    @Transactional
    public int deleteMeasure(Long id) {
        //todo 校验引用情况
        return getBaseMapper().deleteById(id);
    }


    @Override
    public Message listMeasures(MeasureQueryVO vo) {
        QueryWrapper<DssDatamodelMeasure> queryWrapper = new QueryWrapper<DssDatamodelMeasure>()
                .like(StringUtils.isNotBlank(vo.getName()),"name",vo.getName())
                .eq(vo.getIsAvailable()!=null,"is_available",vo.getIsAvailable())
                .like(StringUtils.isNotBlank(vo.getOwner()),"owner",vo.getOwner());
        IPage<DssDatamodelMeasure> iPage = page(new Page<>(vo.getPageNum(),vo.getPageSize()),queryWrapper);

        return Message.ok()
                .data("list",iPage
                        .getRecords()
                        .stream()
                        .map(dssDatamodelMeasure -> modelMapper.map(dssDatamodelMeasure, MeasureQueryDTO.class))
                        .collect(Collectors.toList()))
                .data("total",iPage.getTotal());
    }


    @Override
    public MeasureQueryDTO queryById(Long id) throws DSSDatamodelCenterException {
        DssDatamodelMeasure dssDatamodelMeasure = getBaseMapper().selectById(id);
        if (dssDatamodelMeasure == null){
            throw new DSSDatamodelCenterException(ErrorCode.MEASURE_QUERY_ERROR.getCode(), "measure id " +id +" not exists");
        }
        return modelMapper.map(dssDatamodelMeasure,MeasureQueryDTO.class);
    }
}
