import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <span className="banner-wrap">
            <Link to="/"><h1 title='Readers Delight'><img src="/images/icon.png" alt="Readers Delight" /> <span style={{ color: "#0B6623" }}>READERS</span>DELIGHT</h1></Link>
        </span>
    )
}
