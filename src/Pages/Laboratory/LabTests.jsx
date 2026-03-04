import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Pencil, Trash2, X, FlaskConical, Search, FileText, Settings, Package } from "lucide-react";
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
    
    // New state variables for additional fields in Test Details
    const [testPerformedOn, setTestPerformedOn] = useState("");
    const [resultAfterHours, setResultAfterHours] = useState("");
    const [reportPages, setReportPages] = useState("");
    const [testReportOn, setTestReportOn] = useState("");

    // ── Attributes tab state ──
    const [attrName, setAttrName] = useState("");
    const [attrUnit, setAttrUnit] = useState("");
    const [attrNormalRange, setAttrNormalRange] = useState("");
    
    // New state variables for additional fields in Attributes tab
    const [testGroup, setTestGroup] = useState("");
    const [testAttribute, setTestAttribute] = useState("");
    const [displayOrder, setDisplayOrder] = useState("");
    const [normalRangeDisplay, setNormalRangeDisplay] = useState("");
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [genderAttribute, setGenderAttribute] = useState("both");

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
            <div className="max-w-350 mx-auto space-y-4">

                {/* ── Header Card with Modern Tabs ── */}
                <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">

                    {/* Original Header */}
                    <CardHeader className="pb-2 pt-5 px-5">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-lg bg-[#B2EBE9]  flex items-center justify-center">
                                <FlaskConical className="h-5 w-5 text-[#00B5AE] " />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TESTS</h1>
                                <p className="text-[11px] text-slate-500 mt-0.5">Manage laboratory test catalogue</p>
                            </div>
                        </div>
                    </CardHeader>

                    {/* Original Test Type/Name/Amount grid */}
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

                    {/* Modern Tab Navigation */}
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
                                                ? "text-[#00B5AE]"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        {/* Active indicator line */}
                                        {isActive && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00B5AE] rounded-t-full" />
                                        )}

                                        {/* Icon with hover effect */}
                                        <div className={cn(
                                            "p-1 rounded-lg transition-all duration-200",
                                            isActive
                                                ? "bg-blue-100 text-[#00B5AE]"
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
                                    {/* First row - Gender and Checkboxes */}
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

                                    {/* Second row - Specimen and Reporting Format */}
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
                                                    <SelectValue placeholder="Select Reporting Format" />
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

                                    {/* Third row - Test Performed On, Result after Hours, Report Pages */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Performed on</Label>
                                            <Select value={testPerformedOn} onValueChange={setTestPerformedOn}>
                                                <SelectTrigger className="h-8 text-xs border-medical-border">
                                                    <SelectValue placeholder="Select Test Performed on Days" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekdays">Weekdays (Mon-Fri)</SelectItem>
                                                    <SelectItem value="weekends">Weekends</SelectItem>
                                                    <SelectItem value="monday">Monday</SelectItem>
                                                    <SelectItem value="tuesday">Tuesday</SelectItem>
                                                    <SelectItem value="wednesday">Wednesday</SelectItem>
                                                    <SelectItem value="thursday">Thursday</SelectItem>
                                                    <SelectItem value="friday">Friday</SelectItem>
                                                    <SelectItem value="saturday">Saturday</SelectItem>
                                                    <SelectItem value="sunday">Sunday</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Result after Hours</Label>
                                            <Input 
                                                value={resultAfterHours} 
                                                onChange={e => setResultAfterHours(e.target.value)} 
                                                className="h-8 text-xs border-medical-border" 
                                                placeholder="Enter hours" 
                                                type="number"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Report Pages</Label>
                                            <Input 
                                                value={reportPages} 
                                                onChange={e => setReportPages(e.target.value)} 
                                                className="h-8 text-xs border-medical-border" 
                                                placeholder="Enter number of pages" 
                                                type="number"
                                            />
                                        </div>
                                    </div>

                                    {/* Fourth row - Test Report on */}
                                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Report on</Label>
                                            <Select value={testReportOn} onValueChange={setTestReportOn}>
                                                <SelectTrigger className="h-8 text-xs border-medical-border">
                                                    <SelectValue placeholder="Report Day" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="same-day">Same Day</SelectItem>
                                                    <SelectItem value="next-day">Next Day</SelectItem>
                                                    <SelectItem value="within-2-days">Within 2 Days</SelectItem>
                                                    <SelectItem value="within-3-days">Within 3 Days</SelectItem>
                                                    <SelectItem value="within-5-days">Within 5 Days</SelectItem>
                                                    <SelectItem value="within-7-days">Within 7 Days</SelectItem>
                                                    <SelectItem value="within-14-days">Within 14 Days</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── ATTRIBUTES TAB ── */}
                            {activeTab === "attributes" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    {/* First row - Test Group and Test Attribute */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Group</Label>
                                            <Select value={testGroup} onValueChange={setTestGroup}>
                                                <SelectTrigger className="h-8 text-xs border-medical-border">
                                                    <SelectValue placeholder="Select Group" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="chemical">Chemical Examination</SelectItem>
                                                    <SelectItem value="differential">Differential Leukocytes Count</SelectItem>
                                                    <SelectItem value="microscope">Microscope Examination</SelectItem>
                                                    <SelectItem value="physical">Physical Examination</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Attribute</Label>
                                            <Select value={testAttribute} onValueChange={setTestAttribute}>
                                                <SelectTrigger className="h-8 text-xs border-medical-border">
                                                    <SelectValue placeholder="Select Lab Attributes" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hsv1-igg">HSV-1 IgG</SelectItem>
                                                    <SelectItem value="hsv1-igm">HSV-1 IgM</SelectItem>
                                                    <SelectItem value="hsv2-igg">HSV-2 IgG</SelectItem>
                                                    <SelectItem value="hsv2-igm">HSV-2 IgM</SelectItem>
                                                    <SelectItem value="17oh">17-OH Progesterone</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Second row - Test Unit and Normal Range Display */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Unit</Label>
                                            <div className="flex items-center gap-2">
                                                <Input 
                                                    value={attrUnit} 
                                                    onChange={e => setAttrUnit(e.target.value)} 
                                                    className="h-8 text-xs border-medical-border flex-1" 
                                                    placeholder="e.g. IU/mL, mg/dL" 
                                                />
                                                <span className="text-xs text-slate-500 whitespace-nowrap">Display Order</span>
                                                <Input 
                                                    value={displayOrder} 
                                                    onChange={e => setDisplayOrder(e.target.value)} 
                                                    className="h-8 w-20 text-xs border-medical-border" 
                                                    placeholder="2" 
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-[11px] text-slate-500 mb-0.5 block">Normal Range</Label>
                                            <Input 
                                                value={normalRangeDisplay} 
                                                onChange={e => setNormalRangeDisplay(e.target.value)} 
                                                className="h-8 text-xs border-medical-border" 
                                                placeholder="Normal Range Display" 
                                            />
                                        </div>
                                    </div>

                                    {/* Add Test button */}
                                    <div className="flex justify-end">
                                        <Button className="h-8 text-xs bg-medical-accent hover:bg-blue-600 text-white px-6">
                                            <Plus className="h-3.5 w-3.5 mr-1" /> Add Test
                                        </Button>
                                    </div>

                                    {/* Gender selection for attributes */}
                                    <div className="border-t border-blue-100 pt-4">
                                        <Label className="text-[11px] text-slate-500 mb-2 block">Gender Specific Ranges</Label>
                                        <RadioGroup value={genderAttribute} onValueChange={setGenderAttribute} className="flex gap-6 mb-3">
                                            {["both", "male", "female", "child"].map(g => (
                                                <div key={g} className="flex items-center space-x-1.5">
                                                    <RadioGroupItem value={g} id={`attr-${g}`} />
                                                    <Label htmlFor={`attr-${g}`} className="text-xs text-slate-700 capitalize">{g}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>

                                        {/* Min/Max Value inputs */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                                            <div>
                                                <Label className="text-[11px] text-slate-500 mb-0.5 block">Min Value</Label>
                                                <Input 
                                                    value={minValue} 
                                                    onChange={e => setMinValue(e.target.value)} 
                                                    className="h-8 text-xs border-medical-border" 
                                                    placeholder="Enter minimum value" 
                                                    type="number"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-[11px] text-slate-500 mb-0.5 block">Max Value</Label>
                                                <Input 
                                                    value={maxValue} 
                                                    onChange={e => setMaxValue(e.target.value)} 
                                                    className="h-8 text-xs border-medical-border" 
                                                    placeholder="Enter maximum value" 
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Existing attributes list/table */}
                                    <div className="border-2 border-dashed border-blue-100 rounded-lg p-4 text-center text-slate-400 text-xs italic mt-4">
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
                            <div className="grid grid-cols-[50px_160px_120px_70px_1fr_90px_90px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                                {["Sr.", "Type", "Category", "Code", "Test Name", "Amount", "Result"].map(h => (
                                    <span key={h} className="text-[11px] font-bold text-medical-blue flex items-center">{h}</span>
                                ))}
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-blue-50 max-h-105 overflow-y-auto">
                                {filtered.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 text-xs italic">No tests found.</div>
                                ) : filtered.map(test => (
                                    <div key={test.id} className="grid grid-cols-[50px_160px_120px_70px_1fr_90px_90px] px-3 py-2 transition-colors hover:bg-slate-50/80">
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LabTests;