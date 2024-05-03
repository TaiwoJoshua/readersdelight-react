import React from 'react'
import { nanoid } from 'nanoid';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { FaFilePen, FaPlus } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import EditShortcut from './components/shortcuts/EditShortcut';
import NewShortcut from './components/shortcuts/NewShortcut';
import DeleteShortcut from './components/shortcuts/DeleteShortcut';

export default function ShortcutsList() {
    const [close, setClose] = React.useState(true);
    const [deleter, setDeleter] = React.useState("");
    const [editClose, setEditClose] = React.useState(true);
    const [newClose, setNewClose] = React.useState(true);
    const [editer, setEditer] = React.useState("");
    const { shortcuts, setShortcuts, admin } = useOutletContext();
    const auth = useLoaderData();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!(admin && auth)){
            navigate("/");
        }
    }, [admin, auth, navigate]);
    
    const elements = shortcuts.map(({shortcut, icon}) => <span key={nanoid()} className='shortcut-card'><img src={icon} alt={shortcut.toUpperCase()} /><span>{shortcut.toUpperCase()}</span><span className='shortcut-options one'  onClick={() => { setEditer({ shortcut, icon }); setEditClose(false); }}><FaFilePen /></span><span className='shortcut-options two' onClick={() => { setDeleter({ shortcut, icon }); setClose(false); }}><FaTrash /></span></span>);

    return (
        <div className='shortcuts-wrap special'>
            {!close && <DeleteShortcut shortcut={ deleter.shortcut } icon={ deleter.icon } close={() => {setClose(true)}} setShortcuts={ setShortcuts } />}
            {!editClose && <EditShortcut shortcut={ editer.shortcut } icon={ editer.icon } close={() => {setEditClose(true)}} setShortcuts={ setShortcuts } />}
            {!newClose && <NewShortcut close={() => {setNewClose(true)}} setShortcuts={ setShortcuts } />}
            <span key={nanoid()} className='shortcut-card'>
                <span>New Shortcut</span>
                <span className='shortcut-options two' onClick={() => { setNewClose(false) }}><FaPlus /></span>
            </span>
            { elements }
        </div>
    )
}
