package com.webank.wedatasphere.dss.data.governance.response

import com.webank.wedatasphere.linkis.httpclient.dws.annotation.DWSHttpMessageResult
import com.webank.wedatasphere.linkis.httpclient.dws.response.DWSResult

import scala.beans.BeanProperty

@DWSHttpMessageResult("/api/rest_j/v\\d+/data-assets/asset/labels/bind")
class BindLabelResult extends DWSResult{
  @BeanProperty var result: Object = _
}
