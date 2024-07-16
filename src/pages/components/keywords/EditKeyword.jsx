import React from "react";
import "../../../components/confirmAction.css";
import { LiaTimesCircle } from "react-icons/lia";
import { FaSpinner } from "react-icons/fa6";
import { updateRecordField } from "../../../AppManager";

export default function EditKeyword({ keyword, close, setKeywords }) {
  const [formData, setFormData] = React.useState({ key: "", fullword: "" });
  const [status, setStatus] = React.useState({
    status: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setFormData(keyword);
  }, [keyword]);

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
            const newKeywords = {};
            const newKeys = Object.keys(oldKeys).filter(
              (key) => key.toUpperCase() !== keyword.key.toUpperCase()
            );
            for (let y = 0; y < newKeys.length; y++) {
              const newKey = newKeys[y];
              newKeywords[newKey] = oldKeys[newKey];
            }
            newKeywords[formData.key] = formData.fullword;
            return newKeywords;
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
          <h2 className="action-title">Edit {keyword.key}</h2>
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
            name="key"
            readOnly
            className="action-input"
            placeholder="Keyword"
            maxLength={10}
            minLength={3}
            value={formData.key}
            onChange={handleChange}
            autoComplete="off"
            style={{
              textTransform: "uppercase",
              marginBottom: "-5px",
              fontWeight: "bolder",
            }}
            required
            pattern="[A-Za-z]+"
          />
          <input
            type="text"
            name="fullword"
            readOnly={loading}
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
