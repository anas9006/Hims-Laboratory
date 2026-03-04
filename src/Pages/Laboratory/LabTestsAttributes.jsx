import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, Pencil, Trash2, X, FlaskConical, Search, Plus } from "lucide-react";
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

  // New attribute input fields
  const [newAttribute, setNewAttribute] = useState({
    attribute: "",
    unit: "",
    normalRange: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ attribute: "", unit: "", normalRange: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const [testAttribute] = useState({
    name: "HSV-2 (HERPES SIMPLEX VIRUS 2) IgG",
    unit: "IU/mL",
    normalRange: "Negative: < 0.9 | Borderline: 0.9 to 1.1 | Positive: > 1.1"
  });

  const handleClearNew = () => {
    setNewAttribute({ attribute: "", unit: "", normalRange: "" });
  };

  const handleSaveNew = () => {
    if (newAttribute.attribute.trim()) {
      const newId = Math.max(...attributes.map(a => a.id), 0) + 1;
      const newSrNo = attributes.length + 1;
      setAttributes([
        ...attributes,
        {
          id: newId,
          srNo: newSrNo,
          attribute: newAttribute.attribute.trim(),
          unit: newAttribute.unit.trim() || "-",
          normalRange: newAttribute.normalRange.trim() || "-"
        }
      ]);
      setNewAttribute({ attribute: "", unit: "", normalRange: "" });
    }
  };

  const handleModify = (id) => {
    const attribute = attributes.find(x => x.id === id);
    setEditingId(attribute.id);
    setEditValues({
      attribute: attribute.attribute,
      unit: attribute.unit,
      normalRange: attribute.normalRange
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editValues.attribute.trim()) {
      setAttributes(attributes.map(a => 
        a.id === editingId ? { 
          ...a, 
          attribute: editValues.attribute.trim(),
          unit: editValues.unit.trim() || "-",
          normalRange: editValues.normalRange.trim() || "-"
        } : a
      ));
      setEditingId(null);
      setEditValues({ attribute: "", unit: "", normalRange: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({ attribute: "", unit: "", normalRange: "" });
  };

  const handleDelete = (id) => {
    // Filter out the deleted item
    const filteredAttributes = attributes.filter(a => a.id !== id);
    // Update sr numbers sequentially
    const updatedAttributes = filteredAttributes.map((attr, index) => ({
      ...attr,
      srNo: index + 1
    }));
    setAttributes(updatedAttributes);
  };

  const filtered = attributes.filter(a =>
    a.attribute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.normalRange.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* First Card - Header and Add New */}
        <Card className="border-medical-border overflow-hidden border-l-4 border-l-[#00B5AE] bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:border-l-8">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-[#B2EBE9] flex items-center justify-center">
                <FlaskConical className="h-5 w-5 text-[#00B5AE]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST ATTRIBUTES</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage attributes, units and normal ranges</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* New Attribute Input Fields */}
            <div className="bg-blue-50/30 p-4 rounded-lg border border-blue-100">
              <Label className="text-[11px] text-slate-500 mb-2 block font-semibold">Add New Attribute</Label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <Input
                    placeholder="Attribute name *"
                    value={newAttribute.attribute}
                    onChange={e => setNewAttribute(p => ({ ...p, attribute: e.target.value }))}
                    className="h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Unit (e.g., IU/mL)"
                    value={newAttribute.unit}
                    onChange={e => setNewAttribute(p => ({ ...p, unit: e.target.value }))}
                    className="h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Normal range (optional)"
                    value={newAttribute.normalRange}
                    onChange={e => setNewAttribute(p => ({ ...p, normalRange: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && handleSaveNew()}
                    className="h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearNew}
                  className="h-8 text-xs border-medical-border text-slate-600 hover:bg-slate-50"
                >
                  <X className="h-3.5 w-3.5 mr-1" /> Clear
                </Button>
                <Button
                  onClick={handleSaveNew}
                  disabled={!newAttribute.attribute.trim()}
                  varient="default"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Attribute
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second Card - Table with Search */}
        <Card className="border-medical-border shadow-soft overflow-hidden">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search attributes, units or ranges..."
                className="pl-9 h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              {/* Header - Removed checkbox column */}
              <div className="grid grid-cols-[50px_2fr_80px_2fr_80px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Attribute</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Unit</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Normal Range</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Actions</span>
              </div>

              {/* Rows - Removed checkbox column */}
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">No attributes found.</div>
                ) : filtered.map(attr => (
                  <div
                    key={attr.id}
                    className={cn(
                      "grid grid-cols-[50px_2fr_80px_2fr_80px] px-3 py-2.5 transition-colors hover:bg-slate-50/80"
                    )}
                  >
                    <span className="text-xs text-slate-500 flex items-center">{attr.srNo}</span>

                    {/* Attribute column */}
                    <div className="flex items-center pr-2">
                      {editingId === attr.id ? (
                        <Input
                          value={editValues.attribute}
                          onChange={e => setEditValues(p => ({ ...p, attribute: e.target.value }))}
                          className="h-7 text-xs border-medical-border w-full"
                          autoFocus
                        />
                      ) : (
                        <span className="text-xs font-medium text-slate-800 truncate">{attr.attribute}</span>
                      )}
                    </div>

                    {/* Unit column */}
                    <div className="flex items-center pr-2">
                      {editingId === attr.id ? (
                        <Input
                          value={editValues.unit}
                          onChange={e => setEditValues(p => ({ ...p, unit: e.target.value }))}
                          className="h-7 text-xs border-medical-border w-full"
                        />
                      ) : (
                        <span className="text-xs text-slate-600">{attr.unit}</span>
                      )}
                    </div>

                    {/* Normal Range column with edit mode */}
                    <div className="flex items-center">
                      {editingId === attr.id ? (
                        <div className="flex items-center gap-1 w-full max-w-xs">
                          <Input
                            value={editValues.normalRange}
                            onChange={e => setEditValues(p => ({ ...p, normalRange: e.target.value }))}
                            onKeyDown={e => e.key === "Enter" && handleSaveEdit()}
                            className="h-7 text-xs border-medical-border flex-1"
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600 truncate" title={attr.normalRange}>
                          {attr.normalRange}
                        </span>
                      )}
                    </div>

                    {/* Actions Column */}
                    <div className="flex items-center gap-1">
                      {editingId === attr.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={handleSaveEdit}
                            className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700 text-white"
                            title="Save"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                            className="h-7 px-2 text-xs border-medical-border"
                            title="Cancel"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleModify(attr.id)}
                            className="h-7 w-7 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(attr.id)}
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-100!"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Removed selection info section */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabTestsAttributes;