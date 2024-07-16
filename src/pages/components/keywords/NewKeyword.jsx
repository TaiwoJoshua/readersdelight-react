import React from "react";
import "../../../components/confirmAction.css";
import { LiaTimesCircle } from "react-icons/lia";
import { FaSpinner } from "react-icons/fa6";
import { updateRecordField } from "../../../AppManager";

export default function NewKeyword({ close, setKeywords }) {
  const [formData, setFormData] = React.useState({ key: "", fullword: "" });
  const [status, setStatus] = React.useState({
    status: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const send = await updateRecordField("keywords", [
        { id: formData.key, keywords: formData.fullword },
      ]);
      if (send === true) {
        setTimeout(() => {
          setKeywords((oldKeys) => {
            const newKeywords = oldKeys;
            const exists = Object.keys(oldKeys).filter(
              (key) => key.toUpperCase() === formData.key.toUpperCase()
            );
            if (exists && exists.length !== 0) {
              setStatus({
                status: "failed",
                type: "failed",
                message: "Keyword Exists",
              });
            } else {
              newKeywords[formData.key] = formData.fullword;
            }
            return newKeywords;
          });
          setFormData({ key: "", fullword: "" });
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
          <h2 className="action-title">New Keyword</h2>
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
            name="key"
            className="action-input"
            placeholder="Keyword"
            maxLength={10}
            minLength={3}
            value={formData.key}
            onChange={handleChange}
            autoComplete="off"
            style={{ textTransform: "uppercase", marginBottom: "-5px" }}
            required
            pattern="[A-Za-z]+"
          />
          <input
            type="text"
            readOnly={loading}
            name="fullword"
            className="action-input"
            placeholder="Fullword"
            maxLength={20}
            minLength={3}
            value={formData.fullword}
            onChange={handleChange}
            autoComplete="off"
            style={{ textTransform: "uppercase" }}
            required
            pattern="[A-Za-z ]+"
          />
          <button type="submit" className="action-btn" disabled={loading}>
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
