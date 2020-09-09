import React from 'react';
import { Container, Row, Col, Jumbotron, Image ,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


import CardDeckTemplate from './CardDeckTemplate';
import Footer from './footer'

import Learning from '../images/learning.jpg'
import '../style/css/Homepage.min.css';

import Calander from '../images/resource-type/calendar.svg';
import SandClock from '../images/resource-type/sand-clock.svg';
import Residential from '../images/resource-type/residential.svg';
import Work from '../images/resource-type/work.svg';

import {GrDocumentUpdate,GrValidate,GrCreditCard} from 'react-icons/gr';
import {FaClipboardCheck} from 'react-icons/fa';

function Homepage() {
	return (
		<div>
			
				<Jumbotron fluid className="bg-light main-title align-items-center d-flex mb-0" 
				style={{backgroundImage:`url(${Learning})`,backgroundRepeat  : 'no-repeat',backgroundPosition: 'center',backgroundSize: 'cover', }}>
		
						<h1 className="text-light mx-auto"> Online Resource for DDUGKY Project</h1>

				</Jumbotron>
				
				<div id="available-resources">
				<Container>
				<Row>
						<Col>
							<div className="marginer"></div>
							<h2>Available Resources</h2>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="marginer"></div>
							<CardDeckTemplate cdType="available" className="ml-5 mr-5"/>
							<div className="marginer"></div>
						</Col>
					</Row>
					</Container>
				</div>
				<div id="required-resources">
					<Container>
					<Row>
						<Col>
							<div className="marginer"></div>
							<h2>Required Resources</h2>
						</Col>
					</Row>
					<Row style={{height:"300px"}}>
						<Col>
							<div className="marginer"></div>
							<CardDeckTemplate cdType="required" className="ml-5 mr-5" />
							<div className="marginer"></div>
						</Col>
					</Row>
					</Container>
				</div>

				<div id="resource-type-id">
					<Container>
					<Row>
						<Col>
							<div className="marginer"></div>
							<h2> Resource Type </h2>
							<div className="marginer"></div>
						</Col>
					</Row>
					<Row >
						<Col className="mb-2" xs={12} sm={6} md>
							<div style={{height: '180px',}} className="resource-type align-items-center justify-content-center">
							<a href="#">
							<Image src={Work} className="my-auto" />					
							<br/>
							<div className="aligner"></div>
							Manpower
							</a>
							</div>
							
						</Col>
						<Col className="mb-2" xs={12} sm={6} md>
							<div style={{height: '180px',}} className="resource-type align-items-center justify-content-center">
							<a href="#">
							<Image src={SandClock} className="my-auto" />					
							<br/>
							<div className="aligner"></div>
							Advisory Service
							</a>
							</div>
						</Col>
						<Col className="mb-2" xs={12} sm={6} md>
							<div style={{height: '180px',}} className="resource-type align-items-center justify-content-center">
							<a href="#">
							<Image src={Calander} className="my-auto" />					
							<br/>
							<div className="aligner"></div>
							Allied Service
							</a>
							</div>
						</Col>
						<Col className="mb-2" xs={12} sm={6} md>
							<div style={{height: '180px',}} className="resource-type align-items-center justify-content-center">
							<a href="#">
							<Image src={Residential} className="my-auto" />					
							<br/>
							<div className="aligner"></div>
							Infrastructure
							</a>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="marginer"></div>
						</Col>
					</Row>
					</Container>
					</div>

					<div id="how-information">
					<Container>
					<Row>
						<Col>
							<div className="marginer"></div>
						</Col>
					</Row>
					<h3>How it Works!</h3>
					<Row className="mt-2"> {/*Add margins to all the places where required, when done, delete this comment*/}
						<Col className="mb-2" sm={12} md={3}>
							<h1><FaClipboardCheck/></h1>
							Register
						</Col>
						<Col className="mb-2" sm={12} md={3}>
							<h1><GrDocumentUpdate/></h1>
							Update Resource Card
						</Col>
						<Col className="mb-2" sm={12} md={3}>
							<h1><GrValidate/></h1>
							Resource Validation / Verification
						</Col>
						<Col className="mb-2" sm={12} md={3}>
							<h1><GrCreditCard/></h1>
							Enable Business Subscription
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="marginer"></div>
						</Col>
					</Row>
						</Container>
					</div>
					
					<div id="ddugky-highlights">
						<Container>
							<Row>
							<Col>
								<div className="marginer"></div>
								<h2>DDUGKY Highlights</h2>
								<div className="marginer"></div>
							</Col>
							</Row>
							<Row>
								<Col>
									<CardDeckTemplate cdType="highlights" />
									<div className="marginer"></div>
								</Col>
							</Row>
						</Container>
					</div>

					<Footer />
		
		</div>
	);
}

export default Homepage;

{/*
Next things to do:
make how-info section responsive
solution for better response of the hhighlights
decide who works on footer
Also add different fonts
Get images for how-info section
*/}