/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Icon, Badge, Pill, Field, Modal, Table, Stat, SectionHead, Btn } from "./hospitalUI";
import { today, now, SEED } from "./hospitalData";

/* ── DASHBOARD ── */
export function Dashboard({ state, role, t }) {
  const stats = [
    { label: "Patients", value: state.patients.length, icon: "users", color: t.accent },
    { label: "Doctors", value: state.doctors.length, icon: "stethoscope", color: t.green },
    { label: "Appointments", value: state.appointments.length, icon: "calendar", color: t.purple },
    { label: "Ambulances", value: state.ambulances.length, icon: "ambulance", color: t.red },
    { label: "Blood Donors", value: state.bloodDonors.length, icon: "heart", color: "#e11d48" },
    { label: "Organ Donors", value: state.organDonors.length, icon: "organ", color: t.orange },
    { label: "Medicines", value: state.medicines.length, icon: "pill", color: t.amber },
    { label: "Bills", value: state.bills.length, icon: "bill", color: t.textSub },
  ];
  const recentAppts = state.appointments.slice(-5).reverse();
  const availAmb = state.ambulances.filter(a => a.status === "Available").length;
  return (
    <div>
      <SectionHead title={`Welcome back, ${role} 👋`} sub={`JSR Hospital Management — ${new Date().toDateString()}`} t={t} action={null} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12, marginBottom: 24 }}>
        {stats.map(s => <Stat key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} t={t} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 18 }}>
          <h3 style={{ margin: "0 0 14px", color: t.text, fontSize: 15, fontWeight: 700 }}>Recent Appointments</h3>
          {recentAppts.map(a => {
            const p = state.patients.find(x => x.id === a.patientId);
            const d = state.doctors.find(x => x.id === a.doctorId);
            return (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${t.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: t.accent + "1e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="user" size={18} color={t.accent} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: t.text, fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p?.name || "Unknown"}</div>
                  <div style={{ color: t.textMuted, fontSize: 11 }}>{d?.name || "—"} · {a.date}</div>
                </div>
                <Badge label={a.status} type={a.status === "Confirmed" ? "green" : a.status === "Pending" ? "amber" : "red"} t={t} />
              </div>
            );
          })}
        </div>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 18 }}>
          <h3 style={{ margin: "0 0 14px", color: t.text, fontSize: 15, fontWeight: 700 }}>Ambulance Fleet</h3>
          {state.ambulances.map(a => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${t.border}` }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: (a.status === "Available" ? t.green : a.status === "On-Duty" ? t.amber : t.red) + "1e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="ambulance" size={18} color={a.status === "Available" ? t.green : a.status === "On-Duty" ? t.amber : t.red} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{a.vehicleNo}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>{a.location}</div>
              </div>
              <Badge label={a.status} type={a.status === "Available" ? "green" : a.status === "On-Duty" ? "amber" : "red"} t={t} />
            </div>
          ))}
          <div style={{ marginTop: 12, padding: "10px 14px", background: t.green + "12", borderRadius: 10, color: t.green, fontWeight: 700, fontSize: 14 }}>
            {availAmb} / {state.ambulances.length} Available
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PATIENTS ── */
export function Patients({ state, dispatch, role, t }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [f, setF] = useState({ name: "", age: "", gender: "Male", phone: "", address: "", blood: "A+" });
  const list = state.patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search));
  const submit = () => {
    if (!f.name || !f.phone) return;
    dispatch({ type: "ADD_PATIENT", p: { name: f.name, age: +f.age, gender: f.gender, phone: f.phone, address: f.address, blood: f.blood } });
    setModal(false); setF({ name: "", age: "", gender: "Male", phone: "", address: "", blood: "A+" });
  };
  return (
    <div>
      <SectionHead title="Patient Management" sub={`${list.length} patients`} t={t}
        action={role !== "Patient" ? <Btn onClick={() => setModal(true)} icon="plus" t={t}>Add Patient</Btn> : null} />
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: t.input, border: `1.5px solid ${t.inputBorder}`, borderRadius: 10, padding: "8px 14px" }}>
          <Icon name="search" size={16} color={t.textMuted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID…" style={{ background: "none", border: "none", outline: "none", color: t.text, fontSize: 14, flex: 1, fontFamily: "inherit" }} />
        </div>
      </div>
      <Table t={t} cols={["ID", "Name", "Age", "Gender", "Blood", "Phone", "Address", "Registered", ...(role === "Admin" ? ["Action"] : [])]}
        rows={list.map(p => [
          <span style={{ color: t.accent, fontWeight: 700 }}>#{p.id}</span>,
          <span style={{ color: t.text, fontWeight: 600 }}>{p.name}</span>,
          p.age, p.gender, <Badge label={p.blood} type="red" t={t} />,
          p.phone, p.address, p.reg,
          ...(role === "Admin" ? [<Btn key="del" size="sm" ghost color={t.red} t={t} icon="trash" onClick={() => dispatch({ type: "DEL_PATIENT", id: p.id })}>Del</Btn>] : []),
        ])}
      />
      <Modal open={modal} onClose={() => setModal(false)} title="Register New Patient" t={t} wide={false}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ gridColumn: "1 / -1" }}><Field label="Full Name" value={f.name} onChange={v => setF({ ...f, name: v })} required t={t} /></div>
          <Field label="Age" type="number" value={f.age} onChange={v => setF({ ...f, age: v })} t={t} />
          <Field label="Gender" value={f.gender} onChange={v => setF({ ...f, gender: v })} options={["Male", "Female", "Other"]} t={t} />
          <Field label="Phone" value={f.phone} onChange={v => setF({ ...f, phone: v })} required t={t} />
          <Field label="Blood Group" value={f.blood} onChange={v => setF({ ...f, blood: v })} options={["A+","A-","B+","B-","O+","O-","AB+","AB-"]} t={t} />
          <div style={{ gridColumn: "1 / -1" }}><Field label="Address" value={f.address} onChange={v => setF({ ...f, address: v })} t={t} /></div>
        </div>
        <Btn onClick={submit} t={t} icon="check" style={{ marginTop: 4 }}>Register Patient</Btn>
      </Modal>
    </div>
  );
}

/* ── STAFF ── */
export function StaffPage({ state, dispatch, t }) {
  const [modal, setModal] = useState(false);
  const [f, setF] = useState({ name: "", role: "Nurse", dept: "", phone: "", shift: "Morning", pass: "" });
  const submit = () => {
    if (!f.name || !f.phone) return;
    dispatch({ type: "ADD_STAFF", p: f });
    setModal(false); setF({ name: "", role: "Nurse", dept: "", phone: "", shift: "Morning", pass: "" });
  };
  return (
    <div>
      <SectionHead title="Staff Management" sub={`${state.staff.length} staff members`} t={t}
        action={<Btn onClick={() => setModal(true)} icon="plus" t={t}>Add Staff</Btn>} />
      <Table t={t} cols={["ID", "Name", "Role", "Department", "Phone", "Shift", "Action"]}
        rows={state.staff.map(s => [
          <span style={{ color: t.accent, fontWeight: 700 }}>#{s.id}</span>,
          <span style={{ color: t.text, fontWeight: 600 }}>{s.name}</span>,
          <Badge label={s.role} type="purple" t={t} />, s.dept, s.phone,
          <Badge label={s.shift} type="blue" t={t} />,
          <Btn key="del" size="sm" ghost color={t.red} t={t} icon="trash" onClick={() => dispatch({ type: "DEL_STAFF", id: s.id })}>Del</Btn>,
        ])}
      />
      <Modal open={modal} onClose={() => setModal(false)} title="Add Staff Member" t={t} wide={false}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ gridColumn: "1/-1" }}><Field label="Full Name" value={f.name} onChange={v => setF({ ...f, name: v })} required t={t} /></div>
          <Field label="Role" value={f.role} onChange={v => setF({ ...f, role: v })} options={["Doctor","Nurse","Lab Tech","Pharmacist","Admin Staff","Support"]} t={t} />
          <Field label="Department" value={f.dept} onChange={v => setF({ ...f, dept: v })} t={t} />
          <Field label="Phone" value={f.phone} onChange={v => setF({ ...f, phone: v })} required t={t} />
          <Field label="Shift" value={f.shift} onChange={v => setF({ ...f, shift: v })} options={["Morning","Evening","Night"]} t={t} />
          <div style={{ gridColumn: "1/-1" }}><Field label="Password" type="password" value={f.pass} onChange={v => setF({ ...f, pass: v })} required t={t} /></div>
        </div>
        <Btn onClick={submit} t={t} icon="check">Add Staff</Btn>
      </Modal>
    </div>
  );
}

/* ── DOCTORS ── */
export function Doctors({ state, dispatch, role, doctorId, t }) {
  const [modal, setModal] = useState(false);
  const [showCreds, setShowCreds] = useState(null);
  const [f, setF] = useState({ name: "", spec: "", phone: "", schedule: "" });
  const submit = () => {
    if (!f.name) return;
    dispatch({ type: "ADD_DOCTOR", p: f });
    setModal(false); setF({ name: "", spec: "", phone: "", schedule: "" });
  };
  return (
    <div>
      <SectionHead title="Doctors" sub={`${state.doctors.length} doctors`} t={t}
        action={role === "Admin" && <Btn onClick={() => setModal(true)} icon="plus" t={t}>Add Doctor</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {state.doctors.map(d => (
          <div key={d.id} style={{ background: t.card, border: `1px solid ${d.available ? t.green + "44" : t.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: t.green + "1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="stethoscope" size={22} color={t.green} />
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Badge label={d.available ? "Available" : "Unavailable"} type={d.available ? "green" : "red"} t={t} />
              </div>
            </div>
            <div style={{ color: t.text, fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{d.name}</div>
            <div style={{ color: t.accent, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{d.spec}</div>
            <div style={{ color: t.textMuted, fontSize: 12, marginBottom: 2 }}>📞 {d.phone}</div>
            <div style={{ color: t.textMuted, fontSize: 12, marginBottom: 4 }}>🕐 {d.schedule}</div>
            <div style={{ background: t.accent + "12", border: `1px solid ${t.accent}33`, borderRadius: 8, padding: "5px 10px", marginBottom: 10, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon name="shield" size={12} color={t.accent} />
              <span style={{ color: t.accent, fontSize: 11, fontWeight: 700 }}>Doctor ID: #{d.id}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {role === "Admin" && (
                <>
                  <Btn size="sm" ghost color={d.available ? t.red : t.green} t={t}
                    onClick={() => dispatch({ type: "TOGGLE_DOCTOR", id: d.id })}>
                    {d.available ? "Mark Unavailable" : "Mark Available"}
                  </Btn>
                  <Btn size="sm" ghost color={t.purple} t={t} icon="shield" onClick={() => setShowCreds(d)}>Credentials</Btn>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal open={!!showCreds} onClose={() => setShowCreds(null)} title="Doctor Login Credentials" t={t} wide={false}>
        {showCreds && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${t.green}15, ${t.accent}10)`, border: `1px solid ${t.green}33`, borderRadius: 12, padding: 18, marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: t.green + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="stethoscope" size={24} color={t.green} />
                </div>
                <div>
                  <div style={{ color: t.text, fontWeight: 800, fontSize: 16 }}>{showCreds.name}</div>
                  <div style={{ color: t.green, fontSize: 13, fontWeight: 600 }}>{showCreds.spec}</div>
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {[["Doctor ID (Login Username)", `${showCreds.id}`, t.accent], ["Login Password", showCreds.pass || `doc${showCreds.id}`, t.purple], ["Phone", showCreds.phone, t.textSub], ["Schedule", showCreds.schedule, t.textSub]].map(([label, val, color]) => (
                  <div key={label} style={{ background: t.bg, borderRadius: 8, padding: "10px 14px", border: `1px solid ${t.border}` }}>
                    <div style={{ color: t.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{label}</div>
                    <div style={{ color, fontSize: 15, fontWeight: 700, fontFamily: "monospace" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal open={modal} onClose={() => setModal(false)} title="Add Doctor" t={t} wide={false}>
        <Field label="Full Name" value={f.name} onChange={v => setF({ ...f, name: v })} required t={t} />
        <Field label="Specialization" value={f.spec} onChange={v => setF({ ...f, spec: v })} t={t} />
        <Field label="Phone" value={f.phone} onChange={v => setF({ ...f, phone: v })} t={t} />
        <Field label="Schedule (e.g. Mon-Fri 09-17)" value={f.schedule} onChange={v => setF({ ...f, schedule: v })} t={t} />
        <Btn onClick={submit} t={t} icon="check">Add Doctor</Btn>
      </Modal>
    </div>
  );
}

/* ── APPOINTMENTS ── */
export function Appointments({ state, dispatch, role, loggedId, doctorId, t }) {
  const [modal, setModal] = useState(false);
  const [f, setF] = useState({ patientId: "", doctorId: "", date: today(), time: "09:00", reason: "", priority: "Normal" });
  const [filterPriority, setFilterPriority] = useState("All");
  const PRIORITIES = ["Emergency", "Urgent", "Normal", "Routine"];
  const PRIORITY_COLORS = { Emergency: "red", Urgent: "amber", Normal: "blue", Routine: "green" };
  const PRIORITY_ICONS = { Emergency: "🚨", Urgent: "⚠️", Normal: "📅", Routine: "✅" };

  const list = role === "Patient"
    ? state.appointments.filter(a => a.patientId === loggedId)
    : role === "Doctor"
    ? state.appointments.filter(a => a.doctorId === doctorId)
    : state.appointments;

  const filtered = filterPriority === "All" ? list : list.filter(a => a.priority === filterPriority);
  const sorted = [...filtered].sort((a, b) => {
    const order = { Emergency: 0, Urgent: 1, Normal: 2, Routine: 3 };
    return (order[a.priority] ?? 2) - (order[b.priority] ?? 2);
  });

  const submit = () => {
    const pid = role === "Patient" ? loggedId : +f.patientId;
    if (!pid || !f.doctorId) return;
    dispatch({ type: "ADD_APPT", p: { patientId: pid, doctorId: +f.doctorId, date: f.date, time: f.time, reason: f.reason, priority: f.priority } });
    setModal(false); setF({ patientId: "", doctorId: "", date: today(), time: "09:00", reason: "", priority: "Normal" });
  };
  const statColor = s => s === "Confirmed" ? "green" : s === "Completed" ? "blue" : s === "Cancelled" ? "red" : "amber";

  return (
    <div>
      <SectionHead title="Appointments" sub={`${sorted.length} records`} t={t}
        action={<Btn onClick={() => setModal(true)} icon="plus" t={t}>Book Appointment</Btn>} />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {["All", ...PRIORITIES].map(p => (
          <button key={p} onClick={() => setFilterPriority(p)}
            style={{ background: filterPriority === p ? t.accent : t.card, color: filterPriority === p ? "#fff" : t.textMuted, border: `1.5px solid ${filterPriority === p ? t.accent : t.border}`, borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
            {p !== "All" && PRIORITY_ICONS[p]} {p}
          </button>
        ))}
      </div>
      <Table t={t}
        cols={["Priority", "ID", "Patient", "Doctor", "Date", "Time", "Reason", "Status", "Actions"]}
        rows={sorted.map(a => {
          const p = state.patients.find(x => x.id === a.patientId);
          const d = state.doctors.find(x => x.id === a.doctorId);
          const prio = a.priority || "Normal";
          return [
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Badge label={prio} type={PRIORITY_COLORS[prio]} t={t} />
            </div>,
            <span style={{ color: t.accent, fontWeight: 700 }}>#{a.id}</span>,
            p?.name || `#${a.patientId}`,
            d?.name || `#${a.doctorId}`,
            a.date, a.time,
            <span style={{ color: t.textSub }}>{a.reason}</span>,
            <Badge label={a.status} type={statColor(a.status)} t={t} />,
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {(role === "Admin" || role === "Doctor") && ["Confirmed","Completed","Cancelled"].map(s => (
                <Btn key={s} size="sm" ghost color={s === "Confirmed" ? t.green : s === "Completed" ? t.accent : t.red} t={t}
                  onClick={() => dispatch({ type: "UPD_APPT", id: a.id, status: s })}>
                  {s[0]}
                </Btn>
              ))}
            </div>,
          ];
        })}
      />
      <Modal open={modal} onClose={() => setModal(false)} title="Book Appointment" t={t} wide={false}>
        <Field label="Priority" value={f.priority} onChange={v => setF({ ...f, priority: v })} options={PRIORITIES} t={t} />
        {role !== "Patient" && (
          <Field label="Patient" value={f.patientId} onChange={v => setF({ ...f, patientId: v })}
            options={state.patients.map(p => ({ v: p.id, l: `#${p.id} — ${p.name}` }))} required t={t} />
        )}
        <Field label="Doctor" value={f.doctorId} onChange={v => setF({ ...f, doctorId: v })}
          options={state.doctors.filter(d => d.available).map(d => ({ v: d.id, l: `${d.name} (${d.spec})` }))} required t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Field label="Date" type="date" value={f.date} onChange={v => setF({ ...f, date: v })} t={t} />
          <Field label="Time" type="time" value={f.time} onChange={v => setF({ ...f, time: v })} t={t} />
        </div>
        <Field label="Reason" value={f.reason} onChange={v => setF({ ...f, reason: v })} t={t} />
        <Btn onClick={submit} t={t} icon="check">Book</Btn>
      </Modal>
    </div>
  );
}

/* ── MEDICAL RECORDS ── */
export function MedRecords({ state, dispatch, role, loggedId, doctorId, t }) {
  const [modal, setModal] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);
  const [f, setF] = useState({ patientId: "", doctorId: "", diagnosis: "", prescription: "", notes: "" });

  const list = role === "Patient"
    ? state.records.filter(r => r.patientId === loggedId)
    : role === "Doctor"
    ? state.records.filter(r => r.doctorId === doctorId)
    : state.records;

  const submit = () => {
    if (!f.patientId || !f.diagnosis) return;
    const docId = role === "Doctor" ? doctorId : +f.doctorId;
    dispatch({ type: "ADD_RECORD", p: { patientId: +f.patientId, doctorId: docId, diagnosis: f.diagnosis, prescription: f.prescription, notes: f.notes } });
    setModal(false); setF({ patientId: "", doctorId: "", diagnosis: "", prescription: "", notes: "" });
  };

  return (
    <div>
      <SectionHead title="Medical Records" sub={`${list.length} records`} t={t}
        action={(role === "Admin" || role === "Doctor") && <Btn onClick={() => setModal(true)} icon="plus" t={t}>Add Record</Btn>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {list.map(r => {
          const p = state.patients.find(x => x.id === r.patientId);
          const d = state.doctors.find(x => x.id === r.doctorId);
          return (
            <div key={r.id} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <span style={{ color: t.text, fontWeight: 700 }}>{p?.name || `Patient #${r.patientId}`}</span>
                  <span style={{ color: t.textMuted, fontSize: 12, marginLeft: 10 }}>{r.date}</span>
                </div>
                <Btn size="sm" ghost color={t.accent} t={t} icon="file" onClick={() => setViewRecord(r)}>View</Btn>
              </div>
              <div style={{ color: t.textSub, fontSize: 13 }}>Diagnosis: {r.diagnosis}</div>
            </div>
          );
        })}
      </div>
      <Modal open={!!viewRecord} onClose={() => setViewRecord(null)} title="Medical Record Detail" t={t} wide={false}>
        {viewRecord && (
          <div>
            <div style={{ marginBottom: 10 }}><strong>Diagnosis:</strong> {viewRecord.diagnosis}</div>
            <div style={{ marginBottom: 10 }}><strong>Prescription:</strong> {viewRecord.prescription}</div>
            <div><strong>Notes:</strong> {viewRecord.notes}</div>
          </div>
        )}
      </Modal>
      <Modal open={modal} onClose={() => setModal(false)} title="Add Medical Record" t={t} wide={false}>
        <Field label="Patient" value={f.patientId} onChange={v => setF({ ...f, patientId: v })}
          options={state.patients.map(p => ({ v: p.id, l: `#${p.id} — ${p.name}` }))} required t={t} />
        {role !== "Doctor" && (
          <Field label="Doctor" value={f.doctorId} onChange={v => setF({ ...f, doctorId: v })}
            options={state.doctors.map(d => ({ v: d.id, l: d.name }))} t={t} />
        )}
        <Field label="Diagnosis" value={f.diagnosis} onChange={v => setF({ ...f, diagnosis: v })} required t={t} />
        <Field label="Prescription" value={f.prescription} onChange={v => setF({ ...f, prescription: v })} t={t} />
        <Field label="Notes" value={f.notes} onChange={v => setF({ ...f, notes: v })} t={t} />
        <Btn onClick={submit} t={t} icon="check">Save Record</Btn>
      </Modal>
    </div>
  );
}

/* ── BILLING ── */
export function Billing({ state, dispatch, role, loggedId, t }) {
  const [modal, setModal] = useState(false);
  const [f, setF] = useState({ patientId: "", consult: "", medicine: "", test: "", room: "" });
  const list = role === "Patient" ? state.bills.filter(b => b.patientId === loggedId) : state.bills;
  const submit = () => {
    if (!f.patientId) return;
    const consult = +f.consult || 0, medicine = +f.medicine || 0, test = +f.test || 0, room = +f.room || 0;
    dispatch({ type: "ADD_BILL", p: { patientId: +f.patientId, consult, medicine, test, room, total: consult + medicine + test + room } });
    setModal(false); setF({ patientId: "", consult: "", medicine: "", test: "", room: "" });
  };
  return (
    <div>
      <SectionHead title="Billing" sub="Patient invoices" t={t}
        action={role === "Admin" && <Btn onClick={() => setModal(true)} icon="plus" t={t}>Generate Bill</Btn>} />
      <Table t={t} cols={["ID", "Patient", "Date", "Total", "Status", "Action"]}
        rows={list.map(b => {
          const p = state.patients.find(x => x.id === b.patientId);
          return [
            <span style={{ color: t.accent, fontWeight: 700 }}>#{b.id}</span>,
            p?.name || `#${b.patientId}`,
            b.date, `₹${b.total}`,
            <Badge label={b.status} type={b.status === "Paid" ? "green" : "amber"} t={t} />,
            role === "Admin" && b.status !== "Paid" ? <Btn size="sm" color={t.green} t={t} onClick={() => dispatch({ type: "PAY_BILL", id: b.id })}>Mark Paid</Btn> : "—",
          ];
        })}
      />
      <Modal open={modal} onClose={() => setModal(false)} title="Generate Bill" t={t} wide={false}>
        <Field label="Patient" value={f.patientId} onChange={v => setF({ ...f, patientId: v })}
          options={state.patients.map(p => ({ v: p.id, l: `#${p.id} — ${p.name}` }))} required t={t} />
        <Field label="Consultation (₹)" type="number" value={f.consult} onChange={v => setF({ ...f, consult: v })} t={t} />
        <Field label="Medicine (₹)" type="number" value={f.medicine} onChange={v => setF({ ...f, medicine: v })} t={t} />
        <Field label="Tests (₹)" type="number" value={f.test} onChange={v => setF({ ...f, test: v })} t={t} />
        <Field label="Room Charge (₹)" type="number" value={f.room} onChange={v => setF({ ...f, room: v })} t={t} />
        <Btn onClick={submit} t={t} icon="check">Generate Bill</Btn>
      </Modal>
    </div>
  );
}

/* ── AMBULANCE ── */
export function Ambulance({ state, dispatch, role, requester, t }) {
  const [bookModal, setBookModal] = useState(false);
  const [bf, setBf] = useState({ ambulanceId: "", pickup: "", dest: "" });
  const myBookings = state.ambBookings.filter(b => b.requestedBy === requester);
  const availAmb = state.ambulances.filter(a => a.status === "Available");
  const book = () => {
    if (!bf.ambulanceId || !bf.pickup) return;
    dispatch({ type: "BOOK_AMB", p: { ambulanceId: +bf.ambulanceId, requestedBy: requester, pickup: bf.pickup, dest: bf.dest } });
    setBookModal(false); setBf({ ambulanceId: "", pickup: "", dest: "" });
  };
  return (
    <div>
      <SectionHead title="Ambulance" sub="Emergency services" t={t}
        action={<Btn onClick={() => setBookModal(true)} color={t.red} t={t} icon="ambulance">Book Ambulance</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 20 }}>
        {state.ambulances.map(a => (
          <div key={a.id} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: t.accent, fontWeight: 800 }}>{a.vehicleNo}</span>
              <Badge label={a.status} type={a.status === "Available" ? "green" : "amber"} t={t} />
            </div>
            <div style={{ color: t.text, fontSize: 14 }}>Driver: {a.driver}</div>
            <div style={{ color: t.textMuted, fontSize: 12 }}>Phone: {a.dPhone}</div>
          </div>
        ))}
      </div>
      <Table t={t} cols={["ID", "Ambulance", "Pickup", "Time", "Status"]}
        rows={myBookings.map(b => [
          <span style={{ color: t.accent, fontWeight: 700 }}>#{b.id}</span>,
          state.ambulances.find(x => x.id === b.ambulanceId)?.vehicleNo || "?",
          b.pickup, b.time, <Badge label={b.status} type="green" t={t} />,
        ])}
      />
      <Modal open={bookModal} onClose={() => setBookModal(false)} title="Book Ambulance" t={t} wide={false}>
        <Field label="Select Ambulance" value={bf.ambulanceId} onChange={v => setBf({ ...bf, ambulanceId: v })}
          options={availAmb.map(a => ({ v: a.id, l: `${a.vehicleNo} (${a.location})` }))} required t={t} />
        <Field label="Pickup Location" value={bf.pickup} onChange={v => setBf({ ...bf, pickup: v })} required t={t} />
        <Field label="Destination" value={bf.dest} onChange={v => setBf({ ...bf, dest: v })} t={t} />
        <Btn onClick={book} color={t.red} t={t} icon="ambulance">Confirm Booking</Btn>
      </Modal>
    </div>
  );
}

/* ── FOOD ── */
export function Food({ state, dispatch, role, requester, t }) {
  const [orderModal, setOrderModal] = useState(false);
  const [of_, setOf] = useState({ menuItemId: "", deliveryLocation: "" });
  const myOrders = state.foodOrders.filter(o => o.orderedBy === requester);
  const submit = () => {
    if (!of_.menuItemId) return;
    dispatch({ type: "ORDER_FOOD", p: { orderedBy: requester, menuItemId: +of_.menuItemId, deliveryLocation: of_.deliveryLocation } });
    setOrderModal(false); setOf({ menuItemId: "", deliveryLocation: "" });
  };
  return (
    <div>
      <SectionHead title="Food Service" sub="Patient meals" t={t}
        action={<Btn onClick={() => setOrderModal(true)} icon="food" t={t}>Order Food</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 20 }}>
        {state.foodMenu.map(m => (
          <div key={m.id} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: 14 }}>
            <div style={{ color: t.text, fontWeight: 600 }}>{m.name}</div>
            <div style={{ color: t.green, fontSize: 13 }}>₹{m.price}</div>
          </div>
        ))}
      </div>
      <Table t={t} cols={["ID", "Item", "Location", "Status"]}
        rows={myOrders.map(o => [
          <span style={{ color: t.accent, fontWeight: 700 }}>#{o.id}</span>,
          state.foodMenu.find(m => m.id === o.menuItemId)?.name || "?",
          o.deliveryLocation, <Badge label={o.status} type="amber" t={t} />,
        ])}
      />
      <Modal open={orderModal} onClose={() => setOrderModal(false)} title="Order Food" t={t} wide={false}>
        <Field label="Menu Item" value={of_.menuItemId} onChange={v => setOf({ ...of_, menuItemId: v })}
          options={state.foodMenu.map(m => ({ v: m.id, l: `${m.name} (₹${m.price})` }))} required t={t} />
        <Field label="Delivery Location" value={of_.deliveryLocation} onChange={v => setOf({ ...of_, deliveryLocation: v })} t={t} />
        <Btn onClick={submit} t={t} icon="check">Place Order</Btn>
      </Modal>
    </div>
  );
}

/* ── MEDICINE ── */
export function Medicine({ state, dispatch, role, requester, t }) {
  const [orderModal, setOrderModal] = useState(false);
  const [of_, setOf] = useState({ medicineId: "", qty: 1 });
  const myOrders = state.medicineOrders.filter(o => o.orderedBy === requester);
  const submit = () => {
    if (!of_.medicineId) return;
    dispatch({ type: "ORDER_MED", p: { orderedBy: requester, medicineId: +of_.medicineId, qty: +of_.qty } });
    setOrderModal(false); setOf({ medicineId: "", qty: 1 });
  };
  return (
    <div>
      <SectionHead title="Pharmacy" sub="Medicine inventory" t={t}
        action={<Btn onClick={() => setOrderModal(true)} icon="pill" t={t}>Order Medicine</Btn>} />
      <Table t={t} cols={["Name", "Category", "Price", "Stock"]}
        rows={state.medicines.map(m => [
          m.name, m.cat, `₹${m.price}`, m.stock,
        ])}
      />
      <Modal open={orderModal} onClose={() => setOrderModal(false)} title="Order Medicine" t={t} wide={false}>
        <Field label="Medicine" value={of_.medicineId} onChange={v => setOf({ ...of_, medicineId: v })}
          options={state.medicines.map(m => ({ v: m.id, l: m.name }))} required t={t} />
        <Field label="Quantity" type="number" value={of_.qty} onChange={v => setOf({ ...of_, qty: v })} t={t} />
        <Btn onClick={submit} t={t} icon="check">Place Order</Btn>
      </Modal>
    </div>
  );
}

/* ── BLOOD DONORS ── */
export function BloodDonors({ state, dispatch, role, requester, t }) {
  const [modal, setModal] = useState(false);
  const [f, setF] = useState({ name: "", blood: "A+", phone: "", address: "", lastDonation: "" });
  const submit = () => {
    if (!f.name || !f.phone) return;
    dispatch({ type: "ADD_BLOOD_DONOR", p: { ...f, regBy: requester } });
    setModal(false); setF({ name: "", blood: "A+", phone: "", address: "", lastDonation: "" });
  };
  return (
    <div>
      <SectionHead title="Blood Donors" sub="Donor registry" t={t}
        action={<Btn onClick={() => setModal(true)} icon="heart" color={t.red} t={t}>Register Donor</Btn>} />
      <Table t={t} cols={["Name", "Blood", "Phone", "Available"]}
        rows={state.bloodDonors.map(d => [
          d.name, <Badge label={d.blood} type="red" t={t} />, d.phone,
          <Badge label={d.available ? "Yes" : "No"} type={d.available ? "green" : "red"} t={t} />,
        ])}
      />
      <Modal open={modal} onClose={() => setModal(false)} title="Register Blood Donor" t={t} wide={false}>
        <Field label="Full Name" value={f.name} onChange={v => setF({ ...f, name: v })} required t={t} />
        <Field label="Blood Group" value={f.blood} onChange={v => setF({ ...f, blood: v })} options={["A+","A-","B+","B-","O+","O-","AB+","AB-"]} t={t} />
        <Field label="Phone" value={f.phone} onChange={v => setF({ ...f, phone: v })} required t={t} />
        <Btn onClick={submit} color={t.red} t={t} icon="check">Register</Btn>
      </Modal>
    </div>
  );
}

/* ── ORGAN DONORS ── */
export function OrganDonors({ state, dispatch, role, requester, t }) {
  const [modal, setModal] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", blood: "A+", organs: "", consent: true });
  const submit = () => {
    if (!f.name || !f.organs) return;
    dispatch({ type: "ADD_ORGAN_DONOR", p: { ...f, regBy: requester } });
    setModal(false); setF({ name: "", phone: "", blood: "A+", organs: "" });
  };
  return (
    <div>
      <SectionHead title="Organ Donors" sub="Organ registry" t={t}
        action={<Btn onClick={() => setModal(true)} icon="organ" color={t.purple} t={t}>Register Donor</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {state.organDonors.map(d => (
          <div key={d.id} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: 16 }}>
            <div style={{ color: t.text, fontWeight: 700 }}>{d.name}</div>
            <div style={{ color: t.textMuted, fontSize: 12 }}>Organs: {d.organs}</div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title="Register Organ Donor" t={t} wide={false}>
        <Field label="Full Name" value={f.name} onChange={v => setF({ ...f, name: v })} required t={t} />
        <Field label="Organs" value={f.organs} onChange={v => setF({ ...f, organs: v })} required t={t} placeholder="e.g. Kidney, Liver" />
        <Btn onClick={submit} color={t.purple} t={t} icon="check">Register</Btn>
      </Modal>
    </div>
  );
}

/* ── LOGIN ── */
export function Login({ onLogin, theme, setTheme, t }) {
  const [role, setRole] = useState("Admin");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const tryLogin = () => {
    setErr("");
    if (role === "Admin") {
      if (user === "admin" && pass === "admin123") { onLogin("Admin", -1, -1, -1); }
      else setErr("Admin credentials: admin / admin123");
    } else if (role === "Staff") {
      const found = SEED.staff.find(s => String(s.id) === user && s.pass === pass);
      if (found) onLogin("Staff", -1, found.id, -1);
      else setErr("Try ID: 2001, pass: staff123");
    } else if (role === "Doctor") {
      const found = SEED.doctors.find(d => String(d.id) === user && d.pass === pass);
      if (found) onLogin("Doctor", -1, -1, found.id);
      else setErr("Try ID: 301, pass: doc301");
    } else {
      const found = SEED.patients.find(p => String(p.id) === user);
      if (found) onLogin("Patient", found.id, -1, -1);
      else setErr("Try ID: 1001");
    }
  };

  const roles = [{ r: "Admin", icon: "shield", color: t.accent }, { r: "Doctor", icon: "stethoscope", color: t.green }, { r: "Staff", icon: "users", color: t.orange }, { r: "Patient", icon: "user", color: t.purple }];

  return (
    <div style={{ minHeight: "100dvh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ color: t.text, fontWeight: 900, fontSize: 28 }}>JSR HOSPITAL</h1>
        </div>
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: 28 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {roles.map(({ r, icon, color }) => (
              <button key={r} onClick={() => setRole(r)}
                style={{ flex: 1, padding: "10px 8px", background: role === r ? color + "18" : t.input, color: role === r ? color : t.textMuted, border: `1.5px solid ${role === r ? color : t.inputBorder}`, borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                {r}
              </button>
            ))}
          </div>
          <Field label="Username / ID" value={user} onChange={setUser} t={t} />
          <Field label="Password" type="password" value={pass} onChange={setPass} t={t} />
          {err && <div style={{ color: t.red, fontSize: 12, marginBottom: 12 }}>{err}</div>}
          <Btn onClick={tryLogin} t={t} style={{ width: "100%" }}>Sign In</Btn>
        </div>
      </div>
    </div>
  );
}
