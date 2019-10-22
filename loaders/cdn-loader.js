const loaderUtils = require("loader-utils");
const fetch = require("node-fetch");

module.exports = function loader(content) {
  this.cacheable && this.cacheable();
  const query = loaderUtils.getOptions(this);

  if (query && query.disable) {
    const urlLoader = require("url-loader");
    return urlLoader.call(this, content);
  }

  const callback = this.async();
  const filename = loaderUtils.interpolateName(this, "[name].[ext]", { content });

  fetch("http://localhost:3000/cdn", {
    method: "post",
    body: JSON.stringify({
      filename,
      content
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(url => {
      console.log(url);
      callback(null, `module.exports = ${JSON.stringify(url)}`);
    })
    .catch(callback);
};

module.exports.raw = true;
