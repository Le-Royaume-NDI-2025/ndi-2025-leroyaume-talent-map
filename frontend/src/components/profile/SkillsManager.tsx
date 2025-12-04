import { useState } from 'react';
import { SkillDto, SkillCategory, SkillLevel } from '../../lib/api/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, Trash2 } from 'lucide-react';

interface SkillsManagerProps {
    skills: SkillDto[];
    onChange: (skills: SkillDto[]) => void;
}

export function SkillsManager({ skills, onChange }: SkillsManagerProps) {
    const [open, setOpen] = useState(false);
    const [newSkill, setNewSkill] = useState<SkillDto>({
        name: '',
        category: SkillCategory.PROGRAMMING,
        level: SkillLevel.INTERMEDIATE,
    });

    const handleAdd = () => {
        if (newSkill.name.trim()) {
            onChange([...skills, newSkill]);
            setNewSkill({
                name: '',
                category: SkillCategory.PROGRAMMING,
                level: SkillLevel.INTERMEDIATE,
            });
            setOpen(false);
        }
    };

    const handleRemove = (index: number) => {
        onChange(skills.filter((_, i) => i !== index));
    };

    const getCategoryColor = (category: SkillCategory) => {
        const colors = {
            [SkillCategory.PROGRAMMING]: 'bg-blue-500',
            [SkillCategory.DESIGN]: 'bg-purple-500',
            [SkillCategory.MANAGEMENT]: 'bg-green-500',
            [SkillCategory.COMMUNICATION]: 'bg-orange-500',
            [SkillCategory.OTHER]: 'bg-gray-500',
        };
        return colors[category] || 'bg-gray-500';
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label>Skills</Label>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button type="button" size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Skill
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a Skill</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="skillName">Skill Name *</Label>
                                <Input
                                    id="skillName"
                                    placeholder="e.g. React, Python, Figma..."
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select
                                    value={newSkill.category}
                                    onValueChange={(value) => setNewSkill({ ...newSkill, category: value as SkillCategory })}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={SkillCategory.PROGRAMMING}>Programming</SelectItem>
                                        <SelectItem value={SkillCategory.DESIGN}>Design</SelectItem>
                                        <SelectItem value={SkillCategory.MANAGEMENT}>Management</SelectItem>
                                        <SelectItem value={SkillCategory.COMMUNICATION}>Communication</SelectItem>
                                        <SelectItem value={SkillCategory.OTHER}>Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="level">Level *</Label>
                                <Select
                                    value={newSkill.level}
                                    onValueChange={(value) => setNewSkill({ ...newSkill, level: value as SkillLevel })}
                                >
                                    <SelectTrigger id="level">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={SkillLevel.BEGINNER}>Beginner</SelectItem>
                                        <SelectItem value={SkillLevel.INTERMEDIATE}>Intermediate</SelectItem>
                                        <SelectItem value={SkillLevel.ADVANCED}>Advanced</SelectItem>
                                        <SelectItem value={SkillLevel.EXPERT}>Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="button" onClick={handleAdd} className="w-full">
                                Add Skill
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-2 pr-1">
                        <span className={`w-2 h-2 rounded-full ${getCategoryColor(skill.category)}`} />
                        {skill.name} • {skill.level}
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="ml-1 hover:bg-destructive/20 rounded p-0.5"
                        >
                            <Trash2 className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                {skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">No skills added yet</p>
                )}
            </div>
        </div>
    );
}
