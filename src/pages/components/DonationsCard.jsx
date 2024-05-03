import React from 'react'
import { FaCaretRight, FaComment, FaDownload, FaEnvelope, FaEye, FaPenToSquare, FaTrash, FaUpload, FaUser } from 'react-icons/fa6'
import FancyboxView from '../../components/FancyboxView';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import DeleteBook from './DeleteBook';
import UploadDonation from './UploadDonation';

export default function DonationsCard({ cover, title, size, pages, link, author, id, name, preview, email, message, courses, setData }) {
    const [close, setClose] = React.useState(true);
    const [closeUpload, setCloseUpload] = React.useState(true);

    const previewElement = preview.map((preview, index) => index === 0 ? <a key={ nanoid() } data-fancybox="preview" href={ preview }><FaEye /> Preview</a> : <a key={ nanoid() } data-fancybox="preview" href={ preview }> </a>);

    return (
        <div className='book-card'>
            {!close && <DeleteBook type={"donations"} book={{ cover, title, id, preview }} setBooks={ setData } close={() => {setClose(true)}} />}
            {!closeUpload && <UploadDonation donation={{ cover, title, size, pages, link, author, id, preview, courses }} setBooks={ setData } close={() => {setCloseUpload(true)}} />}
            <FancyboxView className='book-card-img'>
                <a data-fancybox="book" href={cover}>
                    <img src={cover} alt={title} />
                </a>
            </FancyboxView>
            <div className='book-card-info'>
                <div>
                    <span className='book-card-title'>
                        <h4>{ title }</h4>
                    </span>
                    <div className='book-card-details'>
                        <span>{size.toUpperCase()}</span>
                        <span><FaCaretRight /></span>
                        <span>{`${pages} Page${parseInt(pages) > 1 ? "s" : ""}`}</span>
                        <span><FaCaretRight /></span>
                        <span>{author}</span>
                    </div>
                    <div className='book-card-options'>
                        <span className='courtesy'><span>Courtesy: <span>{name}</span></span></span>
                        <span className="courtesy-data">
                            <span>
                                {name && <span>
                                    <span className='courtesy-head' style={{ marginTop: "0" }}><FaUser /> Name:</span>
                                    <strong>{ name }</strong>
                                </span>}
                                {email && <span>
                                    <span className='courtesy-head'><FaEnvelope /> E-Mail:</span>
                                    <strong><a className='mail' href={`mailto: ${email}?subject=Donation of ${ title } Reviewed&content=Thank you for your donation to ReadersDelight.`}>{ email }</a></strong>
                                </span>}
                                {message && <span>
                                    <span className='courtesy-head'><FaComment /> Message:</span>
                                    <strong className='message'>{ message }</strong>
                                </span>}
                            </span>
                        </span>
                        <span><FancyboxView>{ previewElement }</FancyboxView></span>
                        <span><a href={ link } target='_blank' rel="noreferrer"><FaDownload /> Download</a></span>
                        <span><Link to={ id } state={{ book: { title, courses, size, pages, link, author, id } }}><FaPenToSquare /> Edit</Link></span>
                        <span onClick={() => { setCloseUpload(false); }}><FaUpload /> Upload</span>
                        <span onClick={() => { setClose(false); }}><FaTrash /> Delete</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
