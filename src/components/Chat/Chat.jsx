import "react-chat-elements/dist/main.css";
import "../../assets/css/general-css.css";
import { useParams } from "react-router-dom";

import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { MessageBox, Input, Button } from "react-chat-elements";

import useUserStore from "../../store/useUserStore";

function Chat() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isChatHovered, setIsChatHovered] = React.useState(false);

  //fazer o token para o ws com os usernames das pessoas no chat
  const { username } = useParams();
  const myUsername = useUserStore((state) => state.username);
  const websocketToken = myUsername + "-" + username;
  



  const ws = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket(
      `ws://localhost:8080/project_backend/websocket/notifier/${websocketToken}`
    );

    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, [websocketToken]);

  React.useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      try {
        const message = JSON.parse(e.data);
        const messageForRendering = {
          ...message,
          position: "left",
          title: "Other User",
          status: "received",
        };
        setMessages((prevMessages) => [...prevMessages, messageForRendering]);
      } catch (error) {
        console.error("Error parsing message:", e.data, error);
      }
    };
  }, []);

  const handleSend = () => {
    if (input && ws.current) {
      const message = { content: input, sender: myUsername, recipient: username};
      ws.current.send(JSON.stringify(message));
      const messageForRendering = {
        text: input,
        position: "right",
        title: "You",
        status: "sent",
      };
      setMessages((prevMessages) => [...prevMessages, messageForRendering]);

      setInput("");
    }
  };

  const ChatMessage = ({ position, title, text, status }) => (
    <MessageBox
      position={position}
      title={title}
      type="text"
      text={text}
      date={new Date()}
      status={status}
    />
  );

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
                onWheel={(e) => e.preventDefault()}
              >
                {messages.map((message, index) => (
                  <ChatMessage key={index} {...message} />
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
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
