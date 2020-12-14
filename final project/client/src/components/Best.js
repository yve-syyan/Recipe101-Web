/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { getRecommendAuthorsBasedonPopularity, getRecipebaseOnAuthorChoice } from "./getData";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import PageNavbar from "./PageNavbar";
import bestPic from "../images/bestPic.png";
import image5 from "../images/Picture6.png";
import "../style/Best.css";

class Best extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankListLeftState: [],
            rankListRightState: [],
            authorMenuState: []
        };
    }

    handleSubmit(person) {
        getRecipebaseOnAuthorChoice(person).then((res) => {
            console.log(res);
            // const set2 = new Set();

            const authorMenu = res.map((recipe) => {
                // if (!set2.has(recipe["Recipe Name"])) {
                //     set2.add(recipe["Recipe Name"]);
                let link = `http://localhost:3000/learnmore/?id=${recipe["RecipeID"]}&author=${recipe["Author"]}&totaltime=${recipe["Total_Time"]}`
                return (
                    <div>
                    <a href={link} >
                       <Card style={{backgroundColor: "#9E4244", color: "white"}}>
                            <CardActionArea style={{}}>
                            <CardMedia>
                                {/* src = "https://images.unsplash.com/photo-1519148246701-3dc1897a7a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" */}
                                <img style={{width: "100%", height: "200px", objectFit:"cover"}} src={recipe["Recipe Photo"]} />
                            </CardMedia>
                            <CardContent style={{minHeight:"100px"}}>
                                <Typography gutterBottom variant="h5" component="h2" style={{fontFamily: "Patua One"}}>
                                    {recipe["Recipe Name"]}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
{/*              
                        <div style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15 px" }}>{recipe["Recipe Name"]}</div>
                        <a href={link} >
                            <img id="authorMenuImg" src={recipe["Recipe Photo"]} />
                        </a> */}
                    </div>
                )
                // }
            })

            this.setState({ authorMenuState: authorMenu })
        });


    }

    componentDidMount() {
        getRecommendAuthorsBasedonPopularity().then((res) => {
            console.log(res);
            let num = 0;
            const rankingListLeft = res.map((person) => {
                if (num < 10) {
                    num += 1;
                    return (
                        <tr id="ranklist">
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px",fontFamily:"Patua One"}}>{`${num}`}</td>
                            <td><button style={{ background: "none", border: "none", color: "white", fontSize: "15px",fontFamily:"Patua One"}} onClick={() => { this.handleSubmit(person["Author"]) }}>{person["Author"]} </button></td>
                            <td style={{ marginTop: "40px", marginLeft: "60px", marignBottom: "0px", color: "white", fontSize: "15px",fontFamily:"Patua One"}}>{person["avg(b.Rate)"]}</td>
                        </tr >
                    )
                }

            })
            num = 0;
            const rankingListRight = res.map((person) => {
                if (num >= 10 && num <= 19) {
                    num += 1;
                    return (
                        <tr id="ranklist">
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>{`${num}`}</td>
                            <td><button style={{ background: "none", border: "none", color: "white", fontSize: "15px",fontFamily:"Patua One"}} onClick={() => { this.handleSubmit(person["Author"]) }}>{person["Author"]} </button></td>
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>{person["avg(b.Rate)"]}</td>
                        </tr>
                    )
                } else {
                    num += 1;
                }

            })
            this.setState({ rankListLeftState: rankingListLeft })
            this.setState({ rankListRightState: rankingListRight })


        });
    }

    render() {

        return (
            <div>
                <PageNavbar />
                <div className="button-container container-fluid">
                    <img src={bestPic} className="fullpage2" />
                </div>
                <div style={{maxWidth:"1300px", marginLeft:"auto", marginRight:"auto", borderLeft:"32px solid #9E4244", borderRight:"32px solid #9E4244", borderBottom:"32px solid #9E4244", marginTop:"0"}}>
                    <h3 style={{
                        paddingTop: "40px", marignBottom: "0px", marginTop: "0px", marginLeft:"5%", color: "white", fontFamily:"Patua One", fontSize: "30px"
                    }}>Top 20 Recepie Author</h3>
                    <Grid container style={{marginTop: "30px", paddingLeft:"5%", paddingRight:"5%", marginBottom: "50px"}}>
                        <Grid item xs={7} style={{}}>
                            <div id="leaderBoard" style={{marginLeft: "2%", marginRight: "auto"}}>
                                <table id="table" style={{borderBottom: "2px solid pink"}}>
                                    <tbody>
                                        <tr style={{borderBottom:"2px solid pink"}}>
                                            <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>Ranking</th>
                                            <th style={{ ma1rginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>Author</th>
                                            <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>Avg Rating</th>
                                        </tr>
                                        <>{this.state.rankListLeftState}</>
                                    </tbody>
                                </table>
                                < table id="table" style={{borderBottom: "2px solid pink"}}>
                                    <tbody>
                                        <tr style={{borderBottom:"2px solid pink"}}>
                                            <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>Ranking</th>
                                            <th style={{ marginTop: "40px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>Author</th>
                                            <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15px", fontFamily:"Patua One"}}>Avg Rating</th>
                                        </tr>
                                        <>{this.state.rankListRightState}</>
                                    </tbody>
                                </table>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div id="authorMenu" style={{marginTop: "23px", width:"100%", paddingLeft:"12%"}}>
                                {this.state.authorMenuState}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Best;
