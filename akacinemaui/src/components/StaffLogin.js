import React, { Component } from "react";    
import './Login.css'   
import withContext from "../withContext";
import axios from 'axios';
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
class StaffLogin extends Component {    
    constructor(props) {    
        super(props);    
        this.state = {    
           staffid: '',    
           ppassword: '',    
           formErrors: {},
           loggedIn:false
        };    
    
        this.initialState = this.state;    
    }    
    
    handleFormValidation() {    
        const { staffid,ppassword} = this.state;    
        let formErrors = {};    
        let formIsValid = true;    
    
        
    
        //Email    
        if (!staffid) {    
            formIsValid = false;    
            formErrors["staffidErr"] = "staffid id is required.";    
        }    
        
       
    
        //Password
        if(!ppassword){
            formIsValid = false;    
            formErrors["passwordErr"] = "Password is required.";    
        
    }
    
       this.setState({ formErrors: formErrors });    
        return formIsValid;    
    }    
    
    handleChange = (e) => {    
        const { name, value } = e.target;    
        this.setState({ [name]: value });    
    }    
    
    handleSubmit = async(e) => {    
        e.preventDefault();    
    
        if (this.handleFormValidation()) {    
        	const res= await axios.post(
        		      'http://localhost:8083/login',
        		      JSON.stringify({ staffid:this.state.staffid,ppassword:this.state.ppassword}),
        		      {
        		    	  headers: {
        		    	    // Overwrite Axios's automatically set Content-Type
        		    	    'Content-Type': 'application/json'
        		    	  }
        		      }).catch((res) => {
        		      return { status: 400, message: 'bad request' }
        		    })
        		    

            this.state.loggedIn=true;   
        		  }  

    	localStorage.setItem('usertype', "staff");
             
        }    
       
    
    render() {    
    
        const { staffidErr,passwordErr } = this.state.formErrors;    
    
        return (    
            <div className="formDiv">    
                <h1 style={{ textAlign: "center",fontSize:"50px",marginTop: '-20px',color: '#FFA500'}} ><b>Staff Sign In </b></ h1>    
                <div>    
                    <form onSubmit={this.handleSubmit}>    
                         
                            <label  className="label" style={{ textAlign: "left",marginLeft: '420px',backgroundColor: '#000000' }}></label>    
                            <input type="text1" name="staffid"    
                                value={this.state.staffid}    
                                onChange={this.handleChange}    
                                placeholder="staffid"    
                                className={staffidErr ? ' showError' : ''} />    
                            { staffidErr&&    
                                <div style={{ color: "red",fontSize:"15px", paddingBottom: 10 }}>{staffidErr}</div>    
                            }    
                          <label  className="label" style={{ textAlign: "left",marginLeft: '420px',backgroundColor: '#000000' }}></label>    
                            <input type="text1" name="ppassword"    
                                value={this.state.ppassword}    
                                onChange={this.handleChange}    
                                placeholder="password.."    
                                className={passwordErr ? ' showError' : ''} />    
                            {passwordErr &&    
                                <div style={{ color: "red",fontSize:"15px",paddingBottom: 10 }}>{passwordErr}</div>    
                            }    
    
                            <div className="field is-clearfix">
                            <button type="submit"
                              className="button"  style = {{color:'#FFA500',backgroundColor: '#000000'}}
                            >
                              Staff Login
                            </button>
                              {this.state.loggedIn && <p style={{color:'#12AD2B'}}> Staff logged in successfully
                                  </p>
                                    
                                    }    
                             </div>
                    </form>    
                </div>    
            </div >    
        )    
    }    
}    
    
export default withContext(StaffLogin);