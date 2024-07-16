import React from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaBookOpenReader,
  FaComments,
  FaGift,
  FaHeart,
  FaPhone,
} from "react-icons/fa6";

function Footer({ admin }) {
  return (
    <footer className="footer">
      <div>
        <div>
          <Banner />
        </div>
        <div>
          <h3>About Us</h3>
          <span>
            <strong style={{ color: "#000000" }}>
              <span style={{ color: "#0B6623" }}>READERS</span>DELIGHT
            </strong>{" "}
            is a free website to search, preview and download books into your
            devices. <Link to="/about">read more...</Link>
          </span>
        </div>
        <div>
          <h3>Pages</h3>
          <Link to="/donate">
            <FaGift /> Donate a Book
          </Link>
          <Link to="/request">
            <FaBookOpenReader /> Request a Book
          </Link>
          <Link to="/requests">
            <FaBook /> Book Requests
          </Link>
        </div>
        <div>
          <h3>Help</h3>
          <Link to="/contact">
            <FaPhone /> Contact Us
          </Link>
          <Link to="/feedback">
            <FaComments /> Feedback
          </Link>
          {admin && (
            <Link to="/donations">
              <FaHeart style={{ marginBottom: "-2px" }} /> Donations
            </Link>
          )}
        </div>
      </div>
      <div>
        <p>
          © Copyright{" "}
          <Link to="/">
            <strong style={{ color: "#000000" }}>
              <span style={{ color: "#0B6623" }}>READERS</span>DELIGHT
            </strong>
          </Link>{" "}
          {new Date().getFullYear()}. All Right Reserved. Designed and Developed
          by{" "}
          <strong>
            <a
              href="https://taiwojoshua.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Taiwo Joshua
            </a>
          </strong>
        </p>
      </div>
      <div style={{ marginTop: "2px", textAlign: "center", padding: "10px" }}>
        <p>
          <FaHeart style={{ color: "#D01313", marginBottom: "-2px" }} />{" "}
          Inspired by{" "}
          <strong>
            <a
              href="https://www.pdfdrive.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "black" }}
            >
              <span style={{ color: "#D01313" }}>PDF</span>DRIVE
            </a>
          </strong>{" "}
          <FaHeart style={{ color: "#D01313", marginBottom: "-2px" }} />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
