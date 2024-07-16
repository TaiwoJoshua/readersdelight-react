import React from "react";
import { FaCaretRight, FaFilePen, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import FancyboxView from "../../components/FancyboxView";
import DeleteBook from "./DeleteBook";

export default function BookCard({ book, setBooks, admin }) {
  const [close, setClose] = React.useState(true);
  const { cover, title, size, pages, downloads, author, id } = book;
  return (
    <div className="book-card">
      {!close && (
        <DeleteBook
          type={"books"}
          book={book}
          setBooks={setBooks}
          close={() => {
            setClose(true);
          }}
        />
      )}
      <FancyboxView className="book-card-img">
        <a data-fancybox={id} href={cover}>
          <img
            onError={(e) => {
              if (e.target.src !== "/default.png") {
                e.target.onerror = null;
                e.target.src = "/default.png";
              }
            }}
            src={cover}
            alt={title}
          />
        </a>
      </FancyboxView>
      <div className="book-card-info">
        <Link to={`/download/${id}`}>
          <span className="book-card-title">
            <h4>{title}</h4>
          </span>
          <div className="book-card-details">
            <span>{size.toUpperCase()}</span>
            <span>
              <FaCaretRight />
            </span>
            <span>{`${pages} Page${parseInt(pages) > 1 ? "s" : ""}`}</span>
            <span>
              <FaCaretRight />
            </span>
            <span>{`${downloads} Download${
              parseInt(downloads) > 1 ? "s" : ""
            }`}</span>
          </div>
          <div>{author}</div>
        </Link>
      </div>
      {admin && (
        <div className="book-admin">
          <Link to={`/edit/${id}`} state={{ book }}>
            <FaFilePen />
          </Link>
          <FaTrash
            onClick={() => {
              setClose(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
