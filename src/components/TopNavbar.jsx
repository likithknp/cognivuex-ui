import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopNavbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div
      style={{
        height: "70px",
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      <input
        placeholder="Search health data..."
        style={{
          width: "320px",
          padding: "10px 15px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Bell size={20} />

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "10px",
              }}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <span>Profile</span>
        )}
      </div>
    </div>
  );
}