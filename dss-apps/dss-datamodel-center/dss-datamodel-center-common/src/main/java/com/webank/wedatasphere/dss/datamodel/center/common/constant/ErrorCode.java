package com.webank.wedatasphere.dss.datamodel.center.common.constant;

/**
 * @author helong
 * @date 2021/9/16
 */
public enum ErrorCode {

    INDICATOR_VERSION_ADD_ERROR(1111),
    INDICATOR_VERSION_ROLL_BACK_ERROR(111),

    MEASURE_QUERY_ERROR(1111),

    DIMENSION_QUERY_ERROR(1111),

    INDICATOR_ADD_ERROR(1111),
    INDICATOR_QUERY_ERROR(1111),
    INDICATOR_UPDATE_ERROR(1112),
    INDICATOR_CONTENT_ADD_ERROR(1113);


    private int code;

    ErrorCode(int i) {
        code = i;
    }

    public int getCode() {
        return code;
    }
}
