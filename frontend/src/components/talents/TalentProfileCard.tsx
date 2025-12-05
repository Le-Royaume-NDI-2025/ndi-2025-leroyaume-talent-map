import { TalentDetailDto } from '../../lib/api/types';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MapPin, CheckCircle2, Briefcase } from 'lucide-react';

interface TalentProfileCardProps {
    talent: TalentDetailDto;
}

export function TalentProfileCard({ talent }: TalentProfileCardProps) {
    const getAvailabilityColor = () => {
        switch (talent.availabilityStatus) {
            case 'AVAILABLE':
                return 'bg-green-500/20 text-green-600 dark:text-green-400';
            case 'BUSY':
                return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
            case 'NOT_LOOKING':
                return 'bg-red-500/20 text-red-600 dark:text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
        }
    };

    const getAvailabilityText = () => {
        switch (talent.availabilityStatus) {
            case 'AVAILABLE':
                return '🟢 Available';
            case 'BUSY':
                return '🟡 Busy';
            case 'NOT_LOOKING':
                return '🔴 Not Looking';
            default:
                return 'Unknown';
        }
    };

    const getInitials = () => {
        return `${talent.firstName[0]}${talent.lastName[0]}`.toUpperCase();
    };

    return (
        <CardContainer className="inter-var w-full" containerClassName="py-8 w-full max-w-2xl mx-auto">
            <CardBody className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/30 border-gray-200 dark:border-gray-700 w-full max-w-full rounded-2xl p-6 sm:p-8 border-2 shadow-xl overflow-hidden">

                {/* Avatar + Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    {/* Avatar with 3D effect */}
                    <CardItem translateZ="70" className="flex-shrink-0">
                        <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-primary/20 shadow-lg">
                            <AvatarImage src={talent.profilePictureUrl} alt={`${talent.firstName} ${talent.lastName}`} />
                            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                                {getInitials()}
                            </AvatarFallback>
                        </Avatar>
                    </CardItem>

                    {/* Name and Title */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                        <CardItem
                            translateZ="50"
                            className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent break-words"
                        >
                            {talent.firstName} {talent.lastName}
                        </CardItem>
                        {talent.title && (
                            <CardItem
                                as="p"
                                translateZ="40"
                                className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2 sm:mt-3 flex items-center justify-center sm:justify-start gap-2 flex-wrap"
                            >
                                <Briefcase className="inline h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                                <span className="break-words">{talent.title}</span>
                            </CardItem>
                        )}
                    </div>

                    {/* Verified Badge */}
                    {talent.verified && (
                        <CardItem translateZ="60" className="flex-shrink-0">
                            <Badge variant="default" className="flex items-center gap-1.5 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 bg-primary shadow-lg">
                                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                Verified
                            </Badge>
                        </CardItem>
                    )}
                </div>

                {/* Location */}
                {(talent.city || talent.country) && (
                    <CardItem
                        translateZ="30"
                        className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base flex-wrap"
                    >
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        <span className="break-words">
                            {talent.city}
                            {talent.city && talent.country && ', '}
                            {talent.country}
                        </span>
                    </CardItem>
                )}

                {/* Bio */}
                {talent.bio && (
                    <CardItem
                        as="p"
                        translateZ="40"
                        className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed break-words text-center sm:text-left"
                    >
                        {talent.bio}
                    </CardItem>
                )}

                {/* Skills preview */}
                {talent.skills && talent.skills.length > 0 && (
                    <CardItem
                        translateZ="60"
                        className="w-full mb-4 sm:mb-6"
                    >
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-4 sm:p-5 border border-primary/20 shadow-md overflow-hidden">
                            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2 sm:mb-3">
                                Top Skills
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {talent.skills.slice(0, 6).map((skill, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs sm:text-sm py-1 px-2 sm:px-3 bg-white dark:bg-gray-800 shadow-sm whitespace-nowrap"
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                                {talent.skills.length > 6 && (
                                    <Badge variant="outline" className="text-xs sm:text-sm py-1 px-2 sm:px-3 whitespace-nowrap">
                                        +{talent.skills.length - 6} more
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </CardItem>
                )}

                {/* Availability status */}
                <CardItem
                    translateZ="40"
                    className="mb-4 sm:mb-6 flex justify-center sm:justify-start"
                >
                    <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getAvailabilityColor()}`}>
                        {getAvailabilityText()}
                    </div>
                </CardItem>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <CardItem
                        translateZ={0}
                        translateX={0}
                        as="div"
                        className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium"
                    >
                        {talent.verified ? '✓ Trusted Profile' : 'Community Member'}
                    </CardItem>

                    <CardItem
                        translateZ={0}
                        translateX={0}
                        as="div"
                        className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                    >
                        View Details →
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
