import React from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import FancyboxView from "../components/FancyboxView";
import SimilarBooks from "./components/SimilarBooks";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { getRecord, showSwal } from "../AppManager";
import { nanoid } from "nanoid";

export async function loader(books) {
  try {
    let final = books;
    if (final.length === 0) {
      const res = await getRecord("books");
      // const fet = await fetch("/data/BooksData.json");
      // const res = await fet.json();
      final = res;
    }
    return { books: [...final] };
  } catch (error) {
    return { books: [] };
  }
}

export default function Download() {
  const [data, setData] = React.useState({
    id: "",
    link: "",
    title: "",
    cover: "",
    author: "",
    preview: [],
    size: "",
    downloads: 0,
    pages: 0,
    courses: "",
    timestamp: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBooks, keywords, admin } = useOutletContext();
  const { books } = useLoaderData();

  React.useEffect(() => {
    const book = books?.filter((dat) => dat.id === id)[0];
    if (book) {
      setData(book);
    } else {
      showSwal("error", "Book not Found", "", 5000);
      navigate("/");
    }
  }, [id, navigate, books]);

  const coursesElement = data.courses
    ?.split(" | ")
    .map((course, index, array) =>
      index + 1 === array.length ? (
        <Link
          key={nanoid()}
          to={`/search/${course}`}
          state={{ priority: "courses" }}
        >
          {course}
        </Link>
      ) : (
        <>
          <Link to={`/search/${course}`} state={{ priority: "courses" }}>
            {course}
          </Link>{" "}
          |{" "}
        </>
      )
    );

  const authorsElement = data.author?.split(" | ").map((author, index, array) =>
    index + 1 === array.length ? (
      <Link
        key={nanoid()}
        to={`/search/${author}`}
        state={{ priority: "author" }}
      >
        {author}
      </Link>
    ) : (
      <>
        <Link to={`/search/${author}`} state={{ priority: "author" }}>
          {author}
        </Link>{" "}
        |{" "}
      </>
    )
  );

  const previewElement = data.preview.map((preview, index) =>
    index === 0 ? (
      <a key={nanoid()} data-fancybox="preview" href={preview}>
        <button>
          <FaEye /> Preview
        </button>
      </a>
    ) : (
      <a key={nanoid()} data-fancybox="preview" href={preview}>
        {" "}
      </a>
    )
  );

  return (
    <div>
      <div className="book-info-card">
        <FancyboxView className="book-info-img">
          <a data-fancybox="book" href={data.cover}>
            <img src={data.cover} alt={data.title} />
          </a>
        </FancyboxView>
        <div className="book-info">
          <p>{data.title}</p>
          <span>
            <span>{data.size}</span>
            <span>{`${data.downloads} Download${
              parseInt(data.downloads) > 1 ? "s" : ""
            }`}</span>
          </span>
          <div>
            {coursesElement}
          </div>
          <div>
            {authorsElement}
          </div>
          <div className="book-info-btn">
            <FancyboxView>
              {previewElement}
            </FancyboxView>
            <a href={data.link}>
              <button>
                <FaCloudDownloadAlt /> Download
              </button>
            </a>
          </div>
        </div>
      </div>
      <br />
      <SimilarBooks
        books={books}
        setBooks={setBooks}
        search={data.title}
        keywords={keywords}
        id={data.id}
        admin={ admin }
      />
    </div>
  );
}
