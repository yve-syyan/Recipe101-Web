import React, { Component } from "react";
import { getSingleRecipeInfo, retrieveAllFavorite } from "./getData";
import "../style/Best.css";

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peronalCollection: [],
            collections: []
        };
    }
    async mapResult(objArray) {


        const collectionsTemp = objArray.map((obj) => {

            console.log(obj);
            let link = `http://localhost:3000/learnmore/?id=${obj["RecipeID"]}&author=${obj["Author"]}&totaltime=${obj["Total_Time"]}`
            return (
                <div>
                    <div style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}>{obj["name"]}</div>
                    <a href={link} >
                        <img src={obj["photo"]} />
                    </a>
                </div>
            )
        })
        this.setState({ collections: collectionsTemp });

    }

    async componentDidMount() {
        const name = window.localStorage.getItem('user');
        const array = [];
        const objArray = [];



        await retrieveAllFavorite(name).then((res) => {
            console.log(res);
            res.map((obj) => {
                array.push(obj.favorite_recipe_id);
                console.log(obj.favorite_recipe_id);
            })
            for (let i = 0; i < array.length; i++) {
                getSingleRecipeInfo(array[i]).then((res) => {
                    const name = res[0]["Recipe Name"];
                    const photo = res[0]["Recipe Photo"]
                    const author = res[0]["Recipe Photo"]
                    const Total_Time = res[0]["Recipe Photo"]
                    const RecipeID = res[0]["RecipeID"]
                    objArray.push({ "name": name, "photo": photo, "author": author, "Total_Time": Total_Time, "RecipeID": RecipeID });
                    if (i == array.length - 1) {
                        this.mapResult(objArray);
                    }

                }

                );

            }


        })


    }


    render() {

        return (
            <div>
                {this.state.collections}
            </div>
        );
    }
}

export default Collection;
