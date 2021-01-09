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
            isCustomerHidden: true,
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

    test = () => {
        axios.post("/api/getPrediction", { "test": "Hello World", "Timothy": "Sankara" })
            // .then(response => this.setState({ message: response }))
            .then(response => console.log(response.data))
    }

    render() {
        const countryOptions = [
            { value: 0, label: "Kenya" },
            { value: 2, label: "Tanzania" },
            { value: 1, label: "Rwanda" },
            { value: 3, label: "Uganda" }
        ]

        const locationOptions = [
            { value: 0, label: "Rural" },
            { value: 1, label: "Urban" }
        ]

        const cellphoneOptions = [
            { value: 0, label: "Yes" },
            { value: 1, label: "No" }
        ]

        const genderOptions = [
            { value: 1, label: "Male" },
            { value: 0, label: "Female" }
        ]

        const relationshipOptions = [
            { value: 5, label: "Child" },
            { value: 4, label: "Parent" },
            { value: 0, label: "Other Relative" },
            { value: 3, label: "Other non-relative" },
            { value: 1, label: "Head of Household" },
            { value: 2, label: "Spouse" },
        ]

        const maritalOptions = [
            { value: 1, label: "Widowed" },
            { value: 4, label: "Don't Know" },
            { value: 2, label: "Divorced/Separated" },
            { value: 0, label: "Single/Never Married" },
            { value: 3, label: "Married/Living Together" },
        ]

        const educationalOptions = [
            { value: 0, label: "Other/Don't Know" },
            { value: 5, label: "Primary Education" },
            { value: 4, label: "Tertiary Education" },
            { value: 2, label: "Secondary Education" },
            { value: 3, label: "No Formal Education" },
            { value: 1, label: "Vocational/Specialised training" },
        ]

        const jobOptions = [
            { value: 8, label: "No Income" },
            { value: 6, label: "Self Employed" },
            { value: 5, label: "Formally Employed Government" },
            { value: 4, label: "Farming and Fishing" },
            { value: 1, label: "Informally employed" },
            { value: 2, label: "Goverment Dependent" },
            { value: 0, label: "Remittance Dependent" },
            { value: 2, label: "Formally Employed Private" },
            { value: 9, label: "Refused to answer/Don't know" },
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
                                    onChange={(e) => this.setState({ country: Number(e.value) })}
                                />
                            </div>
                            <div className="col-3">
                                <label>Location Type</label>
                                <Select
                                    options={
                                        locationOptions
                                    }
                                    onChange={(e) => this.setState({ location: Number(e.value) })}
                                />
                            </div>
                            <div className="col-3">
                                <label>Access to cellphone?</label>
                                <Select
                                    options={
                                        cellphoneOptions
                                    }
                                    onChange={(e) => this.setState({ cellphone: Number(e.value) })}
                                />
                            </div>
                            <div className="col-3">
                                <label>Gender</label>
                                <Select
                                    options={
                                        genderOptions
                                    }
                                    onChange={(e) => this.setState({ gender: Number(e.value) })}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">

                            <div className="col-3">
                                <label>Household Size</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ householdSize: Number(e.target.value) })} />
                            </div>

                            <div className="col-3">
                                <label>Age</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ age: Number(e.target.value) })} />
                            </div>

                            <div className="col-3">
                                <label>Relationship With Head of Family</label>
                                <Select
                                    options={
                                        relationshipOptions
                                    }
                                    onChange={(e) => this.setState({ relationshipWithHead: Number(e.value) })}
                                />
                            </div>

                            <div className="col-3">
                                <label>Marital Status</label>
                                <Select
                                    options={
                                        maritalOptions
                                    }
                                    onChange={(e) => this.setState({ maritalStatus: Number(e.value) })}
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
                                    onChange={(e) => this.setState({ educationLevel: Number(e.value) })}
                                />
                            </div>

                            <div className="col-3">
                                <label>Job type</label>
                                <Select
                                    options={
                                        jobOptions
                                    }
                                    onChange={(e) => this.setState({ jobType: Number(e.value) })}
                                />
                            </div>

                        </div>

                        <div className="row col-6 mx-auto mt-5">
                            {/* <div className="col"> */}
                            <button className="btn btn-success form-control my-3" onClick={this.test}>Predict</button>
                            {/* </div> */}
                        </div>

                        {/* <button onClick={this.test}>Test</button> */}
                        {/* <button className="btn btn-success my-3" onClick={this.test2}>Test2</button> */}
                        <p hidden={this.state.isCustomerHidden}>Is this a potential customer: {this.state.qValue}</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home
