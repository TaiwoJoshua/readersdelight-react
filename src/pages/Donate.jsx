import React from "react";
import { FaGift, FaSpinner } from "react-icons/fa6";
import { LiaTimesCircle } from "react-icons/lia";
import { checkImage, newRecordField, uploadFiles } from "../AppManager";
import { nanoid } from "nanoid";

export default function Donate() {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    message: "",
    link: "",
    title: "",
    cover: "",
    author: "",
    preview: [],
    size: "",
    downloads: 0,
    pages: 0,
    courses: "",
  });
  const [status, setStatus] = React.useState({
    status: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  function handleChange(e) {
    const { name, type, value, files } = e.target;
    const maxSize = name === "cover" ? 100 : 500;
    if (type === "file" && checkImage(files, maxSize, setError, setStatus)) {
      setData((oldData) => ({ ...oldData, [name]: files }));
    } else {
      setData((oldData) => ({ ...oldData, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const uploadData = {
        ...data,
        id: nanoid(),
        timestamp: new Date().getTime(),
      };
      if (data.cover && data.cover.length !== 0) {
        const uploadCover = await uploadFiles("cover", data.cover, [
          uploadData.id,
        ]);
        const { downloadURL } = await uploadCover[0];
        uploadData["cover"] = downloadURL;
      }

      if (data.preview && data.preview.length !== 0) {
        const previewIds = Object.keys(data.preview).map(() => nanoid());
        const uploadPreviews = await uploadFiles(
          "preview",
          data.preview,
          previewIds,
          false,
          false
        );
        const preview = [];
        for (let u = 0; u < uploadPreviews.length; u++) {
          const { downloadURL } = await uploadPreviews[u];
          preview.push(downloadURL);
        }
        uploadData["preview"] = preview;
      }

      const send = await newRecordField("donations", uploadData);

      setTimeout(() => {
        if (send === true) {
          setStatus({
            status: "success",
            type: "success",
            message: "Book Donated",
          });
          setData((oldData) => ({
            ...oldData,
            name: "",
            email: "",
            message: "",
            link: "",
            title: "",
            author: "",
            size: "",
            downloads: 0,
            pages: 0,
            courses: "",
          }));
          setLoading(false);
        } else {
          setStatus({
            status: "failed",
            type: "failed",
            message: "Donation Failed",
          });
          setLoading(false);
        }
      }, 2000);
    } catch (error) {
      setStatus({
        status: "failed",
        type: "failed",
        message: "Donation Failed",
      });
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (status.message !== "") {
      document
        .getElementById("status-wrapper")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  return (
    <div className="book-request">
      <h3>Donate a Book</h3>
      <form className="form" onSubmit={handleSubmit}>
        {status.message !== "" && (
          <p className="status-wrapper" id="status-wrapper">
            <span className={`status-message ${status.type}`}>
              {status.message}
            </span>
            <LiaTimesCircle
              className="status-close"
              onClick={() => {
                setStatus({ status: "", type: "", message: "" });
              }}
            />
          </p>
        )}
        <div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="name"
                autoComplete="off"
                placeholder="Name"
                maxLength={30}
                value={data.name}
              />
              <label>Full Name</label>
            </div>
          </div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="email"
                className="form-control"
                name="email"
                autoComplete="on"
                placeholder="E-Mail"
                required
                maxLength={50}
                value={data.email}
              />
              <label>
                <span>*</span>E-Mail
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <textarea
                onChange={handleChange}
                readOnly={loading}
                className="form-control textarea"
                rows={3}
                name="message"
                placeholder="Message"
                maxLength={250}
                value={data.message}
              />
              <label>Message</label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="title"
                autoComplete="off"
                placeholder="Book Title"
                required
                maxLength={100}
                value={data.title}
              />
              <label>
                <span>*</span>Book Title
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="courses"
                autoComplete="off"
                placeholder="Related Courses"
                minLength={3}
                maxLength={100}
                value={data.courses}
                required
              />
              <label>
                <span>*</span>Related Courses
              </label>
            </div>
          </div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="author"
                autoComplete="off"
                placeholder="Author(s)"
                minLength={3}
                maxLength={250}
                value={data.author}
              />
              <label>Author(s)</label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="link"
                placeholder="Book Link"
                minLength={10}
                maxLength={250}
                required
                value={data.link}
              />
              <label>
                <span>*</span>Book Link
              </label>
            </div>
          </div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="size"
                autoComplete="off"
                placeholder="Book Size"
                minLength={4}
                maxLength={10}
                value={data.size}
                required
              />
              <label>
                <span>*</span>Book Size
              </label>
            </div>
          </div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="number"
                className="form-control"
                name="pages"
                autoComplete="off"
                placeholder="Book Pages"
                min={1}
                max={99999}
                minLength={1}
                maxLength={5}
                required
                value={data.pages}
              />
              <label>
                <span>*</span>Book Pages
              </label>
            </div>
          </div>
        </div>
        <div>
          <div className="field">
            <input
              onChange={handleChange}
              readOnly={loading}
              type="file"
              className="form-control"
              name="cover"
              required
              accept="image/*"
            />
            <label>
              <span>*</span>Book Front Cover (Max Size - 100kb)
            </label>
          </div>
          <div className="field">
            <input
              onChange={handleChange}
              readOnly={loading}
              type="file"
              multiple
              className="form-control"
              name="preview"
              accept="image/*"
              required
            />
            <label>
              <span>*</span>Book Preview (3 - 5 Screenshots)
            </label>
          </div>
        </div>
        <div>
          <button className="btn" disabled={loading || error} type="submit">
            {loading ? (
              <FaSpinner className="spinner" />
            ) : (
              <>
                <FaGift /> Donate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
