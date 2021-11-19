package com.webank.wedatasphere.warehouse.client.action

import com.webank.wedatasphere.linkis.httpclient.request.GetAction
import com.webank.wedatasphere.warehouse.client.DwAction

class ListDwModifierAction extends GetAction with DwAction {
  private var user: String = _
  private var isAvailable: Boolean = true
  private var theme: String = _
  private var layer: String = _

  def setIsAvailable(isAvailable: Boolean): Unit = this.isAvailable = isAvailable

  def getIsAvailable: Boolean = this.isAvailable

  def setTheme(theme: String): Unit = this.theme = theme

  def getTheme: String = this.theme

  def setLayer(layer: String): Unit = this.layer = layer

  def getLayer: String = this.layer

  override def setUser(user: String): Unit = this.user = user

  override def getUser: String = this.user

  override def suffixURLs: Array[String] = Array("data-warehouse", "modifiers", "all")
}
