export const server = (done) => {
    app.plugins.browsersync.init({
        server: "./dist",// `${app.path.build.html}`
    
      //  tunnel: true,S
        logPrefix: "gulp_frontend",
        notify: false,
        browser: "firefox"//google chrome
    });
}