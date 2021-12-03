import API_PATH from "@/common/config/apiPath.js";
import api from "@/common/service/api";

/**
 * 查询主主题域
 * @params {workspaceId}
 * @returns Array
 */
export const getThemedomains = ({
  page,
  size,
  name,
  enabled
} = {}) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains`,
    {page, size, name, enabled},
    "get"
  );

/**
 * 创建主体域
 * @params {workspaceId}
 * @returns {Promise}
 */
export const createThemedomains = body =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains`,
    body,
    "post"
  );

/**
 * 删除主题域
 * @params {id}
 * @returns {Promise}
 */
export const deleteThemedomains = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains/${id}`,
    {},
    "delete"
  );

/**
 * 禁用主题域
 * @params {workspaceId}
 * @returns {Promise}
 */
export const disableThemedomains = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains/${id}/disable`,
    {},
    "put"
  );

/**
 * 启用主题域
 * @params {workspaceId}
 * @returns {Promise}
 */
export const enableThemedomains = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains/${id}/enable`,
    {},
    "put"
  );

/**
 * 根据id获取主题
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getThemedomainsById = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains/${id}`,
    {},
    "get"
  );

/**
 * 编辑主题
 * @params {workspaceId}
 * @returns {Promise}
 */
export const editThemedomains = (id, body) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}themedomains/${id}`,
    body,
    "put"
  );

/**
 * 查询所有分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getLayersAll = ({isAvailable = undefined}) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}layers/all`,
    {isAvailable},
    "get"
  );

/**
 * 查询所有预置分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getLayersPreset = () =>
  api.fetch(`${API_PATH.WAREHOUSE_PATH}layers/preset`, "get");

/**
 * 分页查询自定义分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getLayersCustom = (page = 1, size = 10) =>
  api.fetch(`${API_PATH.WAREHOUSE_PATH}layers/custom`, "get");

/**
 * 新增自定义分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const createLayersCustom = body =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}layers/custom`,
    body,
    "post"
  );

/**
 * 根据ID查询某个分层信息
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getLayersById = id =>
  api.fetch(`${API_PATH.WAREHOUSE_PATH}layers/${id}`, {}, "get");

/**
 * 编辑分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const editLayersCustom = (id, body) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}layers/${id}`,
    body,
    "put"
  );

/**
 * 删除分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const deleteLayers = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}layers/${id}`,
    {},
    "delete"
  );

/**
 * 禁用分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const disableLayers = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}layers/${id}/disable`,
    {},
    "put"
  );

/**
 *  启用分层
 * @params {workspaceId}
 * @returns {Promise}
 */
export const enableLayers = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}layers/${id}/enable`,
    {},
    "put"
  );

/**
 * 获取可用库
 * @returns {Promise}
 */
export const getDbs = () =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}dbs/hive`,
    {},
    "get"
  );

/**
 *  创建修饰词
 * @params {workspaceId}
 * @returns {Promise}
 */
export const createModifiers = body =>
  api.fetch(`${API_PATH.WAREHOUSE_PATH}modifiers`, body, "post");

/**
 *  删除修饰词
 * @params {workspaceId}
 * @returns {Promise}
 */
export const deleteModifiers = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}modifiers/${id}`,
    {},
    "delete"
  );

/**
 *  编辑修饰词
 * @params {workspaceId}
 * @returns {Promise}
 */
export const editModifiers = (id, body) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}modifiers/${id}`,
    body,
    "put"
  );

/**
 *  分页获取修饰词
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getModifiers = ({page, size, name, enabled} = {}) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}modifiers`,
    {page, size, name, enabled},
    "get"
  );

/**
 *  根据id获取
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getModifiersById = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}modifiers/${id}`,
    {},
    "get"
  );

/**
 * 禁用修饰词
 * @params {workspaceId}
 * @returns {Promise}
 */
export const disableModifiers = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}modifiers/${id}/disable`,
    {},
    "put"
  );

/**
 *  启用修饰词
 * @params {workspaceId}
 * @returns {Promise}
 */
export const enableModifiers = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}modifiers/${id}/enable`,
    {},
    "put"
  );

////////

/**
 *  创建统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const createStatisticalPeriods = body =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods`,
    body,
    "post"
  );

/**
 *  删除统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const deleteStatisticalPeriods = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods/${id}`,
    {},
    "delete"
  );

/**
 *  编辑统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const editStatisticalPeriods = (id, body) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods/${id}`,
    body,
    "put"
  );

/**
 *  分页获取统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getStatisticalPeriods = ({page, size, name, enabled} = {}) =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods`,
    {page, size, name, enabled},
    "get"
  );

/**
 *  根据id获取统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const getStatisticalPeriodsById = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods/${id}`,
    {},
    "get"
  );

/**
 * 禁用统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const disableStatisticalPeriods = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods/${id}/disable`,
    {},
    "put"
  );

/**
 *  启用统计周期
 * @params {workspaceId}
 * @returns {Promise}
 */
export const enableStatisticalPeriods = id =>
  api.fetch(
    `${API_PATH.WAREHOUSE_PATH}statistical_periods/${id}/enable`,
    {},
    "put"
  );
