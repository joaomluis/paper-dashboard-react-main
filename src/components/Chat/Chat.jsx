import "react-chat-elements/dist/main.css";
import "../../assets/css/general-css.css";
import { useParams } from "react-router-dom";

import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { MessageBox, Input, Button } from "react-chat-elements";

import useUserStore from "../../store/useUserStore";
import useAllUsersStore from "../../store/useAllUsersStore.jsx";

function Chat() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isChatHovered, setIsChatHovered] = React.useState(false);

  const getMessagesBetweenTwoUsers = useAllUsersStore(
    (state) => state.getMessagesBetweenTwoUsers
  );

  //fazer o token para o ws com os usernames das pessoas no chat
  const { username } = useParams();
  const myUsername = useUserStore((state) => state.username);
  const websocketToken = myUsername + "-" + username;

  const [timer, setTimer] = React.useState(Date.now()); // Add this line

  

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Date.now()); // This will cause a re-render every 60 seconds
    }, 60000);

    return () => {
      clearInterval(interval); // Clean up on component unmount
    };
  }, []);

  const ws = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket(
      `ws://localhost:8080/project_backend/websocket/notifier/${websocketToken}`
    );

    ws.current.onopen = () => {
      console.log("ws opened");
    };

    ws.current.onclose = () => {
      console.log("ws closed");
    };

    ws.current.onerror = (error) => {
      console.log("ws error", error);
    };

    ws.current.onmessage = (e) => {
      try {
        const message = JSON.parse(e.data);
        const [year, month, day, hour, minute, second, nanosecond] =
          message.sentTimestamp;
        message.sentTimestamp = new Date(
          Date(
            year,
            month - 1,
            day,
            hour,
            minute,
            second,
            nanosecond / 1000000
          )
        );
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error("Error parsing message:", e.data);
        console.error(error);
      }
    };

    getMessagesBetweenTwoUsers(username, myUsername).then((messages) => {
      setMessages(messages);
    });

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        content: input,
        sender: myUsername,
        recipient: username,
      })
    );

    setInput("");
  };

  const ChatMessage = ({ sender, text, status, sentTimestamp }) => {
    const position = sender === myUsername ? "right" : "left";

    return (
      <MessageBox
        position={position}
        type="text"
        text={text}
        date={new Date(sentTimestamp)}
        status={status}
      />
    );
  };

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <>
      <Row>
        <Col md="5"></Col>
        <Col md="7">
          <Card className="card-user">
            <CardHeader
              style={{
                backgroundColor: "grey",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Chat
            </CardHeader>
            <CardBody>
              <div
                className="chat-container"
                style={{
                  height: "400px",
                  overflowY: isChatHovered ? "scroll" : "hidden",
                  backgroundColor: "lightgray",
                  borderRadius: "5px",
                }}
                onMouseEnter={() => setIsChatHovered(true)}
                onMouseLeave={() => setIsChatHovered(false)}
              >
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    sender={message.sender}
                    position={message.sender === myUsername ? "right" : "left"}
                    text={message.content}
                    status={message.status}
                    sentTimestamp={message.sentTimestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
              >
                <form onSubmit={sendMessage}>
                  <Input
                    placeholder="Type here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rightButtons={
                      <Button text={"Send"} title="title" type="submit" />
                    }
                  />
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Chat;
