import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { ref, push, get, onValue, } from "firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Chat() {
  const { user } = useAuth(auth);

  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(true);

  const navigate = useNavigate()

  function getChats() {
    try {
      const startCountRef = ref(db, "chats/");
      onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        setChats(Object.values(data));
        // setLoadingChats(!loadingChats);
      })
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

    push(ref(db, "chats"), {
      content: content,
      timestamp: Date.now(),
      uid: user.uid,
    })
      .then((res) => setContent(""));

    getChats();

  };

  useEffect(() => {
    setLoadingChats(false);
    getChats();
  }, []);

  const handleSignout = async () => {
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
      {loadingChats ? (
        <div role="status">
          <span className="sr-only">Loading chat...</span>
        </div>
      ) : (
        ""
      )}
      <div className="message_container">
        <h3>Messagges</h3>
        {chats && chats.slice(-7).map((chat) => {
          const dateTime = new Date(chat.timestamp)
          return (
            <p
              key={chat.timestamp}
              className={
                "chat-bubble " + (user.uid === chat.uid ? "current-user" : "")
              }
            >
              {/* <br /> */}
              {chat.content}
              <br />
              <span className="chat-time float-right">
                {dateTime.toISOString()}
              </span>
              <hr />
            </p>
          );
        })}

      </div>

      <form className="message_form" onSubmit={handleSubmit}>
        <textarea
          name="content"
          onChange={handleOnChange}
          value={content}
        ></textarea>
        {error ? <p >{error}</p> : null}
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      <div>
        Loggedin as <strong className="text-info">{user.email}</strong>
      </div>
      <div className="container">
        <div className="row">
          <div>
            <button className="btn btn-outline-warning" onClick={handleSignout}>Logout</button>
          </div>
        </div>

      </div>
      </form>
    </div>

  );
}