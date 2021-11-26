package com.webank.wedatasphere.dss.data.governance.dto;


import lombok.Data;
import org.apache.atlas.model.instance.AtlasEntityHeader;

@Data
public class ListLabelDTO {
    private String name;
    private String guid;

    public static ListLabelDTO from(AtlasEntityHeader atlasEntityHeader){
        ListLabelDTO dto = new ListLabelDTO();
        dto.setGuid(atlasEntityHeader.getGuid());
        dto.setName(atlasEntityHeader.getAttribute("name").toString());
        return dto;
    }
}
