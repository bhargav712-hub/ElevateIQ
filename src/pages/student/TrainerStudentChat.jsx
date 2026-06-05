import { useState } from "react";

export default function TrainerStudentChat() {
  const trainers = [
    {
      id: 1,
      name: "Anita Sharma",
      status: "Online",
      avatar: "👩‍🏫",
      course: "Full Stack Web Development",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      status: "Online",
      avatar: "👨‍🏫",
      course: "Data Science & ML",
    },
    {
      id: 3,
      name: "Priya Reddy",
      status: "Offline",
      avatar: "👩‍💼",
      course: "Placement Training",
    },
  ];

  const initialChats = {
    1: [
      {
        id: 1,
        sender: "trainer",
        text: "Hello! Welcome to Full Stack Development.",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "student",
        text: "Thank you, ma'am.",
        time: "10:02 AM",
      },
    ],

    2: [
      {
        id: 1,
        sender: "trainer",
        text: "Have you completed the Pandas assignment?",
        time: "11:15 AM",
      },
      {
        id: 2,
        sender: "student",
        text: "Yes sir, I submitted it yesterday.",
        time: "11:20 AM",
      },
    ],

    3: [
      {
        id: 1,
        sender: "trainer",
        text: "Placement training starts next week.",
        time: "09:30 AM",
      },
    ],
  };

  const [selectedTrainer, setSelectedTrainer] = useState(trainers[0]);
  const [messages, setMessages] = useState(initialChats);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedMessages = {
      ...messages,
      [selectedTrainer.id]: [
        ...(messages[selectedTrainer.id] || []),
        {
          id: Date.now(),
          sender: "student",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="animate-fade-in">
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          marginBottom: "20px",
        }}
      >
        💬 Trainer Chat
      </h1>

      <div
        className="card"
        style={{
          height: "75vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          {/* Trainers List */}
          <div
            style={{
              width: "300px",
              borderRight: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}
          >
            <div
              style={{
                padding: "18px",
                fontWeight: "700",
                fontSize: "18px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              👩‍🏫 Trainers
            </div>

            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                onClick={() => setSelectedTrainer(trainer)}
                style={{
                  padding: "15px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  background:
                    selectedTrainer.id === trainer.id
                      ? "#dbeafe"
                      : "transparent",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  {trainer.avatar} {trainer.name}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                  }}
                >
                  {trainer.course}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color:
                      trainer.status === "Online"
                        ? "#16a34a"
                        : "#6b7280",
                  }}
                >
                  ● {trainer.status}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Section */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "18px",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {selectedTrainer.avatar} {selectedTrainer.name}
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                background: "#f3f4f6",
              }}
            >
              {(messages[selectedTrainer.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "student"
                        ? "flex-end"
                        : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      padding: "12px 15px",
                      borderRadius: "15px",
                      background:
                        msg.sender === "student"
                          ? "#2563eb"
                          : "#ffffff",
                      color:
                        msg.sender === "student"
                          ? "#ffffff"
                          : "#111827",
                      boxShadow:
                        "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div>{msg.text}</div>

                    <div
                      style={{
                        fontSize: "11px",
                        marginTop: "5px",
                        opacity: 0.8,
                        textAlign: "right",
                      }}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div
              style={{
                padding: "15px",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) =>
                  setNewMessage(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                }}
              />

              <button
                className="btn btn-primary"
                onClick={sendMessage}
              >
                Send ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}