/* eslint-disable */
import React, { Component } from "react";
import { getSingleRecipeInfo, retrieveAllFavorite } from "./getData";
import PageNavbar from "./PageNavbar";
import collectionPage from "../images/CollectionPage.png";
import image0 from "../images/Recipelist.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import "../style/Collection.css";


class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peronalCollection: [],
            collections: [],
            quote: " You currently don't have any Favorite Item, Go and Expolre"
        };
    }

    handleLearnMore(id, author, totalTime) {
        console.log(id);
        window.top.location = `http://localhost:3000/learnmore/?id=${id}&author=${author}&totaltime=${totalTime}`;
    }

    async mapResult(objArray) {

        const collectionsTemp = objArray.map((obj) => {

            console.log(obj);
            let link = `http://localhost:3000/learnmore/?id=${obj["RecipeID"]}&author=${obj["Author"]}&totaltime=${obj["Total_Time"]}`
            return (
                <div
                style={{ marginTop: 0 }}
                className="search-container container-fluid"
                >
                <Grid
                  container
                  spacing={0}
                  style={{
                    backgroundColor: "#FEF2F2",
                    height: 300,
                    border: "4px solid #B6666F",
                    backgroundColor: "gray",
                    height: "100%",
                    width: "100%",
                    backgroundImage: `url(${image0})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Grid
                    item
                    xs={3}
                    style={{
                      // backgroundColor: "#9E4244",
                      margin: "2.9%",
                      marginTop: "2.7%",
                      marginLeft: "4.5%"
                      // border: "6px solid #B6666F",
                    }}
                  >
                    {/* <ButtonBase className={classes.image} style={{width:350, height:226, marginTop:33}}> */}
                    <img
                      //{classes.img}
                      className="hover-shadow"
                      alt="complex"
                      src={obj["photo"]}
                      style={{ width: "100%", height: 226, objectFit: "cover", borderRadius: "20%" }}
                    />
                    {/* </ButtonBase> */}
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sm
                    container
                    style={{
                      // backgroundColor: "white",
                      // height: "100%",
                      // width: "100%",
                      // backgroundImage: `url(${image0})`,
                      // backgroundSize: "100% 100%",
                      // backgroundRepeat: "no-repeat",
                      // borderLeft: "6px solid #B6666F",
                    }}
                  >
                    <Grid
                      item
                      xs
                      container
                      direction="column"
                      spacing={0}
                      style={{}}
                    >
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          style={{
                            marginLeft: "9%",
                            marginTop: "7.5%",
                            color: "#9E4244",
                            fontFamily: "Patua One",
                            fontSize: "25px",
                          }}
                        >
                          <span>{obj["name"]}</span>
                          <span style={{ fontSize: "15px", marginLeft: "2%" }}>
                            Post By
                          </span>
                          <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                            {obj["author"]}
                          </span>
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          style={{
                            marginLeft: "7.2%",
                            color: "#B6666F",
                            fontFamily: "Patua One",
                            fontSize: "15px",
                          }}
                        >
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            marginLeft: "7.2%",
                            color: "#B6666F",
                            fontFamily: "Patua One",
                          }}
                        >
                          <span style={{ fontSize: "18px", marginLeft: "2%" }}>
                            Total
                          </span>
                          <span style={{ fontSize: "18px", marginLeft: "0.5%" }}>
                            Time:
                          </span>
                          <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                            {obj["Total_Time"]}
                          </span>
                          <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                            min
                          </span>
                        </Typography>
                        <Grid item>
                          <Button
                            variant="body2"
                            style={{
                              marginLeft: "70%",
                              color: "#9E4244",
                              cursor: "pointer",
                              fontFamily: "Patua One",
                              fontSize: "18px",
                            }}
                            onClick={() => {window.top.location = `http://localhost:3000/learnmore/?id=${obj["RecipeID"]}&author=${obj["author"]}&totaltime=${obj["Total_Time"]}`;}}
                          >
                            Learn More
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
                // <div>
                //     <div >{obj["name"]}</div>
                //     <a href={link} >
                //         <img src={obj["photo"]} />
                //     </a>
                // </div>
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
            if (res.length > 0) {
                this.setState({ quote: "" })
                res.map((obj) => {
                    array.push(obj.favorite_recipe_id);
                    console.log(obj.favorite_recipe_id);
                })
                for (let i = 0; i < array.length; i++) {
                    getSingleRecipeInfo(array[i]).then((res) => {
                        const name = res[0]["Recipe Name"];
                        const photo = res[0]["Recipe Photo"]
                        const author = res[0]["Author"]
                        const Total_Time = res[0]["Total_Time"]
                        const RecipeID = res[0]["RecipeID"]
                        objArray.push({ "name": name, "photo": photo, "author": author, "Total_Time": Total_Time, "RecipeID": RecipeID });
                        if (i == array.length - 1) {
                            this.mapResult(objArray);
                        }

                    }

                    );

                }
            }


        })


    }


    render() {

        return (
            <div>
                <PageNavbar />
                <img className="fullpage4" alt="" src={collectionPage} />
                <div style={{backgroundColor:"#9E4244", fontFamily:"Puata One", color:"white", fontSize:"10px"}}>
                    <p style={{marginLeft:"7%"}}>{this.state.quote}</p>
                </div>
                <div style={{backgroundColor:"#9E4244", paddingLeft:"1%", paddingRight:"1%", paddingBottom:"3%"}}>
                    {this.state.collections}
                </div>
            </div>
        );
    }
}

export default Collection;
