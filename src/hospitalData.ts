/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useReducer, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   THEME ENGINE
═══════════════════════════════════════════════════════════════ */
export const T = {
  dark: {
    bg: "#080d18",
    surface: "#0e1626",
    card: "#131f33",
    cardHover: "#172540",
    border: "#1d2e48",
    borderLight: "#243659",
    accent: "#3b9eff",
    accentDark: "#1a7de0",
    green: "#22d3a0",
    red: "#f4476b",
    amber: "#f59e0b",
    purple: "#a78bfa",
    orange: "#fb923c",
    text: "#e2eaf8",
    textSub: "#8aa4c8",
    textMuted: "#4d6a8a",
    sidebar: "#0a1120",
    sidebarBorder: "#162035",
    input: "#0c1828",
    inputBorder: "#1d2e48",
    tabActive: "#3b9eff",
    shadow: "0 8px 32px #00000088",
    glow: "0 0 24px #3b9eff2a",
    overlay: "#000000cc",
    scrollbar: "#1d2e48",
    badge: {
      blue: ["#3b9eff22", "#3b9eff"],
      green: ["#22d3a022", "#22d3a0"],
      red: ["#f4476b22", "#f4476b"],
      amber: ["#f59e0b22", "#f59e0b"],
      purple: ["#a78bfa22", "#a78bfa"],
      orange: ["#fb923c22", "#fb923c"],
    },
  },
  light: {
    bg: "#eef2fb",
    surface: "#ffffff",
    card: "#ffffff",
    cardHover: "#f5f8ff",
    border: "#dde5f5",
    borderLight: "#e8eef9",
    accent: "#2563eb",
    accentDark: "#1d4ed8",
    green: "#059669",
    red: "#dc2626",
    amber: "#d97706",
    purple: "#7c3aed",
    orange: "#ea580c",
    text: "#0f1c32",
    textSub: "#3d5a80",
    textMuted: "#7b93b8",
    sidebar: "#ffffff",
    sidebarBorder: "#dde5f5",
    input: "#f5f8ff",
    inputBorder: "#dde5f5",
    tabActive: "#2563eb",
    shadow: "0 4px 24px #0000000e",
    glow: "0 0 20px #2563eb1a",
    overlay: "#0000007a",
    scrollbar: "#dde5f5",
    badge: {
      blue: ["#dbeafe", "#2563eb"],
      green: ["#d1fae5", "#059669"],
      red: ["#fee2e2", "#dc2626"],
      amber: ["#fef3c7", "#d97706"],
      purple: ["#ede9fe", "#7c3aed"],
      orange: ["#ffedd5", "#ea580c"],
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   SEED DATA
═══════════════════════════════════════════════════════════════ */
export const SEED = {
  doctors: [
    { id: 301, name: "Dr. Aisha Patel",   spec: "Cardiology",       phone: "9000000001", schedule: "Mon-Fri 09-17", available: true, pass: "doc301" },
    { id: 302, name: "Dr. Rajan Mehta",   spec: "Neurology",        phone: "9000000002", schedule: "Mon-Sat 08-14", available: true, pass: "doc302" },
    { id: 303, name: "Dr. Sara Ali",      spec: "Orthopedics",      phone: "9000000003", schedule: "Tue-Sat 10-18", available: true, pass: "doc303" },
    { id: 304, name: "Dr. Kevin Thomas",  spec: "General Medicine",  phone: "9000000004", schedule: "Mon-Fri 07-15", available: true, pass: "doc304" },
    { id: 305, name: "Dr. Priya Sharma",  spec: "Pediatrics",       phone: "9000000005", schedule: "Mon-Thu 09-16", available: true, pass: "doc305" },
  ],
  patients: [
    { id: 1001, name: "Ramesh Kumar", gender: "Male",   phone: "9100000001", address: "Chennai",     blood: "A+", reg: "2025-01-10", age: 45 },
    { id: 1002, name: "Lakshmi Devi", gender: "Female", phone: "9100000002", address: "Madurai",     blood: "B+", reg: "2025-01-15", age: 32 },
    { id: 1003, name: "Arjun Nair",   gender: "Male",   phone: "9100000003", address: "Coimbatore",  blood: "O-", reg: "2025-02-01", age: 28 },
  ],
  staff: [
    { id: 2001, name: "Nurse Kavitha",    role: "Nurse",       dept: "ICU",       phone: "9200000001", shift: "Morning", pass: "staff123" },
    { id: 2002, name: "Raj Technician",   role: "Lab Tech",    dept: "Pathology", phone: "9200000002", shift: "Evening", pass: "staff456" },
    { id: 2003, name: "Meena Sharma",     role: "Pharmacist",  dept: "Pharmacy",  phone: "9200000003", shift: "Morning", pass: "staff789" },
  ],
  ambulances: [
    { id: 7001, vehicleNo: "TN01 AMB 001", driver: "Murugan",     dPhone: "9300000001", location: "Anna Nagar, Chennai", status: "Available" },
    { id: 7002, vehicleNo: "TN01 AMB 002", driver: "Suresh",      dPhone: "9300000002", location: "T. Nagar, Chennai",   status: "Available" },
    { id: 7003, vehicleNo: "TN01 AMB 003", driver: "Balachander", dPhone: "9300000003", location: "Adyar, Chennai",      status: "On-Duty"   },
  ],
  ambBookings: [
    { id: 7101, ambulanceId: 7003, requestedBy: "PATIENT-1001", pickup: "ECR, Chennai", dest: "JSR Hospital", time: "2026-02-19 09:32", status: "Confirmed" },
  ],
  foodMenu: [
    { id: 1, name: "Idli Sambar",  cat: "Breakfast", price: 40 },
    { id: 2, name: "Veg Thali",    cat: "Lunch",     price: 80 },
    { id: 3, name: "Chapathi",     cat: "Dinner",    price: 60 },
    { id: 4, name: "Fruit Bowl",   cat: "Snack",     price: 50 },
    { id: 5, name: "Rice & Dal",   cat: "Lunch",     price: 70 },
    { id: 6, name: "Upma",         cat: "Breakfast", price: 35 },
  ],
  foodOrders: [],
  medicines: [
    { id: 1, name: "Paracetamol 500mg",  cat: "Analgesic",   price: 5,  stock: 200 },
    { id: 2, name: "Amoxicillin 250mg",  cat: "Antibiotic",  price: 12, stock: 150 },
    { id: 3, name: "Amlodipine 5mg",     cat: "Cardiac",     price: 18, stock: 100 },
    { id: 4, name: "ORS Sachet",         cat: "Electrolyte", price: 8,  stock: 300 },
    { id: 5, name: "Cetirizine 10mg",    cat: "Antiallergic",price: 6,  stock: 180 },
  ],
  medicineOrders: [],
  appointments: [
    { id: 4001, patientId: 1001, doctorId: 301, date: "2026-02-20", time: "10:00", reason: "Chest pain checkup", status: "Confirmed", priority: "Urgent" },
    { id: 4002, patientId: 1002, doctorId: 305, date: "2026-02-21", time: "11:00", reason: "Child vaccination",  status: "Pending", priority: "Normal" },
  ],
  records: [
    { id: 5001, patientId: 1001, doctorId: 301, date: "2026-01-15", diagnosis: "Hypertension Stage 1", prescription: "Amlodipine 5mg once daily", notes: "Reduce salt, exercise daily" },
  ],
  bills: [
    { id: 6001, patientId: 1001, date: "2026-01-15", status: "Paid", consult: 500, medicine: 300, test: 200, room: 0, total: 1000 },
  ],
  bloodDonors: [
    { id: 10001, name: "Senthil Kumar", blood: "A+", phone: "9400000001", address: "Tambaram",  lastDonation: "2025-11-10", available: true,  regBy: "ADMIN" },
    { id: 10002, name: "Preethi Raj",   blood: "O+", phone: "9400000002", address: "Porur",     lastDonation: "2025-09-20", available: true,  regBy: "ADMIN" },
  ],
  organDonors: [
    { id: 11001, name: "Vijay Anand", phone: "9500000001", blood: "B+", organs: "Kidney,Cornea", regDate: "2026-01-05", regBy: "ADMIN", consent: true },
  ],
};

export function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
export const now = () => new Date().toISOString().slice(0, 16).replace("T", " ");
export const today = () => new Date().toISOString().slice(0, 10);

/* ═══════════════════════════════════════════════════════════════
   STATE REDUCER
═══════════════════════════════════════════════════════════════ */
export const initialState = {
  ...deepClone(SEED),
  nextPatientId: 1004,
  nextStaffId: 2004,
  nextDoctorId: 306,
  nextApptId: 4003,
  nextRecordId: 5002,
  nextBillId: 6002,
  nextAmbId: 7004,
  nextAmbBookId: 7102,
  nextFoodOrderId: 8001,
  nextMedOrderId: 9001,
  nextBloodId: 10003,
  nextOrganId: 11002,
};

export function reducer(state, action) {
  const s = { ...state };
  switch (action.type) {
    case "ADD_PATIENT":
      return { ...s, patients: [...s.patients, { ...action.p, id: s.nextPatientId, reg: today() }], nextPatientId: s.nextPatientId + 1 };
    case "DEL_PATIENT":
      return { ...s, patients: s.patients.filter(p => p.id !== action.id) };
    case "ADD_STAFF":
      return { ...s, staff: [...s.staff, { ...action.p, id: s.nextStaffId }], nextStaffId: s.nextStaffId + 1 };
    case "DEL_STAFF":
      return { ...s, staff: s.staff.filter(s2 => s2.id !== action.id) };
    case "ADD_DOCTOR":
      return { ...s, doctors: [...s.doctors, { ...action.p, id: s.nextDoctorId, available: true, pass: `doc${s.nextDoctorId}` }], nextDoctorId: s.nextDoctorId + 1 };
    case "TOGGLE_DOCTOR":
      return { ...s, doctors: s.doctors.map(d => d.id === action.id ? { ...d, available: !d.available } : d) };
    case "ADD_APPT":
      return { ...s, appointments: [...s.appointments, { ...action.p, id: s.nextApptId, status: "Pending" }], nextApptId: s.nextApptId + 1 };
    case "UPD_APPT":
      return { ...s, appointments: s.appointments.map(a => a.id === action.id ? { ...a, status: action.status } : a) };
    case "DEL_APPT":
      return { ...s, appointments: s.appointments.filter(a => a.id !== action.id) };
    case "ADD_RECORD":
      return { ...s, records: [...s.records, { ...action.p, id: s.nextRecordId, date: today() }], nextRecordId: s.nextRecordId + 1 };
    case "DEL_RECORD":
      return { ...s, records: s.records.filter(r => r.id !== action.id) };
    case "ADD_BILL":
      return { ...s, bills: [...s.bills, { ...action.p, id: s.nextBillId, date: today(), status: "Unpaid" }], nextBillId: s.nextBillId + 1 };
    case "PAY_BILL":
      return { ...s, bills: s.bills.map(b => b.id === action.id ? { ...b, status: "Paid" } : b) };
    case "ADD_AMB":
      return { ...s, ambulances: [...s.ambulances, { ...action.p, id: s.nextAmbId, status: "Available" }], nextAmbId: s.nextAmbId + 1 };
    case "UPD_AMB":
      return { ...s, ambulances: s.ambulances.map(a => a.id === action.id ? { ...a, ...action.upd } : a) };
    case "BOOK_AMB": {
      const amb = s.ambulances.find(a => a.id === action.p.ambulanceId);
      if (!amb || amb.status !== "Available") return s;
      return {
        ...s,
        ambBookings: [...s.ambBookings, { ...action.p, id: s.nextAmbBookId, time: now(), status: "Confirmed" }],
        nextAmbBookId: s.nextAmbBookId + 1,
        ambulances: s.ambulances.map(a => a.id === action.p.ambulanceId ? { ...a, status: "On-Duty" } : a),
      };
    }
    case "ORDER_FOOD":
      return { ...s, foodOrders: [...s.foodOrders, { ...action.p, id: s.nextFoodOrderId, date: now(), status: "Pending" }], nextFoodOrderId: s.nextFoodOrderId + 1 };
    case "DELIVER_FOOD":
      return { ...s, foodOrders: s.foodOrders.map(o => o.id === action.id ? { ...o, status: "Delivered" } : o) };
    case "ADD_FOOD_ITEM":
      return { ...s, foodMenu: [...s.foodMenu, action.p] };
    case "ORDER_MED": {
      const med = s.medicines.find(m => m.id === action.p.medicineId);
      if (!med || med.stock < action.p.qty) return s;
      return {
        ...s,
        medicineOrders: [...s.medicineOrders, { ...action.p, id: s.nextMedOrderId, date: now(), status: "Pending" }],
        nextMedOrderId: s.nextMedOrderId + 1,
        medicines: s.medicines.map(m => m.id === action.p.medicineId ? { ...m, stock: m.stock - action.p.qty } : m),
      };
    }
    case "DISPENSE_MED":
      return { ...s, medicineOrders: s.medicineOrders.map(o => o.id === action.id ? { ...o, status: "Dispensed" } : o) };
    case "ADD_MEDICINE":
      return { ...s, medicines: [...s.medicines, action.p] };
    case "ADD_BLOOD_DONOR":
      return { ...s, bloodDonors: [...s.bloodDonors, { ...action.p, id: s.nextBloodId, available: true }], nextBloodId: s.nextBloodId + 1 };
    case "TOGGLE_BLOOD":
      return { ...s, bloodDonors: s.bloodDonors.map(d => d.id === action.id ? { ...d, available: !d.available } : d) };
    case "ADD_ORGAN_DONOR":
      return { ...s, organDonors: [...s.organDonors, { ...action.p, id: s.nextOrganId, regDate: today(), consent: true }], nextOrganId: s.nextOrganId + 1 };
    case "DEL_ORGAN_DONOR":
      return { ...s, organDonors: s.organDonors.filter(d => d.id !== action.id) };
    default: return s;
  }
}
