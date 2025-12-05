import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { talentsApi } from '../lib/api/talents';
import { TalentDetailDto } from '../lib/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Globe, BriefcaseIcon, ExternalLink } from 'lucide-react';
import { TalentProfileCard } from '../components/talents/TalentProfileCard';

export function TalentDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [talent, setTalent] = useState<TalentDetailDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const loadTalent = async () => {
            try {
                setLoading(true);
                const data = await talentsApi.getTalentById(id);
                setTalent(data);
            } catch (err) {
                setError('Failed to load talent profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadTalent();
    }, [id]);

    if (loading)
        return (
            <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
        );
    if (error || !talent)
        return (
            <div className="container mx-auto px-4 py-12 text-center text-destructive">
                {error || 'Talent not found'}
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* 3D Interactive Profile Card */}
            <div className="flex justify-center mb-12">
                <TalentProfileCard talent={talent} />
            </div>

            {/* Detailed Information Below */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Skills Section */}
                {talent.skills && talent.skills.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Skills & Expertise</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {talent.skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{skill.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {skill.category}
                                            </p>
                                        </div>
                                        <Badge variant="outline">{skill.level}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Languages Section */}
                {talent.languages && talent.languages.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Languages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {talent.languages.map((lang, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <p className="font-medium">{lang.languageName}</p>
                                        </div>
                                        <Badge variant="outline">{lang.proficiency}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Projects Section - Full Width */}
            {talent.projects && talent.projects.length > 0 && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Project Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            {talent.projects.map((project, idx) => (
                                <Card key={idx} className="bg-secondary/30">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <BriefcaseIcon className="h-5 w-5" />
                                            {project.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        {project.role && (
                                            <p className="font-medium text-primary">{project.role}</p>
                                        )}
                                        {project.description && (
                                            <p className="text-muted-foreground">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.technologies && (
                                            <div>
                                                <p className="font-medium text-xs text-muted-foreground mb-1">
                                                    Technologies
                                                </p>
                                                <p className="text-sm">{project.technologies}</p>
                                            </div>
                                        )}
                                        {(project.startDate || project.endDate) && (
                                            <p className="text-xs text-muted-foreground">
                                                {project.startDate}{' '}
                                                {project.endDate && `- ${project.endDate}`}
                                            </p>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline flex items-center gap-1 text-sm"
                                            >
                                                View Project <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
