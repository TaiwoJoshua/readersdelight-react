import React from 'react'
import BookCard from './components/BookCard'
import { LiaTimesSolid } from 'react-icons/lia'
import { FaGem, FaHistory } from 'react-icons/fa';
import LoadMoreBtn from './components/LoadMoreBtn';
import { sortByProperty } from '../AppManager';
import { useOutletContext } from 'react-router-dom';
import BookCardLoader from './components/BookCardLoader';

export default function Home() {
    const [welcome, setWelcome] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [show, setShow] = React.useState(0);
    const [more, setMore] = React.useState(false);
    const [bookCount, setBookCount] = React.useState(0);
    const [recentData, setRecentData] = React.useState([]);
    const [recentShow, setRecentShow] = React.useState(0);
    const [recentMore, setRecentMore] = React.useState(false);
    const { books, setBooks, admin } = useOutletContext();

    React.useEffect(() => {
        if(data.length > 5){
            setShow(5);
            setMore(true);
        }else{
            setShow(data.length);
            setMore(false);
        }
    }, [data]);

    React.useEffect(() => {
        if(recentData.length > 5){
            setRecentShow(5);
            setRecentMore(true);
        }else{
            setRecentShow(recentData.length);
            setRecentMore(false);
        }
    }, [recentData]);

    React.useEffect(() => {
        setData(sortByProperty(books, "downloads").reverse());
        setRecentData(sortByProperty(books, "timestamp").reverse());
    }, [books]);

    React.useEffect(() => {
        let interval = "";
        const len = books.length;
        len !== 0 && setTimeout(() => {
            interval = setInterval(() => {
                const ran = Math.floor(Math.random());
                const rand = Math.floor(Math.random());
                let add = Math.floor(len / 100);
                add = ran ? add + rand : add - rand;
                setBookCount(old => {
                    let now = old;
                    if(old < len){
                        now = old + add;
                        if(now >= len){
                            now = len;
                            clearInterval(interval);
                        }
                    }
                    return now;
                });
            }, 10);
        }, 500);

        return () => { clearInterval(interval) };
    }, [books]);

    const downloadsElements = data.slice(0, show).map(dat => <BookCard key={ dat.id + "download"} id={ dat.id } cover={ dat.cover } title={ dat.title } author={ dat.author } downloads={ dat.downloads } size={ dat.size } pages={ dat.pages } preview={ dat.preview } setBooks={ setBooks } admin={ admin } />);
    
    const recentElements = recentData.slice(0, recentShow).map(dat => <BookCard key={ dat.id + "recent" } id={ dat.id } cover={ dat.cover } title={ dat.title } author={ dat.author } downloads={ dat.downloads } size={ dat.size } pages={ dat.pages } preview={ dat.preview } setBooks={ setBooks } admin={ admin } />);

    return (
        <div className='home'>
            {welcome && <div className="welcome-info">
                <LiaTimesSolid onClick={() => {setWelcome(false)}} />
                <span><strong style={{color: "#000000"}}><span style={{color: "#0B6623"}}>READERS</span>DELIGHT</strong> is your source for academic resources. As of today we have { bookCount } resources available for download. It is free and has no download limits. Enjoy it and don't forget to bookmark and share the love!</span>
            </div>}
            <div className='home-book-section'>
                <h2 className='home-section-title'><FaGem /> Most Downloads</h2>
                <div className='home-books'>
                    {downloadsElements.length === 0 && <BookCardLoader />}
                    { downloadsElements }
                </div>
                {more && <LoadMoreBtn data={data} setShow={setShow} setMore={setMore} />}
            </div>
            <div className='home-book-section'>
                <h2 className='home-section-title'><FaHistory /> Recent Uploads</h2>
                <div className='home-books'>
                    {recentElements.length === 0 && <BookCardLoader />}
                    { recentElements }
                </div>
                {recentMore && <LoadMoreBtn data={recentData} setShow={setRecentShow} setMore={setRecentMore} />}
            </div>
        </div>
    )
}
