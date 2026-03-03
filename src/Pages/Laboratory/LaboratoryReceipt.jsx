import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Plus,
    Save,
    Pencil,
    Trash2,
    Printer,
    User,
    FlaskConical,
    Calendar,
    AlertCircle,
    CheckCircle,
    RefreshCw,
    X,
    Search,
    Minus,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Inline DateTime (replace with your shared component if preferred) ──
const DateTime = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="flex items-center gap-2 bg-blue-50 border border-[#00B5AE] rounded-lg px-3 py-1.5 h-10">
            <Calendar className="h-3.5 w-3.5 text-[#00B5AE]" />
            <div>
                <div className="text-xs font-semibold text-medical-blue leading-tight">
                    {now.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </div>
                <div className="text-[10px] font-mono text-[#00B5AE] leading-tight">
                    {now.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    })}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
const LaboratoryReceipt = () => {
    // ── Form state ──
    const [receiptNo, setReceiptNo] = useState("01579");
    const [opdNo, setOpdNo] = useState("");
    const [indoorNo, setIndoorNo] = useState("");
    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [consultant, setConsultant] = useState("");
    const [panelCompany, setPanelCompany] = useState("");
    const [reference, setReference] = useState("");

    // ── Company patients ──
    const [companyPatients] = useState([
        "H-0111-02-2026", "H-0112-02-2026", "H-0113-02-2026", "H-0114-02-2026",
        "H-0116-02-2026", "H-0117-02-2026", "H-0118-02-2026", "H-0119-02-2026",
        "H-0120-02-2026", "H-0121-02-2026", "H-0122-02-2026", "H-0123-02-2026",
        "H-0124-02-2026", "H-0125-02-2026", "H-0126-02-2026", "H-0127-02-2026",
        "H-0128-02-2026", "H-0129-02-2026", "H-0130-02-2026", "H-0131-02-2026",
        "H-0132-02-2026", "H-0133-02-2026", "H-0134-02-2026", "H-0135-02-2026",
        "H-0136-02-2026",
    ]);
    const [patientSearch, setPatientSearch] = useState("");

    // ── Lab tests ──
    const [labTests, setLabTests] = useState([
        { id: 1, srNo: 1, test: "Amylase", amount: 830 },
        { id: 2, srNo: 2, test: "Bilirubin Direct & Indirect", amount: 600 },
    ]);
    const [selectedTestIds, setSelectedTestIds] = useState([]);
    const [newTest, setNewTest] = useState({ test: "", amount: "" });
    const [testSearch, setTestSearch] = useState("");

    // ── Payment ──
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paid, setPaid] = useState();

    // ── UI ──
    const [rightTab, setRightTab] = useState("company");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // ── Calculations ──
    const totalAmount = labTests
        .filter(t => selectedTestIds.includes(t.id))
        .reduce((sum, t) => sum + t.amount, 0);
    const payable = Math.max(0, totalAmount - discountAmount);
    const balance = payable - paid;

    const handleDiscountPercentChange = (e) => {
        const pct = parseFloat(e.target.value) || 0;
        setDiscountPercent(pct);
        setDiscountAmount((totalAmount * pct) / 100);
    };

    const handleDiscountAmountChange = (e) => {
        const amt = parseFloat(e.target.value) || 0;
        setDiscountAmount(amt);
        setDiscountPercent(totalAmount > 0 ? (amt * 100) / totalAmount : 0);
    };

    const handleAddTest = () => {
        if (!newTest.test || !newTest.amount) return;
        const newId = Math.max(...labTests.map((t) => t.id), 0) + 1;
        setLabTests((prev) => [
            ...prev,
            { id: newId, srNo: prev.length + 1, test: newTest.test, amount: parseFloat(newTest.amount) },
        ]);
        setNewTest({ test: "", amount: "" });
    };

    const handleDeleteSelected = () => {
        setLabTests((prev) => prev.filter((t) => !selectedTestIds.includes(t.id)));
        setSelectedTestIds([]);
    };

    const removeTest = (id) => setLabTests((prev) => prev.filter((t) => t.id !== id));

    const toggleTest = (id) =>
        setSelectedTestIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const toggleAll = () =>
        setSelectedTestIds(
            selectedTestIds.length === labTests.length ? [] : labTests.map((t) => t.id)
        );

    const handlePrint = async () => {
        if (!patientName) { setError("Please enter patient name."); return; }
        if (labTests.length === 0) { setError("Please add at least one lab test."); return; }
        setError(null);
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 1500));
        setSubmitting(false);
        setSuccess(`Receipt ${receiptNo} printed successfully!`);
        setTimeout(() => setSuccess(null), 3000);
    };

    const handleNew = () => {
        setPatientName(""); setAge(""); setGender(""); setPhone("");
        setAddress(""); setConsultant(""); setPanelCompany(""); setReference("");
        setOpdNo(""); setIndoorNo("");
        setLabTests([]); setSelectedTestIds([]);
        setDiscountPercent(0); setDiscountAmount(0); setPaid(0);
        setError(null); setSuccess(null);
    };

    const filteredPatients = companyPatients.filter((p) =>
        p.toLowerCase().includes(patientSearch.toLowerCase())
    );
    const filteredTests = labTests.filter((t) =>
        t.test.toLowerCase().includes(testSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-medical-bg-app p-4">
            <div className="max-w-350 mx-auto space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* ═══════ LEFT COLUMN (8 cols) ═══════ */}
                    <div className="lg:col-span-8 space-y-4">

                        {/* ── Patient Information Card ── */}
                        <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
                            <CardHeader className="pb-2 pt-5 px-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-lg font-bold text-medical-blue tracking-tight">
                                            LABORATORY RECEIPT
                                        </h1>
                                    </div>
                                    <DateTime />
                                </div>
                            </CardHeader>

                            <CardContent className="px-5 pb-4 pt-2">
                                {/* Receipt / OPD / Indoor row */}
                                <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-3">
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">Receipt No.</Label>
                                        <Input
                                            value={receiptNo}
                                            onChange={(e) => setReceiptNo(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="Receipt No."
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">OPD No.</Label>
                                        <Input
                                            value={opdNo}
                                            onChange={(e) => setOpdNo(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="OPD No."
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">Indoor No.</Label>
                                        <Input
                                            value={indoorNo}
                                            onChange={(e) => setIndoorNo(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="Indoor No."
                                        />
                                    </div>
                                </div>

                                <div className="text-xs font-semibold text-medical-blue mb-2 flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5 text-medical-accent" />
                                    Patient Information <span className="text-red-500">*</span>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">
                                            Full Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">
                                            Phone <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="Phone"
                                            type="tel"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">
                                            Age <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="Age"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">
                                            Gender <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full h-8 text-xs border border-medical-border rounded-md px-2 bg-white text-slate-700"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">Address</Label>
                                        <Input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="h-8 text-xs border-medical-border"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">Consultant</Label>
                                        <select
                                            value={consultant}
                                            onChange={(e) => setConsultant(e.target.value)}
                                            className="w-full h-8 text-xs border border-medical-border rounded-md px-2 bg-white text-slate-700"
                                        >
                                            <option value="">Select Consultant</option>
                                            <option value="dr1">Dr. Smith</option>
                                            <option value="dr2">Dr. Johnson</option>
                                            <option value="dr3">Dr. Williams</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">Panel Company</Label>
                                        <select
                                            value={panelCompany}
                                            onChange={(e) => setPanelCompany(e.target.value)}
                                            className="w-full h-8 text-xs border border-medical-border rounded-md px-2 bg-white text-slate-700"
                                        >
                                            <option value="">Select Panel</option>
                                            <option value="company1">Company A</option>
                                            <option value="company2">Company B</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label className="text-[11px] text-slate-500 mb-0.5 block">Reference</Label>
                                        <select
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                            className="w-full h-8 text-xs border border-medical-border rounded-md px-2 bg-white text-slate-700"
                                        >
                                            <option value="">Select Reference</option>
                                            <option value="ref1">Reference 1</option>
                                            <option value="ref2">Reference 2</option>
                                        </select>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-md text-xs mt-2 flex items-center gap-1.5">
                                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                        {error}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* ── Lab Tests Card ── */}
                        <Card className="border-medical-border shadow-soft overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-medical-border py-3 px-5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-bold text-medical-blue flex items-center gap-1.5">
                                        <div className="w-12 h-12 rounded-lg bg-[#B2EBE9]  flex items-center justify-center">

                                            <FlaskConical className="h-5 w-5 text-[#00B5AE] " />
                                        </div>
                                        Lab Tests <span className="text-red-500">*</span>
                                    </CardTitle>
                                    <span className="text-xs text-slate-500 font-medium">
                                        {labTests.length} test{labTests.length !== 1 ? "s" : ""} added
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                {labTests.length === 0 && (
                                    <div className="bg-red-50 border border-red-100 text-red-500 px-3 py-2 rounded-md text-xs mb-3 italic">
                                        Please add at least one lab test
                                    </div>
                                )}

                                {/* Add Test Row */}
                                <div className="flex gap-2 mb-3">
                                    <Input
                                        placeholder="SelectTest..."
                                        value={newTest.test}
                                        onChange={(e) => setNewTest({ ...newTest, test: e.target.value })}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddTest()}
                                        className="h-8 text-xs border-medical-border flex-1"
                                    />
                                    <Input
                                        placeholder="Amount"
                                        value={newTest.amount}
                                        onChange={(e) => setNewTest({ ...newTest, amount: e.target.value })}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddTest()}
                                        className="h-8 text-xs border-medical-border w-28"
                                        type="number"
                                    />
                                    <Button
                                        onClick={handleAddTest}
                                        className="h-8 text-xs bg-[#00B5AE] hover:bg-[#7FDAD6] text-white px-3"
                                    >
                                        <Plus className="h-3.5 w-3.5 mr-1" /> Add
                                    </Button>
                                </div>

                                {/* Search tests */}
                                {labTests.length > 0 && (
                                    <div className="relative mb-2">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                        <Input
                                            placeholder="Search tests..."
                                            className="pl-9 h-8 text-xs border-medical-border"
                                            value={testSearch}
                                            onChange={(e) => setTestSearch(e.target.value)}
                                        />
                                    </div>
                                )}

                                {/* Tests table */}
                                {labTests.length > 0 && (
                                    <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
                                        {/* Header */}
                                        <div className="grid grid-cols-[32px_40px_1fr_100px_36px] gap-0 bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTestIds.length === labTests.length && labTests.length > 0}
                                                    onChange={toggleAll}
                                                    className="h-3.5 w-3.5 rounded border-slate-300"
                                                />
                                            </div>
                                            <span className="text-[11px] font-bold text-medical-blue">Sr.</span>
                                            <span className="text-[11px] font-bold text-medical-blue">Lab Test</span>
                                            <span className="text-[11px] font-bold text-medical-blue text-right">Amount</span>
                                            <span />
                                        </div>

                                        {/* Rows */}
                                        <div className="divide-y divide-blue-50 max-h-56 overflow-y-auto">
                                            {filteredTests.map((test, idx) => (
                                                <div
                                                    key={test.id}
                                                    className={cn(
                                                        "grid grid-cols-[32px_40px_1fr_100px_36px] gap-0 px-3 py-2 transition-colors",
                                                        selectedTestIds.includes(test.id) ? "bg-blue-50" : "hover:bg-slate-50/80"
                                                    )}
                                                >
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedTestIds.includes(test.id)}
                                                            onChange={() => toggleTest(test.id)}
                                                            className="h-3.5 w-3.5 rounded border-slate-300"
                                                        />
                                                    </div>
                                                    <span className="text-xs text-slate-500 flex items-center">{test.srNo}</span>
                                                    <span className="text-xs font-medium text-slate-800 flex items-center">{test.test}</span>
                                                    <span className="text-xs font-mono font-semibold text-slate-700 flex items-center justify-end">
                                                        PKR {test.amount.toLocaleString()}
                                                    </span>
                                                    <div className="flex items-center justify-end">
                                                        <button
                                                            onClick={() => removeTest(test.id)}
                                                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Bulk delete */}
                                {selectedTestIds.length > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleDeleteSelected}
                                        className="mt-2 h-7 text-[10px] border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        Delete Selected ({selectedTestIds.length})
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* ═══════ RIGHT COLUMN (4 cols) ═══════ */}
                    <div className="lg:col-span-4 space-y-4">

                        {/* ── Tabs Card (Company Patients / Info) ── */}
                        <Card className="border-medical-border shadow-soft overflow-hidden">
                            <div className="flex border-b border-medical-border">
                                {["company", "info"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setRightTab(tab)}
                                        className={cn(
                                            "flex-1 py-2.5 text-xs font-semibold capitalize transition-colors",
                                            rightTab === tab
                                                ? "text-medical-accent border-b-2 border-medical-accent bg-blue-50/50"
                                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                        )}
                                    >
                                        {tab === "company" ? (
                                            <span className="inline-flex items-center gap-1.5 justify-center">
                                                <Users className="h-3.5 w-3.5" />
                                                Company Patients
                                            </span>
                                        ) : (
                                            "Receipt Info"
                                        )}
                                    </button>
                                ))}
                            </div>

                            <CardContent className="p-4 h-100 overflow-hidden">
                                {rightTab === "company" && (
                                    <div className="h-full flex flex-col">
                                        <div className="relative mb-2">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                            <Input
                                                placeholder="Search patient ID..."
                                                className="pl-9 h-8 text-xs border-medical-border"
                                                value={patientSearch}
                                                onChange={(e) => setPatientSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                                            {filteredPatients.length === 0 ? (
                                                <p className="text-xs text-slate-400 text-center py-6 italic">No patients found</p>
                                            ) : (
                                                filteredPatients.map((patient, i) => (
                                                    <button
                                                        key={i}
                                                        className="w-full text-left px-3 py-2 rounded-md border border-medical-border bg-slate-50/50 hover:bg-blue-50 hover:border-blue-200 transition-colors text-xs font-mono text-slate-700"
                                                    >
                                                        {patient}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}

                                {rightTab === "info" && (
                                    <div className="space-y-3 text-xs">
                                        <div className="p-3 rounded-lg border border-medical-border bg-slate-50/50 space-y-1.5">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Receipt No.</span>
                                                <span className="font-mono font-semibold text-medical-blue">{receiptNo}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">OPD No.</span>
                                                <span className="font-mono text-slate-700">{opdNo || "—"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Indoor No.</span>
                                                <span className="font-mono text-slate-700">{indoorNo || "—"}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg border border-medical-border bg-slate-50/50 space-y-1.5">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Patient</span>
                                                <span className="font-semibold text-slate-800">{patientName || "—"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Age / Gender</span>
                                                <span className="text-slate-700">{age ? `${age} yr` : "—"} / {gender || "—"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Phone</span>
                                                <span className="text-slate-700">{phone || "—"}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg border border-medical-border bg-slate-50/50 space-y-1.5">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Tests</span>
                                                <span className="font-semibold text-medical-blue">{labTests.length}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Total</span>
                                                <span className="font-semibold text-medical-blue">PKR {totalAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* ── Payment Summary Card ── */}
                        <Card className="border-medical-border shadow-soft overflow-hidden sticky top-4">
                            <CardHeader className="bg-slate-50/50 border-b border-medical-border py-3 px-5">
                                <CardTitle className="text-sm font-bold text-medical-blue">Payment Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                {/* Total */}
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Services Total</span>
                                    <span className="font-semibold text-medical-blue">PKR {totalAmount.toLocaleString()}</span>
                                </div>

                                {/* Discount % */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-slate-500 whitespace-nowrap">Discount %</span>
                                    <div className="flex items-center gap-1">
                                        <Input
                                            type="number"
                                            value={discountPercent || ""}
                                            onChange={handleDiscountPercentChange}
                                            className="h-7 w-16 text-xs text-right border-medical-border"
                                            min="0"
                                            max="100"
                                        />
                                        <span className="text-xs text-slate-400">%</span>
                                    </div>
                                </div>

                                {/* Discount Amount */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-slate-500 whitespace-nowrap">Discount</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-slate-500">PKR</span>
                                        <Input
                                            type="number"
                                            value={discountAmount || ""}
                                            onChange={handleDiscountAmountChange}
                                            className="h-7 w-20 text-xs text-right border-medical-border"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Payable */}
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-medical-blue">Total Payable</span>
                                    <span className="text-sm font-bold text-green-600">PKR {payable.toLocaleString()}</span>
                                </div>

                                {/* Paid */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-slate-500 whitespace-nowrap">Amount Paid</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-slate-500">PKR</span>
                                        <Input
                                            type="number"
                                            value={paid || ""}
                                            onChange={(e) => setPaid(parseFloat(e.target.value) || 0)}
                                            className="h-7 w-20 text-xs text-right border-medical-accent"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                {/* Balance */}
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-medical-blue">Balance</span>
                                    <span className={cn("text-sm font-bold", balance > 0 ? "text-red-600" : "text-green-600")}>
                                        PKR {Math.abs(balance).toLocaleString()}
                                        {balance < 0 && " (Change)"}
                                    </span>
                                </div>

                                {/* Success / Error feedback */}
                                {success && (
                                    <div className="p-2 rounded-md bg-green-50 text-green-700 text-xs flex items-center gap-1.5 border border-green-200">
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        <span>{success}</span>
                                    </div>
                                )}
                                {error && (
                                    <div className="p-2 rounded-md bg-red-50 text-red-600 text-xs flex items-center gap-1.5 border border-red-200">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNew}
                                        className="h-8 text-xs font-semibold border-medical-border text-slate-600 hover:bg-slate-50"
                                    >
                                        <Plus className="h-3.5 w-3.5 mr-1" /> New
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs font-semibold border-medical-border text-slate-600 hover:bg-slate-50"
                                    >
                                        <Save className="h-3.5 w-3.5 mr-1" /> Save
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs font-semibold border-medical-border text-slate-600 hover:bg-slate-50"
                                    >
                                        <Pencil className="h-3.5 w-3.5 mr-1" /> Modify
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs font-semibold border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                                    </Button>
                                </div>

                                {/* Print (full width) */}
                                <Button
                                    onClick={handlePrint}
                                    disabled={submitting}
                                    className="w-full h-9 text-xs font-semibold bg-[#00B5AE] hover:bg-blue-600 text-white"
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-1.5">
                                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 ">
                                            <Printer className="h-3.5 w-3.5" />
                                            Print Receipt
                                        </span>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaboratoryReceipt;