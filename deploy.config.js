module.exports = {
  apps: [
    {
      name: "social-media-api",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8001,
      },
      time: true,
    },
  ],
};

// 8080 / 80 default
// start 8*
// port 80 untuk domain utama

//port yang jgn digunakan 22,443,1240,1028,docker,db,redis
