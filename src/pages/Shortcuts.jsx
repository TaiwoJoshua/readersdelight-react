import React from 'react'
import ShortcutCard from './components/shortcuts/ShortcutCard'
import { nanoid } from 'nanoid';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Shortcuts({ shortcuts, admin }) {
    const elements = shortcuts.map(({shortcut, icon}) => <ShortcutCard key={nanoid()} shortcut={shortcut} image={icon} />);

    return (
        <div className='shortcuts-wrap'>
            {admin && <div className='shortcut-btn'>
                <Link to={"/shortcuts"}>
                    <button className='button'><FaRegEdit style={{ marginBottom: 0 }} /> Shortcuts</button>
                </Link>
            </div>}
            {admin && <div className='shortcut-btn'>
                <Link to={"/keywords"}>
                    <button className='button'><FaRegEdit style={{ marginBottom: 0 }} /> Keywords</button>
                </Link>
            </div>}
            { elements }
        </div>
    )
}
