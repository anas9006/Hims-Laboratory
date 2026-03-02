import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, Pencil, Trash2, X, FlaskConical, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const LabTestsAttributes = () => {
  const [attributes, setAttributes] = useState([
    { id: 1, srNo: 1, attribute: "*", unit: "IU/mL", normalRange: "-" },
    { id: 2, srNo: 2, attribute: "HSV-1 IgG", unit: "IU/mL", normalRange: "Negative: < 0.9 | Borderline: 0.9–1.1 | Positive: > 1.1" },
    { id: 3, srNo: 3, attribute: "HSV-1 IgM", unit: "IU/mL", normalRange: "Negative: < 0.9 | Borderline: 0.9–1.1 | Positive: > 1.1" },
    { id: 4, srNo: 4, attribute: "HSV-2 IgG", unit: "IU/mL", normalRange: "Negative: < 0.9 | Borderline: 0.9–1.1 | Positive: > 1.1" },
    { id: 5, srNo: 5, attribute: "HSV-2 IgM", unit: "IU/mL", normalRange: "Negative: < 0.9 | Borderline: 0.9–1.1 | Positive: > 1.1" },
    { id: 6, srNo: 6, attribute: "17-OH Progesterone", unit: "ng/dl", normalRange: "1–2 days: 65–400 | 3–6 days: 60–250" },
    { id: 7, srNo: 7, attribute: "1st Trimester", unit: "-", normalRange: "-" },
    { id: 8, srNo: 8, attribute: "2nd Trimester", unit: "-", normalRange: "-" },
    { id: 9, srNo: 9, attribute: "3rd Trimester", unit: "-", normalRange: "-" },
    { id: 10, srNo: 10, attribute: "Adult Male", unit: "-", normalRange: "-" },
    { id: 11, srNo: 11, attribute: "Adult Female", unit: "-", normalRange: "-" },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ attribute: "", unit: "", normalRange: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const [testAttribute] = useState({
    name: "HSV-2 (HERPES SIMPLEX VIRUS 2) IgG",
    unit: "IU/mL",
    normalRange: "Negative: < 0.9 | Borderline: 0.9 to 1.1 | Positive: > 1.1"
  });

  const handleModify = () => {
    if (selectedIds.length === 1) {
      const a = attributes.find(x => x.id === selectedIds[0]);
      setEditingId(a.id);
      setEditValues({ attribute: a.attribute, unit: a.unit, normalRange: a.normalRange });
    }
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setAttributes(attributes.map(a => a.id === editingId ? { ...a, ...editValues } : a));
      setEditingId(null); setEditValues({ attribute: "", unit: "", normalRange: "" }); setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) { setAttributes(attributes.filter(a => !selectedIds.includes(a.id))); setSelectedIds([]); }
  };

  const toggleSelection = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleSelectAll = () => setSelectedIds(selectedIds.length === attributes.length ? [] : attributes.map(a => a.id));

  const filtered = attributes.filter(a =>
    a.attribute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-medical-bg-app p-4">
      <div className="max-w-5xl mx-auto space-y-4">

        {/* Selected Attribute Info Card */}
        <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-medical-accent" />
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST ATTRIBUTES</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage attributes, units and normal ranges</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[11px] text-slate-500 mb-0.5 block">Test Attribute</Label>
                <p className="text-xs font-semibold text-slate-800">{testAttribute.name}</p>
              </div>
              <div>
                <Label className="text-[11px] text-slate-500 mb-0.5 block">Unit</Label>
                <p className="text-xs font-semibold text-slate-800">{testAttribute.unit}</p>
              </div>
              <div>
                <Label className="text-[11px] text-slate-500 mb-0.5 block">Normal Range</Label>
                <p className="text-xs font-semibold text-slate-800">{testAttribute.normalRange}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Table Card */}
        <Card className="border-medical-border shadow-soft overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-medical-border py-3 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-medical-blue">Attributes List</CardTitle>
              <span className="text-xs text-slate-500 font-medium">{attributes.length} attribute{attributes.length !== 1 ? "s" : ""}</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input placeholder="Search attributes..." className="pl-9 h-8 text-xs border-medical-border" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[40px_50px_2fr_80px_2fr] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <div className="flex items-center">
                  <Checkbox checked={selectedIds.length === attributes.length && attributes.length > 0} onCheckedChange={toggleSelectAll} className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Attribute</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Unit</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Normal Range</span>
              </div>
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">No attributes found.</div>
                ) : filtered.map(attr => (
                  <div key={attr.id} className={cn("grid grid-cols-[40px_50px_2fr_80px_2fr] px-3 py-2.5 transition-colors", selectedIds.includes(attr.id) ? "bg-blue-50" : "hover:bg-slate-50/80")}>
                    <div className="flex items-center">
                      <Checkbox checked={selectedIds.includes(attr.id)} onCheckedChange={() => toggleSelection(attr.id)} className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center">{attr.srNo}</span>
                    <div className="flex items-center pr-2">
                      {editingId === attr.id ? (
                        <Input value={editValues.attribute} onChange={e => setEditValues(p => ({ ...p, attribute: e.target.value }))} className="h-7 text-xs border-medical-border w-full" />
                      ) : (
                        <span className="text-xs font-medium text-slate-800 truncate">{attr.attribute}</span>
                      )}
                    </div>
                    <div className="flex items-center pr-2">
                      {editingId === attr.id ? (
                        <Input value={editValues.unit} onChange={e => setEditValues(p => ({ ...p, unit: e.target.value }))} className="h-7 text-xs border-medical-border w-full" />
                      ) : (
                        <span className="text-xs text-slate-600">{attr.unit}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {editingId === attr.id ? (
                        <>
                          <Input value={editValues.normalRange} onChange={e => setEditValues(p => ({ ...p, normalRange: e.target.value }))} className="h-7 text-xs border-medical-border flex-1" />
                          <Button size="sm" onClick={handleSaveEdit} className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"><Save className="h-3 w-3" /></Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs border-medical-border"><X className="h-3 w-3" /></Button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-600 truncate">{attr.normalRange}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIds.length > 0 && <p className="text-[11px] text-medical-accent font-medium">{selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected</p>}

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleModify} disabled={selectedIds.length !== 1} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Pencil className="h-3.5 w-3.5 mr-1" /> Modify</Button>
                <Button variant="outline" size="sm" onClick={handleDelete} disabled={selectedIds.length === 0} className="h-8 text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"><Trash2 className="h-3.5 w-3.5 mr-1" /> Delete</Button>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs border-medical-border text-slate-500 hover:bg-slate-50"><X className="h-3.5 w-3.5 mr-1" /> Exit</Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabTestsAttributes;