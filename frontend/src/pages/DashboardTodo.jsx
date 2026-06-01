import { useState } from "react";

export default function DashboardTodo({ user, logout }) {
  // --- STATE TO-DO LIST ---
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Mempelajari arsitektur Separation of Concerns",
      is_completed: false,
    },
    {
      id: 2,
      title: "Integrasi endpoint login dengan FastAPI OAuth2",
      is_completed: true,
    },
  ]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // --- LOGIKA CRUD ---
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      is_completed: false,
    };

    setTodos([newTodo, ...todos]);
    setNewTodoTitle("");
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.is_completed).length;
  const progressPercentage =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  // --- LOGIKA DETEKSI NAMA USER SECARA AMAN ---
  // Kode ini mengecek segala kemungkinan struktur data dari AuthContext temanmu
  const dapatkanNama = () => {
    if (!user) return "Guest";
    if (typeof user === "string") return user;
    return (
      user.username ||
      user.name ||
      user.nama ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const namaUser = dapatkanNama();

  return (
    <div
      className="dashboard-container"
      style={{
        padding: "60px 24px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#2d3748",
      }}
    >
      {/* Header Dashboard */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#a0aec0",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            / Workspace
          </span>
          {/* BAGIAN NAMA AKUN YANG LOGIN */}
          <h1
            style={{
              fontSize: "1.85rem",
              fontWeight: "800",
              marginTop: "4px",
              margin: 0,
              color: "#1a202c",
            }}
          >
            Selamat Datang,{" "}
            <span style={{ color: "#3182ce", textTransform: "capitalize" }}>
              {namaUser}
            </span>
            !
          </h1>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "0.8rem",
            backgroundColor: "#fff0f0",
            color: "#e53e3e",
            border: "1px solid #fed7d7",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#feb2b2")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff0f0")}
        >
          Log Out
        </button>
      </div>

      {/* Form Input Box */}
      <form
        onSubmit={handleAddTodo}
        style={{
          display: "flex",
          gap: "12px",
          backgroundColor: "#ffffff",
          padding: "8px 8px 8px 16px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="Ada agenda apa hari ini?"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            backgroundColor: "transparent",
            color: "#2d3748",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "0.85rem",
            cursor: "pointer",
            background: "#1a202c",
            color: "#ffffff",
            border: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Commit
        </button>
      </form>

      {/* Kotak Card Utama Pembungkus To-Do List */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Panel Statistik Progres */}
        <div
          style={{
            padding: "20px 24px",
            backgroundColor: "#f7fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                color: "#4a5568",
                fontWeight: "700",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
              }}
            >
              PROGRESS TRACKER
            </span>
            <span
              style={{
                color: "#2b6cb0",
                fontSize: "0.8rem",
                fontWeight: "700",
                backgroundColor: "#ebf8ff",
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              {completedCount} of {todos.length} Done
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#edf2f7",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: "#3182ce",
                transition: "width 0.4s ease",
              }}
            ></div>
          </div>
        </div>

        {/* Item List Area */}
        {todos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              color: "#a0aec0",
            }}
          >
            <p style={{ fontSize: "0.95rem", margin: 0 }}>
              Semua tugas selesai dikerjakan.
            </p>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid #edf2f7",
                  backgroundColor: todo.is_completed
                    ? "#f7fafc"
                    : "transparent",
                  transition: "background-color 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flex: 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                      accentColor: "#3182ce",
                    }}
                  />
                  <span
                    style={{
                      textDecoration: todo.is_completed
                        ? "line-through"
                        : "none",
                      color: todo.is_completed ? "#a0aec0" : "#2d3748",
                      fontSize: "0.95rem",
                      fontWeight: "500",
                    }}
                  >
                    {todo.title}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#e53e3e",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    opacity: 0.6,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = 1)}
                  onMouseLeave={(e) => (e.target.style.opacity = 0.6)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
