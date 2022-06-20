import moment from 'moment'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const BookingContent = (props) => {
    const calculateDay=(d1,d2)=>{
        let checkin=moment(d1,'DD/MM/YYYY');
        let checkout=moment(d2,'DD/MM/YYYY');
        return checkout.diff(checkin,'days');
    }
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
                            <div className="col-12">
                                <div className="invoice p-3 mb-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                InfoSys
                                                <small className="float-right">{'Booking Date :' + moment(props.booking.createdAt).format('DD-MM-YYYY')}</small>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="row invoice-info">
                                        <div className="col-sm-4 invoice-col">
                                            From:
                                            <address>
                                                <strong>{props.siteInfo.companyName}</strong><br />
                                                {props.siteInfo.address}<br />
                                                Phone: {props.siteInfo.phone}<br />
                                                Email: {props.siteInfo.email}
                                            </address>
                                        </div>
                                        <div className="col-sm-4 invoice-col">
                                            To
                                            <address>
                                                <strong>{props.booking.contactName}</strong><br />
                                                Phone: {props.booking.contactPhone}<br />
                                                Email: {props.booking.contactEmail}
                                            </address>
                                        </div>
                                        <div className="col-sm-4 invoice-col">
                                            <b>Invoice #{props.booking.code}</b><br/>
                                            <b>Order ID:</b> {props.booking.id}<br/>
                                            <b>Payment Due:</b> {moment(props.booking.expiresAt).format('DD-MM-YYYY')}<br/>
                                           
                                        </div>
                                    </div>
                                    <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Package</th>
                      <th>Type</th>
                      <th>Guest</th>
                      <th>Day</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.items.map((item,index)=>{
                        return(
                            <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.packageName}</td>
                        <td>{item.type}</td>
                        <td>{item.guest}</td>
                        <td>{calculateDay(props.booking.checkin,props.booking.checkout)}</td>
                        <td>{item.price.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                        <td>{(item.guest*item.price).toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                  </table>
                </div>
           
              </div>
              <div className="row">
                 <div className="col-6 float-left">
                    <p>Amount Due { moment(props.booking.expiresAt).format('DD-MM-YYYY')} :</p>
                    <p className="lead">IDR {props.booking.grossAmount.toString().replace(/(.)(?=(\d{3})+$)/g, '$1.')}</p>
                 </div>
                
              </div>
              <div className="row no-print">
                <div className="col-12">
                    <button type="button" className="btn btn-primary float-right" style={{marginRight: '5px'}}><i class="fas fa-download"></i> 
                        Print
                     </button>
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

export default BookingContent
