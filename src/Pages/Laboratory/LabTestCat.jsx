import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    if (newCategoryName.trim()) {
      const newId = Math.max(...labCategories.map(t => t.id), 0) + 1;
      const newSrNo = labCategories.length + 1;
      setLabCategories([...labCategories, { 
        id: newId, 
        srNo: newSrNo, 
        categoryName: newCategoryName.trim() 
      }]);
      setNewCategoryName("");
    }
  };

  const handleModify = (id) => {
    const category = labCategories.find(x => x.id === id);
    setEditingId(category.id);
    setEditValue(category.categoryName);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && editingId) {
      setLabCategories(labCategories.map(c => 
        c.id === editingId ? { ...c, categoryName: editValue.trim() } : c
      ));
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
    const filteredCategories = labCategories.filter(c => c.id !== id);
    // Update sr numbers sequentially
    const updatedCategories = filteredCategories.map((category, index) => ({
      ...category,
      srNo: index + 1
    }));
    setLabCategories(updatedCategories);
  };

  const filtered = labCategories.filter(c => 
    c.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST CATEGORIES</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage test categories for laboratory tests</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* Add new entry */}
            <div>
              <Label className="text-[11px] text-slate-500 mb-1 block">
                New Category Name
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="h-8 flex-1 w-full px-3 py-2 pl-10 border rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                />
                <Button
                  onClick={handleSave}
                  disabled={!newCategoryName.trim()}
                  variant="default"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
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
                placeholder="Search categories..."
                className="pl-9 h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
              {/* Header row - Removed checkbox column */}
              <div className="grid grid-cols-[60px_1fr_80px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Category Name</span>
                <span className="text-[11px] font-bold text-medical-blue flex items-center">Actions</span>
              </div>

              {/* Rows - Removed checkbox column */}
              <div className="divide-y divide-blue-50 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs italic">
                    No categories found.
                  </div>
                ) : (
                  filtered.map((category) => (
                    <div
                      key={category.id}
                      className={cn(
                        "grid grid-cols-[60px_1fr_80px] px-3 py-2.5 transition-colors hover:bg-slate-50/80"
                      )}
                    >
                      <span className="text-xs text-slate-500 flex items-center">{category.srNo}</span>

                      {/* Category Name column with edit mode */}
                      <div className="flex items-center">
                        {editingId === category.id ? (
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
                          <span className="text-xs font-medium text-slate-800 font-mono">
                            {category.categoryName}
                          </span>
                        )}
                      </div>

                      {/* Actions Column */}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleModify(category.id)}
                          className="h-7 w-7 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-100!"
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

export default LabTestsCategories;