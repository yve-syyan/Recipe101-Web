import React, { Component } from "react";
import PropTypes from "prop-types";
import { getRecommendAuthorsBasedonPopularity, getRecipebaseOnAuthorChoice } from "./getData";
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
            const set2 = new Set();

            const authorMenu = res.map((recipe) => {
                if (!set2.has(recipe["Recipe Name"])) {
                    set2.add(recipe["Recipe Name"]);
                    let link = `http://localhost:3000/learnmore/?id=${recipe["RecipeID"]}&author=${recipe["Author"]}&totaltime=${recipe["Total_Time"]}`
                    return (
                        <div>
                            <div style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "15 px" }}>{recipe["Recipe Name"]}</div>
                            <a href={link} >
                                <img id="authorMenuImg" src={recipe["Recipe Photo"]} />
                            </a>
                        </div>
                    )
                }
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
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}>{`${num}`}</td>
                            <td><button style={{ background: "none", border: "none", color: "white", fontSize: "20px" }} onClick={() => { this.handleSubmit(person["Author"]) }}>{person["Author"]} </button></td>
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}>{person["avg(b.Rate)"]}</td>
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
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}>{`${num}`}</td>
                            <td><button style={{ background: "none", border: "none", color: "white", fontSize: "20px" }} onClick={() => { this.handleSubmit(person["Author"]) }}>{person["Author"]} </button></td>
                            <td style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}>{person["avg(b.Rate)"]}</td>
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
                <h3 style={{
                    marginTop: "40px", marignBottom: "0px", color: "white"
                }}>Top 20 Recepie Author</h3>
                <div id="leaderBoard">

                    < table id="table" >
                        <tbody>
                            <tr>
                                <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "30px" }}>Ranking</th>
                                <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "30px" }}>Author</th>
                                <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "30px" }}>Avg Rating</th>
                            </tr>
                            <>{this.state.rankListLeftState}</>
                        </tbody>
                    </table>
                    < table id="table" >
                        <tbody>
                            <tr>
                                <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "30px" }}>Ranking</th>
                                <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "30px" }}>Author</th>
                                <th style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "30px" }}>Avg Rating</th>
                            </tr>
                            <>{this.state.rankListRightState}</>
                        </tbody>
                    </table>
                    <div id="authorMenu">
                        {this.state.authorMenuState}
                    </div>
                </div>
            </div>
        );
    }
}

export default Best;
