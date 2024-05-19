import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import Error from './components/Error';
import Download, { loader as downloadLoader } from './pages/Download';
import About from './pages/About';
import Request from './pages/Request';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Donations from './pages/Donations';
import Requests from './pages/Requests';
import EditBook, { loader as editBookLoader } from './pages/EditBook';
import EditDonation from './pages/EditDonation';
import ShortcutsList from './pages/ShortcutsList';
import KeywordsList from './pages/KeywordsList';
import DonationsLayout, { loader as donationsLoader } from './pages/DonationsLayout';
import { getRecord } from './AppManager';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './Api';
import { onAuthStateChanged } from 'firebase/auth';

const transition = { duration: 0.5 };

const AnimatedRoute = ({ children }) => (
  <motion.div
    key={window.location.pathname}
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={transition}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [books, setBooks] = React.useState([]);
  const [admin, setAdmin] = React.useState(true);

  React.useEffect(() => {
    getRecord("books")
    .then(data => setBooks(data))
    .catch(err => err);

    onSnapshot(doc(db, "books", "books"), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      const data = [];
      const record = doc.data();
      for (const key in record) {
          if (Object.hasOwnProperty.call(record, key)) {
              const book = record[key];
              data.push(book);
          }
      }
      setBooks(data);
    });
  }, []);
  
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email && user.emailVerified) {
        setAdmin(true);
      }else{
        setAdmin(false);
      }
    });
  }, []);
    
  const routes = [
    { path: '/', element: <Home />, errorElement: <Error /> },
    { path: 'resources', element: <Home /> },
    { path: 'download/:id', element: <Download />, loader: () => { return downloadLoader(books) } },
    { path: 'edit/:id', element: <EditBook />, loader: () => { return editBookLoader(books) } },
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> },
    { path: 'feedback', element: <Contact /> },
    { path: 'donate', element: <Donate /> },
    { path: 'donations', parent: 'donations', element: <DonationsLayout />, loader: () => { return donationsLoader() } },
    { path: '/', childOf: 'donations', element: <Donations />, loader: () => { return donationsLoader() } },
    { path: ':id', childOf: 'donations', element: <EditDonation />, loader: () => { return donationsLoader() } },
    { path: 'request', element: <Request /> },
    { path: 'requests', element: <Requests /> },
    { path: 'search/:search', element: <Search /> },
    { path: 'shortcuts', element: <ShortcutsList />, loader: () => { return donationsLoader() } },
    { path: 'keywords', element: <KeywordsList />, loader: () => { return donationsLoader() } },
    // { path: 'parentComponent', parent: 'parentComponent', element: <Element /> },
    // { path: '/', childOf: 'parentComponent', element: <Element /> },
    // { path: 'childElement', childOf: 'parentComponent', element: <Element /> },
    // { path: 'offline', element: <Offline /> },
    { path: '*', element: <NotFound /> },
  ];
  
  const routerElements = {
    path: '/',
    element: <Layout books={ books } setBooks={ setBooks } admin={ admin } />,
    children: routes.map((route) => (route.childOf ? {} : {
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: <AnimatedRoute>{route.element}</AnimatedRoute>,
      loader: route.loader ? route.loader : undefined,
      action: route.action ? route.action : undefined,
      errorElement: route.errorElement ? route.errorElement : undefined,
      children: route.path === '/' ? undefined : routes.map((rout) => {
        if(rout.childOf === route.parent){
          return {
            index: rout.path === '/',
            path: rout.path === '/' ? undefined : rout.path,
            element: <AnimatedRoute>{rout.element}</AnimatedRoute>,
            loader: rout.loader ? rout.loader : undefined,
            action: rout.action ? rout.action : undefined,
            errorElement: rout.errorElement ? rout.errorElement : undefined,
            children: rout.path === '/' ? undefined : routes.map((routs) => {
              if(routs.childOf === rout.parent){
                return {
                  index: routs.path === '/',
                  path: routs.path === '/' ? undefined : routs.path,
                  element: <AnimatedRoute>{routs.element}</AnimatedRoute>,
                  loader: routs.loader ? routs.loader : undefined,
                  action: routs.action ? routs.action : undefined,
                  errorElement: routs.errorElement ? routs.errorElement : undefined
                }
              }else{
                return {};
              }
            })
          }
        }else{
          return {};
        }
      })
    })),
  };
  
  const router = createBrowserRouter([
    routerElements
  ]);

  return (
    <div className='App'>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </div>
  );
}