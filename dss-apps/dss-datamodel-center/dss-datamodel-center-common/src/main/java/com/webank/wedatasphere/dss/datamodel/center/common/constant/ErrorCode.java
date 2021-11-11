package com.webank.wedatasphere.dss.datamodel.center.common.constant;


public enum ErrorCode {

    INDICATOR_VERSION_ADD_ERROR(212031),
    INDICATOR_VERSION_ROLL_BACK_ERROR(212032),

    MEASURE_QUERY_ERROR(212101),
    MEASURE_DELETE_ERROR(212102),
    MEASURE_ADD_ERROR(212103),
    MEASURE_UPDATE_ERROR(212104),

    DIMENSION_QUERY_ERROR(212201),
    DIMENSION_DELETE_ERROR(212202),
    DIMENSION_ADD_ERROR(212203),
    DIMENSION_UPDATE_ERROR(212204),

    INDICATOR_ADD_ERROR(212001),
    INDICATOR_QUERY_ERROR(212002),
    INDICATOR_UPDATE_ERROR(212003),
    INDICATOR_DELETE_ERROR(212004),
    INDICATOR_CONTENT_ADD_ERROR(212011),


    TABLE_ADD_ERROR(212301),
    TABLE_UPDATE_ERROR(212302),
    TABLE_QUERY_ERROR(212303),
    TABLE_VERSION_ADD_ERROR(212304),
    TABLE_VERSION_ROLL_BACK_ERROR(212305),
    TABLE_COLLECT_ADD_ERROR(212306),
    TABLE_COLUMN_ADD_ERROR(212307),
    TABLE_CREATE_ERROR(212308),
    TABLE_CREATE_SQL_ERROR(212309),
    TABLE_CHECK_ERROR(212310);




    private int code;

    ErrorCode(int i) {
        code = i;
    }

    public int getCode() {
        return code;
    }
}
