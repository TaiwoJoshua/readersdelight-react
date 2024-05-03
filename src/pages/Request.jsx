import React from 'react'
import { FaPaperPlane, FaSpinner } from 'react-icons/fa6';
import { LiaTimesCircle } from 'react-icons/lia';
import { nanoid } from 'nanoid';
import { newRecordField } from '../AppManager';

export default function Request() {
    const [data, setData] = React.useState({ name: "", email: "", message: "", title: "", author: "", courses: "" });
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [loading, setLoading] = React.useState(false);
    
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

    return (
        <div className='book-request'>
            <h3>Request for a Book</h3>
            <form className='form' onSubmit={ handleSubmit }>
                {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
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
