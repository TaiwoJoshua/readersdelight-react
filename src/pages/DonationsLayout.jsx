import React from 'react';
import { Outlet, redirect, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { getRecord, sortByProperty } from '../AppManager';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../Api';

export async function loader() {
    try {
        if (!(auth && auth.currentUser && auth.currentUser.email && auth.currentUser.emailVerified)) {
            return redirect("/");
        }else{
            return auth && auth.currentUser && auth.currentUser.email && auth.currentUser.emailVerified;
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
        if(!(admin && loader)){
            navigate("/");
        }
    }, [admin, loader, navigate]);

    React.useEffect(() => {
        getRecord("donations")
        .then(data => {
            setData(sortByProperty(data, "timestamp").reverse()); 
            setLoaded(true);
        })
        .catch(err => console.log(err));

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

    // React.useEffect(() => {
    //     fetch("/data/DonationsData.json")
    //     .then(res => res.json())
    //     .then(data => setData(sortByProperty(data, "timestamp").reverse()))
    //     .catch(err => console.log(err));
    // }, []);

    return ( 
        <>
            <Outlet context={{ data, setData, loaded }} />
        </>
    );
}