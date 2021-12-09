import App from './src/views/App';
import ReactDom from 'react-dom';
import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const About = () => <h2>页面一</h2>;
const Users = () => <h2>页面二</h2>;

ReactDom.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about/" element={<About />} />
        <Route path="/users/" element={<Users />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
