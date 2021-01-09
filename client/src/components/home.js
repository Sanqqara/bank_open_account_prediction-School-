import React, { Component } from 'react'
import Select from 'react-select'
import readXlsxFile from "read-excel-file";
import axios from "axios"
import trap from "./trap.jpg"
import rectangular from "./rectangular.png"
import circular from "./circular.png";

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCustomer: "",
            country: "",
            location: "",
            cellphone: "",
            householdSize: 1,
            age: 0,
            gender: "",
            relationshipWithHead: "",
            maritalStatus: "",
            educationLevel: "",
            jobType: ""
        }
    }

    componentDidMount() {

    }

    test = () => {
        axios.post("/api/test", { "test": "Hello World", "Timothy": "Sankara" })
            // .then(response => this.setState({ message: response }))
            .then(response => console.log(response.data))
    }

    countrySelect = () => {

    }

    render() {
        const countryOptions = [
            { value: "Kenya", label: "Kenya" },
            { value: "Tanzania", label: "Tanzania" },
            { value: "Rwanda", label: "Rwanda" },
            { value: "Uganda", label: "Uganda" }
        ]

        const locationOptions = [
            { value: "Rural", label: "Rural" },
            { value: "Urban", label: "Urban" }
        ]

        const cellphoneOptions = [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" }
        ]

        const genderOptions = [
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" }
        ]

        const relationshipOptions = [
            { value: "Child", label: "Child" },
            { value: "Parent", label: "Parent" },
            { value: "Other Relative", label: "Other Relative" },
            { value: "Other non-relative", label: "Other non-relative" },
            { value: "Head of Household", label: "Head of Household" },
        ]

        const maritalOptions = [
            { value: "Widowed", label: "Widowed" },
            { value: "Don't Know", label: "Don't Know" },
            { value: "Divorced/Separated", label: "Divorced/Separated" },
            { value: "Single/Never Married", label: "Single/Never Married" },
            { value: "Married/Living Together", label: "Married/Living Together" },
        ]

        const educationalOptions = [
            { value: "Other/Don't know", label: "Other/Don't Know" },
            { value: "Primary Education", label: "Primary Education" },
            { value: "Tertiary Education", label: "Tertiary Education" },
            { value: "Secondary Education", label: "Secondary Education" },
            { value: "No Formal Education", label: "No Formal Education" },
        ]

        const jobOptions = [
            { value: "No Income", label: "No Income" },
            { value: "Self Employed", label: "Self Employed" },
            { value: "Formally Employed Government", label: "Formally Employed Government" },
            { value: "Farming and Fishing", label: "Farming and Fishing" },
            { value: "Informally employed", label: "Informally employed" },
            { value: "Government Dependent", label: "Goverment Dependent" },
            { value: "Remittance Dependent", label: "Remittance Dependent" },
            { value: "Formally Employed Private", label: "Formally Employed Private" },
            { value: "Refused to answer/Don't know", label: "Refused to answer/Don't know" },
        ]

        const terrainOptions = [
            { label: "Flat Residental areas", value: 0.4 },
            { label: "Moderately steep residential areas", value: 0.6 },
            { label: "Built up areas-impervious", value: 0.8 },
            { label: "Rolling lands and clay loam soils", value: 0.5 },
            { label: "Hilly areas, forests, clay and loamy soils", value: 0.5 },
            { label: "Flat cultivated lands and sandy soils", value: 0.2 }
        ]

        return (
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-10 mx-auto card" style={{ borderColor: "purple" }}>
                        <h5 className="display-5">Enter Client Data</h5>
                        {/* <div className="row mt-2">
                            <div className="col-6">
                                <label>Year</label>
                                <input className="form-control" type="number" value={this.state.yearBlank} onChange={this.onYearSubmit} />
                            </div>
                            <div className="col-6">
                                <label>Rainfall - m<sup>3</sup>/s</label>
                                <input className="form-control" type="number" value={this.state.rainfallBlank} onChange={this.onMeasureSubmit} />
                            </div>
                            <div className="col-8 mx-auto">
                                <button className="btn btn-success form-control my-3" onClick={this.onRainSubmit}>Submit</button>
                            </div>
                        </div> */}

                        <div className="row mt-3">
                            <div className="col-3">
                                <label>Country Of Origin</label>
                                <Select
                                    options={
                                        countryOptions
                                    }
                                    onChange={(e) => this.setState({ country: e.value })}
                                />
                            </div>
                            <div className="col-3">
                                <label>Location Type</label>
                                <Select
                                    options={
                                        locationOptions
                                    }
                                    onChange={(e) => this.setState({ location: e.value })}
                                />
                            </div>
                            <div className="col-3">
                                <label>Access to cellphone?</label>
                                <Select
                                    options={
                                        cellphoneOptions
                                    }
                                    onChange={(e) => this.setState({ cellphone: e.value })}
                                />
                            </div>
                            <div className="col-3">
                                <label>Gender</label>
                                <Select
                                    options={
                                        genderOptions
                                    }
                                    onChange={(e) => this.setState({ gender: e.value })}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">

                            <div className="col-3">
                                <label>Household Size</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ householdSize: e.target.value })} />
                            </div>

                            <div className="col-3">
                                <label>Age</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ age: e.target.value })} />
                            </div>

                            <div className="col-3">
                                <label>Relationship With Head of Family</label>
                                <Select
                                    options={
                                        relationshipOptions
                                    }
                                    onChange={(e) => this.setState({ relationshipWithHead: e.value })}
                                />
                            </div>

                            <div className="col-3">
                                <label>Marital Status</label>
                                <Select
                                    options={
                                        maritalOptions
                                    }
                                    onChange={(e) => this.setState({ maritalStatus: e.value })}
                                />
                            </div>

                        </div>
                        <div className="row mt-4">

                            <div className="col-3">
                                <label>Education level</label>
                                <Select
                                    options={
                                        educationalOptions
                                    }
                                    onChange={(e) => this.setState({ educationLevel: e.value })}
                                />
                            </div>

                            <div className="col-3">
                                <label>Job type</label>
                                <Select
                                    options={
                                        jobOptions
                                    }
                                    onChange={(e) => this.setState({ jobType: e.value })}
                                />
                            </div>

                        </div>

                        <div className="row col-6 mx-auto mt-5">
                            {/* <div className="col"> */}
                            <button className="btn btn-success form-control my-3" onClick={this.calcuateQ}>Predict</button>
                            {/* </div> */}
                        </div>

                        {/* <button onClick={this.test}>Test</button> */}
                        {/* <button className="btn btn-success my-3" onClick={this.test2}>Test2</button> */}
                        <p hidden={this.state.isCustomer}>Is this a potential customer: {this.state.qValue}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home
