import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Pencil, Trash2, X, FlaskConical, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const LabTestsAttributesGroups = () => {
    const [groups, setGroups] = useState([
        { id: 1, srNo: 1, group: "Chemical Examination", description: "" },
        { id: 2, srNo: 2, group: "Differential Leukocytes Count", description: "for cbc" },
        { id: 3, srNo: 3, group: "Microscope Examination", description: "" },
        { id: 4, srNo: 4, group: "Physical Examination", description: "" },
    ]);

    const [newGroup, setNewGroup] = useState({ group: "", description: "" });
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({ group: "", description: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const handleSave = () => {
        if (newGroup.group.trim()) {
            const newId = Math.max(...groups.map(g => g.id), 0) + 1;
            setGroups([...groups, { id: newId, srNo: groups.length + 1, group: newGroup.group.trim(), description: newGroup.description.trim() }]);
            setNewGroup({ group: "", description: "" });
        }
    };

    const handleModify = (id) => {
        const group = groups.find(x => x.id === id);
        setEditingId(group.id);
        setEditValues({ group: group.group, description: group.description || "" });
    };

    const handleSaveEdit = () => {
        if (editValues.group.trim() && editingId) {
            setGroups(groups.map(g => g.id === editingId ? { ...g, ...editValues } : g));
            setEditingId(null);
            setEditValues({ group: "", description: "" });
            setSelectedIds([]);
        }
    };

    const handleDelete = (id) => {
        setGroups(groups.filter(g => g.id !== id));
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    };

    const toggleSelection = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const toggleSelectAll = () => setSelectedIds(selectedIds.length === groups.length ? [] : groups.map(g => g.id));

    const filtered = groups.filter(g =>
        g.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-medical-bg-app p-4">
            <div className="max-w-4xl mx-auto space-y-4">
                <Card className="border-medical-border shadow-soft overflow-hidden border-l-4 border-l-[#00B5AE]">
                    <CardHeader className="pb-3 pt-5 px-5">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-lg bg-[#B2EBE9]  flex items-center justify-center">
                            
                                          <FlaskConical className="h-5 w-5 text-[#00B5AE] " />
                                          </div>
                            <div>
                                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST ATTRIBUTE GROUPS</h1>
                                <p className="text-[11px] text-slate-500 mt-0.5">Manage attribute groups and descriptions</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">



                        {/* Add new */}
                        <div>
                            <Label className="text-[11px] text-slate-500 mb-1 block">New Attribute Group</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    placeholder="Group name..."
                                    value={newGroup.group}
                                    onChange={e => setNewGroup(p => ({ ...p, group: e.target.value }))}
                                    className="h-8 text-xs border-medical-border"
                                />
                                <Input
                                    placeholder="Description (optional)..."
                                    value={newGroup.description}
                                    onChange={e => setNewGroup(p => ({ ...p, description: e.target.value }))}
                                    onKeyDown={e => e.key === "Enter" && handleSave()}
                                    className="h-8 text-xs border-medical-border"
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    onClick={handleSave}
                                    disabled={!newGroup.group.trim()}
                                    className="h-8 text-xs bg-medical-accent hover:bg-blue-600 text-white px-4"
                                >
                                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Group
                                </Button>
                            </div>
                        </div>
                        <Separator />
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <Input
                                placeholder="Search groups..."
                                className="pl-9 h-8 text-xs border-medical-border"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
                            {/* Header row with Actions column */}
                            <div className="grid grid-cols-[40px_50px_1fr_1fr_80px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={selectedIds.length === filtered.length && filtered.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                        className="h-3.5 w-3.5"
                                    />
                                </div>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Group</span>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Description</span>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Actions</span>
                            </div>

                            {/* Rows with Actions column */}
                            <div className="divide-y divide-blue-50 max-h-72 overflow-y-auto">
                                {filtered.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 text-xs italic">No groups found.</div>
                                ) : filtered.map(group => (
                                    <div
                                        key={group.id}
                                        className={cn(
                                            "grid grid-cols-[40px_50px_1fr_1fr_80px] px-3 py-2.5 transition-colors",
                                            selectedIds.includes(group.id) ? "bg-blue-50" : "hover:bg-slate-50/80"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <Checkbox
                                                checked={selectedIds.includes(group.id)}
                                                onCheckedChange={() => toggleSelection(group.id)}
                                                className="h-3.5 w-3.5"
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500 flex items-center">{group.srNo}</span>

                                        {/* Group column */}
                                        <div className="flex items-center pr-2">
                                            {editingId === group.id ? (
                                                <Input
                                                    value={editValues.group}
                                                    onChange={e => setEditValues(p => ({ ...p, group: e.target.value }))}
                                                    className="h-7 text-xs border-medical-border w-full"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="text-xs font-medium text-slate-800">{group.group}</span>
                                            )}
                                        </div>

                                        {/* Description column with edit mode */}
                                        <div className="flex items-center gap-2">
                                            {editingId === group.id ? (
                                                <>
                                                    <Input
                                                        value={editValues.description}
                                                        onChange={e => setEditValues(p => ({ ...p, description: e.target.value }))}
                                                        onKeyDown={e => e.key === "Enter" && handleSaveEdit()}
                                                        className="h-7 text-xs border-medical-border flex-1"
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
                                                </>
                                            ) : (
                                                <span className="text-xs text-slate-500">{group.description || "—"}</span>
                                            )}
                                        </div>

                                        {/* Actions Column with always active buttons */}
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleModify(group.id)}
                                                className="h-7 w-7 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                title="Edit"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(group.id)}
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

export default LabTestsAttributesGroups;