import { NavLink, useLocation } from "react-router-dom";
import DxDemo from "./DxDemo";
import MuiDemo from "./MuiDemo";
import { useEffect, useState } from "react";

const navItems = [
    { group: "DevExtreme", color: "blue", icon: "⚡", path: "/dx" },
    { group: "MUI", color: "purple", icon: "🎨", path: "/mui" },
];

export default function AppLayout() {
    const { pathname } = useLocation();
    const isMui = pathname.startsWith("/mui");

    // Lazy keep-alive: mount each demo only on first visit, then keep it alive
    const [hasMui, setHasMui] = useState(isMui);
    const [hasDx, setHasDx] = useState(!isMui);

    useEffect(() => {
        if (isMui) setHasMui(true);
        else setHasDx(true);
    }, [isMui]);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* ── Sidebar ── */}
            <aside className="w-56 min-h-screen bg-white border-r border-slate-200 flex flex-col shadow-sm fixed top-0 left-0 z-10">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        CNX Dev UI
                    </p>
                    <h1 className="text-base font-bold text-slate-800 mt-0.5">
                        Component Demo
                    </h1>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                        Libraries
                    </p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? item.color === "blue"
                                            ? "bg-blue-50 text-blue-700"
                                            : "bg-purple-50 text-purple-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`
                            }
                        >
                            <span className="text-base">{item.icon}</span>
                            {item.group}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400">
                        cnx-dev-ui · React
                    </p>
                </div>
            </aside>

            {/* ── Main Content (lazy keep-alive) ── */}
            <main className="flex-1 ml-56 min-h-screen">
                {hasDx && (
                    <div style={{ display: isMui ? "none" : "block" }}>
                        <DxDemo />
                    </div>
                )}
                {hasMui && (
                    <div style={{ display: isMui ? "block" : "none" }}>
                        <MuiDemo />
                    </div>
                )}
            </main>
        </div>
    );
}
