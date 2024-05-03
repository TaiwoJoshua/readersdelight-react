import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="about">
            <h3>
                About <span>READERS</span>DELIGHT
            </h3>
            <p>
                <strong>READERSDELIGHT</strong> is a free search engine which allows you to search, preview and download Books into your devices. We are constantly surfing to add Books to our database.
                In this way, the library stays up-to-date and offers you an enormous database to search. In addition to the traditional search engines, it has these extra features:
            </p>
            <div>
                <span>Fast</span>
                <p>
                    It takes only milliseconds to search Books.
                </p>
            </div>
            <div>
                <span>Book Covers</span>
                <p>
                    All files have cover photos which helps you save time.
                </p>
            </div>
            <div>
                <span>Previews</span> 
                <p>
                    You can preview all books before downloading.
                </p>
            </div>
            <div>
                <span>Up-to-date</span> 
                <p>
                    Our archive is constantly growing while being consistently and efficiently updated.
                </p>
            </div>
            <div>
                <span>Book Donations</span>
                <p>
                    We provides users the opportunity to help enlarge our database, if by chance you have a book that is unavailable in the database. You can choose to share and <Link to="/donate"><strong>DONATE HERE</strong></Link>.
                </p>
            </div>
            <div>
                <span>Request for a Book</span> 
                <p>
                    If a book you wish to download is unavailable in our database, kindly make a <Link to="/request"><strong>REQUEST HERE</strong></Link> and it would be made available if available on the world wide web.
                </p>
            </div>
            <div>
                <span>Feedback</span> 
                <p>
                    If you come across any broken links, find yourself directed to the wrong book while browsing, or encounter any other problems, please utilize the <Link to="/feedback"><strong>FEEDBACK FORM</strong></Link> to report the issue.<br /> 
                    Your feedback is crucial in maintaining the quality and accuracy of our collection. The problem will be swiftly addressed to ensure a seamless reading experience for all users.<br /> 
                    Thank you for helping us keep our eLibrary in top shape!
                </p>
            </div>
        </div>
    )
}
