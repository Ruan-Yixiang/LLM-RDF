module.exports = {
    plugins: [
        require('autoprefixer')(),
    ],
    assetsDir: 'static',
    devServer: {
        proxy: 'http://localhost:5000'
    }
};
