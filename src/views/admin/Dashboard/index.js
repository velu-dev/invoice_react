import React, { Component } from "react";
import { Breadcrumb, DashboardContentLoader } from 'components';

export default class extends Component {
 
  render() {
    const { match } = this.props;   
    return (
      <div className="main-content">
        <Breadcrumb match={match} />
        <DashboardContentLoader/>
      </div>
    );
  }
}
