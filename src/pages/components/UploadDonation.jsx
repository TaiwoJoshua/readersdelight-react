import React from 'react';
import '../../components/confirmAction.css';
import { LiaTimesCircle } from 'react-icons/lia';
import { FaSpinner } from 'react-icons/fa6';
import { nanoid } from 'nanoid';
import { deleteRecordField, showSwal, stripSpace, updateRecordField } from '../../AppManager';

export default function UploadDonation({ donation, setBooks, close }) {
    const { id, title } = donation;
    const [something, setSomething] = React.useState("");
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [loading, setLoading] = React.useState(false);
    const [rand] = React.useState(() => {return nanoid()});
    const [match, setMatch] = React.useState(false);
    const trimname = stripSpace(id);
    const keyword = trimname.length >= 10 ? trimname.slice(0, 10) : trimname.padEnd("10", rand.slice(0, 10 - trimname.length));

    function handleChange(e){
        const { value } = e.target;
        setSomething(value);
        setMatch(value === keyword ? true : false);
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setLoading(true);
            const uploadData = { ...donation, downloads: 0, timestamp: new Date().getTime() };
            const send = await updateRecordField("books", uploadData);
            if(send === true){
                deleteRecordField("donations", id);
                setBooks(oldBooks => {
                    const newBooks = oldBooks.filter(book => book.id !== id);
                    return newBooks;
                });
                showSwal("success", "Upload Successful");
                setSomething("");
            }else{
                setStatus({status: "failed", type: "failed", message: "Upload Failed"});
                setLoading(false);
            }
        } catch (error) {
            setStatus({status: "failed", type: "failed", message: "Upload Failed"});
            setLoading(false);
        }
    }

    return (
        <div className='confirm-action-wrapper'>
            <form className='action-form' onSubmit={handleSubmit}>
                <div className='action-nav'>
                    <h2 className="action-title">Upload { title }</h2>
                    {!loading && <LiaTimesCircle onClick={close} className='action-close' />}
                </div>
                <div className="action-main">
                    {status.message !== "" && <p className='status-wrapper'><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                    <p className="action-note" style={{marginTop: "10px"}}>
                        Type <strong>{keyword}</strong> below to confirm upload
                    </p>
                    <i className='action-warning'><strong>Note:</strong> This action is irreversible and cannot be undone.</i>
                    <input type="text" name="whatever" className='action-input' required id="whatever" placeholder={keyword} maxLength={10} minLength={10} value={something} onChange={handleChange} autoComplete={keyword} />
                    <button type="submit" className='action-btn' disabled={!match || loading}>{loading ? <FaSpinner className='spinner' style={{fontSize: "1.2em"}} /> : "delete"}</button>
                </div>
            </form>
        </div>
    );
}