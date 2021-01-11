import React, { Component } from 'react'
import Select from 'react-select'
import axios from "axios"
import { v4 as uuid } from "uuid";

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
            jobType: "",
            year: ""
        }
    }

    test = () => {

        this.setState({ isCustomer: "" })

        let predictData = [
            this.state.country,
            this.state.year,
            this.state.location,
            this.state.cellphone,
            this.state.age
        ]

        axios.post("/api/getPrediction", { data: predictData })
            .then(response => {
                response.data.Prediction == 0 ? this.setState({ isCustomer: "No" }) : this.setState({ isCustomer: "Yes" })
                this.setState({ isCustomerHidden: false })
            }
            )
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

        const yearOptions = [
            { value: "2018", label: "2018" },
            { value: "2017", label: "2017" },
            { value: "2016", label: "2016" }
        ]

        return (
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-10 mx-auto card" style={{ borderColor: "purple" }}>
                        <h5 className="display-5">Enter Client Data</h5>
                        <div className="row mt-3">
                            <div className="col-2">
                                <label>Country Of Origin</label>
                                <Select
                                    options={
                                        countryOptions
                                    }
                                    onChange={(e) => this.setState({ country: e.value })}
                                />
                            </div>
                            <div className="col-2">
                                <label>Location Type</label>
                                <Select
                                    options={
                                        locationOptions
                                    }
                                    onChange={(e) => this.setState({ location: e.value })}
                                />
                            </div>
                            <div className="col-2">
                                <label>Access to cellphone?</label>
                                <Select
                                    options={
                                        cellphoneOptions
                                    }
                                    onChange={(e) => this.setState({ cellphone: e.value })}
                                />
                            </div>
                            <div className="col-2">
                                <label>Age</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ age: e.target.value })} />
                            </div>
                            <div className="col-3">
                                <label>Year</label>
                                <Select
                                    options={
                                        yearOptions
                                    }
                                    onChange={(e) => this.setState({ year: e.value })}
                                />
                            </div>
                        </div>
                        <div className="row col-6 mx-auto my-3">
                            <button className="btn btn-success form-control my-3" onClick={this.test}>Predict</button>
                        </div>
                        <p hidden={this.state.isCustomerHidden}>Is this a potential customer: {this.state.isCustomer}</p>
                    </div>
                </div>
            </div >
        )
    }
}

export default Home
