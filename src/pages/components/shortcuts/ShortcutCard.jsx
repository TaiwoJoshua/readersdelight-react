import React from 'react'
import { Link } from 'react-router-dom'

export default function ShortcutCard({ image, shortcut }) {
    return (
        <Link to={`/search/${shortcut}`} className='shortcut-card'>
            <img onError={(e)=>{ if (e.target.src !== "/default.png"){ e.target.onerror = null; e.target.src="/default.png"; }}} src={image} alt={shortcut.toUpperCase()} />
            <span>{shortcut.toUpperCase()}</span>
        </Link>
    )
}
