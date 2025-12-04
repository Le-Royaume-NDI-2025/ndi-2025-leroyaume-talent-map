import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { talentsApi } from '../lib/api/talents';
import { TalentDetailDto } from '../lib/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, BriefcaseIcon, Globe } from 'lucide-react';

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
                const data = await talentsApi.getById(id);
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

    if (loading) return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
    if (error || !talent) return <div className="container mx-auto px-4 py-12 text-center text-destructive">{error || 'Talent not found'}</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-3xl mb-2">
                                {talent.firstName} {talent.lastName}
                            </CardTitle>
                            {talent.title && <p className="text-xl text-muted-foreground">{talent.title}</p>}
                        </div>
                        {talent.verified && (
                            <Badge variant="default" className="text-lg px-3 py-1">✓ Verified Talent</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {(talent.city || talent.country) && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-5 w-5" />
                            <span>{talent.city}{talent.city && talent.country && ', '}{talent.country}</span>
                        </div>
                    )}

                    {talent.bio && (
                        <div>
                            <h3 className="font-semibold mb-2">About</h3>
                            <p className="text-muted-foreground">{talent.bio}</p>
                        </div>
                    )}

                    {talent.skills && talent.skills.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">Skills</h3>
                            <div className="flex gap-2 flex-wrap">
                                {talent.skills.map((skill, idx) => (
                                    <Badge key={idx} variant="secondary">
                                        {skill.name} • {skill.level}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {talent.languages && talent.languages.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">Languages</h3>
                            <div className="flex gap-2 flex-wrap">
                                {talent.languages.map((lang, idx) => (
                                    <Badge key={idx} variant="outline">
                                        <Globe className="h-3 w-3 mr-1" />
                                        {lang.languageName} ({lang.proficiency})
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {talent.projects && talent.projects.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">Projects</h3>
                            <div className="space-y-4">
                                {talent.projects.map((project, idx) => (
                                    <Card key={idx}>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <BriefcaseIcon className="h-4 w-4" />
                                                {project.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            {project.role && <p className="text-sm font-medium">{project.role}</p>}
                                            {project.description && <p className="text-sm text-muted-foreground">{project.description}</p>}
                                            {project.technologies && (
                                                <p className="text-sm"><span className="font-medium">Technologies:</span> {project.technologies}</p>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                                    View Project →
                                                </a>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
