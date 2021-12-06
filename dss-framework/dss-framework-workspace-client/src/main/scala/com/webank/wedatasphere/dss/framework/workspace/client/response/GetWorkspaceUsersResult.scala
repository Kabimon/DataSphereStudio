package com.webank.wedatasphere.dss.framework.workspace.client.response

import com.webank.wedatasphere.dss.framework.workspace.client.entity.{DSSWorkspaceRole, DSSWorkspaceUser}
import com.webank.wedatasphere.linkis.httpclient.dws.DWSHttpClient
import com.webank.wedatasphere.linkis.httpclient.dws.annotation.DWSHttpMessageResult
import com.webank.wedatasphere.linkis.httpclient.dws.response.DWSResult

import java.util
import scala.beans.BeanProperty

@DWSHttpMessageResult("/api/rest_j/v\\d+/dss/framework/workspace/getWorkspaceUsers/(\\S+)")
class GetWorkspaceUsersResult extends DWSResult{
  @BeanProperty var roles:util.List[java.util.Map[String, Any]] = _
  @BeanProperty var workspaceUsers:util.List[java.util.Map[String, Any]] = _
  @BeanProperty var total:Long = _

  def getWorkspaceRoleList:util.List[DSSWorkspaceRole]={
    import scala.collection.JavaConverters._
    roles.asScala.map(x=>{
      val str = DWSHttpClient.jacksonJson.writeValueAsString(x)
      DWSHttpClient.jacksonJson.readValue(str, classOf[DSSWorkspaceRole])
    }).asJava
  }

  def getWorkspaceUserList:util.List[DSSWorkspaceUser]={
    import scala.collection.JavaConverters._
    roles.asScala.map(x=>{
      val str = DWSHttpClient.jacksonJson.writeValueAsString(x)
      DWSHttpClient.jacksonJson.readValue(str, classOf[DSSWorkspaceUser])
    }).asJava
  }
}
