import React from "react";
import { nanoid } from "nanoid";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { FaFilePen, FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import DeleteKeyword from "./components/keywords/DeleteKeyword";
import EditKeyword from "./components/keywords/EditKeyword";
import NewKeyword from "./components/keywords/NewKeyword";

export default function KeywordsList() {
  const [close, setClose] = React.useState(true);
  const [editClose, setEditClose] = React.useState(true);
  const [newClose, setNewClose] = React.useState(true);
  const [editer, setEditer] = React.useState("");
  const [deleter, setDeleter] = React.useState("");
  const { keywords, setKeywords, admin } = useOutletContext();
  const auth = useLoaderData();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!(admin && auth)) {
      navigate("/");
    }
  }, [admin, auth, navigate]);

  const elements = Object.keys(keywords)
    .sort()
    .map((key) => {
      const fullword = keywords[key];
      return (
        <span key={nanoid()} className="shortcut-card">
          <span>
            <strong>{key}</strong>
          </span>
          <span
            className="shortcut-options one"
            onClick={() => {
              setEditer({ key, fullword });
              setEditClose(false);
            }}
          >
            <FaFilePen />
          </span>
          <span
            className="shortcut-options two"
            onClick={() => {
              setDeleter(key);
              setClose(false);
            }}
          >
            <FaTrash />
          </span>
        </span>
      );
    });

  return (
    <div className="shortcuts-wrap special keywords-wrap">
      {!close && (
        <DeleteKeyword
          keyword={deleter}
          close={() => {
            setClose(true);
          }}
          setKeywords={setKeywords}
        />
      )}
      {!editClose && (
        <EditKeyword
          keyword={editer}
          close={() => {
            setEditClose(true);
          }}
          setKeywords={setKeywords}
        />
      )}
      {!newClose && (
        <NewKeyword
          close={() => {
            setNewClose(true);
          }}
          setKeywords={setKeywords}
        />
      )}
      <span key={nanoid()} className="shortcut-card">
        <span>New Keyword</span>
        <span
          className="shortcut-options two"
          onClick={() => {
            setNewClose(false);
          }}
        >
          <FaPlus />
        </span>
      </span>
      {elements}
    </div>
  );
}
