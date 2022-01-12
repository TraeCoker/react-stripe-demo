import firebase from 'firebase/app';
import { auth, db } from './firebase';

export function SignIn() {
    const signIn = async () => {
        const credential = await auth.singInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );
        const { uid, email } = credential.user;
        db.collection('users').doc(uid).set({ email }, { merge: true });
    };

    return(
        <button onClick={signIn}>
            Sign In with Google
        </button>
    );
}