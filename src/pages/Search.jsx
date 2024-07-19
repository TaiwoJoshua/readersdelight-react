import React from "react";
import BookCard from "./components/BookCard";
import LoadMoreBtn from "./components/LoadMoreBtn";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getPriority, sortBooks } from "../AppManager";

export default function Search() {
  const { search } = useParams();
  const { state } = useLocation();
  const priority = state?.priority ? state.priority : "";
  const { books, setBooks, keywords, admin } = useOutletContext();

  const [result, setResult] = React.useState([]);
  const [show, setShow] = React.useState(0);
  const [more, setMore] = React.useState(false);

  React.useEffect(() => {
    if (result.length > 5) {
      setShow(5);
      setMore(true);
    } else {
      setShow(result.length);
      setMore(false);
    }
  }, [result]);

  React.useEffect(() => {
    function height() {
      const box = document
        .querySelector(".main>div>div")
        .getBoundingClientRect().height;
      const wrapper = document.getElementsByClassName("home-books")[0];
      const height = box - 70;
      wrapper.style.height =
        height > wrapper.scrollHeight ? wrapper.scrollHeight : height + "px";
    }
    height();
    const quote = document.getElementsByClassName("quote")[0];
    const resizeObserver = new ResizeObserver(height);
    resizeObserver.observe(quote);

    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    sortBooks(books, search, keywords, getPriority(priority))
      .then(({ output, length }) => setResult(output.slice(0, length)))
      .catch((err) => err);
  }, [books, keywords, search, priority]);

  const searchElements = result
    .slice(0, show)
    .map((res) => (
      <BookCard
        key={res.id}
        id={res.id}
        cover={res.cover}
        title={res.title}
        author={res.author}
        downloads={res.downloads}
        size={res.size}
        pages={res.pages}
        preview={res.preview}
        book={res}
        setBooks={setBooks}
        admin={admin}
      />
    ));

  return (
    <div>
      <div className="home-book-section" style={{ marginBottom: 0 }}>
        <h2 className="home-section-title">
          <FaSearch /> {search.toUpperCase()} Books
        </h2>
        <div className="home-books">
          {searchElements}
          {searchElements.length === 0 && (
            <p className="home-no-books">
              No {search.toUpperCase()} Book Found
            </p>
          )}
        </div>
        {more && (
          <LoadMoreBtn data={result} setShow={setShow} setMore={setMore} />
        )}
      </div>
    </div>
  );
}
