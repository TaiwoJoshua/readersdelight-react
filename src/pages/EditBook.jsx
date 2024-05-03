import React from 'react'
import { FaFilePen, FaSpinner } from 'react-icons/fa6';
import { checkImage, deleteFiles, getRecord, showSwal, updateRecordField, uploadFiles } from '../AppManager';
import { redirect, useLoaderData, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { LiaTimesCircle } from 'react-icons/lia';
import { nanoid } from 'nanoid';
import { auth } from '../Api';

export async function loader(books) {
    try {
        if (!(auth && auth.currentUser && auth.currentUser.email && auth.currentUser.emailVerified)) {
            return redirect("/");
        }else{
            let final = books;
            if (final.length === 0) {
                const res = await getRecord("books");
                final = res;
            }
            return { auth: auth && auth.currentUser && auth.currentUser.email && auth.currentUser.emailVerified, books: [...final] };
        }
    } catch (error) {
        return redirect("/");
    }
}

export default function EditBook() {
    const [data, setData] = React.useState({ id: "", link: "", title: "", cover: "", author: "", preview: [], size: "", pages: 0, courses: "", timestamp: 0 });
    const [images, setImages] = React.useState({ cover: "", preview: [] });
    const [status, setStatus] = React.useState({status: "", type: "", message: ""});
    const [title, setTitle] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [edited, setEdited] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { setBooks, admin } = useOutletContext();
    const { books, auth } = useLoaderData();

    React.useEffect(() => {
        if(!(admin && auth)){
            navigate("/");
        }
    }, [admin, auth, navigate]);

    React.useEffect(() => {
        const book = books?.filter(dat => dat.id === id )[0];
        if(book){
            setData({ ...book, cover: "", preview: [] });
            setImages({ cover: book.cover, preview: book.preview });
            setTitle(book.title);
        }else{
            showSwal("error", "Book not Found", "", 5000);
            navigate("/");
        }
    }, [id, navigate, books]);

    function handleChange(e){
        const { name, type, value, files } = e.target;
        const maxSize = name === "cover" ? 100 : 500;
        if(type === "file" && checkImage(files, maxSize, setError, setStatus)){
            setData(oldData => ({...oldData, [name]: files }));
        }else{
            setData(oldData => ({...oldData, [name]: value }));
        }
        if(!edited){
            setEdited(true);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            setLoading(true);
            const uploadData = { id: data.id, link: data.link, title: data.title, author: data.author, size: data.size, pages: data.pages, courses: data.courses };
            if(data.cover && data.cover.length !== 0){
                await deleteFiles(images.cover, "cover");
                const uploadCover = await uploadFiles("cover", data.cover, [data.id]);
                const { downloadURL } = await uploadCover[0];
                uploadData["cover"] = downloadURL;
            }

            if(data.preview && data.preview.length !== 0){
                const previewIds = Object.keys(data.preview).map(() => nanoid());
                await deleteFiles(images.preview, "preview");
                const uploadPreviews = await uploadFiles("preview", data.preview, previewIds, false, false);
                const preview = [];
                for (let u = 0; u < uploadPreviews.length; u++) {
                    const { downloadURL } = await uploadPreviews[u];
                    preview.push(downloadURL);
                }
                uploadData["preview"] = preview;
            }

            const send = await updateRecordField("books", uploadData);

            setTimeout(() => {
                if(send === true){
                    setBooks(oldBooks => {
                        return oldBooks.map(book => {
                            if(book.id === id){
                                const cover = uploadData.cover ? uploadData.cover : book.cover;
                                const preview = uploadData.preview ? uploadData.preview : book.preview;
                                const newData = { ...book, ...uploadData, cover, preview };
                                return newData;
                            }
                            return book;
                        });
                    });
                    setStatus({status: "success", type: "success", message: "Book Updated"});
                    setLoading(false);
                }else{
                    setStatus({status: "failed", type: "failed", message: "Update Failed"});
                    setLoading(false);
                }
            }, 2000);
        } catch (error) {
            console.log(error);
            setStatus({status: "failed", type: "failed", message: "Update Failed"});
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
            <h3>Edit { title }</h3>
            <form className='form' onSubmit={ handleSubmit }>
                {status.message !== "" && <p className='status-wrapper' id="status-wrapper"><span className={`status-message ${status.type}`}>{status.message}</span><LiaTimesCircle className='status-close' onClick={() => {setStatus({status: "", type: "", message: ""})}}/></p>}
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="title" autoComplete="off" placeholder="Name" minLength={3} maxLength={100} value={ data.title } required />
                        <label htmlFor="name">Book Title</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="author" autoComplete="off" placeholder="Author(s)" minLength={3} maxLength={100} required value={ data.author } />
                        <label htmlFor="author">Author(s)</label>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="courses" autoComplete="off" placeholder="Related Courses" minLength={3} maxLength={100} required value={ data.courses } />
                        <label htmlFor="relatedcourses">Related Courses</label>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="field">
                            <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="link" placeholder="Book Link" minLength={10} maxLength={250} required value={ data.link } />
                            <label>Book Link</label>
                        </div>
                    </div>
                    <div>
                        <div className="field">
                            <input onChange={ handleChange } readOnly={ loading } type="text" className="form-control" name="size" autoComplete="off" placeholder="Book Size" minLength={4} maxLength={10} required value={ data.size } />
                            <label>Book Size</label>
                        </div>
                    </div>
                    <div>
                        <div className="field">
                            <input onChange={ handleChange } readOnly={ loading } type="number" className="form-control" name="pages" autoComplete="off" placeholder="Book Pages" min={1} max={99999} minLength={1} maxLength={5} value={ data.pages } required />
                            <label>Book Pages</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="file" className="form-control" name="cover" accept="image/*" />
                        <label>Book Front Cover (Max Size - 100kb)</label>
                    </div>
                    <div className="field">
                        <input onChange={ handleChange } readOnly={ loading } type="file" multiple className="form-control" name="preview" accept="image/*" />
                        <label>Book Preview (3 - 5 Screenshots)</label>
                    </div>
                </div>
                <div>
                    <button className="btn" disabled={ !edited || loading || error } type="submit">{loading ? <FaSpinner className='spinner' /> : <><FaFilePen /> Update</> }</button>
                </div>
            </form>
        </div>
    )
}
