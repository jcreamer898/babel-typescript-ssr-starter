import React from 'react';
import {renderToString} from 'react-dom/server';

export const ssr = (Component, props) => renderToString(<Component {...props} />);
