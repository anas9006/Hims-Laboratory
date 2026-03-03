import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    LayoutDashboard,
    Home,
    FileText,
    LogOut,
    User,
    Hospital,
    Receipt,
    DollarSign,
    Clock,
    BarChart3,
    Settings,
    Menu,
    CalendarCheck,
    Users,
    Stethoscope,
    CalendarRange,
    ClipboardList,
    CreditCard,
    Building2,
    FlaskConical,
    Scan,
    ShieldCheck,
    Tag,
    Building,
    Wallet,
    AlertCircle,
    TestTube,
    Microscope,
    Beaker,
    Syringe,
    Pill,
    FlaskRound
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [setupOpen, setSetupOpen] = useState(true);
    const [opdSetupOpen, setOpdSetupOpen] = useState(false);
    const [labSetupOpen, setLabSetupOpen] = useState(false);
    const [accessControlOpen, setAccessControlOpen] = useState(false);
    const navigate = useNavigate();

    // Mock user data for standalone use
    const user = {
        full_name: "Admin User",
        username: "admin",
        role: "admin"
    };

    const toggleSidebar = () => setCollapsed(!collapsed);

    const handleLogout = () => {
        toast.info("Logged out successfully");
        navigate('/');
    };

    const navItems = [
        { icon: Home, label: "Home", path: "/home" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        {
            label: "Access Control",
            icon: ShieldCheck,
            submenu: true,
            isOpen: accessControlOpen,
            toggle: () => setAccessControlOpen(!accessControlOpen),
            children: [
                { icon: Users, label: "Groups", path: "/setup/access-control/groups" },
                { icon: User, label: "Users", path: "/setup/access-control/users" },
                { icon: FileText, label: "Permissions", path: "/setup/access-control/permissions" },
            ]
        },
        { icon: AlertCircle, label: "Emergency Treatment", path: "/emergency-treatment" },
        { icon: User, label: "MR Details", path: "/mr-details" },
        { icon: FileText, label: "MR Data View", path: "/mr-data-view" },
        { icon: Receipt, label: "OPD Receipt", path: "/opd" },
        { icon: FileText, label: "Patient Records", path: "/patient-records" },
        { icon: DollarSign, label: "Consultant Payments", path: "/consultant-payments" },
        { icon: CalendarCheck, label: "Consultant Appointment", path: "/appointments" },
        { icon: CreditCard, label: "Add Expenses", path: "/add-expenses" },
        { icon: Tag, label: "Discount Voucher", path: "/discount-voucher-approval" },
        { icon: ClipboardList, label: "Appointment Report", path: "/appointment-report" },
        { icon: Clock, label: "Shift Management", path: "/shift-management" },
        { icon: BarChart3, label: "Reports", path: "/reports" },
    ];

    // Laboratory pages with their correct paths based on your components
    const laboratoryPages = [
        { icon: FlaskConical, label: "Test Types", path: "/labTestType" },
        { icon: Beaker, label: "Test Categories", path: "/labTestCat" },
        { icon: TestTube, label: "Specimens", path: "/labTestSpecimens" },
        { icon: Microscope, label: "Attributes", path: "/labTestsAttributes" },
        { icon: ClipboardList, label: "Attribute Groups", path: "/labTestsAttributesGroup" },
        { icon: FileText, label: "Reporting Formats", path: "/labReportingFormats" },
        { icon: Syringe, label: "Tests", path: "/labTests" },
        { icon: Receipt, label: "Laboratory Receipt", path: "/labReceipt" },
    ];

    const setupItems = [
        { icon: Stethoscope, label: "Doctor Registration", path: "/setup/doctors" },
        {
            label: "OPD Setup",
            icon: Stethoscope,
            submenu: true,
            isOpen: opdSetupOpen,
            toggle: () => setOpdSetupOpen(!opdSetupOpen),
            children: [
                { icon: ClipboardList, label: "OPD Services", path: "/setup/opd-services" },
                { icon: Scan, label: "Radiology Setup", path: "/setup/radiology" },
                { icon: CalendarRange, label: "Consultant Timings", path: "/setup/consultant-timings" },
            ]
        },
        {
            label: "Laboratory",
            icon: FlaskConical,
            submenu: true,
            isOpen: labSetupOpen,
            toggle: () => setLabSetupOpen(!labSetupOpen),
            children: laboratoryPages
        },
        { icon: Building2, label: "Company Settings", path: "/setup/company" },
        { icon: ShieldCheck, label: "Discount Authorities", path: "/setup/discount-authorities" },
        { icon: Tag, label: "Discount Types", path: "/setup/discount-types" },
        { icon: Building, label: "Referred From", path: "/setup/referred-from" },
        { icon: Wallet, label: "Expense Heads", path: "/setup/expense-heads" },
    ];

    /* ── Shared class helpers ── */
    const linkBase = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative";
    const linkActive = "bg-[#00B5AE] text-white font-semibold shadow-md";
    const linkInactive = "text-slate-600 hover:bg-slate-200/80 hover:text-[#00B5AE]";
    const subLinkBase = "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group";
    const subLinkActive = "bg-[#00B5AE]/10 text-[#00B5AE] font-semibold";
    const subLinkInactive = "text-slate-500 hover:bg-slate-200/50 hover:text-[#00B5AE]";

    // Helper function to render nav items
    const renderNavItem = (item) => {
        if (item.submenu) {
            return (
                <div key={item.label}>
                    <button
                        type="button"
                        onClick={item.toggle}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                            linkBase,
                            "text-slate-600 hover:bg-slate-200/80 hover:text-[#00B5AE]",
                            collapsed && "justify-center px-2"
                        )}
                    >
                        <item.icon className={cn(
                            "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]",
                            collapsed ? "h-6 w-6" : ""
                        )} />

                        {!collapsed && (
                            <>
                                <span className="text-sm font-medium">{item.label}</span>
                                <span className="ml-auto text-slate-400">
                                    {item.isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </span>
                            </>
                        )}
                    </button>

                    <div
                        className={cn(
                            "ml-3 pl-3 space-y-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                            item.isOpen && !collapsed ? "mt-1 max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}
                        style={{
                            borderLeft: "1px solid #E2E8F0",
                            pointerEvents: item.isOpen && !collapsed ? 'auto' : 'none',
                        }}
                    >
                        {item.children.map((subItem) => (
                            <NavLink
                                key={subItem.path}
                                to={subItem.path}
                                className={({ isActive }) => cn(
                                    subLinkBase,
                                    isActive ? subLinkActive : subLinkInactive
                                )}
                            >
                                <subItem.icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]" />
                                <span className="text-xs">{subItem.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => cn(
                        linkBase,
                        isActive ? linkActive : linkInactive,
                        collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? item.label : undefined}
                >
                    {({ isActive }) => (
                        <>
                            <item.icon className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]",
                                collapsed ? "h-6 w-6" : ""
                            )} />

                            {!collapsed && (
                                <span className="text-sm">{item.label}</span>
                            )}

                            {collapsed && isActive && (
                                <span
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-md"
                                    style={{ background: "#00B5AE" }}
                                />
                            )}
                        </>
                    )}
                </NavLink>
            );
        }
    };

    return (
        <aside
            className={cn(
                "flex flex-col h-full transition-all duration-300 relative z-20 border-r border-slate-200",
                collapsed ? "w-[70px]" : "w-64"
            )}
            style={{
                background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
            }}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-center px-4" style={{ borderBottom: "1px solid #E2E8F0" }}>
                {collapsed ? (
                    <div className="flex flex-col items-center justify-center gap-0.5">
                        <div className="p-2 rounded-lg" style={{ background: "#00B5AE" }}>
                            <Hospital className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 tracking-tight">HIMS</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 w-full">
                        <div className="p-1.5 rounded-lg shrink-0" style={{ background: "#00B5AE" }}>
                            <Hospital className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-slate-800 tracking-tight whitespace-nowrap">
                                HIMS
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                Hospital Information System
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Toggle Button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 z-30 hidden md:flex"
                onClick={toggleSidebar}
            >
                {collapsed ? <ChevronRight className="h-3 w-3 text-slate-400" /> : <ChevronLeft className="h-3 w-3 text-slate-400" />}
            </Button>

            {/* User Profile */}
            {!collapsed && (
                <div className="px-4 py-5">
                    <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                        <div
                            className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                            style={{ background: "#00B5AE", color: "#FFFFFF" }}
                        >
                            {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-slate-800 truncate">{user?.full_name || 'Admin User'}</p>
                            <p className="text-xs text-slate-500 truncate capitalize">{user?.role || 'Administrator'}</p>
                        </div>
                    </div>
                </div>
            )}

            {collapsed && (
                <div className="px-3 py-4 flex justify-center">
                    <div
                        className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm"
                        style={{ background: "#00B5AE", color: "#FFFFFF" }}
                    >
                        {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'A'}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto sidebar-scrollbar py-4 px-3 space-y-1">
                {navItems.map((item) => renderNavItem(item))}

                {/* Setup Section */}
                <div className="pt-2">
                    <div className="mx-2 mb-2" style={{ height: 1, background: "#E2E8F0" }} />

                    <button
                        type="button"
                        onClick={() => setSetupOpen(v => !v)}
                        className={cn(
                            linkBase,
                            "text-slate-600 hover:bg-slate-200/80 hover:text-[#00B5AE]",
                            collapsed && "justify-center px-2"
                        )}
                        title={collapsed ? "Setup" : undefined}
                    >
                        <Settings className={cn("h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]", collapsed ? "h-6 w-6" : "")} />

                        {!collapsed && (
                            <>
                                <span className="text-sm font-medium">Setup</span>
                                <span className="ml-auto text-slate-400">
                                    {setupOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </span>
                            </>
                        )}
                    </button>

                    <div
                        className={cn(
                            "ml-3 pl-3 space-y-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                            setupOpen && !collapsed ? "mt-1 max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                        )}
                        style={{
                            borderLeft: "1px solid #E2E8F0",
                            pointerEvents: setupOpen && !collapsed ? 'auto' : 'none',
                        }}
                    >
                        {setupItems.map((item) => {
                            if (item.submenu) {
                                return (
                                    <div key={item.label}>
                                        <button
                                            type="button"
                                            onClick={item.toggle}
                                            className={cn(subLinkBase, "w-full text-slate-600 hover:bg-slate-200/80 hover:text-[#00B5AE]")}
                                        >
                                            <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                            <span className="ml-auto text-slate-400">
                                                {item.isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                            </span>
                                        </button>

                                        <div
                                            className={cn(
                                                "ml-3 pl-3 space-y-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
                                                item.isOpen ? "mt-1 max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            )}
                                            style={{
                                                borderLeft: "1px solid #E2E8F0",
                                                pointerEvents: item.isOpen ? 'auto' : 'none',
                                            }}
                                        >
                                            {item.children.map((subItem) => (
                                                <NavLink
                                                    key={subItem.path}
                                                    to={subItem.path}
                                                    className={({ isActive }) => cn(
                                                        subLinkBase,
                                                        isActive ? subLinkActive : subLinkInactive
                                                    )}
                                                >
                                                    <subItem.icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]" />
                                                    <span className="text-xs">{subItem.label}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => cn(
                                            subLinkBase,
                                            isActive ? subLinkActive : subLinkInactive
                                        )}
                                    >
                                        <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-[1px]" />
                                        <span className="text-sm">{item.label}</span>
                                    </NavLink>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4" style={{ borderTop: "1px solid #E2E8F0" }}>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50",
                        collapsed && "justify-center px-2"
                    )}
                    onClick={handleLogout}
                    title={collapsed ? "Logout" : undefined}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;