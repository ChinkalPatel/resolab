import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { db } from './firebase/firebase.js'
import CardTemplateForProvider from './CardTemplateForProvider.js';
import CardTemplateForSeeker from './CardTemplateForSeeker.js';
import CardTemplateForHighlights from './CardTemplateForHighlights.js';
import frank from '../images/frank.jpg';
import '../style/css/CardDeckTemplate.css';
import Cookies from "universal-cookie";
import axios from 'axios';
import LoadingElement from './Loader';


class CardDeckTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsForProvider: {},
            cardsForSeeker: {},
            loader: true,
            error: false,
        }
    }
    componentDidMount() {
        //console.log(this.props.location.state.cId);
        const cookies = new Cookies();
        if (this.props.cdType === "available") {
            axios.get('https://api.resolabindia.com/core/list_providers_people/', {
                headers: {
                    'Authorization': `Token ${cookies.get("token")}`
                }
            })
                .then((response) => {
                    console.log(response)
                    this.setState({
                        cardsForProvider: response.data,
                        loader: false
                    });
                }, (error) => {
                    console.log(error);
                    this.setState({
                        loader: false,
                        error: true
                    })
                });
        }
        if (this.props.cdType === "required") {
            axios.get('https://api.resolabindia.com/core/list_seekers_people/', {
                headers: {
                    'Authorization': `Token ${cookies.get("token")}`
                }
            })
                .then((response) => {
                    console.log(response)
                    this.setState({
                        cardsForSeeker: response.data,
                        loader: false
                    });
                }, (error) => {
                    console.log(error);
                    this.setState({
                        loader: false,
                        error: true
                    })
                });
        }
    }
    render() {
        const cookies = new Cookies();
       
        if (this.state.loader === true)
            return <LoadingElement />
        if (this.state.error === true)
            return (
                <>
                    <br />
                    <h1>There is an error</h1>
                </>
            )

        else if (this.props.cdType === "available") { 
        {/*Show 12 cards from available-resources data*/ }
        var icount = 4;
        var nval = true;
        var toutvar = 1000;
        var dval = true;

            var deck = Object.keys(this.state.cardsForProvider).map((pkey) => {
                if (pkey < 8) {
                    return (<CardTemplateForProvider cUser={this.state.cardsForProvider[pkey].user.user}
                        cName={this.state.cardsForProvider[pkey].user.name}
                        cPosition={this.state.cardsForProvider[pkey].user.name}
                        cMoney={this.state.cardsForProvider[pkey].user.name}
                        cLoc={this.state.cardsForProvider[pkey].current_work_district}
                        cImg={this.state.cardsForProvider[pkey].user.name}
                        key={this.state.cardsForProvider[pkey].user.name}
                    />)
                }
                 });
         }


        else if (this.props.cdType === "required") {
            var icount = 4;
            var nval = true;
            var toutvar = 1000;
            var dval = true;
            var deck = Object.keys(this.state.cardsForSeeker).map((skey) => {
                if (skey < 4) {
                    return (<CardTemplateForSeeker
                        cCategory={this.state.cardsForSeeker[skey].user.name}
                        cSubCategory={this.state.cardsForSeeker[skey].user.name}
                        cSalaryLower={this.state.cardsForSeeker[skey].user.name}
                        cSalaryUpper={this.state.cardsForSeeker[skey].user.name}
                        cPostedByVal={this.state.cardsForSeeker[skey].user.name}
                        cImg={this.state.cardsForSeeker[skey].user.name}
                        cLoc={this.state.cardsForSeeker[skey].user.name}
                        key={this.state.cardsForSeeker[skey].user.name}

                    />)
                }
            })

        } else if (this.props.cdType === "highlights") {
            var deck = ['image1', 'image2', 'image3', 'image4',].map((card) => {
                return (
                    <div className="item" style={{ width: "300px" }}>
                        <CardTemplateForHighlights cStat={card} />
                    </div>
                )
            })

            var icount = 3;
            var nval = false;
            var toutvar = 2500;
            var dval = false;
        }
        return (
            <OwlCarousel
                items={icount}
                className="owl-theme"
                autoplay
                center={false}
                nav={false}
                autoplayTimeout={toutvar}
                autoplayHoverPause={dval}
                loop={true}
                dots={false}
                responsiveClass={true}
                responsive={{
                    0: {
                        items: 2,
                    },
                    600: {
                        items: 2,
                    },
                    1000: {
                        items: icount,
                    }
                }
                }

            >
                {/* We need to add, say, 16 entries in the deck*/}

                {deck}

            </OwlCarousel>
        );
        
        
    }
}


export default CardDeckTemplate;