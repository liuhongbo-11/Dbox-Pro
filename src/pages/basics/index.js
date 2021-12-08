import React, { Fragment } from 'react';

export default (props) => {
  console.log('props', props.children);
  return <Fragment>{props.children}</Fragment>;
};
