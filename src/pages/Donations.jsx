import React from 'react'
import DonationsCard from './components/DonationsCard'
import LoadMoreBtn from './components/LoadMoreBtn'
import { FaCloud, FaGift } from 'react-icons/fa6'
import { useOutletContext } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import BookCardLoader from './components/BookCardLoader';

export default function Donations() {
  const [show, setShow] = React.useState(0);
  const [more, setMore] = React.useState(false);
  const [adminSearch, setAdminSearch] = React.useState("");
  const { data, setData, loaded } = useOutletContext();
  
  React.useEffect(() => {
    if(data.length > 5){
      setShow(5);
      setMore(true);
    }else{
      setShow(data.length);
      setMore(false);
    }
  }, [data]);

  function handleAdminSearch(e) {
    const { value } = e.target;
    setAdminSearch(value);
  }

  const dataChoose = adminSearch ? data.filter(book => book.id.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.title.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.author.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.courses.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.name.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.email.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.link.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.size.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 || book.pages.toString().toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1) : data.slice(0, show);

  const donationsElement = dataChoose.map(dat => <DonationsCard key={ dat.id } id={ dat.id } cover={ dat.cover } title={ dat.title } courses={ dat.courses } author={ dat.author } link={ dat.link } size={ dat.size } pages={ dat.pages } name={ dat.name } preview={ dat.preview } email={ dat.email } message={ dat.message } setData={ setData } />);

  return (
    <div>
        {data.length > 5 && <div className="custom-search">
          <div className="search">
            <input
              type="text"
              className="admin-search"
              maxLength={30}
              onChange={handleAdminSearch}
              value={adminSearch}
              placeholder="Admin Search..."
            />
            <div className="symbol">
              <FaCloud className="cloud" />
              <FaSearch className="lens" />
            </div>
          </div>
        </div>}
        <h2 className='home-section-title'><FaGift /> Donated Books</h2>
        <div className='home-books'>
          {!loaded && donationsElement.length === 0 && <BookCardLoader />}
          { donationsElement }
          {loaded && donationsElement.length === 0 && !adminSearch && <p className='home-no-books'>There are currently no books to review</p>}
          {loaded && donationsElement.length === 0 && adminSearch && <p className='home-no-books'>No <strong>{adminSearch}</strong> related donation found</p>}
        </div>
        {more && !adminSearch && <LoadMoreBtn data={data} setShow={setShow} setMore={setMore} />}
    </div>
  )
}
