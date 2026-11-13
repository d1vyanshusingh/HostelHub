import React, { useState, useMemo } from 'react';
import {
  Home, BedSingle, Wrench, Utensils, User, Search, Bell, Phone,
  CheckCircle, Clock, AlertCircle, ChevronRight, LogOut, Check,
  Shield, Users, DollarSign, Building, Calendar, FileText, Filter,
  Plus, X, Eye, EyeOff, RefreshCw, AlertTriangle, ArrowUpRight,
  TrendingUp, Download, Send, UserCheck, ShieldAlert, Sparkles,
  ClipboardList, ChevronDown, CheckSquare, Layers, Lock, Award
} from 'lucide-react';

// ==========================================
// MOCK DATA & REST API SIMULATION ENTITIES
// ==========================================

const MOCK_USERS = {
  student: {
    id: "usr-stu-01",
    role: "student",
    name: "Alex Doe",
    email: "alex.doe@hostelhub.edu",
    regNo: "RA211100301089",
    degree: "B.Tech Computer Science & Eng.",
    year: "Year 3 (Sem 6)",
    block: "Nelson Mandela Block (Block A)",
    room: "A-204",
    bed: "Bed A",
    category: "3-Sharing AC with Attached Washroom",
    mess: "North Dining Hall (Mess II)",
    phone: "+91 98765 43210",
    parentName: "Robert Doe",
    parentPhone: "+91 98765 01234",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    emergencyContact: "044-27453159"
  },
  warden: {
    id: "usr-war-01",
    role: "warden",
    name: "Dr. R. Ramanathan",
    email: "warden.blocka@hostelhub.edu",
    regNo: "STAFF-WAR-402",
    degree: "Chief Hostel Warden - Boys Wing",
    year: "Staff",
    block: "Nelson Mandela & Tagore Blocks",
    room: "Warden Office #101",
    bed: "N/A",
    category: "Administrative Staff",
    mess: "Staff & Faculty Dining",
    phone: "+91 98401 23456",
    parentName: "N/A",
    parentPhone: "N/A",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    emergencyContact: "044-27453150"
  },
  admin: {
    id: "usr-adm-01",
    role: "admin",
    name: "Dr. Sunita Sharma",
    email: "admin@hostelhub.edu",
    regNo: "ADM-DIR-001",
    degree: "Director of Student Housing & Estate",
    year: "Super Admin",
    block: "Central Administration Tower",
    room: "Executive Suite 4",
    bed: "N/A",
    category: "System Administrator",
    mess: "Executive Lounge",
    phone: "+91 94440 98765",
    parentName: "N/A",
    parentPhone: "N/A",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    emergencyContact: "044-27453000"
  }
};

const INITIAL_ROOMMATES = [
  { name: "Alex Doe", bed: "Bed A", regNo: "RA211100301089", branch: "B.Tech CSE", status: "Occupied (You)" },
  { name: "Rohan Verma", bed: "Bed B", regNo: "RA211100301092", branch: "B.Tech IT", status: "Occupied" },
  { name: "Siddharth Rao", bed: "Bed C", regNo: "RA211100301115", branch: "B.Tech AI & DS", status: "Occupied" }
];

const INITIAL_INVENTORY = [
  { item: "Single Teak Bed & Orthopedic Mattress", qty: 1, condition: "Excellent", verified: true },
  { item: "Modular Study Table & Ergonomic Mesh Chair", qty: 1, condition: "Good", verified: true },
  { item: "Steel Wardrobe with Digital Locker", qty: 1, condition: "Verified", verified: true },
  { item: "1.5 Ton Inverter AC Unit & Remote", qty: 1, condition: "Fully Functional", verified: true },
  { item: "High-Speed Gigabit LAN Port & Wi-Fi 6 AP", qty: 1, condition: "Active (1 Gbps)", verified: true },
  { item: "Attached Bathroom with 25L Instant Geyser", qty: 1, condition: "Inspected & Clean", verified: true }
];

const INITIAL_COMPLAINTS = [
  {
    id: "CMP-1082",
    studentName: "Alex Doe",
    regNo: "RA211100301089",
    room: "A-204",
    block: "Nelson Mandela",
    category: "Mess / Food Quality",
    priority: "Medium",
    description: "Dinner chapati was undercooked and soup was cold on Wednesday evening.",
    preferredTime: "Evening (5 PM - 7 PM)",
    date: "18 Aug 2026",
    status: "Pending",
    assignedTo: "Mess Supervisor Nair",
    notes: "Report forwarded to catering contractor for inspection."
  },
  {
    id: "CMP-1077",
    studentName: "Rohan Verma",
    regNo: "RA211100301092",
    room: "A-204",
    block: "Nelson Mandela",
    category: "Electrical",
    priority: "High",
    description: "Study lamp socket switch sparking occasionally when laptop charger is plugged in.",
    preferredTime: "Morning (9 AM - 11 AM)",
    date: "14 Aug 2026",
    status: "In Progress",
    assignedTo: "Electrician Murugan",
    notes: "Replacement socket ordered from central electrical store."
  },
  {
    id: "CMP-0941",
    studentName: "Alex Doe",
    regNo: "RA211100301089",
    room: "A-204",
    block: "Nelson Mandela",
    category: "Plumbing",
    priority: "Low",
    description: "Washroom sink drain draining slightly slower than usual.",
    preferredTime: "Afternoon (2 PM - 4 PM)",
    date: "02 Aug 2026",
    status: "Resolved",
    assignedTo: "Plumber Selvam",
    notes: "Trap cleaned and cleared. Tested water flow satisfactorily."
  },
  {
    id: "CMP-0899",
    studentName: "Karan Patel",
    regNo: "RA211100301054",
    room: "B-312",
    block: "Tagore Block",
    category: "Housekeeping",
    priority: "Low",
    description: "Corridor trash bin not emptied during weekend routine check.",
    preferredTime: "Anytime",
    date: "28 Jul 2026",
    status: "Resolved",
    assignedTo: "Housekeeping Lead Mary",
    notes: "Sanitized and replaced liner."
  }
];

const MESS_SCHEDULE = [
  {
    day: "Monday",
    type: "South & Continental",
    breakfast: "Steamed Idli, Medu Vada, Madras Sambar, Coconut & Tomato Chutney, Tea/Coffee",
    lunch: "Punjabi Rajma Masala, Steamed Basmati Rice, Phulka Roti, Jeera Aloo, Boondi Raita",
    snacks: "Crispy Veg Cutlet with Mint Dip, Masala Chai",
    dinner: "Paneer Butter Masala, Butter Naan, Yellow Dal Tadka, Jeera Rice, Gulab Jamun"
  },
  {
    day: "Tuesday",
    type: "North Indian Special",
    breakfast: "Stuffed Aloo Paratha, Fresh Curd, Mixed Pickle, Boiled Egg / Sprouts, Milk",
    lunch: "South Indian Traditional Thali, Rasam, Drumstick Sambar, Cabbage Poriyal, Rice, Papad",
    snacks: "Samosa with Sweet Tamarind Chutney, Hot Filter Coffee",
    dinner: "Veg Hyderabadi Biryani / Egg Biryani, Mirchi Ka Salan, Onion Raita, Vanilla Ice Cream"
  },
  {
    day: "Wednesday",
    type: "Fusion Feast",
    breakfast: "Ven Pongal, Ghee Podi, Vada, Chutney, Banana, Bournvita/Tea",
    lunch: "Kadhai Paneer, Kashmiri Pulao, Tandoori Roti, Dal Fry, Fresh Garden Green Salad",
    snacks: "Corn & Cheese Grilled Sandwich, Lemon Iced Tea",
    dinner: "Butter Chicken Curry / Malai Kofta (Veg), Garlic Naan, Steamed Rice, Moong Dal Halwa"
  },
  {
    day: "Thursday",
    type: "Homestyle Healthy",
    breakfast: "Poha with Roasted Peanuts & Sev, Upma, Coconut Chutney, Fruits, Coffee",
    lunch: "Creamy Dal Makhani, Dum Aloo, Butter Phulka, Jeera Rice, Cucumber Raita",
    snacks: "Onion Pakoda with Green Chutney, Masala Chai",
    dinner: "Crispy Paper Masala Dosa, Sambar, Assorted Chutneys, Steamed Rice, Curd Rice"
  },
  {
    day: "Friday",
    type: "Asian & Oriental",
    breakfast: "Mysore Masala Dosa, Sambar, White Coconut Chutney, Boiled Eggs, Tea",
    lunch: "Indo-Chinese Veg Fried Rice, Crispy Veg Manchurian Gravy, Hakka Noodles, Kimchi Salad",
    snacks: "White Sauce Pasta with Garlic Bread, Hot Coffee",
    dinner: "Tawa Chapati, Shahi Paneer, Dal Maharani, Peas Pulao, Fruit Custard with Jelly"
  },
  {
    day: "Saturday",
    type: "Weekend Delights",
    breakfast: "Uttapam with Onion & Tomato toppings, Sambar, Sambar Vada, Tea/Coffee",
    lunch: "Amritsari Chole Bhature, Pickled Onions, Mint Chutney, Pulao, Sweet Lassi",
    snacks: "Bhel Puri with Sev & Tangy Chutneys, Masala Chai",
    dinner: "Mixed Vegetable Kurma, Malabar Parotta, Dal Fry, Jeera Rice, Semiya Payasam"
  },
  {
    day: "Sunday",
    type: "Grand Sunday Feast",
    breakfast: "Toasted Bread with Butter & Jam, Cheese Omelette / Veg Sandwich, Fresh Juice",
    lunch: "Special Chettinad Chicken Biryani / Special Royal Paneer Biryani, Raita, Brinjal Curry, Rasam",
    snacks: "Biscuits, Masala Cookies, Hot Tea/Filter Coffee",
    dinner: "Amritsari Kulcha, Paneer Tikka Masala, Dal Tadka, Steamed Rice, Kheer with Dry Fruits"
  }
];

const INITIAL_VISITORS = [
  {
    id: "VIS-9201",
    visitorName: "Robert Doe",
    phone: "+91 98765 01234",
    studentName: "Alex Doe",
    room: "A-204",
    relation: "Father",
    idType: "Aadhaar Card",
    checkIn: "09 Nov 2026, 10:15 AM",
    checkOut: "09 Nov 2026, 01:30 PM",
    purpose: "Semester fee deposit & medical checkup kit handover",
    status: "Checked Out"
  },
  {
    id: "VIS-9202",
    visitorName: "Sunil Verma",
    phone: "+91 98400 11223",
    studentName: "Rohan Verma",
    room: "A-204",
    relation: "Guardian",
    idType: "Driving License",
    checkIn: "09 Nov 2026, 02:20 PM",
    checkOut: "--",
    purpose: "Weekend home pickup pass signoff",
    status: "Checked In"
  },
  {
    id: "VIS-9203",
    visitorName: "Meera Krishnan",
    phone: "+91 97910 88776",
    studentName: "Harish Krishnan",
    room: "B-108",
    relation: "Mother",
    idType: "Passport",
    checkIn: "09 Nov 2026, 03:05 PM",
    checkOut: "--",
    purpose: "Hostel visit and festival clothing delivery",
    status: "Checked In"
  },
  {
    id: "VIS-9195",
    visitorName: "Anil Kapoor",
    phone: "+91 99887 66554",
    studentName: "Dev Kapoor",
    room: "C-405",
    relation: "Brother",
    idType: "Aadhaar Card",
    checkIn: "08 Nov 2026, 04:00 PM",
    checkOut: "08 Nov 2026, 07:15 PM",
    purpose: "Delivering engineering drawing supplies",
    status: "Checked Out"
  }
];

const INITIAL_FEES = [
  {
    id: "FEE-2026-001",
    studentName: "Alex Doe",
    regNo: "RA211100301089",
    block: "Nelson Mandela",
    room: "A-204",
    category: "3-Sharing AC Deluxe",
    totalAmount: 165000,
    paidAmount: 165000,
    dueAmount: 0,
    status: "Paid",
    dueDate: "15 Jul 2026",
    receiptNo: "REC-SRM-88921"
  },
  {
    id: "FEE-2026-002",
    studentName: "Rohan Verma",
    regNo: "RA211100301092",
    block: "Nelson Mandela",
    room: "A-204",
    category: "3-Sharing AC Deluxe",
    totalAmount: 165000,
    paidAmount: 165000,
    dueAmount: 0,
    status: "Paid",
    dueDate: "15 Jul 2026",
    receiptNo: "REC-SRM-88922"
  },
  {
    id: "FEE-2026-003",
    studentName: "Karan Patel",
    regNo: "RA211100301054",
    block: "Tagore Block",
    room: "B-312",
    category: "2-Sharing Non-AC",
    totalAmount: 110000,
    paidAmount: 60000,
    dueAmount: 50000,
    status: "Partial",
    dueDate: "30 Nov 2026",
    receiptNo: "REC-SRM-88950"
  },
  {
    id: "FEE-2026-004",
    studentName: "Vikram Sethi",
    regNo: "RA211100301140",
    block: "Tagore Block",
    room: "B-105",
    category: "4-Sharing Non-AC",
    totalAmount: 95000,
    paidAmount: 0,
    dueAmount: 95000,
    status: "Pending",
    dueDate: "20 Nov 2026",
    receiptNo: "N/A"
  },
  {
    id: "FEE-2026-005",
    studentName: "Deepak Sharma",
    regNo: "RA211100301201",
    block: "Kalam Block",
    room: "C-210",
    category: "Single AC Studio",
    totalAmount: 220000,
    paidAmount: 220000,
    dueAmount: 0,
    status: "Paid",
    dueDate: "15 Jul 2026",
    receiptNo: "REC-SRM-89104"
  }
];

// ==========================================
// MAIN HOSTELHUB COMPONENT
// ==========================================

export default function HostelHubApp() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentRole, setCurrentRole] = useState('student'); // 'student' | 'warden' | 'admin'
  const [loginRoleSelected, setLoginRoleSelected] = useState('student');
  const [loginEmail, setLoginEmail] = useState('alex.doe@hostelhub.edu');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Application Data State (Simulating Database / REST API Backend)
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [visitors, setVisitors] = useState(INITIAL_VISITORS);
  const [fees, setFees] = useState(INITIAL_FEES);

  // Filters & UI Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [complaintFilter, setComplaintFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [toastMsg, setToastMsg] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Modals
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [activeResolvingTicket, setActiveResolvingTicket] = useState(null);
  const [resolutionRemarks, setResolutionRemarks] = useState('');
  const [assigneeStaff, setAssigneeStaff] = useState('Electrician Murugan');

  // Student New Visitor Form State
  const [newVisitor, setNewVisitor] = useState({
    visitorName: '',
    phone: '',
    studentName: 'Alex Doe',
    room: 'A-204',
    relation: 'Parent',
    idType: 'Aadhaar Card',
    purpose: ''
  });

  const currentUser = MOCK_USERS[currentRole];

  // Helper for Toast Notifications
  const triggerToast = (message, type = 'success') => {
    setToastMsg({ text: message, type });
    setTimeout(() => setToastMsg(null), 3800);
  };

  // Switch Role Utility
  const handleRoleSwitch = (newRole) => {
    setCurrentRole(newRole);
    setActiveTab('dashboard');
    setUserDropdownOpen(false);
    triggerToast(`Switched active view to ${newRole.toUpperCase()} mode.`);
  };

  // Login Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      triggerToast('Please provide both email and password.', 'error');
      return;
    }
    setCurrentRole(loginRoleSelected);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    triggerToast(`Welcome back, ${MOCK_USERS[loginRoleSelected].name}! Logged in as ${loginRoleSelected.toUpperCase()}.`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDropdownOpen(false);
    triggerToast('You have been logged out successfully.');
  };

  // Complaint Submission by Student
  const handleStudentComplaintSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category');
    const priority = formData.get('priority');
    const description = formData.get('description');
    const preferredTime = formData.get('preferredTime') || 'Anytime';

    if (!category || !description) {
      triggerToast('Please complete all required fields.', 'error');
      return;
    }

    const newTicket = {
      id: `CMP-${Math.floor(2000 + Math.random() * 8000)}`,
      studentName: currentUser.name,
      regNo: currentUser.regNo,
      room: currentUser.room,
      block: currentUser.block,
      category,
      priority,
      description,
      preferredTime,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending',
      assignedTo: 'Unassigned',
      notes: 'New ticket logged by resident student.'
    };

    setComplaints([newTicket, ...complaints]);
    e.target.reset();
    triggerToast(`Complaint ticket #${newTicket.id} registered successfully!`);
  };

  // Warden Complaint Action (Resolve or Assign)
  const openResolveModal = (ticket) => {
    setActiveResolvingTicket(ticket);
    setResolutionRemarks(ticket.notes || '');
    setIsResolveModalOpen(true);
  };

  const handleConfirmResolve = (newStatus) => {
    if (!activeResolvingTicket) return;

    setComplaints(complaints.map(t => {
      if (t.id === activeResolvingTicket.id) {
        return {
          ...t,
          status: newStatus,
          assignedTo: assigneeStaff,
          notes: resolutionRemarks || `Status marked as ${newStatus} by Warden ${currentUser.name}.`
        };
      }
      return t;
    }));

    setIsResolveModalOpen(false);
    setActiveResolvingTicket(null);
    triggerToast(`Ticket #${activeResolvingTicket.id} marked as ${newStatus.toUpperCase()}.`);
  };

  // Admin New Visitor Logging
  const handleCreateVisitorLog = (e) => {
    e.preventDefault();
    if (!newVisitor.visitorName || !newVisitor.phone || !newVisitor.purpose) {
      triggerToast('Please fill in visitor name, phone and purpose.', 'error');
      return;
    }

    const createdVisitor = {
      id: `VIS-${Math.floor(9300 + Math.random() * 600)}`,
      ...newVisitor,
      checkIn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      checkOut: '--',
      status: 'Checked In'
    };

    setVisitors([createdVisitor, ...visitors]);
    setIsVisitorModalOpen(false);
    setNewVisitor({
      visitorName: '',
      phone: '',
      studentName: 'Alex Doe',
      room: 'A-204',
      relation: 'Parent',
      idType: 'Aadhaar Card',
      purpose: ''
    });
    triggerToast(`Gate Pass generated for ${createdVisitor.visitorName} (${createdVisitor.id}).`);
  };

  // Admin Visitor Checkout Action
  const handleCheckOutVisitor = (visitorId) => {
    setVisitors(visitors.map(v => {
      if (v.id === visitorId) {
        return {
          ...v,
          status: 'Checked Out',
          checkOut: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
            `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        };
      }
      return v;
    }));
    triggerToast(`Visitor #${visitorId} checked out from main gate.`);
  };

  // UI Status Badges
  const StatusBadge = ({ status }) => {
    let classes = "bg-slate-100 text-slate-700 border-slate-200";
    if (status === 'Resolved' || status === 'Paid' || status === 'Checked Out') {
      classes = "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (status === 'Pending' || status === 'Partial') {
      classes = "bg-amber-50 text-amber-700 border-amber-200";
    } else if (status === 'In Progress' || status === 'Checked In') {
      classes = "bg-indigo-50 text-indigo-700 border-indigo-200";
    } else if (status === 'High' || status === 'Urgent' || status === 'Overdue') {
      classes = "bg-rose-50 text-rose-700 border-rose-200";
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>
        {status}
      </span>
    );
  };

  // Dynamic Navigation Items based on active role
  const navigationItems = useMemo(() => {
    if (currentRole === 'student') {
      return [
        { id: 'dashboard', label: 'Student Dashboard', icon: Home },
        { id: 'room', label: 'Room & Inventory', icon: BedSingle },
        { id: 'complaints', label: 'Complaints Portal', icon: Wrench },
        { id: 'mess', label: 'Mess Schedule', icon: Utensils },
        { id: 'fees', label: 'Fee Records', icon: DollarSign },
        { id: 'profile', label: 'Student Profile', icon: User },
      ];
    } else if (currentRole === 'warden') {
      return [
        { id: 'dashboard', label: 'Warden Overview', icon: Home },
        { id: 'complaints', label: 'Resolve Complaints', icon: CheckSquare },
        { id: 'room', label: 'Room Status & Wing', icon: Building },
        { id: 'mess', label: 'Mess Inspections', icon: Utensils },
        { id: 'profile', label: 'My Profile', icon: User },
      ];
    } else {
      // Admin
      return [
        { id: 'dashboard', label: 'Hostel Analytics', icon: Layers },
        { id: 'visitors', label: 'Visitor Logs', icon: Users },
        { id: 'fees', label: 'Hostel Fee Records', icon: DollarSign },
        { id: 'complaints', label: 'Complaint Audits', icon: Wrench },
        { id: 'profile', label: 'Admin Settings', icon: Shield },
      ];
    }
  }, [currentRole]);

  // ==========================================
  // VIEW: AUTHENTICATION SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-100">

          {/* Left Hero Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white text-indigo-700 flex items-center justify-center font-black text-xl shadow-md">
                  H
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white leading-tight">HostelHub</h2>
                  <p className="text-xs text-indigo-200">Smart Campus Living Platform</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold leading-tight">
                  Intelligent hostel living, simplified.
                </h3>
                <p className="text-indigo-100/90 text-sm leading-relaxed">
                  Seamless room allocations, instant maintenance resolution, transparent dining menus, and robust gate security.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-indigo-500/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-400/20 border border-emerald-300 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">SRM IST Official Partner</p>
                  <p className="text-indigo-200">Kattankulathur Campus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Security Gateway
              </span>
              <h1 className="text-2xl font-extrabold text-slate-800 mt-2">Sign in to your account</h1>
              <p className="text-sm text-slate-500 mt-1">Select your designated campus role to continue.</p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Campus Role
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl">
                {[
                  { role: 'student', label: 'Student', icon: Award },
                  { role: 'warden', label: 'Warden', icon: Shield },
                  { role: 'admin', label: 'Admin', icon: Building }
                ].map(({ role, label, icon: Icon }) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setLoginRoleSelected(role);
                      setLoginEmail(MOCK_USERS[role].email);
                    }}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${loginRoleSelected === role
                      ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Demo Fill Pill */}
            <div className="mb-5 p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
              <div className="text-xs text-indigo-900">
                <span className="font-semibold">Demo Identity:</span> {MOCK_USERS[loginRoleSelected].name} ({loginRoleSelected.toUpperCase()})
              </div>
              <button
                type="button"
                onClick={() => setLoginEmail(MOCK_USERS[loginRoleSelected].email)}
                className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
              >
                Auto-fill
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institutional Email / ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. resident@hostelhub.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 transition-all text-slate-800"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); triggerToast('Password reset link sent to registered email.'); }} className="text-xs text-indigo-600 hover:underline font-medium">
                    Forgot key?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 transition-all text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span>Remember session</span>
                </label>
                <span className="text-slate-400">Spring Boot REST Ready</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Authorize & Enter as {loginRoleSelected.toUpperCase()}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                HostelHub v2.4 (Enterprise Edition) • Secured with 256-bit SSL
              </p>
            </div>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold">{toastMsg.text}</span>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // SHARED UI SUB-COMPONENTS
  // ==========================================

  const StatCard = ({ title, value, subtitle, icon: Icon, badge, color = 'indigo' }) => {
    const colorMap = {
      indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      amber: 'text-amber-600 bg-amber-50 border-amber-100',
      blue: 'text-blue-600 bg-blue-50 border-blue-100',
      purple: 'text-purple-600 bg-purple-50 border-purple-100'
    };

    return (
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1.5 tracking-tight">{value}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.indigo}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        {badge && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs font-medium text-slate-600">
            {badge}
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // MODULE: STUDENT VIEWS
  // ==========================================

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur-sm border border-indigo-400/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Resident Student Portal • Active Semester
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-indigo-200 text-sm max-w-xl">
              Hostel Block: <span className="text-white font-semibold">{currentUser.block}</span> | Allocated: <span className="text-white font-semibold">Room {currentUser.room} ({currentUser.bed})</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('complaints')}
              className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Raise Maintenance
            </button>
            <button
              onClick={() => setActiveTab('mess')}
              className="px-4 py-2.5 bg-indigo-600/60 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs border border-indigo-400/30 transition-all flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" /> Today's Menu
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Allocated Room"
          value={currentUser.room}
          subtitle={`${currentUser.bed} • AC Deluxe`}
          icon={BedSingle}
          color="indigo"
          badge={<span className="text-emerald-600 flex items-center gap-1 font-semibold"><CheckCircle className="w-3.5 h-3.5" /> Biometrics Verified</span>}
        />
        <StatCard
          title="Active Complaints"
          value={complaints.filter(c => c.status !== 'Resolved').length.toString()}
          subtitle="Tickets in pipeline"
          icon={AlertCircle}
          color="amber"
          badge={<span className="text-slate-500">1 in progress with technician</span>}
        />
        <StatCard
          title="Assigned Mess"
          value="North Dining"
          subtitle="Mess Hall 2 (Ground Floor)"
          icon={Utensils}
          color="emerald"
          badge={<span className="text-indigo-600 font-medium">Lunch: 11:30 AM - 1:30 PM</span>}
        />
        <StatCard
          title="Hostel Fee Status"
          value="₹0 Due"
          subtitle="Full year cleared"
          icon={DollarSign}
          color="blue"
          badge={<span className="text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Receipt #REC-88921</span>}
        />
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Room Snapshot & Roommates */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <BedSingle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">My Room Residents</h3>
                  <p className="text-xs text-slate-500">Block {currentUser.block} • Room {currentUser.room}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('room')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Room Details <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {INITIAL_ROOMMATES.map((mate, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                      {mate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{mate.name}</p>
                      <p className="text-xs text-slate-400">{mate.branch} • {mate.regNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {mate.bed}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-xl shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-900">Hostel Night Curfew Notice</h4>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  Night biometric punch closes strictly at 09:00 PM on weekdays. Any student requiring extension for lab research must obtain a signed digital Gate Pass from the warden before 06:00 PM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Menu Snapshot & Emergency */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Today's Dining Specials</h3>
                  <p className="text-xs text-slate-500">North Dining Hall</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('mess')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                7-Day Menu <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                  <span>LUNCH (11:30 AM - 01:30 PM)</span>
                  <span className="text-emerald-600">Veg & Jain Ready</span>
                </div>
                <p className="text-sm font-medium text-slate-800">
                  {MESS_SCHEDULE[0].lunch}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                  <span>DINNER (07:30 PM - 09:30 PM)</span>
                  <span className="text-indigo-600">Special Dessert</span>
                </div>
                <p className="text-sm font-medium text-slate-800">
                  {MESS_SCHEDULE[0].dinner}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Warden Contact Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hostel Desk Helpline</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Emergency Warden Office</p>
                <p className="text-xs text-slate-300">Ground Floor, Mandela Block</p>
              </div>
              <a
                href="tel:04427453159"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> 044-27453159
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentRoom = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Room Specifications & Assets</h1>
          <p className="text-sm text-slate-500 mt-1">
            Official hostel allotment contract and verified room inventory records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
            Allotment Status: Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Room Allotment Profile */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-sm">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Allotment Certificate</h3>
                <p className="text-xs text-slate-500">Hostel Allocation Registry No. HRN-2026-9921</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Academic Year 2026-27
            </span>
          </div>

          <div className="p-6">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: "Hostel Complex", value: currentUser.block },
                  { label: "Assigned Room Number", value: currentUser.room },
                  { label: "Designated Bed Slot", value: currentUser.bed },
                  { label: "Room Category", value: currentUser.category },
                  { label: "Air Conditioning", value: "Dedicated 1.5 Ton Split Unit" },
                  { label: "Restroom Facility", value: "Attached Western Bath with Instant Geyser" },
                  { label: "Floor & Wing", value: "2nd Floor, East Wing Corridor" },
                  { label: "Biometric Reader Code", value: "BIO-BLOCK-A-FL2" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3.5 pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">
                      {row.label}
                    </td>
                    <td className="py-3.5 text-sm font-semibold text-slate-800">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Room Inventory Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-800">Room Inventory Checklist</h3>
                <p className="text-xs text-slate-500">Sign-off physical asset inspection</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Inspected
              </span>
            </div>

            <div className="space-y-3.5">
              {INITIAL_INVENTORY.map((inv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{inv.item}</p>
                      <p className="text-xs text-slate-500">Qty: {inv.qty} • Status: {inv.condition}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <button
                onClick={() => setActiveTab('complaints')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Wrench className="w-3.5 h-3.5" /> Report Damaged Asset / Request Fix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentComplaints = () => {
    // Filter complaints list
    const filteredComplaints = complaints.filter(c => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = complaintFilter === 'All' ? true : c.status === complaintFilter;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Maintenance & Grievances</h1>
            <p className="text-sm text-slate-500 mt-1">
              Submit maintenance tickets with fast tracking directly to hostel engineering staff.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Avg resolution time: <strong className="text-indigo-600">under 24 hours</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form to submit new ticket */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Raise New Ticket</h3>
                <p className="text-xs text-slate-500">Room {currentUser.room} ({currentUser.block})</p>
              </div>
            </div>

            <form onSubmit={handleStudentComplaintSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Issue Category *
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-800 font-medium"
                >
                  <option value="">Select category...</option>
                  <option value="Electrical">Electrical (AC, Fan, Power Socket, Lights)</option>
                  <option value="Plumbing">Plumbing (Geyser, Taps, Leakage, Drainage)</option>
                  <option value="Mess / Food Quality">Mess & Food Quality (Hygiene, Meals)</option>
                  <option value="Housekeeping">Housekeeping (Room Cleaning, Trash)</option>
                  <option value="Wi-Fi & LAN">Wi-Fi & Internet Connectivity</option>
                  <option value="Carpentry">Carpentry & Furniture (Bed, Table, Door Lock)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Severity / Urgency Priority *
                </label>
                <select
                  name="priority"
                  defaultValue="Medium"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-800 font-medium"
                >
                  <option value="Low">Low (Routine maintenance)</option>
                  <option value="Medium">Medium (Standard attention needed)</option>
                  <option value="High">High (Impacting study / sleep)</option>
                  <option value="Urgent">Urgent (Safety / Water / Electrical hazard)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Preferred Inspection Slot
                </label>
                <select
                  name="preferredTime"
                  defaultValue="Morning (9 AM - 11 AM)"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-800 font-medium"
                >
                  <option value="Morning (9 AM - 11 AM)">Morning (09:00 AM - 11:00 AM)</option>
                  <option value="Afternoon (2 PM - 4 PM)">Afternoon (02:00 PM - 04:00 PM)</option>
                  <option value="Evening (5 PM - 7 PM)">Evening (05:00 PM - 07:00 PM)</option>
                  <option value="Anytime">Anytime during maintenance hours</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Specific Issue Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe what is wrong, e.g. 'Air conditioner starts blowing warm air after 30 minutes'..."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 focus:bg-white text-slate-800 font-medium resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Submit Maintenance Ticket
              </button>
            </form>
          </div>

          {/* Right Column: Ticket Tracking Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800">My Raised Complaints</h3>
                <p className="text-xs text-slate-500">Real-time status updates from warden desk</p>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                {['All', 'Pending', 'In Progress', 'Resolved'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setComplaintFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${complaintFilter === tab ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="py-3 px-5 font-bold">Ticket ID</th>
                    <th className="py-3 px-5 font-bold">Category</th>
                    <th className="py-3 px-5 font-bold">Priority</th>
                    <th className="py-3 px-5 font-bold">Status</th>
                    <th className="py-3 px-5 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredComplaints.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-indigo-700">
                        #{ticket.id}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-slate-800">
                        <div>{ticket.category}</div>
                        <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">{ticket.description}</div>
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={ticket.priority} />
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="py-3.5 px-5 text-xs text-slate-500">
                        {ticket.date}
                      </td>
                    </tr>
                  ))}
                  {filteredComplaints.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No complaint records found matching your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
              <span>Showing {filteredComplaints.length} tickets</span>
              <span>Need urgent help? Call Estate Engineering: 044-27453150</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentMess = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Mess Menu & Dining Schedule</h1>
            <p className="text-sm text-slate-500 mt-1">
              7-Day rotational meal schedule for {currentUser.mess} (Certified FSSAI A+ Grade).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200">
              Nutrition Tested & Certified
            </span>
          </div>
        </div>

        {/* Meal Timings Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Breakfast</p>
              <p className="text-sm font-black text-slate-800">07:30 AM - 09:30 AM</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Lunch</p>
              <p className="text-sm font-black text-slate-800">11:30 AM - 01:30 PM</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Evening High Tea</p>
              <p className="text-sm font-black text-slate-800">05:00 PM - 06:00 PM</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Dinner</p>
              <p className="text-sm font-black text-slate-800">07:30 PM - 09:30 PM</p>
            </div>
          </div>
        </div>

        {/* 7-Day Complete Schedule Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Official Weekly Meal Matrix</h3>
            <span className="text-xs text-slate-500">Dietary options: Vegetarian, Jain, and Non-Veg counters</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-xs">
                <tr>
                  <th className="py-4 px-6 font-bold w-1/8">Day</th>
                  <th className="py-4 px-6 font-bold w-1/4">Breakfast (07:30 - 09:30)</th>
                  <th className="py-4 px-6 font-bold w-1/4">Lunch (11:30 - 01:30)</th>
                  <th className="py-4 px-6 font-bold w-1/6">Snacks (17:00 - 18:00)</th>
                  <th className="py-4 px-6 font-bold w-1/4">Dinner (19:30 - 21:30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MESS_SCHEDULE.map((menu, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/30">
                      <div>{menu.day}</div>
                      <span className="text-xs font-normal text-indigo-600 block mt-0.5">{menu.type}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs leading-relaxed">{menu.breakfast}</td>
                    <td className="py-4 px-6 text-slate-700 text-xs leading-relaxed">{menu.lunch}</td>
                    <td className="py-4 px-6 text-slate-700 text-xs leading-relaxed">{menu.snacks}</td>
                    <td className="py-4 px-6 text-slate-700 text-xs leading-relaxed">{menu.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentFees = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hostel Fee Records & Invoices</h1>
            <p className="text-sm text-slate-500 mt-1">
              Annual room rent, dining dues, caution deposits, and official digital receipts.
            </p>
          </div>
          <div>
            <button
              onClick={() => triggerToast('Official Statement of Accounts PDF downloaded.')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" /> Download Statement
            </button>
          </div>
        </div>

        {/* Fee Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Annual Assessment"
            value="₹1,65,000"
            subtitle="Academic Year 2026-27"
            icon={DollarSign}
            color="indigo"
          />
          <StatCard
            title="Amount Settled"
            value="₹1,65,000"
            subtitle="100% Paid on 15 Jul 2026"
            icon={CheckCircle}
            color="emerald"
            badge={<span className="text-emerald-700 font-bold">Transaction Ref: SBIN0029108</span>}
          />
          <StatCard
            title="Balance Outstanding"
            value="₹0.00"
            subtitle="No pending penalties"
            icon={Award}
            color="blue"
            badge={<span className="text-emerald-600 font-bold">Eligible for Next Sem Allotment</span>}
          />
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Fee Component Breakdown</h3>
              <p className="text-xs text-slate-500">Allocated Category: 3-Sharing AC Deluxe with Bath</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
              Status: Paid in Full
            </span>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 uppercase text-xs border-b border-slate-100">
              <tr>
                <th className="py-3 px-6 font-bold">Fee Head</th>
                <th className="py-3 px-6 font-bold">Period</th>
                <th className="py-3 px-6 font-bold">Amount</th>
                <th className="py-3 px-6 font-bold">Status</th>
                <th className="py-3 px-6 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { head: "Hostel Room Rent (Deluxe AC)", period: "Annual (2026-27)", amount: "₹95,000", status: "Paid", receipt: "REC-991" },
                { head: "Dining & Mess Catering Dues", period: "Annual (3 Meals + Tea)", amount: "₹50,000", status: "Paid", receipt: "REC-992" },
                { head: "Utility & High-Speed LAN Charges", period: "Annual", amount: "₹12,000", status: "Paid", receipt: "REC-993" },
                { head: "Institutional Caution Deposit", period: "Refundable on Graduation", amount: "₹8,000", status: "Paid", receipt: "REC-994" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/60">
                  <td className="py-4 px-6 font-bold text-slate-800">{row.head}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{row.period}</td>
                  <td className="py-4 px-6 font-black text-slate-800">{row.amount}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => triggerToast(`Receipt #${row.receipt} downloaded.`)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderStudentProfile = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hosteller Identity & Record</h1>
          <p className="text-sm text-slate-500 mt-1">
            Institutional verification profile registered with the Dean of Student Affairs.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-100">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-indigo-600/30 shrink-0">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-800">{currentUser.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active Hosteller
                </span>
              </div>
              <p className="text-sm font-semibold text-indigo-600">{currentUser.regNo} • {currentUser.degree}</p>
              <p className="text-xs text-slate-400">SRM Institute of Science & Technology • Kattankulathur</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hostel Allotment</p>
              <p className="text-sm font-bold text-slate-800">{currentUser.block}</p>
              <p className="text-xs text-slate-500 mt-0.5">Room {currentUser.room} ({currentUser.bed})</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Institutional Email</p>
              <p className="text-sm font-bold text-slate-800">{currentUser.email}</p>
              <p className="text-xs text-slate-500 mt-0.5">SSO Authentication enabled</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Registered Phone</p>
              <p className="text-sm font-bold text-slate-800">{currentUser.phone}</p>
              <p className="text-xs text-slate-500 mt-0.5">SMS alerts active</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Parent / Guardian</p>
              <p className="text-sm font-bold text-slate-800">{currentUser.parentName}</p>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.parentPhone}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Dining Hall Assignment</p>
              <p className="text-sm font-bold text-slate-800">{currentUser.mess}</p>
              <p className="text-xs text-slate-500 mt-0.5">Biometric RFID token #7741</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Campus Curfew Timings</p>
              <p className="text-sm font-bold text-slate-800">09:00 PM (Weekdays)</p>
              <p className="text-xs text-slate-500 mt-0.5">09:30 PM (Sundays & Holidays)</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // MODULE: WARDEN VIEWS
  // ==========================================

  const renderWardenDashboard = () => (
    <div className="space-y-6">
      {/* Warden Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-200">
              <Shield className="w-3.5 h-3.5 text-indigo-300" />
              Warden Administration Console • Nelson Mandela & Tagore Blocks
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, {currentUser.name}!
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Real-time hostel oversight: room occupancy, daily student attendance, and actionable maintenance workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('complaints')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" /> Resolve Student Tickets ({complaints.filter(c => c.status !== 'Resolved').length})
            </button>
          </div>
        </div>
      </div>

      {/* Warden Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students Enrolled"
          value="1,248"
          subtitle="Mandela & Tagore Wings"
          icon={Users}
          color="indigo"
          badge={<span className="text-emerald-600 font-semibold">96.5% checked in campus</span>}
        />
        <StatCard
          title="Rooms Available / Vacant"
          value="38 Vacant"
          subtitle="412 / 450 occupied"
          icon={BedSingle}
          color="emerald"
          badge={<span className="text-slate-500">91.5% occupancy rate</span>}
        />
        <StatCard
          title="Pending Complaints"
          value={complaints.filter(c => c.status === 'Pending').length.toString()}
          subtitle="Requires warden approval"
          icon={AlertCircle}
          color="amber"
          badge={<span className="text-amber-700 font-bold">1 urgent electrical</span>}
        />
        <StatCard
          title="Approved Gate Passes"
          value="42 Out"
          subtitle="Weekend outing passes"
          icon={ArrowUpRight}
          color="blue"
          badge={<span className="text-slate-500">Return curfew 09:00 PM</span>}
        />
      </div>

      {/* Actionable Table Section for Warden */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Actionable Student Maintenance Queue</h3>
            <p className="text-xs text-slate-500">Directly assign technicians or mark tickets as resolved</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter:</span>
            <select
              value={complaintFilter}
              onChange={(e) => setComplaintFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Complaints</option>
              <option value="Pending">Pending Only</option>
              <option value="In Progress">In Progress Only</option>
              <option value="Resolved">Resolved Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-xs">
              <tr>
                <th className="py-3.5 px-5 font-bold">Ticket</th>
                <th className="py-3.5 px-5 font-bold">Student & Room</th>
                <th className="py-3.5 px-5 font-bold">Category</th>
                <th className="py-3.5 px-5 font-bold">Severity</th>
                <th className="py-3.5 px-5 font-bold">Assigned Staff</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Warden Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {complaints
                .filter(c => complaintFilter === 'All' ? true : c.status === complaintFilter)
                .map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5 font-bold text-indigo-700">
                      #{ticket.id}
                    </td>
                    <td className="py-4 px-5">
                      <p className="font-bold text-slate-800">{ticket.studentName}</p>
                      <p className="text-xs text-slate-400">{ticket.room} • {ticket.block}</p>
                    </td>
                    <td className="py-4 px-5 font-medium text-slate-700">
                      <div>{ticket.category}</div>
                      <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">{ticket.description}</div>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={ticket.priority} />
                    </td>
                    <td className="py-4 px-5 text-xs font-semibold text-slate-600">
                      {ticket.assignedTo || 'Unassigned'}
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => openResolveModal(ticket)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        Manage Ticket
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // MODULE: ADMIN VIEWS
  // ==========================================

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Admin Executive Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-200">
              <Shield className="w-3.5 h-3.5 text-indigo-300" />
              Campus Administrative Directorate • Real-time Operations
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hostel Governance Executive Suite
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              High-level institutional hostel KPIs, fiscal fee audits, and gate security visitor control.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsVisitorModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Issue Visitor Gate Pass
            </button>
          </div>
        </div>
      </div>

      {/* Admin Macro Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Overall Capacity"
          value="1,500 Beds"
          subtitle="Across 3 Hostel Blocks"
          icon={Building}
          color="indigo"
          badge={<span className="text-indigo-600 font-semibold">94.2% Total Occupancy</span>}
        />
        <StatCard
          title="Annual Fee Revenue"
          value="₹3.18 Cr"
          subtitle="97.8% Collection Rate"
          icon={DollarSign}
          color="emerald"
          badge={<span className="text-emerald-700 font-bold">+12% vs previous academic year</span>}
        />
        <StatCard
          title="Today's Visitor Passes"
          value={visitors.length.toString()}
          subtitle={`${visitors.filter(v => v.status === 'Checked In').length} currently inside campus`}
          icon={Users}
          color="amber"
          badge={<span className="text-amber-700 font-semibold">Security biometric scan ON</span>}
        />
        <StatCard
          title="Open Maintenance Tickets"
          value={complaints.filter(c => c.status !== 'Resolved').length.toString()}
          subtitle="Campus engineering queue"
          icon={Wrench}
          color="blue"
          badge={<span className="text-slate-500">Avg turnaround: 14 hrs</span>}
        />
      </div>

      {/* Visitor Management Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Main Gate Visitor Management Logs</h3>
            <p className="text-xs text-slate-500">Live security desk records for parents, guardians, and vendors</p>
          </div>

          <button
            onClick={() => setIsVisitorModalOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Log New Visitor
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-xs">
              <tr>
                <th className="py-3.5 px-5 font-bold">Pass No</th>
                <th className="py-3.5 px-5 font-bold">Visitor Details</th>
                <th className="py-3.5 px-5 font-bold">Hosteller Visited</th>
                <th className="py-3.5 px-5 font-bold">ID Verified</th>
                <th className="py-3.5 px-5 font-bold">Check-In Time</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Gate Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visitors.map(vis => (
                <tr key={vis.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 font-bold text-indigo-700">
                    {vis.id}
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-bold text-slate-800">{vis.visitorName}</p>
                    <p className="text-xs text-slate-400">{vis.relation} • {vis.phone}</p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-semibold text-slate-800">{vis.studentName}</p>
                    <p className="text-xs text-slate-500">Room {vis.room}</p>
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-600 font-medium">
                    {vis.idType}
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-500">
                    {vis.checkIn}
                  </td>
                  <td className="py-4 px-5">
                    <StatusBadge status={vis.status} />
                  </td>
                  <td className="py-4 px-5 text-right">
                    {vis.status === 'Checked In' ? (
                      <button
                        onClick={() => handleCheckOutVisitor(vis.id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Out at {vis.checkOut.split(',')[1] || vis.checkOut}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fee Records for Admin */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Student Fee Dues & Ledger Records</h3>
            <p className="text-xs text-slate-500">Official billing and outstanding dues tracker</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Payment Status:</span>
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Records</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 uppercase text-xs">
              <tr>
                <th className="py-3.5 px-5 font-bold">Student</th>
                <th className="py-3.5 px-5 font-bold">Room & Wing</th>
                <th className="py-3.5 px-5 font-bold">Category</th>
                <th className="py-3.5 px-5 font-bold">Total Dues</th>
                <th className="py-3.5 px-5 font-bold">Paid</th>
                <th className="py-3.5 px-5 font-bold">Balance</th>
                <th className="py-3.5 px-5 font-bold">Status</th>
                <th className="py-3.5 px-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees
                .filter(f => feeFilter === 'All' ? true : f.status === feeFilter)
                .map(fee => (
                  <tr key={fee.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-bold text-slate-800">{fee.studentName}</p>
                      <p className="text-xs text-slate-400">{fee.regNo}</p>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-600 font-medium">
                      {fee.room} • {fee.block}
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-600">
                      {fee.category}
                    </td>
                    <td className="py-4 px-5 font-bold text-slate-800">
                      ₹{fee.totalAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-semibold text-emerald-600">
                      ₹{fee.paidAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-bold text-rose-600">
                      ₹{fee.dueAmount.toLocaleString()}
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={fee.status} />
                    </td>
                    <td className="py-4 px-5 text-right">
                      {fee.dueAmount > 0 ? (
                        <button
                          onClick={() => triggerToast(`Automated SMS payment reminder dispatched to ${fee.studentName}.`)}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Send Reminder
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center justify-end gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Cleared
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // MODALS: VISITOR LOGGING & RESOLUTION
  // ==========================================

  const renderVisitorModal = () => {
    if (!isVisitorModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Issue Visitor Gate Pass</h3>
                <p className="text-xs text-slate-500">Security Gate Biometric Logging</p>
              </div>
            </div>
            <button
              onClick={() => setIsVisitorModalOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateVisitorLog} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Visitor Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newVisitor.visitorName}
                  onChange={(e) => setNewVisitor({ ...newVisitor, visitorName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Contact Mobile *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={newVisitor.phone}
                  onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Resident Student *
                </label>
                <input
                  type="text"
                  required
                  value={newVisitor.studentName}
                  onChange={(e) => setNewVisitor({ ...newVisitor, studentName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Room Number *
                </label>
                <input
                  type="text"
                  required
                  value={newVisitor.room}
                  onChange={(e) => setNewVisitor({ ...newVisitor, room: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Relationship
                </label>
                <select
                  value={newVisitor.relation}
                  onChange={(e) => setNewVisitor({ ...newVisitor, relation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                >
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Official / Vendor">Official / Vendor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  ID Proof Produced
                </label>
                <select
                  value={newVisitor.idType}
                  onChange={(e) => setNewVisitor({ ...newVisitor, idType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Passport">Passport</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Purpose of Visit *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Handing over medical prescription & project documents"
                value={newVisitor.purpose}
                onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsVisitorModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Generate Gate Pass
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderResolveModal = () => {
    if (!isResolveModalOpen || !activeResolvingTicket) return null;
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Manage Ticket #{activeResolvingTicket.id}</h3>
              <p className="text-xs text-slate-500">
                {activeResolvingTicket.studentName} ({activeResolvingTicket.room} - {activeResolvingTicket.block})
              </p>
            </div>
            <button
              onClick={() => setIsResolveModalOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mt-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Issue Description:</span>
              <p className="text-slate-600 leading-relaxed">{activeResolvingTicket.description}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Assign Staff / Technician
              </label>
              <select
                value={assigneeStaff}
                onChange={(e) => setAssigneeStaff(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="Electrician Murugan">Electrician Murugan (Electrical Wing)</option>
                <option value="Plumber Selvam">Plumber Selvam (Sanitary)</option>
                <option value="Housekeeping Lead Mary">Housekeeping Lead Mary (Cleaning)</option>
                <option value="Mess Supervisor Nair">Mess Supervisor Nair (Catering)</option>
                <option value="Network Engineer Rajesh">Network Engineer Rajesh (Wi-Fi/LAN)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Warden Resolution Remarks / Inspection Notes
              </label>
              <textarea
                rows={3}
                value={resolutionRemarks}
                onChange={(e) => setResolutionRemarks(e.target.value)}
                placeholder="e.g. Technician dispatched. Fuse replacement done and tested."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600 resize-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleConfirmResolve('In Progress')}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold rounded-xl text-xs transition-colors"
              >
                Mark In Progress
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(false)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmResolve('Resolved')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" /> Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TOP HEADER BAR & NAVIGATION RENDERING
  // ==========================================

  return (
    <div className="flex h-screen bg-slate-50/70 font-sans text-slate-900 overflow-hidden">

      {/* PERSISTENT SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 shadow-xl z-20">
        {/* Brand Logo Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/40">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg mr-3 shadow-md shadow-indigo-500/20">
            H
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-tight leading-none block">
              HostelHub
            </span>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
              Smart Hostel System
            </span>
          </div>
        </div>

        {/* Current Active Role Indicator */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/50">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Active Workspace
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${currentRole === 'student' ? 'bg-indigo-400' : currentRole === 'warden' ? 'bg-emerald-400' : 'bg-amber-400'
                }`}></span>
              <span className="text-xs font-bold text-white capitalize">{currentRole} Portal</span>
            </div>
            <button
              onClick={() => handleRoleSwitch(currentRole === 'student' ? 'warden' : currentRole === 'warden' ? 'admin' : 'student')}
              className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300"
              title="Click to quickly toggle role"
            >
              Switch ⇄
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Menu */}
        <div className="p-3 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">
            Navigation Menu
          </p>
          <nav className="space-y-1">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Card & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate uppercase">{currentUser.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN RIGHT APPLICATION SHELL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-xs">

          {/* Search Bar / Context Title */}
          <div className="flex items-center gap-4">
            <div className="relative w-64 md:w-80 hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search complaints, rooms, visitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 focus:bg-white transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Right Header Badges & User Profile Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">

            {/* Emergency Hotline Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-full text-xs font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>Warden Desk: 044-27453159</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Campus Alerts</span>
                    <span className="text-[10px] text-indigo-600 font-bold">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-2.5">
                      <p className="font-bold text-slate-800">Maintenance Update</p>
                      <p className="text-slate-500 text-[11px]">Plumber assigned to ticket #CMP-0941.</p>
                      <span className="text-[10px] text-slate-400">10m ago</span>
                    </div>
                    <div className="py-2.5">
                      <p className="font-bold text-slate-800">Mess Council Notice</p>
                      <p className="text-slate-500 text-[11px]">Special Sunday dinner feast updated.</p>
                      <span className="text-[10px] text-slate-400">2h ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            {/* User Profile Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{currentUser.role} • {currentUser.regNo}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase">
                      {currentUser.role} Mode
                    </span>
                  </div>

                  <div className="py-2 space-y-1">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Role View
                    </p>
                    {['student', 'warden', 'admin'].map(r => (
                      <button
                        key={r}
                        onClick={() => handleRoleSwitch(r)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold capitalize flex items-center justify-between ${currentRole === r ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        <span>{r} View</span>
                        {currentRole === r && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Conditional Rendering based on Role & Active Tab */}
            {currentRole === 'student' && (
              <>
                {activeTab === 'dashboard' && renderStudentDashboard()}
                {activeTab === 'room' && renderStudentRoom()}
                {activeTab === 'complaints' && renderStudentComplaints()}
                {activeTab === 'mess' && renderStudentMess()}
                {activeTab === 'fees' && renderStudentFees()}
                {activeTab === 'profile' && renderStudentProfile()}
              </>
            )}

            {currentRole === 'warden' && (
              <>
                {activeTab === 'dashboard' && renderWardenDashboard()}
                {activeTab === 'complaints' && renderWardenDashboard()}
                {activeTab === 'room' && renderStudentRoom()}
                {activeTab === 'mess' && renderStudentMess()}
                {activeTab === 'profile' && renderStudentProfile()}
              </>
            )}

            {currentRole === 'admin' && (
              <>
                {activeTab === 'dashboard' && renderAdminDashboard()}
                {activeTab === 'visitors' && renderAdminDashboard()}
                {activeTab === 'fees' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-black text-slate-800">Institutional Fee Master Ledger</h1>
                        <p className="text-sm text-slate-500 mt-1">Audit student fees, dues, and payment statuses.</p>
                      </div>
                    </div>
                    {renderAdminDashboard()}
                  </div>
                )}
                {activeTab === 'complaints' && renderWardenDashboard()}
                {activeTab === 'profile' && renderStudentProfile()}
              </>
            )}
          </div>
        </main>
      </div>

      {/* MODALS */}
      {renderVisitorModal()}
      {renderResolveModal()}

      {/* CUSTOM FLOATING TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold tracking-wide">{toastMsg.text}</span>
        </div>
      )}

    </div>
  );
}
