import React from 'react';
import '../../../components/confirmAction.css';
import { LiaTimesCircle } from 'react-icons/lia';
import { FaSpinner } from 'react-icons/fa6';
import { nanoid } from 'nanoid';
import { deleteRecordField, stripSpace } from '../../../AppManager';

export default function DeleteKeyword({ keyword, setKeywords, close }) {
    const [something, setSomething] = React.useState("");
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [loading, setLoading] = React.useState(false);
    const [rand] = React.useState(() => {return nanoid()});
    const [match, setMatch] = React.useState(false);
    const trimname = stripSpace(keyword).toUpperCase();
    const pass = trimname.length >= 10 ? trimname.slice(0, 10) : trimname.padEnd("10", rand.slice(0, 10 - trimname.length));

    function handleChange(e){
        const { value } = e.target;
        setSomething(value);
        setMatch(value === pass ? true : false);
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setLoading(true);
            const send = await deleteRecordField("keywords", keyword);
            if(send === true){
                setTimeout(() => {
                    setKeywords(oldKeys => {
                        const newKeywords = {};
                        const newKeys = Object.keys(oldKeys).filter(key => key.toUpperCase() !== keyword.toUpperCase());
                        for (let y = 0; y < newKeys.length; y++) {
                            const newKey = newKeys[y];
                            newKeywords[newKey] = oldKeys[newKey];
                        }
                        return newKeywords;
                    });
                    setSomething("");
                    setStatus({status: "success", type: "success", message: "Delete Successful"});
                    setLoading(false);
                    setTimeout(() => {
                        close();
                    }, 1500);
                }, 1000);
            }else{
                setStatus({status: "failed", type: "failed", message: "Delete Failed"});
                setLoading(false);
            }
        } catch (error) {
            setStatus({status: "failed", type: "failed", message: "Delete Failed"});
            setLoading(false);
        }
    }

    return (
        <div className='confirm-action-wrapper'>
            <form className='action-form' onSubmit={handleSubmit}>
                <div className='action-nav'>
                    <h2 className="action-title">Delete { trimname }</h2>
                    {!loading && <LiaTimesCircle onClick={close} className='action-close' />}
                </div>
                <div className="action-main">
                    {status.message !== "" && <p className='status-wrapper'><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                    <p className="action-note" style={{marginTop: "10px"}}>
                        Type <strong>{pass}</strong> below to confirm delete
                    </p>
                    <i className='action-warning'><strong>Note:</strong> This action is irreversible and cannot be undone.</i>
                    <input type="text" readOnly={ loading } name="whatever" className='action-input' required id="whatever" placeholder={pass} maxLength={10} minLength={10} value={something} onChange={handleChange} autoComplete={pass} />
                    <button type="submit" className='action-btn' disabled={!match || loading}>{loading ? <FaSpinner className='spinner' style={{fontSize: "1.2em"}} /> : "delete"}</button>
                </div>
            </form>
        </div>
    );
}