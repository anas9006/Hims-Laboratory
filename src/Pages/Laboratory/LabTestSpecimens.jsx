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

  const handleModify = (id) => {
    const specimen = specimens.find(x => x.id === id);
    setEditingId(specimen.id);
    setEditValue(specimen.specimenName);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setSpecimens(specimens.map(s => s.id === editingId ? { ...s, specimenName: editValue.trim() } : s));
      setEditingId(null);
      setEditValue("");
      setSelectedIds([]);
    }
  };

  const handleDelete = (id) => {
    setSpecimens(specimens.filter(s => s.id !== id));
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
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
              <div className="w-12 h-12 rounded-lg bg-[#B2EBE9]  flex items-center justify-center">
              
                            <FlaskConical className="h-5 w-5 text-[#00B5AE] " />
                            </div>
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST SPECIMENS</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage specimen types for laboratory tests</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label className="text-[11px] text-slate-500 mb-1 block">New Specimen Name</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter specimen name..."
                  value={newSpecimenName}
                  onChange={e => setNewSpecimenName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSave()}
                  className="h-8 text-xs border-medical-border flex-1"
                />
                <Button
                  onClick={handleSave}
                  disabled={!newSpecimenName.trim()}
                  className="h-8 text-xs bg-[#82bdbb] hover:bg-[#00B5AE] text-white px-4"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </div>
            </div>

            <Separator />

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search specimens..."
                className="pl-9 h-8 text-xs border-medical-border"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              {/* Header row with Actions column */}
              <div className="grid grid-cols-[40px_60px_1fr_80px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="h-3.5 w-3.5"
                  />
                </div>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Specimen Name</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Actions</span>
              </div>

              {/* Rows with Actions column */}
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">No specimens found.</div>
                ) : filtered.map(specimen => (
                  <div
                    key={specimen.id}
                    className={cn(
                      "grid grid-cols-[40px_60px_1fr_80px] px-3 py-2.5 transition-colors",
                      selectedIds.includes(specimen.id) ? "bg-blue-50" : "hover:bg-slate-50/80"
                    )}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={selectedIds.includes(specimen.id)}
                        onCheckedChange={() => toggleSelection(specimen.id)}
                        className="h-3.5 w-3.5"
                      />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center">{specimen.srNo}</span>

                    {/* Specimen Name column with edit mode */}
                    <div className="flex items-center">
                      {editingId === specimen.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <Input
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSaveEdit()}
                            className="h-7 text-xs border-medical-border flex-1"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="h-7 px-2 text-xs border-medical-border"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-800 font-mono">{specimen.specimenName}</span>
                      )}
                    </div>

                    {/* Actions Column with always active buttons */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleModify(specimen.id)}
                        className="h-7 w-7 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(specimen.id)}
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIds.length > 0 && (
              <p className="text-[11px] text-medical-accent font-medium">
                {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabTestsSpecimens;