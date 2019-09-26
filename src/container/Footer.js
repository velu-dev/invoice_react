import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image';
import {assetURL} from '_constants/BaseConfig';
import './Footer.css'

class Footer extends Component {	
	render(){	
		return(

		<Fragment>
		<footer>
			<Container>	
				<Row className="footContent">
					<Col xs="12" sm="3">
						<div className="footLogo">
							<Image src={`${assetURL}images/logo.png`} alt="Invoice Application" fluid />
						</div>
					</Col>
					<Col xs="12" sm="9" className="text-right">
						<ul className="footLinks">
							<li><Link to={`/`} >Home</Link></li>
							<li><Link to={'/feature'}>Features</Link></li>
							<li><Link to={'/subscription'}>Subscription</Link></li>
							<li><Link to={'/support'}>Support</Link></li>
							<li><Link to={'/terms'}>Terms & Conditions </Link></li>
							<li><Link to={'/privacy'}>Privacy Policy</Link></li>
						</ul>
					</Col>
				</Row>
			</Container>
		</footer>
		<section className="copyright">
			<Container>
				<Row>
			    	<Col>
			    		<p>&copy; 2019, invoice application</p>
			    	</Col>
				</Row>
			</Container>
		</section>
		</Fragment>

		)
	}
}

export default Footer;