import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { ref, onValue, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [user, setUser] = useState(auth.currentUser);
  const [chats, setChats] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);


  const navigate = useNavigate()

  function getChats() {
    setError(null);

    try {
      const startCountRef = ref(db, "chats/");
      onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        setChats(data);
        setLoadingChats(!loadingChats);
      });
      console.log(chats);
    } catch (error) {
      setContent(error.target.value);
    }
  }

  const handleOnChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content) {
      return;
    }
    setWriteError(null);

    try {
      set(ref(db, "chats/" + Date.now()), {
        content: content,
        timestamp: Date.now,
        uid: user.uid,
      });
      setContent("");
    } catch (e) {
      setWriteError(e.message);
    }
  };

  useEffect(() => {
    setLoadingChats(!loadingChats);
    getChats();
  }, []);

  const SendMsg = () => {
    try {
      set(ref(db,"user"), {
        name: "wil",
        age: 35,
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleSignout = async() => {
    setError("")
        try {
            await signOut(auth);
            navigate("/login")
        } catch (error) {
            setError(error.code)
        }
  }

  return (
    <div>
      <div className="chat-area">
        {loadingChats ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading chat...</span>
          </div>
        ) : (
          ""
        )}

        <button onClick={SendMsg}>Send</button>
        <button onClick={handleSignout}>Logout</button>
      </div>
    </div>
  );
}