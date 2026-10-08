/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useReducer, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { T, reducer, initialState } from "./hospitalData";
import { Icon } from "./hospitalUI";
import {
  Dashboard,
  Patients,
  StaffPage,
  Doctors,
  Appointments,
  MedRecords,
  Billing,
  Ambulance,
  Food,
  Medicine,
  BloodDonors,
  OrganDonors,
  Login
} from "./hospitalPages";

/* ═══════════════════════════════════════════════════════════════
   NAV CONFIG
═══════════════════════════════════════════════════════════════ */
const NAV_ADMIN = [
  { id: "dashboard",   label: "Dashboard",     icon: "home"        },
  { id: "patients",    label: "Patients",       icon: "users"       },
  { id: "staff",       label: "Staff",          icon: "shield"      },
  { id: "doctors",     label: "Doctors",        icon: "stethoscope" },
  { id: "appointments",label: "Appointments",   icon: "calendar"    },
  { id: "records",     label: "Med Records",    icon: "file"        },
  { id: "billing",     label: "Billing",        icon: "bill"        },
  { id: "ambulance",   label: "Ambulance",      icon: "ambulance"   },
  { id: "food",        label: "Food",           icon: "food"        },
  { id: "medicine",    label: "Medicine",       icon: "pill"        },
  { id: "blood",       label: "Blood Donors",   icon: "heart"       },
  { id: "organ",       label: "Organ Donors",   icon: "organ"       },
];
const NAV_STAFF = [
  { id: "dashboard",   label: "Dashboard",    icon: "home"        },
  { id: "patients",    label: "Patients",     icon: "users"       },
  { id: "records",     label: "Med Records",  icon: "file"        },
  { id: "ambulance",   label: "Ambulance",    icon: "ambulance"   },
  { id: "food",        label: "Food",         icon: "food"        },
  { id: "medicine",    label: "Medicine",     icon: "pill"        },
  { id: "blood",       label: "Blood Donors", icon: "heart"       },
  { id: "organ",       label: "Organ Donors", icon: "organ"       },
];
const NAV_PATIENT = [
  { id: "dashboard",   label: "Dashboard",    icon: "home"        },
  { id: "doctors",     label: "Doctors",      icon: "stethoscope" },
  { id: "appointments",label: "Appointments", icon: "calendar"    },
  { id: "records",     label: "My Records",   icon: "file"        },
  { id: "billing",     label: "My Bills",     icon: "bill"        },
  { id: "ambulance",   label: "Ambulance",    icon: "ambulance"   },
  { id: "food",        label: "Food",         icon: "food"        },
  { id: "medicine",    label: "Medicine",     icon: "pill"        },
  { id: "blood",       label: "Blood Donors", icon: "heart"       },
  { id: "organ",       label: "Organ Donors", icon: "organ"       },
];
const NAV_DOCTOR = [
  { id: "dashboard",   label: "Dashboard",    icon: "home"        },
  { id: "patients",    label: "Patients",     icon: "users"       },
  { id: "appointments",label: "Appointments", icon: "calendar"    },
  { id: "records",     label: "Med Records",  icon: "file"        },
  { id: "medicine",    label: "Medicine",     icon: "pill"        },
  { id: "blood",       label: "Blood Donors", icon: "heart"       },
  { id: "organ",       label: "Organ Donors", icon: "organ"       },
];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const t = T[theme];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Admin");
  const [patientId, setPatientId] = useState(-1);
  const [staffId, setStaffId] = useState(-1);
  const [doctorId, setDoctorId] = useState(-1);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const nav = role === "Admin" ? NAV_ADMIN : role === "Doctor" ? NAV_DOCTOR : role === "Staff" ? NAV_STAFF : NAV_PATIENT;
  const requester = role === "Patient" ? `PATIENT-${patientId}` : role === "Staff" ? `STAFF-${staffId}` : role === "Doctor" ? `DOCTOR-${doctorId}` : "ADMIN";

  const handleLogin = (r, pid, sid, did) => {
    setRole(r); setPatientId(pid); setStaffId(sid); setDoctorId(did);
    setLoggedIn(true); setPage("dashboard");
  };

  if (!loggedIn) return <Login onLogin={handleLogin} theme={theme} setTheme={setTheme} t={t} />;

  const pageProps = { state, dispatch, role, loggedId: patientId > 0 ? patientId : staffId, doctorId, requester, t };

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <Dashboard {...pageProps} />;
      case "patients":     return <Patients {...pageProps} />;
      case "staff":        return <StaffPage {...pageProps} />;
      case "doctors":      return <Doctors {...pageProps} />;
      case "appointments": return <Appointments {...pageProps} />;
      case "records":      return <MedRecords {...pageProps} />;
      case "billing":      return <Billing {...pageProps} />;
      case "ambulance":    return <Ambulance {...pageProps} />;
      case "food":         return <Food {...pageProps} />;
      case "medicine":     return <Medicine {...pageProps} />;
      case "blood":        return <BloodDonors {...pageProps} />;
      case "organ":        return <OrganDonors {...pageProps} />;
      default: return null;
    }
  };

  const SidebarContent = ({ compact }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: compact ? "18px 14px 14px" : "20px 18px 16px", borderBottom: `1px solid ${t.sidebarBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${t.accent}, ${t.purple})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🏥</div>
        {!compact && (
          <div>
            <div style={{ color: t.text, fontWeight: 800, fontSize: 14, letterSpacing: "0.02em" }}>JSR HOSPITAL</div>
            <div style={{ color: t.textMuted, fontSize: 10, marginTop: 1 }}>{role} Panel</div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
        {nav.map(n => {
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => { setPage(n.id); setMobileNavOpen(false); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: compact ? "10px 10px" : "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? t.accent + "18" : "none", color: active ? t.accent : t.textMuted, fontWeight: active ? 700 : 500, fontSize: 13, marginBottom: 2, fontFamily: "inherit", transition: "all .15s", textAlign: "left", whiteSpace: "nowrap", overflow: "hidden" }}>
              <Icon name={n.icon} size={18} color={active ? t.accent : t.textMuted} style={{ flexShrink: 0 }} />
              {!compact && <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{n.label}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "10px 8px", borderTop: `1px solid ${t.sidebarBorder}` }}>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: compact ? "9px 10px" : "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: "none", color: t.textMuted, fontSize: 13, fontFamily: "inherit", marginBottom: 4 }}>
          <Icon name={theme === "dark" ? "sun" : "moon"} size={18} color={t.amber} style={{}} />
          {!compact && (theme === "dark" ? "Light Mode" : "Dark Mode")}
        </button>
        <button onClick={() => setLoggedIn(false)}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: compact ? "9px 10px" : "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: "none", color: t.red, fontSize: 13, fontFamily: "inherit" }}>
          <Icon name="logout" size={18} color={t.red} style={{}} />
          {!compact && "Logout"}
        </button>
      </div>
    </div>
  );

  const sidebarW = isMobile ? 0 : (sidebarOpen ? 230 : 64);

  return (
    <div style={{ display: "flex", height: "100dvh", background: t.bg, fontFamily: "'DM Sans', system-ui, sans-serif", overflow: "hidden", color: t.text }}>
      {!isMobile && (
        <div style={{ width: sidebarW, background: t.sidebar, borderRight: `1px solid ${t.sidebarBorder}`, flexShrink: 0, transition: "width .25s cubic-bezier(.4,0,.2,1)", overflow: "hidden" }}>
          <SidebarContent compact={!sidebarOpen} />
        </div>
      )}

      {isMobile && mobileNavOpen && (
        <>
          <div onClick={() => setMobileNavOpen(false)} style={{ position: "fixed", inset: 0, background: t.overlay, zIndex: 100 }} />
          <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 240, background: t.sidebar, borderRight: `1px solid ${t.sidebarBorder}`, zIndex: 101 }}>
            <SidebarContent compact={false} />
          </div>
        </>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <div style={{ height: 58, background: t.surface, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 0 12px", flexShrink: 0, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => isMobile ? setMobileNavOpen(!mobileNavOpen) : setSidebarOpen(!sidebarOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, padding: 6, borderRadius: 8, display: "flex" }}>
              <Icon name="menu" size={22} color={t.textMuted} style={{}} />
            </button>
            <div style={{ color: t.text, fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>
              {nav.find(n => n.id === page)?.label || "Dashboard"}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, position: "relative", padding: 4 }}>
              <Icon name="bell" size={20} color={t.textMuted} style={{}} />
              <div style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderRadius: "50%", background: t.red }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${t.accent}, ${t.purple})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={role === "Admin" ? "shield" : role === "Doctor" ? "stethoscope" : role === "Staff" ? "users" : "user"} size={16} color="#fff" style={{}} />
              </div>
              {!isMobile && (
                <div>
                  <div style={{ color: t.text, fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
                    {role === "Admin" ? "Administrator" : role === "Doctor" ? `Dr. #${doctorId}` : role === "Staff" ? `Staff #${staffId}` : `Patient #${patientId}`}
                  </div>
                  <div style={{ color: t.textMuted, fontSize: 10 }}>{role}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "14px 12px" : "20px 22px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
