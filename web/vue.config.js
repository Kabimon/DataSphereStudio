/*
 * Copyright 2019 WeBank
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const apps = require("./src/config.json");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// 获取packages中的版本号
const getVersion = () => {
  const pkgPath = path.join(__dirname, "./package.json");
  let pkg = fs.readFileSync(pkgPath);
  pkg = JSON.parse(pkg);
  return pkg.version;
};

// 指定module打包, 不指定则打包全部子应用
// npm run serve --module=scriptis
let modules = process.env.npm_config_module || "";
if (modules) {
  modules = modules.split(",");
  Object.keys(apps).forEach(m => {
    if (modules.indexOf(m) < 0) {
      delete apps[m];
    }
  });
} else {
  modules = Object.keys(apps);
}
let requireComponent = [];
let requireComponentVue = [];
let appsRoutes = [];
let appsI18n = [];
let headers = [];

function formatSplitChunksSubApps(apps) {
  let obj = {};
  Object.entries(apps).forEach(([key, value]) => {
    let routePath = value.routes.split("/");
    let path = routePath.splice(0, routePath.length - 1).join("[\\\\/]");
    obj[key] = {
      test: new RegExp("[\\\\/]" + path + "[\\\\/]"),
      name: key + "-app",
      enforce: true,
      reuseExistingChunk: true
    };
  });
  return obj;
}

Object.entries(apps).forEach(item => {
  // 自动加载各个模块的 module
  if (item[1].module) {
    requireComponent.push(
      `require.context('@/${item[1].module}',true,/([a-z|A-Z])+\\/index\.js$/)`
    );
    requireComponentVue.push(
      `require.context('@/${item[1].module}',true,/([a-z|A-Z])+.vue$/)`
    );
  }
  // 获取个模块header
  if (item[1].header) {
    headers.push(`${item[0]}: require('@/${item[1].header}/index.js')`);
  }
  // 处理路由
  if (item[1].routes) {
    appsRoutes.push(`${item[0]}: require('@/${item[1].routes}')`);
  }
  // 处理国际化
  if (item[1].i18n) {
    appsI18n.push(`{
      'zh-CN': require('@/${item[1].i18n["zh-CN"]}'),
      'en': require('@/${item[1].i18n["en"]}')
    }`);
  }
});

let buildDynamicModules = Object.values(apps);
buildDynamicModules = JSON.stringify(buildDynamicModules);
// 虚拟模块
const virtualModules = new VirtualModulesPlugin({
  "node_modules/dynamic-modules.js": `module.exports = {
    apps: ${buildDynamicModules},
    modules: ${JSON.stringify(modules)},
    appsRoutes: {${appsRoutes.join(",")}},
    appsI18n: [${appsI18n.join(",")}],
    requireComponent: [${requireComponent.join(",")}],
    requireComponentVue: [${requireComponentVue.join(",")}],
    microModule: ${JSON.stringify(process.env.npm_config_micro_module) ||
      false},
    headers:{${headers.join(",")}}
  };`
});

const plugins = [
  virtualModules,
  // new BundleAnalyzerPlugin(),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|ja/)
];

// 针对木桶子模块加载一些插件
// scriptis 有使用编辑器组件, 需要Monaco Editor
if (modules.indexOf("scriptis") > -1) {
  plugins.push(
    new MonacoWebpackPlugin({
      languages: []
    })
  );
}

/**
 * resolve
 * @param {*} dir
 */
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  outputDir: "dist/dist",
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/components/svgIcon"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/components/svgIcon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "sandbox" ||
      process.env.NODE_ENV === "bdp"
    ) {
      config.plugin("compress").use(FileManagerPlugin, [
        {
          onEnd: {
            copy: [
              { source: "./config.sh", destination: `./dist` },
              {
                source: "./install.sh",
                destination: `./dist`
              }
            ], // 先删除根目录下的zip包
            delete: [
              `./wedatasphere-DataSphereStudio-${getVersion()}-dist.zip`
            ], // 将dist文件夹下的文件进行打包
            archive: [
              {
                source: "./dist",
                destination: `./wedatasphere-DataSphereStudio-${getVersion()}-dist.zip`
              }
            ]
          }
        }
      ]);
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          "monaco-editor": {
            test: /[\\/]monaco-editor[\\/]/,
            name: "monaco-editor",
            enforce: true,
            reuseExistingChunk: true
          },
          svgIcon: {
            test: /[\\/]svgIcon[\\/]/,
            name: "svgIcon",
            enforce: true,
            reuseExistingChunk: true
          },
          iview: {
            test: /[\\/]iview[\\/]/,
            name: "iview",
            enforce: true,
            reuseExistingChunk: true
          },
          "@antv": {
            test: /[\\/]@antv[\\/]/,
            name: "@antv",
            enforce: true,
            reuseExistingChunk: true
          },
          lodash: {
            test: /[\\/]lodash[\\/]/,
            name: "lodash",
            enforce: true,
            reuseExistingChunk: true
          },
          "dt-sql-parser": {
            test: /[\\/]dt-sql-parser[\\/]/,
            name: "dt-sql-parser",
            enforce: true,
            reuseExistingChunk: true
          },
          ...formatSplitChunksSubApps(apps)
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@component": path.resolve(__dirname, "./src/components"), // 各个子应用
        "@apiServices": path.resolve(__dirname, "./src/apps/apiServices"),
        "@dataAssetManage": path.resolve(
          __dirname,
          "./src/apps/dataAssetManage"
        ),
        "@dataModelCenter": path.resolve(
          __dirname,
          "./src/apps/dataModelCenter"
        ),
        "@dataWarehouseDesign": path.resolve(
          __dirname,
          "./src/apps/dataWarehouseDesign"
        ),
        "@scriptis": path.resolve(__dirname, "./src/apps/scriptis"),
        "@workflows": path.resolve(__dirname, "./src/apps/workflows"),
        "@workspace": path.resolve(__dirname, "./src/apps/workspace")
      }
    },
    plugins
  }, // 选项...
  pluginOptions: {
    mock: {
      entry: "mock.js",
      power: false
    }
  },
  devServer: {
    host: "0.0.0.0",
    compress: true,
    proxy: {
      "/api": {
        target: "http://121.36.12.247:8088/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
};
