import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSave = () => {
    if (newTypeName.trim()) {
      const newId = Math.max(...labTests.map((t) => t.id), 0) + 1;
      const newSrNo = labTests.length + 1;
      setLabTests([...labTests, { id: newId, srNo: newSrNo, typeName: newTypeName.trim() }]);
      setNewTypeName("");
    }
  };

  const handleModify = (id) => {
    const selected = labTests.find((t) => t.id === id);
    setEditingId(id);
    setEditValue(selected.typeName);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setLabTests(labTests.map((t) => (t.id === editingId ? { ...t, typeName: editValue.trim() } : t)));
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = (id) => {
    // Filter out the deleted item
    const filteredTests = labTests.filter((t) => t.id !== id);
    // Update sr numbers sequentially
    const updatedTests = filteredTests.map((test, index) => ({
      ...test,
      srNo: index + 1
    }));
    setLabTests(updatedTests);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-medical-border overflow-hidden border-l-4 border-l-[#00B5AE] bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:border-l-8">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-[#B2EBE9] flex items-center justify-center">
                <FlaskConical className="h-5 w-5 text-[#00B5AE]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST TYPES</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage laboratory test type categories</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
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
                  className="h-8 flex-1 w-full px-3 py-2 pl-10 border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                />
                <Button
                  onClick={handleSave}
                  disabled={!newTypeName.trim()}
                  variant="default"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Main Table Card ── */}
        <Card className="border-medical-border shadow-soft overflow-hidden">
          <CardContent className="p-4 space-y-4">
            {/* Table */}
            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              {/* Header row - Removed checkbox column */}
              <div className="grid grid-cols-[60px_1fr_80px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Lab Type</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Actions</span>
              </div>

              {/* Rows - Removed checkbox column */}
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
                        "grid grid-cols-[60px_1fr_80px] px-3 py-2.5 transition-colors hover:bg-slate-50/80"
                      )}
                    >
                      <span className="text-xs text-slate-500 flex items-center">{test.srNo}</span>
                      
                      <div className="flex items-center">
                        {editingId === test.id ? (
                          <div className="flex items-center gap-2 w-full max-w-md">
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

                      {/* Actions Column */}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleModify(test.id)}
                          className="h-7 w-7 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(test.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:!bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Removed selection info section */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabTestsTypes;