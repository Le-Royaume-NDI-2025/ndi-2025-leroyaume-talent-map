import { Link } from 'react-router-dom';
import { TalentSummaryDto } from '../../lib/api/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { BorderBeam } from '../ui/border-beam';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MapPin } from 'lucide-react';

interface TalentCardProps {
    talent: TalentSummaryDto;
}

export function TalentCard({ talent }: TalentCardProps) {
    const getInitials = () => {
        return `${talent.firstName[0]}${talent.lastName[0]}`.toUpperCase();
    };

    return (
        <Link to={`/talents/${talent.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden">
                <BorderBeam
                    size={100}
                    duration={8}
                    delay={Math.random() * 5}
                    colorFrom="#3b82f6"
                    colorTo="#8b5cf6"
                    borderWidth={2}
                />
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                            <Avatar className="h-12 w-12 border-2 border-primary/20 flex-shrink-0">
                                <AvatarImage src={talent.profilePictureUrl} alt={`${talent.firstName} ${talent.lastName}`} />
                                <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                                    {getInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <CardTitle className="text-xl break-words">
                                    {talent.firstName} {talent.lastName}
                                </CardTitle>
                                {talent.title && (
                                    <p className="text-sm text-muted-foreground mt-1 break-words">{talent.title}</p>
                                )}
                            </div>
                        </div>
                        {talent.verified && (
                            <Badge variant="default" className="ml-2 flex-shrink-0">
                                ✓ Verified
                            </Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {(talent.city || talent.country) && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="break-words">
                                {talent.city}
                                {talent.city && talent.country && ', '}
                                {talent.country}
                            </span>
                        </div>
                    )}
                    {talent.skillNames && talent.skillNames.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                            {talent.skillNames.slice(0, 4).map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                            {talent.skillNames.length > 4 && (
                                <Badge variant="outline">+{talent.skillNames.length - 4}</Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
