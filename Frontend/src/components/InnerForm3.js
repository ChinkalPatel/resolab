import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Form3 extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        if (this.props.location.state.provider===true){
            if (this.props.location.state.category === "people")
            return(
                <>
                <br />
                <h6>Which type of Resource?</h6>
                <Link to={{pathname:"/provider",state:{category:"people",provider:true,seeker:false,subcategory:"trainer"}}}>
                <h2>Trainer</h2>
                </Link>
                <br/>
                <Link to={{pathname:"/provider",state:{category:"people",provider:true,seeker:false,subcategory:"operation"}}}>
                <h2>Operation</h2>
                </Link>
                <br/>
                <Link to={{pathname:"/provider",state:{category:"people",provider:true,seeker:false,subcategory:"quality"}}}>
                <h2>Quality</h2>
                </Link>
                <br/>
                <Link to={{pathname:"/provider",state:{category:"people",provider:true,seeker:false,subcategory:"finance"}}}>
                <h2>Finance</h2>
                </Link>
                <br/>
                
                </>
            );
            else if (this.props.location.state.category === "services")
            return(
                <>
                <br />
                <h6>Which type of Resource?</h6>
                <Link to="/adpf">
                <h2>Advisory Services</h2>
                </Link>
                <br/>
                <Link to="/ipf">
                <h2>Infrastructure Services</h2>
                </Link>
                <br/>
                <Link to="/alpf">
                <h2>Allied Services</h2>
                </Link>
                <br/>
                </>
            );
            else 
            return(<h1>Error</h1>);
        }
        else if (this.props.location.state.seeker===true){
            if (this.props.location.state.category === "people")
            return(
                <>
                <br />
                <h6>Which type of Resource?</h6>
                <Link to={{pathname:"/seeker",state:{category:"people",seeker:true,provider:false,subcategory:"trainer"}}}>
                <h2>Trainer</h2>
                </Link>
                <br/>
                <Link to={{pathname:"/seeker",state:{category:"people",seeker:true,provider:false,subcategory:"operation"}}}>
                <h2>Operation</h2>
                </Link>
                <br/>
                <Link to={{pathname:"/seeker",state:{category:"people",seeker:true,provider:false,subcategory:"quality"}}}>
                <h2>Quality</h2>
                </Link>
                <br/>
                <Link to={{pathname:"/seeker",state:{category:"people",seeker:true,provider:false,subcategory:"finance"}}}>
                <h2>Finance</h2>
                </Link>
                <br/>
                
                </>
            );
            else if (this.props.location.state.category === "services")
            return(
                <>
                <br />
                <h6>Which type of Resource?</h6>
                <Link to="/adsf">
                <h2>Advisory Services</h2>
                </Link>
                <br/>
                <Link to="/isf">
                <h2>Infrastructure Services</h2>
                </Link>
                <br/>
                <Link to="/alsf">
                <h2>Allied Services</h2>
                </Link>
                <br/>
                </>
            );
            else 
            return(<h1>Error</h1>);
        }
    }
}

export default Form3;