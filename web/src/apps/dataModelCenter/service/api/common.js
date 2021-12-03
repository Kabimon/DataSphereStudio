import API_PATH from "@/common/config/apiPath.js";
import api from "@/common/service/api";

/**
 * 主题域列表
 * @returns {Object.result}
 *
 */
export const getThemesList = () =>
  api.fetch(`${API_PATH.DATAMODEL_PATH}themes/list`, {}, "post");

/**
 * 分层列表
 * @returns {Object.result}
 *
 */
export const getLayersList = () =>
  api.fetch(`${API_PATH.DATAMODEL_PATH}layers/list`, {}, "post");

/**
 * 修饰词列表
 * @returns {Object.result}
 *
 */
export const getModifiersList = () =>
  api.fetch(`${API_PATH.DATAMODEL_PATH}modifiers/list`, {}, "post");

/**
 * 周期列表
 * @returns {Object.result}
 *
 */
export const getCyclesList = () =>
  api.fetch(`${API_PATH.DATAMODEL_PATH}cycles/list`, {}, "post");
