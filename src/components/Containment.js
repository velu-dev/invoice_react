import React, { Component, Fragment } from "react";
import ContentLoader from 'react-content-loader'
import Image from 'react-bootstrap/Image';
import { assetURL } from '_constants/BaseConfig';
import Alert from 'react-bootstrap/Alert'

export const FancyBorder = (props)=>{
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

export const AlertBox = (props)=>{
  return (
    props.alertBox ?
    <Alert variant='danger'>{props.alertMessage}</Alert>
    :null
  );
}
