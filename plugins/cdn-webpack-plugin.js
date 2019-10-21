const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fetch = require("node-fetch");

const pluginName = "CdnWebpackPlugin";

class CdnWebpackPlugin {
  constructor(cdn) {
    if (!cdn) {
      throw Error("cdn is required");
    }
    this.cdn = cdn;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(pluginName, (htmlWebpackPluginData, cb) => {
        const assetsTags = [...htmlWebpackPluginData.assetTags.styles, ...htmlWebpackPluginData.assetTags.scripts];
        Promise.all(assetsTags.map(assetTag => this.promisify(compilation.assets, assetTag)))
          .then(res => {
            console.log(res);
            cb(null, htmlWebpackPluginData);
          })
          .catch(cb);
      });
    });
  }

  promisify(assets, assetTag) {
    const attr = assetTag.tagName === "link" ? "href" : "src";
    const filename = assetTag.attributes[attr];
    return this.upload(filename, assets[filename].source()).then(url => {
      assetTag.attributes[attr] = url;
      return url;
    });
  }

  upload(filename, content) {
    return fetch(this.cdn, {
      method: "post",
      body: JSON.stringify({ filename, content }),
      headers: { "Content-Type": "application/json" }
    }).then(res => res.text());
  }
}

module.exports = CdnWebpackPlugin;
