package com.webank.wedatasphere.dss.framework.workspace.client.exception

import com.webank.wedatasphere.linkis.common.exception.ErrorException

class WorkSpaceClientBuilderException(errorDesc: String) extends ErrorException(60022, errorDesc)
