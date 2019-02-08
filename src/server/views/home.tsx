import React from "react";
import { DefaultLayout } from "./layouts/default";

const Home = ({
    markup,
    initialState,
    env,
}) => (
    <DefaultLayout
        markup={markup}
        initialState={initialState}
        env={env}
    />
);

export default Home;