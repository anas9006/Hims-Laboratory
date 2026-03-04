import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({ group: "", description: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const handleClearNew = () => {
        setNewGroup({ group: "", description: "" });
    };

    const handleSave = () => {
        if (newGroup.group.trim()) {
            const newId = Math.max(...groups.map(g => g.id), 0) + 1;
            const newSrNo = groups.length + 1;
            setGroups([...groups, { 
                id: newId, 
                srNo: newSrNo, 
                group: newGroup.group.trim(), 
                description: newGroup.description.trim() 
            }]);
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
            setGroups(groups.map(g => 
                g.id === editingId ? { 
                    ...g, 
                    group: editValues.group.trim(), 
                    description: editValues.description.trim() 
                } : g
            ));
            setEditingId(null);
            setEditValues({ group: "", description: "" });
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditValues({ group: "", description: "" });
    };

    const handleDelete = (id) => {
        // Filter out the deleted item
        const filteredGroups = groups.filter(g => g.id !== id);
        // Update sr numbers sequentially
        const updatedGroups = filteredGroups.map((group, index) => ({
            ...group,
            srNo: index + 1
        }));
        setGroups(updatedGroups);
    };

    const filtered = groups.filter(g =>
        g.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <h1 className="text-lg font-bold text-medical-blue tracking-tight">LAB TEST ATTRIBUTE GROUPS</h1>
                                <p className="text-[11px] text-slate-500 mt-0.5">Manage attribute groups and descriptions</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        {/* Add new group form */}
                        <div>
                            <Label className="text-[11px] text-slate-500 mb-1 block">New Attribute Group</Label>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <Input
                                    placeholder="Group name *"
                                    value={newGroup.group}
                                    onChange={e => setNewGroup(p => ({ ...p, group: e.target.value }))}
                                    className="h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                                />
                                <Input
                                    placeholder="Description (optional)"
                                    value={newGroup.description}
                                    onChange={e => setNewGroup(p => ({ ...p, description: e.target.value }))}
                                    onKeyDown={e => e.key === "Enter" && handleSave()}
                                    className="h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                                />
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
                                    onClick={handleSave}
                                    disabled={!newGroup.group.trim()}
                                  variant="default"
                                >
                                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Group
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
                                placeholder="Search groups or descriptions..."
                                className="pl-9 h-8 text-xs border-medical-border w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00B9B3] focus:border-[#00B9B3] transition-all duration-200"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Table */}
                        <div className="border-2 border-blue-100 rounded-lg overflow-hidden">
                            {/* Header - Removed checkbox column */}
                            <div className="grid grid-cols-[50px_1fr_1fr_80px] bg-slate-50/80 border-b border-blue-100 px-3 py-2">
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Sr.#</span>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Group</span>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Description</span>
                                <span className="text-[11px] font-bold text-medical-blue flex items-center">Actions</span>
                            </div>

                            {/* Rows - Removed checkbox column */}
                            <div className="divide-y divide-blue-50 max-h-72 overflow-y-auto">
                                {filtered.length === 0 ? (
                                    <div className="text-center py-10 text-slate-400 text-xs italic">No groups found.</div>
                                ) : filtered.map(group => (
                                    <div
                                        key={group.id}
                                        className={cn(
                                            "grid grid-cols-[50px_1fr_1fr_80px] px-3 py-2.5 transition-colors hover:bg-slate-50/80"
                                        )}
                                    >
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
                                        <div className="flex items-center">
                                            {editingId === group.id ? (
                                                <Input
                                                    value={editValues.description}
                                                    onChange={e => setEditValues(p => ({ ...p, description: e.target.value }))}
                                                    onKeyDown={e => e.key === "Enter" && handleSaveEdit()}
                                                    className="h-7 text-xs border-medical-border w-full"
                                                />
                                            ) : (
                                                <span className="text-xs text-slate-500">{group.description || "—"}</span>
                                            )}
                                        </div>

                                        {/* Actions Column */}
                                        <div className="flex items-center gap-1">
                                            {editingId === group.id ? (
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

export default LabTestsAttributesGroups;