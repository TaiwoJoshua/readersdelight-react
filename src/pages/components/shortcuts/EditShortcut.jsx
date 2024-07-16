import React from "react";
import "../../../components/confirmAction.css";
import { LiaTimesCircle } from "react-icons/lia";
import { FaSpinner } from "react-icons/fa6";
import {
  checkImage,
  sortByProperty,
  updateRecordField,
  uploadFiles,
} from "../../../AppManager";

export default function EditShortcut({ shortcut, icon, close, setShortcuts }) {
  const [formData, setFormData] = React.useState({ shortcut: "", icon: [] });
  const [status, setStatus] = React.useState({
    status: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setFormData((old) => ({ ...old, shortcut }));
  }, [shortcut]);

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file" && checkImage(files, 100, setError, setStatus)) {
      setFormData((old) => ({ ...old, [name]: files }));
    } else {
      setFormData((old) => ({ ...old, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let newIcon = icon;
      if (formData.icon && formData.icon.length !== 0) {
        const upload = await uploadFiles("shortcuts", formData.icon, [
          formData.shortcut,
        ]);
        const { downloadURL } = await upload[0];
        newIcon = downloadURL;
      }
      const send = await updateRecordField("shortcuts", {
        id: formData.shortcut.toUpperCase(),
        shortcut: formData.shortcut.toUpperCase(),
        icon: newIcon,
      });
      if (send === true) {
        setTimeout(() => {
          setShortcuts((oldShorts) => {
            const newShortcuts = oldShorts.filter(
              (short) => short.shortcut.toUpperCase() !== shortcut.toUpperCase()
            );
            newShortcuts.push({
              shortcut: formData.shortcut.toUpperCase(),
              id: formData.shortcut.toUpperCase(),
              icon: newIcon,
            });
            return sortByProperty(newShortcuts, "shortcut");
          });
          setStatus({
            status: "success",
            type: "success",
            message: "Update Successful",
          });
          setLoading(false);
        }, 1000);
      } else {
        setStatus({
          status: "failed",
          type: "failed",
          message: "Update Failed",
        });
        setLoading(false);
      }
    } catch (error) {
      setStatus({ status: "failed", type: "failed", message: "Update Failed" });
      setLoading(false);
    }
  }

  return (
    <div className="confirm-action-wrapper">
      <form className="action-form" onSubmit={handleSubmit}>
        <div className="action-nav">
          <h2 className="action-title">Edit {shortcut}</h2>
          {!loading && (
            <LiaTimesCircle onClick={close} className="action-close" />
          )}
        </div>
        <div className="action-main">
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
          <input
            type="text"
            readOnly={loading}
            name="shortcut"
            className="action-input"
            placeholder="Shortcut"
            maxLength={3}
            minLength={3}
            value={formData.shortcut}
            onChange={handleChange}
            autoComplete="off"
            style={{ textTransform: "uppercase" }}
            required
            pattern="[A-Za-z]+"
          />
          <input
            type="file"
            readOnly={loading}
            className="action-input"
            name="icon"
            onChange={handleChange}
            accept="image/*"
            style={{ marginTop: "-5px" }}
          />
          <button
            type="submit"
            className="action-btn"
            disabled={loading || error}
          >
            {loading ? (
              <FaSpinner className="spinner" style={{ fontSize: "1.2em" }} />
            ) : (
              "submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
