const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
// __dirname는 현재의 프로젝트 디렉토리 이름인데 어디서든 접근 가능한 Node.js 전역 변수이다.
//  entry 파일의 경로를 쓰면 assets~ main.js이다
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        // 네가 확장자 scss인 파일을 만날때마다 어떤 loader를 실행해라
        // loader는 기본적으로 webpack에게 파일을 처리하는 방법을 알려주는 역할을 한다.
        test: /\.(scss)$/,
        // scss파일을 찾았을 때는 가장 먼저 scss를 css로 바꾸고 그 css에 해당하는 텍스트 전체를 취해서
        // 그 텍스트를 추출해서 css파일로 저장해야 한다.
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
            // webpack이 css를 이해할 수 있게 된다.
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
            // 여러 브라우저와 호환가능하게 만들어준다.
            // css를 받아서, 여기에 주는 plugin을 가지고 css를 변환
          },
          {
            loader: "sass-loader"
            // sass, 혹은 scss를 받아서 일반 css로 바꿔줄수 있음
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
