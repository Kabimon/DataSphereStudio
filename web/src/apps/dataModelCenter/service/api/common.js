import API_PATH from "@/common/config/apiPath.js";
import api from "@/common/service/api";

/**
 * 主题域列表
 * @returns {Promise}
 *
 */
export const getThemesList = () => api.fetch(`${API_PATH.DATAMODEL_PATH}themes/list`, {}, "post");

/**
 * 分层列表
 * @param dbName {String} 可用库名称
 * @returns {Promise}
 *
 */
export const getLayersList = (dbName) => api.fetch(`${API_PATH.DATAMODEL_PATH}layers/list`, {
  dbName
}, "post");

/**
 * 修饰词列表
 * @returns {Promise}
 *
 */
export const getModifiersList = () => api.fetch(`${API_PATH.DATAMODEL_PATH}modifiers/list`, {}, "post");

/**
 * 周期列表
 * @returns {Promise}
 *
 */
export const getCyclesList = () => api.fetch(`${API_PATH.DATAMODEL_PATH}cycles/list`, {}, "post");
