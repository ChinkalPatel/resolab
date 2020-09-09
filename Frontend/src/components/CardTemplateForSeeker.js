import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import '../style/css/CardTemplateForSeeker.min.css';
let trainer= false;
let operation = false;
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function CardTemplateForSeeker(props) {
	if (props.plan_id === "plan_FK1EvsUuXJNP6b" || props.plan_id === "plan_FK1Hb4cr5lnHZF") trainer=true;
	if (props.plan_id === "plan_FK1JHVbtKSmjov" || props.plan_id === "plan_FK1KG7CxaFA0iO") operation = true;
	console.log(operation+" "+trainer)
		var card=(
			<Card style={{width: '230px', height: '230px'}} className="seeker-card-template-deck mb-4">
			<Card.Body>
			{/* <Image src={require(`../images/${props.cImg.toLowerCase()}.jpg`)} className="seeker-pic mx-auto w-50" roundedCircle  /> */}
				<Card.Title> {props.cCategory} </Card.Title>
				<Card.Subtitle className="text-muted text-dark"> {props.cSubCategory} </Card.Subtitle>
				<Card.Text> Salary(P.A.): &#8377;{props.cSalaryLower} - &#8377;{props.cSalaryUpper}<br/>Location: {props.cLoc}</Card.Text>
				<hr/>
				<Button type="button" variant="outline-success">
				<Link to={{pathname:'/seekerdetails', 
				state:{
					cId:props.cId,
					additional_req: props.additional_req,
					cCategory:props.cCategory,
					cSub: props.cSubCategory,
					designation: props.designation,
					employee_id: props.employee_id,
					experience_details: props.experience_details,
					job_location: props.job_location,
					joining_requirement: props.joining_requirement,
					legal_status: props.legal_status,
					max_salary: props.max_salary,
					min_salary: props.min_salary,
					pia_tp_name: props.pia_tp_name,
					qualification: props.qualification,
					pref_qualification: props.pref_qualification,
					reporting_manager_name: props.reporting_manager_name,
					manager_designation: props.manager_designation,
					manager_contact_number: props.manager_contact_number,
					manager_email_id: props.manager_email_id,
					trainer:trainer,
					operation:operation
				} }}>Details</Link> </Button>
			</Card.Body>
			</Card>
		);
	

	return(
		<div>

			{card}

		</div>
	);
}

export default CardTemplateForSeeker;