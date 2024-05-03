import React from 'react'
import { Link } from 'react-router-dom'

export default function ShortcutCard({ image, shortcut }) {
    return (
        <Link to={`/search/${shortcut}`} className='shortcut-card'>
            <img src={image} alt={shortcut.toUpperCase()} />
            <span>{shortcut.toUpperCase()}</span>
        </Link>
    )
}
