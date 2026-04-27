import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import logo from "@/assets/humo-logo.png";
import vectorPink from "@/assets/vector-pink.png";
import vectorCyan from "@/assets/vector-cyan.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "humo — الكشف المبكر عن طيف التوحد" },
      { name: "description", content: "تطبيق humo للكشف المبكر عن طيف التوحد" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/signup" }), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="splash">
      <img src={vectorPink} alt="" className="vector-pink" />
      <img src={vectorCyan} alt="" className="vector-cyan" />
      <Link to="/signup" className="splash-logo-link">
        <img src={logo} alt="humo" className="splash-logo" />
      </Link>
    </div>
  );
}
