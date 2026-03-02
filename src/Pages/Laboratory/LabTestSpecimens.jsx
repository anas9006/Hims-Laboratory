import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Pencil, Trash2, X, FlaskConical, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const LabTestsSpecimens = () => {
  const [specimens, setSpecimens] = useState([
    { id: 1, srNo: 1, specimenName: "---" },
    { id: 2, srNo: 2, specimenName: "3 - 5 CC CLOT BLOOD" },
    { id: 3, srNo: 3, specimenName: "24 HOURS URINE" },
    { id: 4, srNo: 4, specimenName: "3 - 4 CC EDTA BLOOD" },
    { id: 5, srNo: 5, specimenName: "CSF" },
    { id: 6, srNo: 6, specimenName: "URINE 20 - 25 ML" },
    { id: 7, srNo: 7, specimenName: "URINE (STRERILIZED CONTAINER)" },
    { id: 8, srNo: 8, specimenName: "FRESH URINE" },
    { id: 9, srNo: 9, specimenName: "ALL TYPE OF SPECIMEN" },
    { id: 10, srNo: 10, specimenName: "STOOL" },
    { id: 11, srNo: 11, specimenName: "EDTA PLASMA OR SERUM" },
    { id: 12, srNo: 12, specimenName: "BLOOD IN (CULTURE VIAL)" },
    { id: 13, srNo: 13, specimenName: "FRESH URINE RANDOM / SPOT" },
    { id: 14, srNo: 14, specimenName: "SEMEN" },
    { id: 15, srNo: 15, specimenName: "SPUTUM" },
    { id: 16, srNo: 16, specimenName: "SYNOVIAL (JOINT) FLUID" },
    { id: 17, srNo: 17, specimenName: "SWAB" },
    { id: 18, srNo: 18, specimenName: "ANY SPECIMEN" },
    { id: 19, srNo: 19, specimenName: "PUS" },
    { id: 20, srNo: 20, specimenName: "UNSTAINED FIXED SLIDES" },
    { id: 21, srNo: 21, specimenName: "BLOOD IN PT VIAL" },
    { id: 22, srNo: 22, specimenName: "FLUID" },
    { id: 23, srNo: 23, specimenName: "1 - 2 CC EDTA BLOOD" },
    { id: 24, srNo: 24, specimenName: "2 - 3 CC EDTA BLOOD" },
  ]);

  const [newSpecimenName, setNewSpecimenName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNew = () => { setNewSpecimenName(""); setEditingId(null); setSelectedIds([]); };

  const handleSave = () => {
    if (newSpecimenName.trim()) {
      const newId = Math.max(...specimens.map(s => s.id), 0) + 1;
      setSpecimens([...specimens, { id: newId, srNo: specimens.length + 1, specimenName: newSpecimenName.trim() }]);
      setNewSpecimenName("");
    }
  };

  const handleModify = () => {
    if (selectedIds.length === 1) {
      const s = specimens.find(x => x.id === selectedIds[0]);
      setEditingId(s.id); setEditValue(s.specimenName);
    }
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setSpecimens(specimens.map(s => s.id === editingId ? { ...s, specimenName: editValue.trim() } : s));
      setEditingId(null); setEditValue(""); setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) { setSpecimens(specimens.filter(s => !selectedIds.includes(s.id))); setSelectedIds([]); }
  };

  const toggleSelection = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleSelectAll = () => setSelectedIds(selectedIds.length === specimens.length ? [] : specimens.map(s => s.id));

  const filtered = specimens.filter(s => s.specimenName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-medical-bg-app p-4">
      <div className="max-w-3xl mx-auto space-y-4">

        <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-medical-accent" />
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST SPECIMENS</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage specimen types for laboratory tests</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input placeholder="Search specimens..." className="pl-9 h-8 text-xs border-medical-border" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            {/* Table */}
            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              <div className="grid grid-cols-[40px_60px_1fr] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <div className="flex items-center">
                  <Checkbox checked={selectedIds.length === specimens.length && specimens.length > 0} onCheckedChange={toggleSelectAll} className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Specimen Name</span>
              </div>
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">No specimens found.</div>
                ) : filtered.map(specimen => (
                  <div key={specimen.id} className={cn("grid grid-cols-[40px_60px_1fr] px-3 py-2.5 transition-colors", selectedIds.includes(specimen.id) ? "bg-blue-50" : "hover:bg-slate-50/80")}>
                    <div className="flex items-center">
                      <Checkbox checked={selectedIds.includes(specimen.id)} onCheckedChange={() => toggleSelection(specimen.id)} className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center">{specimen.srNo}</span>
                    <div className="flex items-center">
                      {editingId === specimen.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <Input value={editValue} onChange={e => setEditValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSaveEdit()} className="h-7 text-xs border-medical-border flex-1" autoFocus />
                          <Button size="sm" onClick={handleSaveEdit} className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"><Save className="h-3 w-3" /></Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs border-medical-border"><X className="h-3 w-3" /></Button>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-800 font-mono">{specimen.specimenName}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIds.length > 0 && <p className="text-[11px] text-medical-accent font-medium">{selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected</p>}

            <Separator />

            <div>
              <Label className="text-[11px] text-slate-500 mb-1 block">New Specimen Name</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter specimen name..." value={newSpecimenName} onChange={e => setNewSpecimenName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSave()} className="h-8 text-xs border-medical-border flex-1" />
                <Button onClick={handleSave} disabled={!newSpecimenName.trim()} className="h-8 text-xs bg-[#82bdbb] hover:bg-[#00B5AE] text-white px-4">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleNew} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Plus className="h-3.5 w-3.5 mr-1" /> New</Button>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={!newSpecimenName.trim()} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Save className="h-3.5 w-3.5 mr-1" /> Save</Button>
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

export default LabTestsSpecimens;