import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'


// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyAYHD5zZ-1kISNjKKuUoQ41JuNBGAug5S0",
  authDomain: "ferreteria-reto.firebaseapp.com",
  databaseURL: "https://ferreteria-reto-default-rtdb.firebaseio.com",
  projectId: "ferreteria-reto",
  storageBucket: "ferreteria-reto.appspot.com",
  messagingSenderId: "273842353893",
  appId: "1:273842353893:web:62d846846b8299f4b4060c"
};

// Inicializamos a Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)