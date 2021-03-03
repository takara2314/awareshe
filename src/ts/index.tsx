import React from 'react';
import { render } from 'react-dom';
import Root from './views/Root';
import '../css/styles.css';

// IDが root の要素に Root コンポーネントの内容を入れる
render(
  <Root />,
  document.getElementById('root')
);