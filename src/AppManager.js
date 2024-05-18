import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db, storage } from "./Api";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { authRequired } from "./Auth";
import emailjs from '@emailjs/browser';

function randomCode(){
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let output = [];
    for (let u = 0; u < 3; u++) {
        let n = Math.floor(Math.random() * numbers.length);
        let number = numbers[n];
        while((number === "0" || parseInt(number) > 5) && u === 0){
            n = Math.floor(Math.random() * numbers.length);
            number = numbers[n];
        }
        output[u] = number;        
    }
    return output.join("");
}

export function randomBooks() {
    function generateRandomData() {
        const randomData = [];
    
        // Function to generate random book title
        function generateRandomTitle() {
            const titles = ["Adventures of John Doe", "The Mystery of Mary", "Coding 101", "The Great Escape", "Journey to the Unknown"];
            return titles[Math.floor(Math.random() * titles.length)];
        }
    
        // Function to generate random book title
        function generateRandomLink() {
            const titles = ["/books/book1.pdf", "/books/book2.pdf", "/books/book3.pdf", "/books/book4.pdf", "/books/book5.pdf"];
            return titles[Math.floor(Math.random() * titles.length)];
        }
    
        // Function to generate random author
        function generateRandomAuthor() {
            const authors = ["John Doe", "Mary Johnson", "Michael Smith", "Emma Brown", "James Davis", "Taiwo Joshua"];
            const n = Math.floor(Math.random() * 3 + 1);
            const rands = [];
            for (let p = 0; p < n; p++) {
                rands.push(authors[Math.floor(Math.random() * authors.length)]);
            }
            return rands.join(" | ");
        }
    
        // Function to generate random course
        function generateRandomCourses() {
            const courses = ["MTH", "CVE", "MEE", "CPE", "EEE", "MAT", "CHE", "CHM", "PHY", "CMP", "GST"];
            const rands = [];
            const ncourse = Math.floor(Math.random() * 5 + 1);
            for (let p = 0; p < ncourse; p++) {
                rands.push(courses[Math.floor(Math.random() * courses.length)] + " " + randomCode());
            }
            return rands.join(" | ");
        }
    
        function generateRandomPreviews() {
            const courses = ["/images/book1.jpg", "/images/book2.jpg", "/images/book3.jpg", "/images/book4.jpg", "/images/book5.jpg", "/images/book6.jpg", "/images/book7.jpg", "/images/book8.jpg", "/images/book9.jpg", "/images/book10.jpg"];
            const rands = [];
            const npreview = Math.floor(Math.random() * 5 + 3);
            for (let p = 0; p < npreview; p++) {
                rands.push(courses[Math.floor(Math.random() * courses.length)]);
            }
            return rands;
        }

        // Function to generate random course
        function generateRandomCover() {
            const courses = ["/images/book1.jpg", "/images/book2.jpg", "/images/book3.jpg", "/images/book4.jpg", "/images/book5.jpg", "/images/book6.jpg", "/images/book7.jpg", "/images/book8.jpg", "/images/book9.jpg", "/images/book10.jpg"];
            return courses[Math.floor(Math.random() * courses.length)];
        }

        // Function to generate random course
        function generateRandomSize() {
            const courses = ["MB", "KB"];
            return `${Math.floor(Math.random() * 150)}.00${courses[Math.floor(Math.random() * courses.length)]}`;
        }

        // Function to generate random course
        function generateRandomDownloads() {
            return Math.floor(Math.random() * 50);
        }

        // Function to generate random course
        function generateRandomPages() {
            return Math.floor(Math.random() * 500 + 1);
        }
    
        // Function to generate random timestamp within past month
        function generateRandomTimestamp() {
            const now = Date.now();
            const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000); // One month in milliseconds
            return new Date(oneMonthAgo + Math.random() * (now - oneMonthAgo)).getTime();
        }
    
        for (let i = 0; i < 200; i++) {
            const id = Math.random().toString(36).substring(7); // Generate random id
            const link = generateRandomLink();
            const title = generateRandomTitle();
            const author = generateRandomAuthor();
            const courses = generateRandomCourses();
            const cover = generateRandomCover();
            const preview = generateRandomPreviews();
            const size = generateRandomSize();
            const downloads = generateRandomDownloads();
            const pages = generateRandomPages();
            const timestamp = generateRandomTimestamp(); // Generate random timestamp
    
            randomData.push({
                id,
                link,
                title,
                cover,
                author,
                preview,
                size,
                downloads,
                pages,
                courses,
                timestamp
            });
        }
    
        return randomData;
    }
    
    const randomData = generateRandomData();
    console.log(randomData);                
};

export function randomDonations() {
    function generateRandomData() {
        const randomData = [];

        // Function to generate random name
        function generateRandomName() {
            const firstName = ["John", "Mary", "Michael", "Emma", "James", "Sophia"];
            const lastName = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis"];
            return `${firstName[Math.floor(Math.random() * firstName.length)]} ${lastName[Math.floor(Math.random() * lastName.length)]}`;
        }
    
        // Function to generate random email
        function generateRandomEmail() {
            const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
            const randomDomain = domains[Math.floor(Math.random() * domains.length)];
            return `${generateRandomName().toLowerCase().replace(/\s+/g, '')}@${randomDomain}`;
        }
    
        // Function to generate random message
        function generateRandomMessage() {
            const messages = ["Lorem ipsum dolor sit amet consectetur adipisicing elit.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."];
            return messages[Math.floor(Math.random() * messages.length)];
        }
    
        // Function to generate random book title
        function generateRandomTitle() {
            const titles = ["Adventures of John Doe", "The Mystery of Mary", "Coding 101", "The Great Escape", "Journey to the Unknown"];
            return titles[Math.floor(Math.random() * titles.length)];
        }
    
        // Function to generate random book title
        function generateRandomLink() {
            const titles = ["/books/book1.pdf", "/books/book2.pdf", "/books/book3.pdf", "/books/book4.pdf", "/books/book5.pdf"];
            return titles[Math.floor(Math.random() * titles.length)];
        }
    
        // Function to generate random author
        function generateRandomAuthor() {
            const authors = ["John Doe", "Mary Johnson", "Michael Smith", "Emma Brown", "James Davis"];
            const n = Math.floor(Math.random() * 3 + 1);
            const rands = [];
            for (let p = 0; p < n; p++) {
                rands.push(authors[Math.floor(Math.random() * authors.length)]);
            }
            return rands.join(" | ");
        }
    
        // Function to generate random course
        function generateRandomCourses() {
            const courses = ["MTH", "CVE", "MEE", "CPE", "EEE", "MAT", "CHE", "CHM", "PHY", "CMP", "GST"];
            const rands = [];
            const ncourse = Math.floor(Math.random() * 5 + 1);
            for (let p = 0; p < ncourse; p++) {
                rands.push(courses[Math.floor(Math.random() * courses.length)] + " " + randomCode());
            }
            return rands.join(" | ");
        }
    
        // Function to generate random course
        function generateRandomPreviews() {
            const courses = ["/images/book1.jpg", "/images/book2.jpg", "/images/book3.jpg", "/images/book4.jpg", "/images/book5.jpg", "/images/book6.jpg", "/images/book7.jpg", "/images/book8.jpg", "/images/book9.jpg", "/images/book10.jpg"];
            const rands = [];
            const npreview = Math.floor(Math.random() * 5 + 3);
            for (let p = 0; p < npreview; p++) {
                rands.push(courses[Math.floor(Math.random() * courses.length)]);
            }
            return rands;
        }

        // Function to generate random course
        function generateRandomPages() {
            return Math.floor(Math.random() * 500 + 1);
        }

        // Function to generate random course
        function generateRandomCover() {
            const courses = ["/images/book1.jpg", "/images/book2.jpg", "/images/book3.jpg", "/images/book4.jpg", "/images/book5.jpg", "/images/book6.jpg", "/images/book7.jpg", "/images/book8.jpg", "/images/book9.jpg", "/images/book10.jpg"];
            return courses[Math.floor(Math.random() * courses.length)];
        }

        // Function to generate random course
        function generateRandomSize() {
            const courses = ["MB", "KB"];
            return `${Math.floor(Math.random() * 150)}.00${courses[Math.floor(Math.random() * courses.length)]}`;
        }

        // Function to generate random timestamp within past month
        function generateRandomTimestamp() {
            const now = Date.now();
            const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000); // One month in milliseconds
            return new Date(oneMonthAgo + Math.random() * (now - oneMonthAgo)).getTime();
        }
    
        for (let i = 0; i < 20; i++) {
            const id = Math.random().toString(36).substring(7); // Generate random id
            const name = generateRandomName();
            const email = generateRandomEmail();
            const message = generateRandomMessage();
            const link = generateRandomLink();
            const title = generateRandomTitle();
            const author = generateRandomAuthor();
            const courses = generateRandomCourses();
            const cover = generateRandomCover();
            const preview = generateRandomPreviews();
            const size = generateRandomSize();
            const pages = generateRandomPages();
            const timestamp = generateRandomTimestamp(); // Generate random timestamp
    
            randomData.push({
                id,
                name,
                email,
                message,
                link,
                title,
                cover,
                author,
                preview,
                size,
                pages,
                courses,
                timestamp
            });
        }
    
        return randomData;
    }
    
    const randomData = generateRandomData();
    console.log(randomData);                
};

export function randomRequests() {
    function generateRandomData() {
        const randomData = [];
        const statusOptions = ["Processing", "Completed", "Not Found"];
    
        // Function to generate random name
        function generateRandomName() {
            const firstName = ["John", "Mary", "Michael", "Emma", "James", "Sophia"];
            const lastName = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis"];
            return `${firstName[Math.floor(Math.random() * firstName.length)]} ${lastName[Math.floor(Math.random() * lastName.length)]}`;
        }
    
        // Function to generate random email
        function generateRandomEmail() {
            const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
            const randomDomain = domains[Math.floor(Math.random() * domains.length)];
            return `${generateRandomName().toLowerCase().replace(/\s+/g, '')}@${randomDomain}`;
        }
    
        // Function to generate random message
        function generateRandomMessage() {
            const messages = ["Lorem ipsum dolor sit amet consectetur adipisicing elit.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."];
            return messages[Math.floor(Math.random() * messages.length)];
        }
    
        // Function to generate random book title
        function generateRandomBookTitle() {
            const titles = ["Adventures of John Doe", "The Mystery of Mary", "Coding 101", "The Great Escape", "Journey to the Unknown"];
            return titles[Math.floor(Math.random() * titles.length)];
        }
    
        // Function to generate random author
        function generateRandomAuthor() {
            const authors = ["John Doe", "Mary Johnson", "Michael Smith", "Emma Brown", "James Davis"];
            return authors[Math.floor(Math.random() * authors.length)];
        }
    
        // Function to generate random course
        function generateRandomCourses() {
            const courses = ["MTH", "CVE", "MEE", "CPE", "EEE", "MAT", "CHE", "CHM", "PHY", "CMP", "GST"];
            const rands = [];
            const ncourse = Math.floor(Math.random() * 5 + 1);
            for (let p = 0; p < ncourse; p++) {
                rands.push(courses[Math.floor(Math.random() * courses.length)] + " " + randomCode());
            }
            return rands.join(" | ");
        }
    
        // Function to generate random timestamp within past month
        function generateRandomTimestamp() {
            const now = Date.now();
            const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000); // One month in milliseconds
            return new Date(oneMonthAgo + Math.random() * (now - oneMonthAgo)).getTime();
        }
    
        for (let i = 0; i < 20; i++) {
            const id = Math.random().toString(36).substring(7); // Generate random id
            const ticket = Math.floor(Math.random() * 9000000000) + 1000000000; // Generate random ticket number
            const name = generateRandomName();
            const email = generateRandomEmail();
            const message = generateRandomMessage();
            const title = generateRandomBookTitle();
            const author = generateRandomAuthor();
            const courses = generateRandomCourses();
            const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]; // Randomly select status
            const timestamp = generateRandomTimestamp(); // Generate random timestamp
    
            randomData.push({
                id,
                ticket,
                name,
                email,
                message,
                title,
                author,
                courses,
                status,
                timestamp
            });
        }
    
        return randomData;
    }
    
    const randomData = generateRandomData();
    console.log(randomData);                
};

export function stripSpecialChar(string) {
    const specialChars = ['\\', '/', '*', ':', '?', '"', '<', '>', '|', '&'];
    let newString = '';
    for (let k = 0; k < string.length; k++) {
      if (!specialChars.includes(string[k])) {
        newString += string[k];
      }
    }
    return newString;
}

function compareByProperty(a, b, property) {
    let ap = a[property];
    let bp = b[property];
    return typeof(ap) === "number" && typeof(bp) === "number" ? ap - bp : ap.localeCompare(bp);
};
  
export function sortByProperty(arr, property) {
    try {
        let array = arr.slice();
        return array.sort((a, b) => compareByProperty(a, b, property));
    } catch (error) {
        // console.log(error);        
    }
};

export function showSwal(icon, title, text, time){
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText: 'OK',
        timer: time
    })
};

function expandKeywords(inputString, keywords) {
    const words = inputString.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        const word = words[i].toUpperCase();
        if (keywords.hasOwnProperty(word)) {
            inputString += " " + keywords[word];
        } else {
            const values = Object.values(keywords);
            const index = values.indexOf(word);
            if (index !== -1) {
                const keys = Object.keys(keywords);
                inputString += " " + keys[index];
            }
        }
    }
    return inputString;
}

function sortArrayByWordsInCommon(arr, searchName, keywords, prioritizeAuthor = true, prioritizeTitle = false, prioritizeCourse = false) {
    let array = arr.slice();
    let searchedName = searchName;
    searchedName = expandKeywords(searchedName, keywords)

    // Function to calculate number of words in common between two strings
    function wordsInCommon(str1, str2) {
        const words1 = str1?.toLowerCase().split(/\s+/);
        const words2 = str2?.toLowerCase().split(/\s+/);
        
        let commonWords = 0;
        words1?.forEach(word1 => {
            if (words2.includes(word1)) {
                commonWords++;
            }
        });
        return commonWords;
    }

    // Sorting the array based on the number of words in common
    array.sort(function (a, b) {
        let commonWordsA, commonWordsB;

        if (prioritizeAuthor) {
            commonWordsA = wordsInCommon(a.author, searchedName);
            commonWordsB = wordsInCommon(b.author, searchedName);
        } else if (prioritizeTitle) {
            commonWordsA = wordsInCommon(a.title, searchedName);
            commonWordsB = wordsInCommon(b.title, searchedName);
        } else if (prioritizeCourse) {
            commonWordsA = wordsInCommon(a.courses, searchedName);
            commonWordsB = wordsInCommon(b.courses, searchedName);
        }

        // Sort in descending order of common words
        return commonWordsB - commonWordsA;
    });

    // Filter out items with 0 words in common
    const filteredArray = array.filter(item => {
        if (prioritizeAuthor) {
            return wordsInCommon(item.author, searchedName) !== 0;
        } else if (prioritizeTitle) {
            return wordsInCommon(item.title, searchedName) !== 0;
        } else if (prioritizeCourse) {
            return wordsInCommon(item.courses, searchedName) !== 0;
        } else {
            return false;
        }
    });

    return filteredArray;
}

export function sortBooks(data, search, keywords, priority = ["title", "author", "courses"]){
    const sortedArrayByAuthor = sortArrayByWordsInCommon(data, search, keywords, true);
    const sortedArrayByTitle = sortArrayByWordsInCommon(data, search, keywords, false, true);
    const sortedArrayByCourses = sortArrayByWordsInCommon(data, search, keywords, false, false, true);
    const order = { title: sortedArrayByTitle, author: sortedArrayByAuthor, courses: sortedArrayByCourses };

    let combined = [];
    combined = combined.concat(order[priority[0]], order[priority[1]], order[priority[2]], data);
    combined = combined.map(dat => JSON.stringify(dat));
    combined = new Set(combined);
    combined = Array.from(combined);
    combined = combined.map(dat => JSON.parse(dat));
    const length = sortedArrayByAuthor.length + sortedArrayByCourses.length + sortedArrayByTitle.length;
    return { output: combined, length };
}

export function getPriority(priority){
    if(priority === "author"){
        return ["author", "title", "courses"];
    }else if(priority === "courses"){
        return ["courses", "title", "author"];
    }else{
        return ["title", "author", "courses"];
    }
}

export function stripSpace(string) {
    let newString = '';
    for (let k = 0; k < string.length; k++) {
      if (string[k] !== " ") {
        newString += string[k];
      }
    }
    return newString;
}

export function checkExtension(string) {
    const extensions = ['jpeg', 'jpg', 'png', 'heic'];
    const ext = string.slice(string.lastIndexOf(".") + 1).toLowerCase();
    if(extensions.includes(ext)) {
        return true;
    }
    return false;
}

export function checkImage(files, maxSize, setError, setStatus){
    setError(true);
    if(files.length > 5){
        setStatus({status: "failed", type: "failed", message: "Maximum of 5 Images"});
        return "length";
    }
    const maximum = 1024 * maxSize;
    for (let e = 0; e < files.length; e++) {
        const file = files[e];
        if(file.size <= maximum && checkExtension(file.name)){
            setError(false);
            setStatus({status: "", type: "", message: ""});
            return true;
        }else{
            if(file.size > maximum){
                setStatus({status: "failed", type: "failed", message: "Maximum File Size Exceeded"});
                return "size";
            }else if(!checkExtension(file.name)){
                setStatus({status: "failed", type: "failed", message: "Invalid File Format"});
                return "format";
            }
        }
    }
}



// ==========================================================================================

// Firebase

// ==========================================================================================
export const updateRecord = async (type, data) => {
    if(!await authRequired()){
        const error = {
            code: 401,
            message: "Access not Granted",
        }
        throw error;
    }
    try {
        const record = {};
        for (let p = 0; p < data.length; p++) {
            const book = data[p];
            record[book.id] = book;
        }
        const dataRef = doc(db, "books", type);
        await setDoc(dataRef, record, { merge: true });
        return true;
    } catch (error) {
        return error;
    }
}

export const newRecordField = async (type, data) => {
    try {
        const dataRef = doc(db, "books", type);
        await setDoc(dataRef, {[data.id]: data}, { merge: true });
        return true;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const updateRecordField = async (type, data) => {
    if(!await authRequired()){
        const error = {
            code: 401,
            message: "Access not Granted",
        }
        throw error;
    }
    try {
        const dataRef = doc(db, "books", type);
        await setDoc(dataRef, {[data.id]: data}, { merge: true });
        return true;
    } catch (error) {
        // console.log(error);
        return error;
    }
}

export const deleteRecordField = async (type, id) => {
    if(!await authRequired()){
        const error = {
            code: 401,
            message: "Access not Granted",
        }
        throw error;
    }
    try {
        const dataRef = doc(db, "books", type);
        await updateDoc(dataRef, {[id]: deleteField()});
        return true;
    } catch (error) {
        return error;
    }
}

export const getRecord = async (type) => {
    const data = [];
    const docRef = doc(db, "books", type);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        const record = docSnap.data();
        for (const key in record) {
            if (Object.hasOwnProperty.call(record, key)) {
                const book = record[key];
                data.push(book);
            }
        }
    }
    return data;
}

export const uploadFiles = (location, files, ids, setFormData = false, resetFormData = false) => {
    return new Promise(async (resolve, reject) => {
        const metadata = {
            contentType: 'image/*'
        };

        const promises = [];

        for (let k = 0; k < files.length; k++) {
            // setUprogess(0);
            promises.push(new Promise((innerResolve, innerReject) => {
                const file = files[k];
                const id = ids[k];
                
                const imgname = stripSpecialChar(id) + file.name.slice(file.name.lastIndexOf("."));
                const storageRef = ref(storage, `${location}/${imgname}`);
                const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // setUprogess(progress);
                        // switch (snapshot.state) {
                        //     case 'paused':
                        //         setUstate('Upload Paused');
                        //         break;
        
                        //     case 'running':
                        //         setUstate('Uploading...');
                        //         break;
        
                        //     default:
                        //         setUstate('Upload Stopped');
                        // }
                    },
                    (error) => {
                        // Handle specific upload error
                        innerReject(error);
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                innerResolve({ downloadURL, imgname }); // Resolve the inner promise when done
                            })
                            .catch((error) => {
                                // Handle error when getting the download URL
                                innerReject(error);
                            });
                    }
                );
            }));
        }

        // Wait for all promises to resolve
        Promise.all(promises)
        .then(() => {
            // All uploads completed successfully
            setFormData && setFormData(resetFormData);
            resolve(promises);
        })
        .catch((error) => {
            // Handle any errors during the upload process
            reject(error);
        });
    });
};

export function extractFileName(url) {
    const parts = url.split('/');
    const filenameWithExtension = parts[parts.length - 1];
    const decodedFilename = decodeURIComponent(filenameWithExtension);
    const filenameParts = decodedFilename.split('?');
    const filenamePath = filenameParts[0];
    const filename = filenamePath.slice(filenamePath.lastIndexOf("/") + 1);
    return filename;
}

export const deleteFiles = async (urls, folder = "") => {
    try {
        if(!await authRequired()){
            const error = {
                code: 401,
                message: "Access not Granted",
            }
            throw error;
        }
        if(typeof(urls) === "object"){
            for (let k = 0; k < urls.length; k++) {
                const url = urls[k];
                const name = extractFileName(url);
                const desertRef = ref(storage, folder === "" ? name : `${folder}/${name}`);
                await deleteObject(desertRef);
            }
        }else{
            const name = extractFileName(urls);
            const desertRef = ref(storage, folder === "" ? name : `${folder}/${name}`);
            await deleteObject(desertRef);
        }
        return true;
    } catch (error) {
        return error;
    }
}



// ==========================================================================================

// E-Mails

// ==========================================================================================
export async function donationMail(name, booktitle, email){
    try {
        const send = await emailjs.send(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_DONATION_TEMPLATE_ID, { name, booktitle, email }, process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY);
        if (send.status === 200) {
          return "sent";
        }
    } catch (error) {
        return "failed";
    }
}

export async function requestMail(name, booktitle, email){
    try {
        const send = await emailjs.send(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_REQUEST_TEMPLATE_ID, { name, booktitle, email }, process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY);
        if (send.status === 200) {
          return "sent";
        }
    } catch (error) {
        return "failed";
    }
}

export async function contactMail(name, message, email, subject, feedback){
    try {
        const send = await emailjs.send(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_REQUEST_TEMPLATE_ID, { s: subject, name, message, contactemail: email, email: "joshuataiwo07@gmail.com", contact: true, feedback }, process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY);
        if (send.status === 200) {
          return "sent";
        }
    } catch (error) {
        return "failed";
    }
}