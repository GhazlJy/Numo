import { Link, useLocation } from "@tanstack/react-router";
import { Home, FileText, MapPin, Lightbulb, Bell } from "lucide-react";
import logo from "@/assets/humo-logo.png";
import vectorPink from "@/assets/vector-pink.png";
import vectorCyan from "@/assets/vector-cyan.png";

type TabKey = "home" | "exam" | "map" | "tip" | "bell";

const NAV_ITEMS = [
  { key: "home" as const, icon: Home, to: "/dashboard", match: ["/dashboard"] },
  { key: "exam" as const, icon: FileText, to: "/exam", match: ["/exam"] },
  { key: "map" as const, icon: MapPin, to: "/centers", match: ["/centers"] },
  { key: "tip" as const, icon: Lightbulb, to: "/report", match: ["/report"] },
  { key: "bell" as const, icon: Bell, to: "/dashboard", match: [] },
];

export function HumoLayout({
  children,
  showLogo = true,
  showVectors = true,
  showNav = true,
  activeTab,
  logoAction,
  className = "",
}: {
  children: React.ReactNode;
  showLogo?: boolean;
  showVectors?: boolean;
  showNav?: boolean;
  activeTab?: TabKey;
  logoAction?: React.ReactNode;
  className?: string;
}) {
  const location = useLocation();
  const auto = NAV_ITEMS.find((i) =>
    i.match.some((m) => location.pathname === m || location.pathname.startsWith(m + "/")),
  )?.key;
  const active: TabKey | undefined = activeTab ?? auto;

  return (
    <>
      <div className={`humo-app ${className}`}>
        {showVectors && (
          <>
            <img src={vectorPink} alt="" className="vector-pink" />
            <img src={vectorCyan} alt="" className="vector-cyan" />
          </>
        )}
        {showLogo && (
          <div className={`text-center mb-3 position-relative ${logoAction ? "humo-logo-row" : ""}`} style={{ zIndex: 2 }}>
            {logoAction && <div className="humo-logo-row-action">{logoAction}</div>}
            <img src={logo} alt="humo" className="humo-logo" />
          </div>
        )}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>
      {showNav && <BottomNav active={active} />}
    </>
  );
}

function BottomNav({ active }: { active?: TabKey }) {
  return (
    <nav className="humo-bottom-nav">
      {NAV_ITEMS.map(({ key, icon: Icon, to }) => (
        <Link key={key} to={to} className={active === key ? "active" : ""}>
          <button className={active === key ? "active" : ""}>
            <Icon size={22} />
          </button>
        </Link>
      ))}
    </nav>
  );
}
