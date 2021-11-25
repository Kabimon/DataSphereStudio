package com.webank.wedatasphere.dss.data.governance.entity;


public enum GlossaryConstant {
    LABEL(0,"label","AtlasGlossaryTerm","标签"),
    COLLECTION(1,"collection","AtlasGlossaryTerm","收藏");

    private int type;

    private String typeCode;

    private String atlasType;

    private String root;

    public static final String SEPARATOR = "@";

    public static final String ARR = "qualifiedName";

    GlossaryConstant(int type, String typeCode,String atlasType, String root) {
        this.type = type;
        this.atlasType = atlasType;
        this.typeCode = typeCode;
        this.root = root;
    }

    public int getType() {
        return type;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public String getAtlasType() {
        return atlasType;
    }

    public String getRoot() {
        return root;
    }

    public String formatQuery(String query){
        return query+SEPARATOR+this.getRoot();
    }
}
