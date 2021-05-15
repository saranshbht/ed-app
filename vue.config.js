module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === "production" ? "/ed-app/" : "/",
};
