// Importando as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuração do Firebase, substitua pelos dados da sua configuração
const firebaseConfig = {
  apiKey: "AIzaSyAuIIDLgDb0uGEskhYu1D0I1ZsVFeG4qHw",
  authDomain: "rent-a-gom.firebaseapp.com",
  projectId: "rent-a-gom",
  storageBucket: "rent-a-gom.firebasestorage.app",
  messagingSenderId: "935468603618",
  appId: "1:935468603618:web:a163eb03a1e126887b66bb",
  measurementId: "G-QKESQWPYL9"
};

// Inicializando o Firebase App com a configuração
const app = initializeApp(firebaseConfig);  // Inicializa o Firebase App

// Obtendo a instância do banco de dados
const database = getDatabase(app);  // Passa o app inicializado para obter a referência do banco de dados

export { database };  // Exportando a instância do banco de dados