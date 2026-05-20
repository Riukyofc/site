import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Cria o documento do usuário no Firestore com a role de usuário normal
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: email,
      name: name || email,
      role: 'user',
      createdAt: new Date()
    });
    return userCredential;
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const fetchDoc = getDoc(doc(db, 'users', user.uid));
          const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000));
          const userDoc = await Promise.race([fetchDoc, timeout]);

          if (userDoc.exists()) {
            // Se for o email mestre, ignora o banco e força admin
            let dbRole = userDoc.data().role;
            if (user.email === 'rkystudiocode@gmail.com') {
              dbRole = 'admin';
            }
            setCurrentUser({ ...user, role: dbRole, name: userDoc.data().name || user.email });
          } else {
            // Se não houver documento, permite login provisório
            const role = user.email === 'rkystudiocode@gmail.com' ? 'admin' : 'user';
            setCurrentUser({ ...user, role, name: user.email });
          }
        } catch (error) {
          console.error("Erro ao buscar perfil (possivelmente offline ou timeout):", error);
          const role = user.email === 'rkystudiocode@gmail.com' ? 'admin' : 'user';
          setCurrentUser({ ...user, role, name: user.email });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
