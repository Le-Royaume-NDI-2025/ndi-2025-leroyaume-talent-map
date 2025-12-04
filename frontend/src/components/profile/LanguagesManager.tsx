import { useState } from 'react';
import { LanguageSkillDto, LanguageProficiency } from '../../lib/api/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, Trash2, Globe } from 'lucide-react';

interface LanguagesManagerProps {
    languages: LanguageSkillDto[];
    onChange: (languages: LanguageSkillDto[]) => void;
}

export function LanguagesManager({ languages, onChange }: LanguagesManagerProps) {
    const [open, setOpen] = useState(false);
    const [newLanguage, setNewLanguage] = useState<LanguageSkillDto>({
        languageName: '',
        proficiency: LanguageProficiency.CONVERSATIONAL,
    });

    const handleAdd = () => {
        if (newLanguage.languageName.trim()) {
            onChange([...languages, newLanguage]);
            setNewLanguage({
                languageName: '',
                proficiency: LanguageProficiency.CONVERSATIONAL,
            });
            setOpen(false);
        }
    };

    const handleRemove = (index: number) => {
        onChange(languages.filter((_, i) => i !== index));
    };

    const getProficiencyColor = (proficiency: LanguageProficiency) => {
        const colors = {
            [LanguageProficiency.BASIC]: 'bg-yellow-500',
            [LanguageProficiency.CONVERSATIONAL]: 'bg-blue-500',
            [LanguageProficiency.PROFESSIONAL]: 'bg-purple-500',
            [LanguageProficiency.NATIVE]: 'bg-green-500',
        };
        return colors[proficiency] || 'bg-gray-500';
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label>Languages</Label>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button type="button" size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Language
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a Language</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="languageName">Language *</Label>
                                <Input
                                    id="languageName"
                                    placeholder="e.g. English, French, Spanish..."
                                    value={newLanguage.languageName}
                                    onChange={(e) => setNewLanguage({ ...newLanguage, languageName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="proficiency">Proficiency *</Label>
                                <Select
                                    value={newLanguage.proficiency}
                                    onValueChange={(value) => setNewLanguage({ ...newLanguage, proficiency: value as LanguageProficiency })}
                                >
                                    <SelectTrigger id="proficiency">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={LanguageProficiency.BASIC}>Basic</SelectItem>
                                        <SelectItem value={LanguageProficiency.CONVERSATIONAL}>Conversational</SelectItem>
                                        <SelectItem value={LanguageProficiency.PROFESSIONAL}>Professional</SelectItem>
                                        <SelectItem value={LanguageProficiency.NATIVE}>Native</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="button" onClick={handleAdd} className="w-full">
                                Add Language
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="gap-2 pr-1">
                        <Globe className="h-3 w-3" />
                        <span className={`w-2 h-2 rounded-full ${getProficiencyColor(lang.proficiency)}`} />
                        {lang.languageName} ({lang.proficiency})
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="ml-1 hover:bg-destructive/20 rounded p-0.5"
                        >
                            <Trash2 className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                {languages.length === 0 && (
                    <p className="text-sm text-muted-foreground">No languages added yet</p>
                )}
            </div>
        </div>
    );
}
