import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Pencil, Trash2, X, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const LabTestsTypes = () => {
  const [labTests, setLabTests] = useState([
    { id: 1, srNo: 1, typeName: "Lab Routine" },
    { id: 2, srNo: 2, typeName: "Special Test" },
    { id: 3, srNo: 3, typeName: "Out Source" },
  ]);

  const [newTypeName, setNewTypeName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleNew = () => {
    setNewTypeName("");
    setEditingId(null);
    setSelectedIds([]);
  };

  const handleSave = () => {
    if (newTypeName.trim()) {
      const newId = Math.max(...labTests.map((t) => t.id), 0) + 1;
      const newSrNo = labTests.length + 1;
      setLabTests([...labTests, { id: newId, srNo: newSrNo, typeName: newTypeName.trim() }]);
      setNewTypeName("");
    }
  };

  const handleModify = () => {
    if (selectedIds.length === 1) {
      const selected = labTests.find((t) => t.id === selectedIds[0]);
      setEditingId(selectedIds[0]);
      setEditValue(selected.typeName);
    }
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setLabTests(labTests.map((t) => (t.id === editingId ? { ...t, typeName: editValue.trim() } : t)));
      setEditingId(null);
      setEditValue("");
      setSelectedIds([]);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      setLabTests(labTests.filter((t) => !selectedIds.includes(t.id)));
      setSelectedIds([]);
    }
  };

  const toggleSelection = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = () =>
    setSelectedIds(selectedIds.length === labTests.length ? [] : labTests.map((t) => t.id));

  return (
    <div className="min-h-screen bg-medical-bg-app p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* ── Main Table Card ── */}
        <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
           <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-medical-accent" />
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST TYPES</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage laboratory test type categories</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">

            {/* Table */}
            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-[40px_60px_1fr] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedIds.length === labTests.length && labTests.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="h-3.5 w-3.5"
                  />
                </div>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Lab Type</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-blue-50 max-h-72 overflow-y-auto">
                {labTests.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">
                    No lab test types found. Add one below.
                  </div>
                ) : (
                  labTests.map((test) => (
                    <div
                      key={test.id}
                      className={cn(
                        "grid grid-cols-[40px_60px_1fr] px-3 py-2.5 transition-colors",
                        selectedIds.includes(test.id) ? "bg-blue-50" : "hover:bg-slate-50/80"
                      )}
                    >
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedIds.includes(test.id)}
                          onCheckedChange={() => toggleSelection(test.id)}
                          className="h-3.5 w-3.5"
                        />
                      </div>
                      <span className="text-xs text-slate-500 flex items-center">{test.srNo}</span>
                      <div className="flex items-center">
                        {editingId === test.id ? (
                          <div className="flex items-center gap-2 w-full">
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
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
                              onClick={handleCancelEdit}
                              className="h-7 px-2 text-xs border-medical-border"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-slate-800">{test.typeName}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Selection info */}
            {selectedIds.length > 0 && (
              <p className="text-[11px] text-medical-accent font-medium">
                {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
              </p>
            )}

            <Separator />

            {/* Add new entry */}
            <div>
              <Label className="text-[11px] text-slate-500 mb-1 block">
                New Type Name
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter lab test type name..."
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="h-8 text-xs border-medical-border flex-1"
                />
                <Button
                  onClick={handleSave}
                  disabled={!newTypeName.trim()}
                  className="h-8 text-xs bg-medical-accent hover:bg-blue-600 text-white px-4"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </div>
            </div>

            <Separator />

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNew}
                  className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> New
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={!newTypeName.trim()}
                  className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"
                >
                  <Save className="h-3.5 w-3.5 mr-1" /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleModify}
                  disabled={selectedIds.length !== 1}
                  className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"
                >
                  <Pencil className="h-3.5 w-3.5 mr-1" /> Modify
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  disabled={selectedIds.length === 0}
                  className="h-8 text-xs border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs border-medical-border text-slate-500 hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5 mr-1" /> Exit
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabTestsTypes;