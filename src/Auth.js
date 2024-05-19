import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./Api";

export const signOutUser = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return error;
    }
}

// export const createUser = async (email, password) => {
//     try {
//         await createUserWithEmailAndPassword(auth, email, password);
    
//         // Send email verification
//         var actionCodeSettings = {
//             url: 'http://localhost:3000/signin',
//             handleCodeInApp: false
//         };
//         await sendEmailVerification(auth.currentUser, actionCodeSettings);
    
//         // Email verification sent!
//         signOutUser();
    
//         // Return a success indicator or other relevant data
//         return {status: "E-Mail Verification Link Sent"}; // You can customize the return value as needed
//     } catch (error) {
//         return error; // You can customize the return value as needed
//     }
// };

// export const delUser = async () => {
//     try {
//         const user = auth.currentUser;
//         await deleteUser(user);
//         return true;
//     } catch (error) {
//         return error;        
//     }
// }

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