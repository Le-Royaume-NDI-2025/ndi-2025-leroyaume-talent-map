import { useState } from 'react';
import { ProjectExperienceDto } from '../../lib/api/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2, Briefcase, ExternalLink } from 'lucide-react';

interface ProjectsManagerProps {
    projects: ProjectExperienceDto[];
    onChange: (projects: ProjectExperienceDto[]) => void;
}

export function ProjectsManager({ projects, onChange }: ProjectsManagerProps) {
    const [open, setOpen] = useState(false);
    const [newProject, setNewProject] = useState<ProjectExperienceDto>({
        name: '',
        description: '',
        role: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: '',
    });

    const handleAdd = () => {
        if (newProject.name.trim()) {
            onChange([...projects, newProject]);
            setNewProject({
                name: '',
                description: '',
                role: '',
                technologies: '',
                link: '',
                startDate: '',
                endDate: '',
            });
            setOpen(false);
        }
    };

    const handleRemove = (index: number) => {
        onChange(projects.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label>Projects</Label>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button type="button" size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add a Project</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="projectName">Project Name *</Label>
                                <Input
                                    id="projectName"
                                    placeholder="e.g. E-commerce Platform"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Your Role</Label>
                                <Input
                                    id="role"
                                    placeholder="e.g. Full Stack Developer"
                                    value={newProject.role || ''}
                                    onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe what the project does and your contributions..."
                                    value={newProject.description || ''}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="technologies">Technologies</Label>
                                <Input
                                    id="technologies"
                                    placeholder="e.g. React, Node.js, PostgreSQL"
                                    value={newProject.technologies || ''}
                                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link">Project Link</Label>
                                <Input
                                    id="link"
                                    type="url"
                                    placeholder="https://..."
                                    value={newProject.link || ''}
                                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={newProject.startDate || ''}
                                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input
                                        id="endDate"
                                        type="date"
                                        value={newProject.endDate || ''}
                                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button type="button" onClick={handleAdd} className="w-full">
                                Add Project
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-3">
                {projects.map((project, index) => (
                    <Card key={index} className="relative">
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 hover:bg-destructive/20 rounded p-1"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                {project.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {project.role && <p className="font-medium">{project.role}</p>}
                            {project.description && <p className="text-muted-foreground">{project.description}</p>}
                            {project.technologies && (
                                <p><span className="font-medium">Technologies:</span> {project.technologies}</p>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center gap-1"
                                >
                                    View Project <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                            {(project.startDate || project.endDate) && (
                                <p className="text-xs text-muted-foreground">
                                    {project.startDate} {project.endDate && `- ${project.endDate}`}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
                {projects.length === 0 && (
                    <p className="text-sm text-muted-foreground py-4">No projects added yet</p>
                )}
            </div>
        </div>
    );
}
