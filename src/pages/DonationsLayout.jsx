import React from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { getRecord, sortByProperty } from "../AppManager";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Api";
import { authRequired } from "../Auth";

export async function loader() {
  try {
    const { email, emailVerified } = await authRequired();
    if (!(email && emailVerified)) {
      return redirect("/");
    } else {
      return email && emailVerified;
    }
  } catch (error) {
    return redirect("/");
  }
}

export default function DonationsLayout() {
  const [data, setData] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const { admin } = useOutletContext();
  const loader = useLoaderData();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!(admin && loader)) {
      navigate("/");
    }
  }, [admin, loader, navigate]);

  React.useEffect(() => {
    getRecord("donations")
      .then((data) => {
        setData(sortByProperty(data, "timestamp").reverse());
        setLoaded(true);
      })
      .catch((err) => err);

    onSnapshot(doc(db, "books", "donations"), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      const data = [];
      const record = doc.data();
      for (const key in record) {
        if (Object.hasOwnProperty.call(record, key)) {
          const book = record[key];
          data.push(book);
        }
      }
      setData(sortByProperty(data, "timestamp"));
    });
  }, []);

  return (
    <>
      <Outlet context={{ data, setData, loaded }} />
    </>
  );
}
