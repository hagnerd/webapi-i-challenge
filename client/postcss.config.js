const purgecss = require("@fullhuman/postcss-purgecss");

const purgecssConfig = {
  content: ["./src/**/*.js", "./public/index.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9_:/]+/g) || []
};

module.exports = {
  plugins: [
    require("tailwindcss"),
    ...(process.env.NODE_ENV === "production"
      ? [purgecss(purgecssConfig), require("autoprefixer")]
      : [])
  ]
};
