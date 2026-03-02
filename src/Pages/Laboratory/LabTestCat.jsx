import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Pencil, Trash2, X, FlaskConical, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const LabTestsCategories = () => {
  const [labCategories, setLabCategories] = useState([
    { id: 1, srNo: 1, categoryName: "---" },
    { id: 2, srNo: 2, categoryName: "CHEMICAL PATHOLOGY" },
    { id: 3, srNo: 3, categoryName: "URINE CHEMISTRY" },
    { id: 4, srNo: 4, categoryName: "SPECIAL CHEMISTRY" },
    { id: 5, srNo: 5, categoryName: "CSF" },
    { id: 6, srNo: 6, categoryName: "SPECIAL STAINS" },
    { id: 7, srNo: 7, categoryName: "URINE ANALYSIS" },
    { id: 8, srNo: 8, categoryName: "MICROBIOLOGY" },
    { id: 9, srNo: 9, categoryName: "CHEMISTRY" },
    { id: 10, srNo: 10, categoryName: "STOOL EXAMINATION" },
    { id: 11, srNo: 11, categoryName: "SEMEN ANALYSIS" },
    { id: 12, srNo: 12, categoryName: "CYTOLOGY" },
    { id: 13, srNo: 13, categoryName: "FLUID EXAMINATION" },
    { id: 14, srNo: 14, categoryName: "HAEMATOLOGY" },
    { id: 15, srNo: 15, categoryName: "SEROLOGY" },
    { id: 16, srNo: 16, categoryName: "SEROLOGY ELISA" },
    { id: 17, srNo: 17, categoryName: "IMMUNOLOGY" },
    { id: 18, srNo: 18, categoryName: "MOLECULAR BIOLOGY" },
    { id: 19, srNo: 19, categoryName: "HISTOPATHOLOGY" },
    { id: 20, srNo: 20, categoryName: "CLINICAL PATHOLOGY" },
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNew = () => { setNewCategoryName(""); setEditingId(null); setSelectedIds([]); };

  const handleSave = () => {
    if (newCategoryName.trim()) {
      const newId = Math.max(...labCategories.map(t => t.id), 0) + 1;
      setLabCategories([...labCategories, { id: newId, srNo: labCategories.length + 1, categoryName: newCategoryName.trim() }]);
      setNewCategoryName("");
    }
  };

  const handleModify = () => {
    if (selectedIds.length === 1) {
      const c = labCategories.find(x => x.id === selectedIds[0]);
      setEditingId(c.id); setEditValue(c.categoryName);
    }
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setLabCategories(labCategories.map(c => c.id === editingId ? { ...c, categoryName: editValue.trim() } : c));
      setEditingId(null); setEditValue(""); setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) { setLabCategories(labCategories.filter(c => !selectedIds.includes(c.id))); setSelectedIds([]); }
  };

  const toggleSelection = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleSelectAll = () => setSelectedIds(selectedIds.length === labCategories.length ? [] : labCategories.map(c => c.id));

  const filtered = labCategories.filter(c => c.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-medical-bg-app p-4">
      <div className="max-w-3xl mx-auto space-y-4">

        <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-medical-accent" />
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST CATEGORIES</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage test categories for laboratory tests</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input placeholder="Search categories..." className="pl-9 h-8 text-xs border-medical-border" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              <div className="grid grid-cols-[40px_60px_1fr] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <div className="flex items-center">
                  <Checkbox checked={selectedIds.length === labCategories.length && labCategories.length > 0} onCheckedChange={toggleSelectAll} className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Category Name</span>
              </div>
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">No categories found.</div>
                ) : filtered.map(category => (
                  <div key={category.id} className={cn("grid grid-cols-[40px_60px_1fr] px-3 py-2.5 transition-colors", selectedIds.includes(category.id) ? "bg-blue-50" : "hover:bg-slate-50/80")}>
                    <div className="flex items-center">
                      <Checkbox checked={selectedIds.includes(category.id)} onCheckedChange={() => toggleSelection(category.id)} className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center">{category.srNo}</span>
                    <div className="flex items-center">
                      {editingId === category.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <Input value={editValue} onChange={e => setEditValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSaveEdit()} className="h-7 text-xs border-medical-border flex-1" autoFocus />
                          <Button size="sm" onClick={handleSaveEdit} className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"><Save className="h-3 w-3" /></Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="h-7 px-2 text-xs border-medical-border"><X className="h-3 w-3" /></Button>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-800 font-mono">{category.categoryName}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIds.length > 0 && <p className="text-[11px] text-medical-accent font-medium">{selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected</p>}

            <Separator />

            <div>
              <Label className="text-[11px] text-slate-500 mb-1 block">New Category Name</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter category name..." value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSave()} className="h-8 text-xs border-medical-border flex-1" />
                <Button onClick={handleSave} disabled={!newCategoryName.trim()} className="h-8 text-xs bg-medical-accent hover:bg-blue-600 text-white px-4">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleNew} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Plus className="h-3.5 w-3.5 mr-1" /> New</Button>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={!newCategoryName.trim()} className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"><Save className="h-3.5 w-3.5 mr-1" /> Save</Button>
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

export default LabTestsCategories;