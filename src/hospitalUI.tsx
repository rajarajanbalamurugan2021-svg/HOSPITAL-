/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

// SVG Icon library
export const PATHS = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  stethoscope: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  file: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  bill: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
  ambulance: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l3 2 3-2 3 2 3-2 0-5m1 5v-5m3-1h.01M14 10V8m0 4v-2m0 2h-3m3 0H14",
  food: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  pill: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  organ: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  plus: "M12 4v16m8-8H4",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  x: "M6 18L18 6M6 6l12 12",
  check: "M5 13l4 4L19 7",
  chevron: "M9 5l7 7-7 7",
  menu: "M4 6h16M4 12h16M4 18h16",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  loc: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
};

export const Icon = ({ name, size = 18, color, style: extra }: { name: string; size?: number; color?: string; style?: React.CSSProperties; key?: React.Key }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color || "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    style={extra}>
    <path d={PATHS[name] || ""} />
  </svg>
);

export const Badge = ({ label, type = "blue", t }: { label: any; type?: string; t: any; key?: React.Key }) => {
  const [bg, fg] = t.badge[type] || t.badge.blue;
  return (
    <span style={{ background: bg, color: fg, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
};

export const Pill = ({ label, color }: { label: any; color: string; key?: React.Key }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>{label}</span>
);

export const Field = ({ label, type = "text", value, onChange, options, required, t, placeholder }: { label: string; type?: string; value: any; onChange: (v: any) => void; options?: any[]; required?: boolean; t: any; placeholder?: string }) => {
  const base = {
    width: "100%", background: t.input, border: `1.5px solid ${t.inputBorder}`,
    borderRadius: 10, padding: "10px 14px", color: t.text, fontSize: 14,
    fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color .2s",
  };
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", color: t.textSub, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{label}{required && <span style={{ color: t.red }}> *</span>}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{ ...base, cursor: "pointer" }}>
          <option value="">— Select —</option>
          {options.map(o => <option key={o.v ?? o} value={o.v ?? o}>{o.l ?? o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} required={required} />
      )}
    </div>
  );
};

export const Modal = ({ open, onClose, title, children, t, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; t: any; wide?: boolean }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: t.overlay, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, width: "100%", maxWidth: wide ? 640 : 500, maxHeight: "90dvh", overflowY: "auto", boxShadow: t.shadow }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 14px", borderBottom: `1px solid ${t.border}`, position: "sticky", top: 0, background: t.card, zIndex: 1 }}>
          <span style={{ color: t.text, fontWeight: 800, fontSize: 16 }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, padding: 4, borderRadius: 8 }}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ padding: "18px 22px" }}>{children}</div>
      </div>
    </div>
  );
};

export const Table = ({ cols, rows, t }: { cols: any[]; rows: any[][]; t: any }) => (
  <div style={{ overflowX: "auto", borderRadius: 12, border: `1px solid ${t.border}` }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
      <thead>
        <tr style={{ background: t.bg }}>
          {cols.map((c, i) => (
            <th key={i} style={{ padding: "11px 14px", textAlign: "left", color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: `1px solid ${t.border}` }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={cols.length} style={{ padding: 28, textAlign: "center", color: t.textMuted, fontSize: 14 }}>No records found</td></tr>
        ) : rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? `1px solid ${t.border}` : "none" }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: "11px 14px", color: t.textSub, fontSize: 13, verticalAlign: "middle" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Stat = ({ label, value, icon, color, t }: { label: string; value: any; icon: string; color: string; t: any; key?: React.Key }) => (
  <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: t.shadow }}>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: color + "1e", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={icon} size={22} color={color} />
    </div>
    <div>
      <div style={{ color: t.text, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{value}</div>
      <div style={{ color: t.textMuted, fontSize: 12, marginTop: 3 }}>{label}</div>
    </div>
  </div>
);

export const SectionHead = ({ title, sub, action, t }: { title: string; sub?: string; action?: React.ReactNode; t: any }) => (
  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
    <div>
      <h2 style={{ margin: 0, color: t.text, fontWeight: 800, fontSize: 20 }}>{title}</h2>
      {sub && <p style={{ margin: "3px 0 0", color: t.textMuted, fontSize: 13 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

export const Btn = ({ onClick, children, color, ghost, size = "md", t, icon, disabled, style: extraStyle }: { onClick?: () => void; children: React.ReactNode; color?: string; ghost?: boolean; size?: "sm" | "md"; t: any; icon?: string; disabled?: boolean; style?: React.CSSProperties; key?: React.Key }) => {
  const c = color || t.accent;
  const pad = size === "sm" ? "7px 14px" : "10px 18px";
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ display: "inline-flex", alignItems: "center", gap: 7, background: ghost ? "transparent" : c, color: ghost ? c : "#fff", border: `1.5px solid ${c}`, borderRadius: 10, padding: pad, cursor: disabled ? "not-allowed" : "pointer", fontWeight: 700, fontSize: size === "sm" ? 12 : 14, opacity: disabled ? 0.5 : 1, fontFamily: "inherit", transition: "opacity .15s, filter .15s", whiteSpace: "nowrap", ...extraStyle }}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}{children}
    </button>
  );
};
