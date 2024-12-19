import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Breadcrumb from "../../Breadcrumb";   
import TagSelector from "../../Global/TagSelector";
import axiosInstance from "../../../axiosConfig";



const VenueCreate = () => {
 
    const [username, setUserName] = useState("");
        const [password, setPassword] = useState("");
        const [isLoading, setIsLoading] = useState(false);
        const navigate = useNavigate();
        const [selectedDays, setSelectedDays] = useState({
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        });
      

        const [formData, setFormData] = useState({
            field_admin: "", 
            city: "",
            startDate: "",
            endDate: "",
            venueAddressEnglish: "",
            venueAddressUrdu: "",
            dua: "",
            dum: "",
            workingLadyDua: "",
            workingLadyDum: "",
            specialTokenQuota: "",
            recurringTill: "",
            userRejoin: "",
            selectedDays: {
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false,
            },
          });

          const handleChange = (day) => {
            setSelectedDays((prevState) => ({
              ...prevState,
              [day]: !prevState[day],
            }));
          };
          

        
      
        const handleSubmit = async (e) => {
          setIsLoading(true);  
           
          axiosInstance.post("login", {
              email: username,
              password: password,
            })
            .then(function (res) {
              if (res.data && res.data.token && res.data.userInfo) { 
                // console.log("res", res.data);
                const token = res.data.token; 
                const userInfo = res.data.userInfo; 
                localStorage.setItem('authToken', token)
                localStorage.setItem('authInfo', userInfo)
                notification(res.message, "success");
                setIsLoading(false); 
                navigate('/admin/dashboard')
              }
              
            })
            .catch(function (err) {
              if (err.response) { 
                setIsLoading(false); 
                let errors = err.response.data.error;  
                if (typeof errors === "object" && errors !== null) {
                  Object.entries(errors).forEach(([field, messages]) => {
               
                    messages.forEach((message) => {
                      notification(message, "error"); 
                        console.log(`Error: ${message}`);
                    });
                });
                }else{
                  console.log("errors",errors)
                  notification(errors, "error"); 
                }
                
               
               
                
              }
              
            });
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };
   
  
  return (


    
    <div id="main">
      <div className="page-heading">
        <section id="basic-vertical-layouts">
          <div className="row match-height">
            <Breadcrumb
              title="Create Venue"
              subheading="This is for creating Venue for dua"
            />
            <div className="col-md-12 col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Role</h4>
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <form className="form form-vertical">
                      <div className="form-body">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="first-name-icon">
                                Choose Field Admin
                              </label>
                              <select className="form-select" id="basicSelect">
                                <option>IT</option>
                                <option>Blade Runner</option>
                                <option>Thor Ragnarok</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="email-id-icon">City</label>
                              <select className="form-select" id="basicSelect">
                                <option>IT</option>
                                <option>Blade Runner</option>
                                <option>Thor Ragnarok</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="mobile-id-icon">
                                Date Started At{" "}
                              </label>
                              <div className="position-relative">
                                <input
                                  type="datetime-local"
                                  className="form-control"
                                  placeholder=""
                                  id="datetime-local-start"
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-clock" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="password-id-icon">
                                Date Ends At
                              </label>
                              <div className="position-relative">
                                <input
                                  type="datetime-local"
                                  className="form-control"
                                  placeholder=""
                                  id="datetime-local-end"
                                />
                                <div className="form-control-icon">
                                  <i className="bi bi-clock" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group  ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Venue Addresses (English)
                              </label>
                              <div className="position-relative">
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows={3}
                                  defaultValue={""}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Venue Addresses (Urdu)
                              </label>
                              <div className="position-relative">
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows={3}
                                  defaultValue={""}
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Dua (1-800)
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="dua-input"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Dum (1001-1800)
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="dum-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Working Lady Dua (801 - 1000)
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="wldua-input"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Working Lady Dum (1801 - 2000)
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="wldum-input"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Special Token Quota (2001 - 2100)
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="special-token-input"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Recurring Till How many Month ?
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="recurrening_till_how_many"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                User Rejoin After Days?
                              </label>
                              <div className="position-relative">
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder=""
                                  id="user_rejoin"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <h6>Venue Available Country</h6>
                            {/* <TagSelector tags={tags}/> */}
                            
                            </div>

                            <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Status Page Note (English)

                              </label>
                              <div className="position-relative">
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows={3}
                                  defaultValue={""}
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group ">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                              >
                                Status Page Note (English)

                              </label>
                              <div className="position-relative">
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows={3}
                                  defaultValue={""}
                                ></textarea>
                              </div>
                            </div>

                          </div>

                          <div className="col-md-6 col-12">
                            <div className="form-group has-icon-left">
                              <label htmlFor="mobile-id-icon">
                                {" "}
                              </label>
                              <div className="position-relative">
                              {Object.keys(selectedDays).map((day) => (
                                <div key={day} className="form-check form-switch">
                                    <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={day}
                                    checked={selectedDays[day]}
                                    onChange={() => handleChange(day)}
                                    />
                                    <label className="form-check-label" htmlFor={day}>
                                    Every {day.charAt(0).toUpperCase() + day.slice(1)}
                                    </label>
                                </div>
                                ))}
                                
                              </div>
                            </div>
                          </div>

                          

                          <div className="col-12 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mb-1"
                            >
                              Submit
                            </button>
                            <button
                              type="reset"
                              className="btn btn-light-secondary me-1 mb-1"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VenueCreate;
