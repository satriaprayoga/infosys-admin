import axios from 'axios'
import React from 'react'
import { API_URL } from '../const'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const ProfileContent = (props) => {

    return (
        <>
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>{props.title}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">{props.pageTitle}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle"
                                                src={`${API_URL}/api/v1/images/customer/${props.id}`}
                                                alt="User profile picture" />
                                        </div>
                                        <h3 className="profile-username text-center">{props.firstName} {props.lastName}</h3>
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>Booking</b> <a className="float-right">{props.bookingCount}</a>
                                            </li>

                                        </ul>
                                        <button className="btn btn-danger btn-block" onClick={props.handleDelete}><b>Delete</b></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item"><a className="nav-link active" href="#general" data-toggle="tab">General</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#account" data-toggle="tab">Account</a></li>
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content">
                                            <div class="active tab-pane" id="general">
                                                {props.customerForm}
                                                {/* <form class="form-horizontal">
                                                    <div class="form-group row">
                                                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                                        <div class="col-sm-10">
                                                            <input type="email" class="form-control" id="inputName" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                                        <div class="col-sm-10">
                                                            <input type="email" class="form-control" id="inputEmail" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                </form> */}
                                            </div>
                                            <div class="tab-pane" id="account">
                                                {/* <h1>Account</h1> */}
                                                {props.accountForm}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default ProfileContent
