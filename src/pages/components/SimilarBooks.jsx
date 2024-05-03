import React from 'react'
import LoadMoreBtn from './LoadMoreBtn'
import { FaBookOpen } from 'react-icons/fa6'
import BookCard from './BookCard'
import { getPriority, sortBooks } from '../../AppManager';
import BookCardLoader from './BookCardLoader';

export default function SimilarBooks({ books, setBooks, search, keywords, admin, id = "" }) {
    const [result, setResult] = React.useState([]);
    const [show, setShow] = React.useState(0);
    const [more, setMore] = React.useState(false);
    
    React.useEffect(() => {
        if(result.length > 5){
            setShow(5);
            setMore(true);
        }else{
            setShow(result.length);
            setMore(false);
        }
    }, [result]);

    React.useEffect(() => {
      const { output } = sortBooks(books, search, keywords, getPriority("title"));
      setResult(output.filter(book => book.id !== id).slice(0, output.length > 50 ? 50 : output.length));
    }, [books, keywords, search, id]);

    const searchElements = result.slice(0, show).map(res => <BookCard key={ res.id } id={ res.id } cover={ res.cover } title={ res.title } author={ res.author } downloads={ res.downloads } size={ res.size } pages={ res.pages } preview={ res.preview } setBooks={ setBooks } admin={ admin } />);

    return (
        <div className='home-book-section'>
            <h2 className='home-section-title'><FaBookOpen /> Similar Books</h2>
            <div className='home-books'>
                {searchElements.length === 0 && <BookCardLoader />}
                { searchElements }
            </div>
            {more && <LoadMoreBtn data={result} setShow={setShow} setMore={setMore} />}
        </div>
    )
}
