import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Pencil, Trash2, X, FlaskConical, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const LabReportingFormats = () => {
  const [formats, setFormats] = useState([
    { id: 1, srNo: 1, formatName: "BIOCHEMISTRY" },
    { id: 2, srNo: 2, formatName: "BIOPSY" },
    { id: 3, srNo: 3, formatName: "CROSS MATCH" },
    { id: 4, srNo: 4, formatName: "CULTURE" },
    { id: 5, srNo: 5, formatName: "ELISA" },
    { id: 6, srNo: 6, formatName: "FLUID FOR ANALYSIS" },
    { id: 7, srNo: 7, formatName: "Group Tests" },
    { id: 8, srNo: 8, formatName: "MOLECULAR DIAGNOSTIC" },
    { id: 9, srNo: 9, formatName: "REGULAR" },
    { id: 10, srNo: 10, formatName: "RENAL FUNCTION" },
    { id: 11, srNo: 11, formatName: "Single Tests" },
    { id: 12, srNo: 12, formatName: "SPECIAL BIO-CHEMISTRY" },
  ]);

  const [newFormatName, setNewFormatName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNew = () => { setNewFormatName(""); setEditingId(null); setSelectedIds([]); };

  const handleSave = () => {
    if (newFormatName.trim()) {
      const newId = Math.max(...formats.map(f => f.id), 0) + 1;
      setFormats([...formats, { id: newId, srNo: formats.length + 1, formatName: newFormatName.trim() }]);
      setNewFormatName("");
    }
  };

  const handleModify = () => {
    if (selectedIds.length === 1) {
      const f = formats.find(x => x.id === selectedIds[0]);
      setEditingId(f.id); setEditValue(f.formatName);
    }
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setFormats(formats.map(f => f.id === editingId ? { ...f, formatName: editValue.trim() } : f));
      setEditingId(null); setEditValue(""); setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) { setFormats(formats.filter(f => !selectedIds.includes(f.id))); setSelectedIds([]); }
  };

  const toggleSelection = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleSelectAll = () => setSelectedIds(selectedIds.length === formats.length ? [] : formats.map(f => f.id));

  const filtered = formats.filter(f => f.formatName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-medical-bg-app p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-medical-accent" />
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB REPORTING FORMATS</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage report formats for laboratory tests</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input placeholder="Search formats..." className="pl-9 h-8 text-xs border-medical-border" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              <div className="grid grid-cols-[40px_60px_1fr] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <div className="flex items-center">
                  <Checkbox checked={selectedIds.length === formats.length && formats.length > 0} onCheckedChange={toggleSelectAll} className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Format Name</span>
              </div>
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">No formats found.</div>
                ) : filtered.map(format => (
                  <div key={format.id} className={cn("grid grid-cols-[40px_60px_1fr] px-3 py-2.5 transition-colors", selectedIds.includes(format.id) ? "bg-blue-50" : "hover:bg-slate-50/80")}>
                    <div className="flex items-center">
                      <Checkbox checked={selectedIds.includes(format.id)} onCheckedChange={() => toggleSelection(format.id)} className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center">{format.srNo}</span>
                    <div className="flex items-center">
                      {editingId === format.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <Input value={editValue} onChange={e => setEditValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSaveEdit()} className="h-7 text-xs border-medical-border flex-1" autoFocus />
                          <Button size="sm" onClick={handleSaveEdit} className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"><Save className="h-3 w-3" /></Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs border-medical-border"><X className="h-3 w-3" /></Button>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-800">{format.formatName}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIds.length > 0 && <p className="text-[11px] text-medical-accent font-medium">{selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected</p>}

            <Separator />

            <div>
              <Label className="text-[11px] text-slate-500 mb-1 block">New Format Name</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter format name..." value={newFormatName} onChange={e => setNewFormatName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSave()} className="h-8 text-xs border-medical-border flex-1" />
                <Button onClick={handleSave} disabled={!newFormatName.trim()} className="h-8 text-xs bg-medical-accent hover:bg-blue-600 text-white px-4">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleNew} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Plus className="h-3.5 w-3.5 mr-1" /> New</Button>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={!newFormatName.trim()} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Save className="h-3.5 w-3.5 mr-1" /> Save</Button>
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

export default LabReportingFormats;