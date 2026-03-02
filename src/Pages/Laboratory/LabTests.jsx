import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2, X, FlaskConical, Search, FileText, Settings, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const LabTests = () => {
    const [activeTab, setActiveTab] = useState("details");
    const [gender, setGender] = useState("both");
    const [testActive, setTestActive] = useState(true);
    const [priceEditable, setPriceEditable] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // ── Test Details tab state ──
    const [testType, setTestType] = useState("");
    const [testName, setTestName] = useState("");
    const [testNick, setTestNick] = useState("");
    const [amount, setAmount] = useState("");
    const [specimenRequired, setSpecimenRequired] = useState("");
    const [reportingFormat, setReportingFormat] = useState("");

    // ── Attributes tab state ──
    const [attrName, setAttrName] = useState("");
    const [attrUnit, setAttrUnit] = useState("");
    const [attrNormalRange, setAttrNormalRange] = useState("");

    // ── Inventory Details tab state ──
    const [inventoryItem, setInventoryItem] = useState("");
    const [inventoryQty, setInventoryQty] = useState("");
    const [inventoryUnit, setInventoryUnit] = useState("");

    const [tests, setTests] = useState([
        { id: 1, sr: 1, type: "SPECIAL TESTS", category: "", code: "187", test: "17-OH PROGESTERONE", amount: "4,000", result: "" },
        { id: 2, sr: 2, type: "BIOCHEMISTRY", category: "", code: "302", test: "24 HOURS URINARY CREATININE", amount: "600", result: "" },
        { id: 3, sr: 3, type: "BIOCHEMISTRY", category: "", code: "303", test: "24 HOURS URINARY PROTEIN", amount: "600", result: "" },
        { id: 4, sr: 4, type: "BIOCHEMISTRY", category: "", code: "304", test: "24 HOURS URINARY URIC ACID", amount: "500", result: "" },
        { id: 5, sr: 5, type: "CHEMICAL PATHOLOGY", category: "", code: "099", test: "25-OH VITAMIN-D3", amount: "2,500", result: "" },
        { id: 6, sr: 6, type: "BIOCHEMISTRY", category: "", code: "305", test: "A.C.E", amount: "3,750", result: "" },
        { id: 7, sr: 7, type: "SEROLOGY / VIROLOGY", category: "", code: "084", test: "A.N.A. SCREEN IgG", amount: "1,500", result: "" },
        { id: 8, sr: 8, type: "HAEMATOLOGY", category: "", code: "001", test: "A.P.T.T.", amount: "1,000", result: "" },
        { id: 9, sr: 9, type: "BIOCHEMISTRY", category: "", code: "306", test: "A/G RATIO", amount: "950", result: "" },
        { id: 10, sr: 10, type: "HAEMATOLOGY", category: "", code: "002", test: "ABSOLUTE EOSINOPHIL COUNT", amount: "200", result: "" },
        { id: 11, sr: 11, type: "HAEMATOLOGY", category: "", code: "003", test: "ABSOLUTE LYMPHOCYTE COUNT", amount: "200", result: "" },
        { id: 12, sr: 12, type: "HAEMATOLOGY", category: "", code: "004", test: "ABSOLUTE MONOCYTE COUNT", amount: "200", result: "" },
        { id: 13, sr: 13, type: "HAEMATOLOGY", category: "", code: "005", test: "ABSOLUTE NEUTROPHILE COUNT", amount: "200", result: "" },
        { id: 14, sr: 14, type: "HAEMATOLOGY", category: "", code: "006", test: "ABSOLUTE VALUES/CELL COUNT", amount: "200", result: "" },
        { id: 15, sr: 15, type: "Special Test", category: "", code: "", test: "Acetylene Receptor Anti Body", amount: "12,000", result: "Report Day" },
        { id: 16, sr: 16, type: "SPECIAL TESTS", category: "", code: "300", test: "ACTH", amount: "3,250", result: "" },
        { id: 17, sr: 17, type: "SPECIAL TESTS", category: "", code: "188", test: "ACTH", amount: "3,250", result: "" },
    ]);

    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelection = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const toggleSelectAll = () => setSelectedIds(selectedIds.length === tests.length ? [] : tests.map(t => t.id));
    const handleDelete = () => { if (selectedIds.length > 0) { setTests(tests.filter(t => !selectedIds.includes(t.id))); setSelectedIds([]); } };

    const filtered = tests.filter(t =>
        t.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Modern tabs configuration with icons
    const TABS = [
        { 
            id: "details", 
            label: "Test Details", 
            icon: FileText,
        },
        { 
            id: "attributes", 
            label: "Attributes", 
            icon: Settings,
        },
        { 
            id: "inventory", 
            label: "Inventory Details", 
            icon: Package,
        },
    ];

    return (
        <div className="min-h-screen bg-medical-bg-app p-4">
            <div className="max-w-[1400px] mx-auto space-y-4">

                {/* ── Header Card with Modern Tabs ── */}
                <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">

                    {/* Original Header - Kept exactly as you had it */}
                    <CardHeader className="pb-2 pt-5 px-5">
                        <div className="flex items-center gap-2">
                            <FlaskConical className="h-5 w-5 text-medical-accent" />
                            <div>
                                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TESTS</h1>
                                <p className="text-[11px] text-slate-500 mt-0.5">Manage laboratory test catalogue</p>
                            </div>
                        </div>
                    </CardHeader>
                    
                    {/* Original Test Type/Name/Amount grid - Kept exactly as you had it */}
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                    <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Type</Label>
                                    <Select value={testType} onValueChange={setTestType}>
                                        <SelectTrigger className="h-8 text-xs border-medical-border">
                                            <SelectValue placeholder="Select Test Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="haematology">HAEMATOLOGY</SelectItem>
                                            <SelectItem value="biochemistry">BIOCHEMISTRY</SelectItem>
                                            <SelectItem value="special">SPECIAL TESTS</SelectItem>
                                            <SelectItem value="chemical">CHEMICAL PATHOLOGY</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Name</Label>
                                    <Input value={testName} onChange={e => setTestName(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="Enter test name" />
                                </div>
                                <div>
                                    <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Nick</Label>
                                    <Input value={testNick} onChange={e => setTestNick(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="Enter test nick" />
                                </div>
                                <div>
                                    <Label className="text-[11px] text-slate-500 mb-0.5 block">Amount</Label>
                                    <Input value={amount} onChange={e => setAmount(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="Amount" type="number" />
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* Modern Tab Navigation - Only this part is modernized */}
                    <div className="border-b border-medical-border px-2 bg-white">
                        <div className="grid grid-cols-5 gap-1">
                            {TABS.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all duration-200",
                                            "hover:text-medical-accent group",
                                            isActive 
                                                ? "text-medical-accent" 
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        {/* Active indicator line */}
                                        {isActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-accent rounded-t-full" />
                                        )}
                                        
                                        {/* Icon with hover effect */}
                                        <div className={cn(
                                            "p-1 rounded-lg transition-all duration-200",
                                            isActive 
                                                ? "bg-blue-100 text-medical-accent" 
                                                : "bg-transparent text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600"
                                        )}>
                                            <Icon className="h-3.5 w-3.5" />
                                        </div>
                                        
                                        {/* Label */}
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab content with animations */}
                    <CardContent className="p-4">
                        <div className="transition-all duration-300 ease-in-out">
                            {/* ── TEST DETAILS TAB ── */}
                            {activeTab === "details" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-center gap-8 flex-wrap">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-1 block">For Gender</Label>
                                            <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                                                {["male", "female", "both"].map(g => (
                                                    <div key={g} className="flex items-center space-x-1.5">
                                                        <RadioGroupItem value={g} id={g} />
                                                        <Label htmlFor={g} className="text-xs text-slate-700 capitalize">{g}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <Checkbox id="testActive" checked={testActive} onCheckedChange={setTestActive} className="h-3.5 w-3.5" />
                                                <Label htmlFor="testActive" className="text-xs text-slate-700">Test Active</Label>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Checkbox id="priceEditable" checked={priceEditable} onCheckedChange={setPriceEditable} className="h-3.5 w-3.5" />
                                                <Label htmlFor="priceEditable" className="text-xs text-slate-700">Price Editable</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Specimen for Test</Label>
                                            <Select value={specimenRequired} onValueChange={setSpecimenRequired}>
                                                <SelectTrigger className="h-8 text-xs border-medical-border">
                                                    <SelectValue placeholder="Select Specimen" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="blood">Blood</SelectItem>
                                                    <SelectItem value="urine">Urine</SelectItem>
                                                    <SelectItem value="serum">Serum</SelectItem>
                                                    <SelectItem value="plasma">Plasma</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Reporting Format</Label>
                                            <Select value={reportingFormat} onValueChange={setReportingFormat}>
                                                <SelectTrigger className="h-8 text-xs border-medical-border">
                                                    <SelectValue placeholder="Select Format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="regular">REGULAR</SelectItem>
                                                    <SelectItem value="biochemistry">BIOCHEMISTRY</SelectItem>
                                                    <SelectItem value="haematology">HAEMATOLOGY</SelectItem>
                                                    <SelectItem value="special">SPECIAL</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── ATTRIBUTES TAB ── */}
                            {activeTab === "attributes" && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Attribute Name</Label>
                                            <Input value={attrName} onChange={e => setAttrName(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="Enter attribute name" />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Unit</Label>
                                            <Input value={attrUnit} onChange={e => setAttrUnit(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="e.g. IU/mL, mg/dL" />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Normal Range</Label>
                                            <Input value={attrNormalRange} onChange={e => setAttrNormalRange(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="e.g. 0.9 - 1.1" />
                                        </div>
                                    </div>
                                    {/* ── Add your attributes list/table here ── */}
                                    <div className="border-2 border-dashed border-blue-100 rounded-lg p-8 text-center text-slate-400 text-xs italic">
                                        Attributes data will appear here
                                    </div>
                                </div>
                            )}

                            {/* ── INVENTORY DETAILS TAB ── */}
                            {activeTab === "inventory" && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Inventory Item</Label>
                                            <Input value={inventoryItem} onChange={e => setInventoryItem(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="Enter inventory item" />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Quantity</Label>
                                            <Input value={inventoryQty} onChange={e => setInventoryQty(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="Quantity" type="number" />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Unit</Label>
                                            <Input value={inventoryUnit} onChange={e => setInventoryUnit(e.target.value)} className="h-8 text-xs border-medical-border" placeholder="e.g. pcs, ml" />
                                        </div>
                                    </div>
                                    {/* ── Add your inventory list/table here ── */}
                                    <div className="border-2 border-dashed border-blue-100 rounded-lg p-8 text-center text-slate-400 text-xs italic">
                                        Inventory details will appear here
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* ── Tests Table Card (always visible below tabs) ── */}
                <Card className="border-medical-border shadow-soft overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-medical-border py-3 px-5">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-bold text-medical-blue">Test List</CardTitle>
                            <span className="text-xs text-slate-500 font-medium">{tests.length} tests</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <Input placeholder="Search by test name, type or code..." className="pl-9 h-8 text-xs border-medical-border" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>

                        <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
                            {/* Header */}
                            <div className="grid grid-cols-[40px_50px_160px_120px_70px_1fr_90px_90px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                                <div className="flex items-center">
                                    <Checkbox checked={selectedIds.length === tests.length && tests.length > 0} onCheckedChange={toggleSelectAll} className="h-3.5 w-3.5" />
                                </div>
                                {["Sr.", "Type", "Category", "Code", "Test Name", "Amount", "Result"].map(h => (
                                    <span key={h} className="text-[11px] font-bold text-medical-blue flex items-center">{h}</span>
                                ))}
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-blue-50 max-h-[420px] overflow-y-auto">
                                {filtered.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 text-xs italic">No tests found.</div>
                                ) : filtered.map(test => (
                                    <div key={test.id} className={cn("grid grid-cols-[40px_50px_160px_120px_70px_1fr_90px_90px] px-3 py-2 transition-colors", selectedIds.includes(test.id) ? "bg-blue-50" : "hover:bg-slate-50/80")}>
                                        <div className="flex items-center">
                                            <Checkbox checked={selectedIds.includes(test.id)} onCheckedChange={() => toggleSelection(test.id)} className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="text-xs text-slate-500 flex items-center">{test.sr}</span>
                                        <span className="text-[11px] text-slate-700 flex items-center truncate pr-2">{test.type}</span>
                                        <span className="text-[11px] text-slate-500 flex items-center truncate pr-2">{test.category || "—"}</span>
                                        <span className="text-xs font-mono text-slate-600 flex items-center">{test.code || "—"}</span>
                                        <span className="text-xs font-medium text-slate-800 flex items-center truncate pr-2">{test.test}</span>
                                        <span className="text-xs font-mono font-semibold text-slate-700 flex items-center">PKR {test.amount}</span>
                                        <span className="text-[11px] text-slate-500 flex items-center">{test.result || "—"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedIds.length > 0 && <p className="text-[11px] text-medical-accent font-medium">{selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected</p>}

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled={selectedIds.length !== 1} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50">
                                    <Pencil className="h-3.5 w-3.5 mr-1" /> Modify
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleDelete} disabled={selectedIds.length === 0} className="h-8 text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700">
                                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                                </Button>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-xs border-medical-border text-slate-500 hover:bg-slate-50">
                                <X className="h-3.5 w-3.5 mr-1" /> Exit
                            </Button>
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default LabTests;