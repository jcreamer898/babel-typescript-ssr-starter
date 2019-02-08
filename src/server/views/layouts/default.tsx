import React from "react";

export const DefaultLayout = ({
    markup,
    children,
    initialState,
    env,
}) => (
    <html>
        <head>
            {env === "production" && <link rel="stylesheet" type="text/css" href="/assets/app.css" />}
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>

            <script dangerouslySetInnerHTML={{ __html: `window.__initialState__ = ${JSON.stringify(initialState).replace(
                /</g,
                '\\u003c'
            )}` }}>
            </script> 
            <script src="/assets/app.web.js" />
        </body>
    </html>
);