import React, { Component, Fragment } from "react";
import ContentLoader from 'react-content-loader'
import Image from 'react-bootstrap/Image';
import { assetURL } from '_constants/BaseConfig';

class ButtonLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <Image src={`${assetURL}images/btn-loader.gif`} alt="btn-loader" style={{ float: 'right' }} fluid />
      </Fragment>
    );
  }
}

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <Fragment>
        {/* <Image src={`${assetURL}images/btn-loader.gif`} alt="btn-loader" style={{float:'right'}} fluid /> */}
      </Fragment>
    );
  }
}


class TransactionFormLoader extends Component {
  render() {
    return (
       <ContentLoader 
          height={475}
          width={1000}    
          speed={1}
          primaryColor="#e9ecef"
          secondaryColor="#d6dee6"
        >
        <rect x="16" y="46" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="18" rx="3" ry="3" width="100" height="15" /> 
        <rect x="16" y="126" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="203" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="281" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="358" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="48" rx="3" ry="3" width="100" height="15" /> 
        <rect x="16" y="178" rx="3" ry="3" width="125" height="15" /> 
        <rect x="16" y="329" rx="3" ry="3" width="169" height="15" /> 
        <rect x="16" y="253" rx="3" ry="3" width="158" height="15" /> 
        <rect x="16" y="103" rx="3" ry="3" width="201" height="15" /> 
        <rect x="483" y="46" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="18" rx="3" ry="3" width="100" height="15" /> 
        <rect x="483" y="126" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="203" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="281" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="358" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="48" rx="3" ry="3" width="100" height="15" /> 
        <rect x="483" y="178" rx="3" ry="3" width="125" height="15" /> 
        <rect x="483" y="329" rx="3" ry="3" width="169" height="15" /> 
        <rect x="483" y="253" rx="3" ry="3" width="158" height="15" /> 
        <rect x="483" y="103" rx="3" ry="3" width="201" height="15" />
        </ContentLoader>
    );
  }
}


class FormLoader extends Component {
  render() {
    return (
       <ContentLoader 
          height={475}
          width={1000}    
          speed={1}
          primaryColor="#e9ecef"
          secondaryColor="#d6dee6"
        >
        <rect x="16" y="46" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="18" rx="3" ry="3" width="100" height="15" /> 
        <rect x="16" y="126" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="203" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="281" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="358" rx="5" ry="5" width="410" height="36" /> 
        <rect x="16" y="48" rx="3" ry="3" width="100" height="15" /> 
        <rect x="16" y="178" rx="3" ry="3" width="125" height="15" /> 
        <rect x="16" y="329" rx="3" ry="3" width="169" height="15" /> 
        <rect x="16" y="253" rx="3" ry="3" width="158" height="15" /> 
        <rect x="16" y="103" rx="3" ry="3" width="201" height="15" /> 
        <rect x="483" y="46" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="18" rx="3" ry="3" width="100" height="15" /> 
        <rect x="483" y="126" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="203" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="281" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="358" rx="5" ry="5" width="410" height="36" /> 
        <rect x="483" y="48" rx="3" ry="3" width="100" height="15" /> 
        <rect x="483" y="178" rx="3" ry="3" width="125" height="15" /> 
        <rect x="483" y="329" rx="3" ry="3" width="169" height="15" /> 
        <rect x="483" y="253" rx="3" ry="3" width="158" height="15" /> 
        <rect x="483" y="103" rx="3" ry="3" width="201" height="15" />
        </ContentLoader>
    );
  }
}


/*List content loader */
class ListContentLoader extends Component {
  render() {
    return (
      <ContentLoader 
      height={500}
      width={1000}
      speed={1}
      primaryColor="#e9ecef"
      secondaryColor="#d6dee6"
    >
       <rect x="0" y="7" rx="15" ry="15" width="200" height="40" /> 
       <rect x="750" y="9" rx="0" ry="0" width="40" height="35" />
       <rect x="800" y="7" rx="15" ry="15" width="200" height="40" />
       <rect x="0" y="70" rx="0" ry="0" width="200" height="40" />
       <rect x="208" y="70" rx="0" ry="0" width="200" height="40" /> 
       <rect x="418" y="70" rx="0" ry="0" width="200" height="40" /> 
       <rect x="628" y="70" rx="0" ry="0" width="200" height="40" /> 
       <rect x="840" y="70" rx="0" ry="0" width="200" height="40" />
      <rect x="0" y="120" rx="0" ry="0" width="1000" height="40" /> 
      <rect x="0" y="170" rx="0" ry="0" width="1000" height="40" /> 
      <rect x="0" y="220" rx="0" ry="0" width="1000" height="40" /> 
      <rect x="218" y="290" rx="15" ry="15" width="600" height="40" /> 
       
    </ContentLoader>
    );
  }
}

/*List content loader */
class DashboardContentLoader extends Component {
  render() {
    return (
      <ContentLoader 
      height={500}
      width={1000}
      speed={1}
      primaryColor="#e9ecef"
      secondaryColor="#d6dee6"
    >
      <rect x="0" y="13" rx="0" ry="0" width="320" height="177" /> 
      <rect x="350" y="12" rx="0" ry="0" width="320" height="177" /> 
      <rect x="700" y="14" rx="0" ry="0" width="320" height="177" /> 
      <rect x="0" y="220" rx="0" ry="0" width="500" height="400" /> 
      <rect x="520" y="220" rx="0" ry="0" width="500" height="400" />
    </ContentLoader>
    );
  }
}

/*user panel settings*/
/*plan expires section*/
class SettingPlanExpiryLoader extends Component {
  render(){
    return(
    <ContentLoader 
        height={521}
        width={280}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <circle cx="131" cy="66" r="50" /> 
        <rect x="58" y="136" rx="0" ry="0" width="144" height="18" /> 
        <rect x="61" y="166" rx="0" ry="0" width="142" height="20" /> 
        <rect x="60" y="197" rx="0" ry="0" width="144" height="59" /> 
        <rect x="102" y="271" rx="0" ry="0" width="0" height="0" /> 
        <rect x="112" y="246" rx="0" ry="0" width="15" height="1" /> 
        <rect x="62" y="284" rx="0" ry="0" width="141" height="26" /> 
        <rect x="61" y="328" rx="0" ry="0" width="142" height="24" /> 
        <rect x="62" y="369" rx="0" ry="0" width="140" height="28" /> 
        <rect x="63" y="419" rx="0" ry="0" width="139" height="26" /> 
        <rect x="61" y="459" rx="0" ry="0" width="139" height="26" />
      </ContentLoader>
    );
  }
}

/*settings- Account settings */
class AccountSettingLoader extends Component {
  render(){
    return(
  <ContentLoader 
    height={193}
    width={877}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="102" y="271" rx="0" ry="0" width="0" height="0" /> 
    <rect x="112" y="246" rx="0" ry="0" width="15" height="1" /> 
    <rect x="50" y="58" rx="0" ry="0" width="288" height="32" /> 
    <rect x="384" y="57" rx="0" ry="0" width="285" height="34" /> 
    <circle cx="238" cy="134" r="1" /> 
    <circle cx="272" cy="138" r="1" /> 
    <rect x="250" y="114" rx="0" ry="0" width="110" height="36" /> 
    <rect x="397" y="115" rx="0" ry="0" width="100" height="35" />
  </ContentLoader>
    );
  }
}

/*stripe details section*/
class StripeDetailsLoader extends Component {
  render(){
    return(
  <ContentLoader 
    height={275}
    width={877}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="102" y="271" rx="0" ry="0" width="0" height="0" /> 
    <rect x="112" y="246" rx="0" ry="0" width="15" height="1" /> 
    <circle cx="238" cy="134" r="1" /> 
    <circle cx="272" cy="138" r="1" /> 
    <rect x="84" y="25" rx="0" ry="0" width="110" height="13" /> 
    <rect x="82" y="48" rx="0" ry="0" width="259" height="37" /> 
    <rect x="430" y="21" rx="0" ry="0" width="105" height="12" /> 
    <rect x="429" y="46" rx="0" ry="0" width="313" height="36" /> 
    <rect x="83" y="113" rx="0" ry="0" width="103" height="11" /> 
    <rect x="79" y="134" rx="0" ry="0" width="253" height="36" /> 
    <rect x="430" y="108" rx="0" ry="0" width="112" height="11" /> 
    <rect x="430" y="130" rx="0" ry="0" width="94" height="36" /> 
    <rect x="172" y="202" rx="0" ry="0" width="115" height="29" /> 
    <rect x="312" y="203" rx="0" ry="0" width="152" height="27" /> 
    <rect x="498" y="201" rx="0" ry="0" width="114" height="29" />
  </ContentLoader>
   );
  }
}

class CardInfoLoader extends Component {
  render(){
    return(
      <ContentLoader 
      height={240}
      width={877}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="102" y="271" rx="0" ry="0" width="0" height="0" /> 
      <rect x="112" y="246" rx="0" ry="0" width="15" height="1" /> 
      <circle cx="238" cy="134" r="1" /> 
      <circle cx="272" cy="138" r="1" /> 
      <rect x="71" y="18" rx="0" ry="0" width="97" height="11" /> 
      <rect x="331" y="20" rx="0" ry="0" width="97" height="11" /> 
      <rect x="23" y="45" rx="0" ry="0" width="23" height="21" /> 
      <rect x="70" y="42" rx="0" ry="0" width="135" height="25" /> 
      <rect x="230" y="41" rx="0" ry="0" width="35" height="27" /> 
      <rect x="330" y="43" rx="0" ry="0" width="176" height="26" /> 
      <rect x="22" y="112" rx="0" ry="0" width="23" height="24" /> 
      <rect x="71" y="89" rx="0" ry="0" width="97" height="11" /> 
      <rect x="71" y="110" rx="0" ry="0" width="135" height="25" /> 
      <rect x="231" y="108" rx="0" ry="0" width="35" height="27" /> 
      <rect x="332" y="86" rx="0" ry="0" width="97" height="10" /> 
      <rect x="331" y="110" rx="0" ry="0" width="176" height="27" /> 
      <rect x="23" y="178" rx="0" ry="0" width="22" height="20" /> 
      <rect x="71" y="163" rx="0" ry="0" width="97" height="10" /> 
      <rect x="71" y="180" rx="0" ry="0" width="135" height="25" /> 
      <rect x="231" y="178" rx="0" ry="0" width="35" height="27" /> 
      <rect x="332" y="160" rx="0" ry="0" width="97" height="11" /> 
      <rect x="332" y="178" rx="0" ry="0" width="176" height="27" />
    </ContentLoader>
 );
}
}

class BuyPlanSectionPlanLoader extends Component {
  render(){
    return(
      <ContentLoader 
      height={365}
      width={295}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      >
      <circle cx="139" cy="45" r="34" /> 
      <circle cx="148" cy="55" r="11" /> 
      <rect x="79" y="99" rx="0" ry="0" width="132" height="22" /> 
      <rect x="114" y="139" rx="0" ry="0" width="51" height="22" /> 
      <rect x="52" y="194" rx="0" ry="0" width="197" height="30" /> 
      <rect x="51" y="258" rx="0" ry="0" width="199" height="28" />
      </ContentLoader>
      );
    }
}

class BuyPlanSectionContentLoader extends Component {
  render(){
    return(
      <ContentLoader 
      height={736}
      width={861}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      >
      <rect x="70" y="44" rx="0" ry="0" width="0" height="0" /> 
      <rect x="50" y="49" rx="0" ry="0" width="149" height="19" /> 
      <rect x="52" y="100" rx="0" ry="0" width="99" height="10" /> 
      <rect x="49" y="125" rx="0" ry="0" width="302" height="34" /> 
      <rect x="49" y="191" rx="0" ry="0" width="99" height="10" /> 
      <rect x="49" y="216" rx="0" ry="0" width="302" height="34" /> 
      <rect x="51" y="266" rx="0" ry="0" width="99" height="10" /> 
      <rect x="50" y="287" rx="0" ry="0" width="297" height="34" /> 
      <rect x="453" y="22" rx="0" ry="0" width="343" height="340" /> 
      <rect x="139" y="55" rx="0" ry="0" width="0" height="0" /> 
      <rect x="55" y="409" rx="0" ry="0" width="149" height="19" /> 
      <rect x="52" y="477" rx="0" ry="0" width="297" height="34" /> 
      <rect x="55" y="583" rx="0" ry="0" width="297" height="34" /> 
      <rect x="448" y="475" rx="0" ry="0" width="297" height="34" /> 
      <rect x="452" y="579" rx="0" ry="0" width="297" height="34" /> 
      <rect x="50" y="458" rx="0" ry="0" width="99" height="10" /> 
      <rect x="54" y="563" rx="0" ry="0" width="99" height="9" /> 
      <rect x="451" y="558" rx="0" ry="0" width="99" height="10" /> 
      <rect x="447" y="458" rx="0" ry="0" width="99" height="10" /> 
      <rect x="291" y="654" rx="0" ry="0" width="219" height="35" />
      </ContentLoader>
    );
  }
}
export { ButtonLoader, Loader, TransactionFormLoader, FormLoader, ListContentLoader, DashboardContentLoader, SettingPlanExpiryLoader, AccountSettingLoader, StripeDetailsLoader, CardInfoLoader, BuyPlanSectionPlanLoader,  BuyPlanSectionContentLoader};
