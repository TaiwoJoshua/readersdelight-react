import React from 'react'
import { FaPaperPlane, FaSpinner } from 'react-icons/fa6';
import { LiaTimesCircle } from 'react-icons/lia';
import { nanoid } from 'nanoid';
import { newRecordField } from '../AppManager';
import RequestDownloader from './components/RequestDownloader';

export default function Request() {
    const [data, setData] = React.useState({ name: "", email: "", message: "", title: "", author: "", courses: "" });
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [ticket, setTicket] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [request, setRequest] = React.useState({name: "", booktitle: "", ticket: ""});
    
    function handleChange(e){
        const { name, value } = e.target;
        setData(oldData => ({...oldData, [name]: value }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setLoading(true);
            const timestamp = new Date().getTime();
            const ticket = parseInt(timestamp.toString().slice(-10));
            const uploadData = { ...data, id: nanoid(), status: "Processing", ticket, timestamp };
            
            const send = await newRecordField("requests", uploadData);
            
            setTimeout(() => {
                if(send === true){
                    setTicket(ticket);
                    setRequest({name: data.name, booktitle: data.title, ticket})
                    setStatus({status: "success", type: "success", message: "Book Request Successful"});
                    setData({ name: "", email: "", message: "", title: "", author: "", courses: "" });
                    setLoading(false);
                }else{
                    setStatus({status: "failed", type: "failed", message: "Book Request Failed"});
                    setLoading(false);
                }
            }, 1500);
        } catch (error) {
            setStatus({status: "failed", type: "failed", message: "Book Request Failed"});
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if(status.message !== ""){
            document.getElementById("status-wrapper").scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [status]);

    function requestContent(){
        return (
            <div style={{backgroundColor: "#E9EBEE", padding: "40px 20px", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", color: "black"}}>
                <div style={{width: "calc(100% - 40px)", backgroundColor: "white", margin: "auto", borderRadius: "10px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)", padding: "15px"}}>
                    <a href="https://readersdelight.netlify.app/" target='_blank' rel="noreferrer" style={{display: "block", textAlign: "center", textDecoration: "none", color: "black"}}>
                        <img src="/banner.png" alt="Readers Delight" style={{height: "30px"}} />
                    </a>
                    <hr style={{color: "gray", margin: "15px 0"}} />
                    <h3 style={{margin: "0"}}>Congratulations! {request.name},</h3>
                    <p style={{marginTop: "10px", height: "36px"}}>Your book request for <i>{request.booktitle}</i> to <strong><span style={{color: "#0B6623"}}>READERS</span>DELIGHT</strong> eLibrary was successful!</p>
                    <p>Your request ticket number is: <strong>{request.ticket}</strong>.</p>
                    <p style={{marginTop: "10px"}}>You can check the status of your request anytime using this ticket number.</p>
                    <p style={{marginTop: "10px"}}>Rest assured, we'll notify you via email as soon as the book is found.</p>
                    <p style={{marginTop: "10px"}}>Thank you for choosing us and contributing to the expansion of our database. Happy reading!</p>
                    <p style={{marginTop: "10px", marginBottom: "0"}}>Warm regards,</p>
                    <p style={{marginTop: "0"}}><strong>Readers Delight Team.</strong></p>
                </div>
            </div>
        );
    }

    return (
        <div className='book-request'>
            <h3>Request for a Book</h3>
            <form className='form' onSubmit={ handleSubmit }>
                {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                {ticket !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message`}>Request Ticket Number is <strong style={{marginLeft: "5px"}}>{ticket}</strong></span><LiaTimesCircle className='status-close' onClick={() => {setTicket("")}}/></p>}
                {request.booktitle !== "" && <span className='btn-request'><span>Request File - </span><RequestDownloader content={requestContent()} filename={`${request.booktitle} Request`} btnname={"Download"} className={"btn"} /><LiaTimesCircle className='status-close' style={{color: "black"}} onClick={() => {setRequest({name: "", booktitle: "", ticket: ""})}}/></span>}
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="name" autoComplete="off" placeholder="Name" maxLength={30} value={ data.name } />
                        <label>Name</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="email" className="form-control" name="email" autoComplete="on" placeholder="E-Mail" required maxLength={50} value={ data.email } />
                        <label><span>*</span>E-Mail</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <textarea onChange={ handleChange } readOnly={ loading } className="form-control textarea" rows={3} name="message" placeholder="Message (Hint: Details about the Book)" maxLength={250} value={ data.message } />
                        <label>Message</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="title" autoComplete="off" placeholder="Book Title" required maxLength={100} value={ data.title } />
                        <label><span>*</span>Book Title</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="author" autoComplete="off" placeholder="Author(s)" minLength={3} maxLength={100} value={ data.author } />
                        <label>Author(s)</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="courses" autoComplete="off" placeholder="Related Courses" minLength={3} maxLength={100} required value={ data.courses } />
                        <label><span>*</span>Related Courses</label>
                    </div>
                </div>
                <div>
                    <button className="btn" disabled={ loading } type="submit">{loading ? <FaSpinner className='spinner' /> : <><FaPaperPlane /> Request</> }</button>
                </div>
            </form>
        </div>
    )
}
