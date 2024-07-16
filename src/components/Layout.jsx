import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preloader from "./Preloader";
import Shortcuts from "../pages/Shortcuts";
import { getRecord, sortByProperty } from "../AppManager";
import Quotes from "./Quotes";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Api";
import { FaArrowLeft } from "react-icons/fa6";

function Layout({ books, setBooks, admin }) {
  const [preloader, setPreloader] = React.useState(true);
  const { pathname } = useLocation();
  const [keywords, setKeywords] = React.useState({});
  const [shortcuts, setShortcuts] = React.useState([]);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    getRecord("shortcuts")
      .then((data) => setShortcuts(sortByProperty(data, "shortcut")))
      .catch((err) => err);

    onSnapshot(doc(db, "books", "shortcuts"), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      const data = [];
      const record = doc.data();
      for (const key in record) {
        if (Object.hasOwnProperty.call(record, key)) {
          const book = record[key];
          data.push(book);
        }
      }
      setShortcuts(sortByProperty(data, "shortcut"));
    });
  }, []);

  React.useEffect(() => {
    getRecord("keywords")
      .then((data) => {
        const keys = {};
        for (let l = 0; l < data.length; l++) {
          const key = data[l];
          keys[key.id] = key.keywords;
        }
        setKeywords(keys);
      })
      .catch((err) => err);

    onSnapshot(doc(db, "books", "keywords"), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      const data = [];
      const record = doc.data();
      for (const key in record) {
        if (Object.hasOwnProperty.call(record, key)) {
          const book = record[key];
          data.push(book);
        }
      }
      const keys = {};
      for (let l = 0; l < data.length; l++) {
        const key = data[l];
        keys[key.id] = key.keywords;
      }
      setKeywords(keys);
    });
  }, []);

  React.useEffect(() => {
    document.getElementById("preloader") &&
      setTimeout(() => {
        document.getElementById("preloader").style.opacity = 0;
        document.getElementById("preloader").style.pointerEvents = "none";
        setTimeout(() => {
          setPreloader(false);
        }, 1000);
      }, 1500);
  }, []);

  React.useEffect(() => {
    function height() {
      const screen = window.screen.height;
      const navbar = document
        .getElementsByClassName("navbar")[0]
        ?.getBoundingClientRect().height;
      const footer = document
        .getElementsByClassName("footer")[0]
        ?.getBoundingClientRect().height;
      const quote = document
        .getElementsByClassName("quote")[0]
        ?.getBoundingClientRect().height;
      const free = screen - navbar - footer - quote - 20;
      const box = document.querySelector(".main>div>div");
      if (box) {
        box.style.minHeight = free + "px";
      }
    }
    height();
    const quote = document.getElementsByClassName("quote")[0];
    const resizeObserver = new ResizeObserver(height);
    resizeObserver.observe(quote);

    return () => resizeObserver.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    function show() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const back = document.getElementsByClassName("back-btn")[0];
      if (back) {
        back.style.left = "10px";

        timeoutRef.current = setTimeout(() => {
          back.style.left = "-50px";
        }, 2000);
      }
    }
    window.addEventListener("scroll", show);

    return () => {
      window.removeEventListener("scroll", show);
    };
  }, []);

  return (
    <>
      {preloader && <Preloader />}
      <div className="books-sheet"></div>
      <Navbar shortcuts={shortcuts} admin={admin} />
      <Link to={-1} className="back-btn">
        <FaArrowLeft />
      </Link>
      <main>
        <div className="main">
          <Outlet
            context={{
              keywords,
              setKeywords,
              books,
              setBooks,
              shortcuts,
              setShortcuts,
              admin,
            }}
          />
        </div>
        <div className="sidenav">
          {pathname !== "/donate" && pathname !== "/request" && (
            <Shortcuts shortcuts={shortcuts} admin={admin} />
          )}
          {pathname === "/donate" && (
            <div style={{ color: "gray" }}>
              <span style={{ fontWeight: 700, color: "black" }}>
                Need help filling the form?
              </span>{" "}
              <br />
              <strong>Step 1:</strong> Input your full name (optional) <br />
              <strong>Step 2:</strong> Input your E-Mail <br />
              <strong>Step 3:</strong> Input your message (optional) <br />
              <strong>Step 4:</strong> Input the Book Title <br />
              <strong>Step 5:</strong> Input the courses related to the book{" "}
              <br />
              <strong>Format</strong> - MTH 221 | MAT | CPE 123 <br />
              <strong>Step 6:</strong> Input the author(s) of the book (optional
              but appreciated) <br />
              <strong>Format</strong> - John Doe | Mary Doe <br />
              <strong>Step 7:</strong> Input the link where the book can be
              downloaded from <br />
              <strong>Step 8:</strong> Input the number of pages of the book{" "}
              <br />
              <strong>Step 9:</strong> Input the size of the book <br />
              <strong>Format</strong> - 50.00MB <br />
              <strong>Step 10:</strong> Upload the book cover <br />
              <strong>Step 11:</strong> Upload{" "}
              <strong>3 - 5 distinct and notable</strong> screenshots of pages
              from the book as preview <br />
              Note - Maximum size of 100KB for each image <br />
              <strong>Step 12:</strong> Click the donate button <br />
              Thank you for your donation <br /> <br />
            </div>
          )}
          {pathname === "/request" && (
            <div style={{ color: "gray" }}>
              <span style={{ fontWeight: 700, color: "black" }}>
                Need help filling the form?
              </span>{" "}
              <br />
              <strong>Step 1:</strong> Input your full name (optional) <br />
              <strong>Step 2:</strong> Input your E-Mail <br />
              <strong>Step 3:</strong> Input your message (optional) <br />
              <strong>Step 4:</strong> Input the Book Title <br />
              <strong>Step 5:</strong> Input the author(s) of the book (optional
              but appreciated) <br />
              <strong>Format</strong> - John Doe | Mary Doe <br />
              <strong>Step 6:</strong> Input the courses related to the book{" "}
              <br />
              <strong>Format</strong> - MTH 221 | MAT | CPE 123 <br />
              Your book request would be worked upon <br />
              Check back in few days or await a completion mail from us <br />
              <strong>Note: </strong> Please, save the ticket number to be able
              to check the status of the request. <br />
              Thank you <br />
              <br />
            </div>
          )}
          <Quotes />
        </div>
      </main>
      <Footer admin={admin} />
    </>
  );
}

export default Layout;
