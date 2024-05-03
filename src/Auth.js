import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./Api";
import emailjs from '@emailjs/browser';

export const signOutUser = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return error;
    }
}

export const createUser = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    
        // Send email verification
        var actionCodeSettings = {
            url: 'http://localhost:3000/signin',
            handleCodeInApp: false
        };
        await sendEmailVerification(auth.currentUser, actionCodeSettings);
    
        // Email verification sent!
        signOutUser();
    
        // Return a success indicator or other relevant data
        return {status: "E-Mail Verification Link Sent"}; // You can customize the return value as needed
    } catch (error) {
        return error; // You can customize the return value as needed
    }
};

export const delUser = async () => {
    try {
        const user = auth.currentUser;
        await deleteUser(user);
        return true;
    } catch (error) {
        return error;        
    }
}

export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if(user.emailVerified){
            return { email: user.email, emailVerified: user.emailVerified };
        }else{
            signOutUser();
            const error = {
                code: 401,
                message: "verification",
            }
            throw error;
        }
    } catch (error) {
        return error;
    }
};

export const passwordReset = async (email) => {
    try {
        var actionCodeSettings = {
            url: 'http://localhost:3000/signin',
            handleCodeInApp: false
        };
        await sendPasswordResetEmail(auth, email, actionCodeSettings)
        return {message: "Reset Link Sent"};
    } catch (error) {
        return error;
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const authRequired = async () => {
    const timeout = 3000;
    let time = 0;
    while(!auth.currentUser && time < timeout){
        await sleep(100);
        time += 100;
    }

    if(time >= timeout){
        return false;
    }

    if(!auth.currentUser.email && !auth.currentUser.emailVerified){
        return false;
    }
    return true;
};

export async function emailValidation(email) {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_EMAIL_API_KEY}&email=${email}`;
  
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = JSON.parse(await response.text());
            if(data.deliverability === "UNDELIVERABLE" || data.quality_score === "0.00" || data.autocorrect !== "" || !data.is_smtp_valid.value){
                return false;
            }else if(data.deliverability === "DELIVERABLE"){
                return true;
            }
            return false;
        } else {
            throw new Error(`Request failed with status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
    }
}
  
export async function sendMail(name, phone, message){
    try {
        const send = await emailjs.send(process.env.REACT_APP_EMAIL_JS_SERVICE_ID, process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID, { name, phone, message}, process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY);
        if(send.status === 200){
            return true;
        }
    } catch (error) {
        return error;
    }
}