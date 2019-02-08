module.exports = {
    "presets": [
        "@babel/react",
        "@babel/typescript",
        ["@babel/env", {
            "targets": {
                "node": true,
            }
        }]
    ],
    "plugins": ["css-modules-transform"]
}
