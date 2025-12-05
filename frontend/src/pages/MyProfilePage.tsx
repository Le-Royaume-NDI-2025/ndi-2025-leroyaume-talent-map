import { useState, useEffect } from 'react';
import { talentsApi } from '../lib/api/talents';
import { MyTalentProfileDto, UpsertTalentProfileRequest, AvailabilityStatus } from '../lib/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { SkillsManager } from '../components/profile/SkillsManager';
import { LanguagesManager } from '../components/profile/LanguagesManager';
import { ProjectsManager } from '../components/profile/ProjectsManager';
import { Upload } from 'lucide-react';

export function MyProfilePage() {
  const [profile, setProfile] = useState<MyTalentProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  const [formData, setFormData] = useState<UpsertTalentProfileRequest>({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    city: '',
    country: '',
    profilePictureUrl: '',
    availabilityStatus: AvailabilityStatus.NOT_LOOKING,
    skills: [],
    languages: [],
    projects: [],
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await talentsApi.getMyProfile();
      setProfile(data);
      setHasProfile(true);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title || '',
        bio: data.bio || '',
        city: data.city || '',
        country: data.country || '',
        profilePictureUrl: data.profilePictureUrl || '',
        availabilityStatus: data.availabilityStatus,
        skills: data.skills || [],
        languages: data.languages || [],
        projects: data.projects || [],
      });
    } catch (err: any) {
      if (err.status === 404) {
        setHasProfile(false);
      } else {
        setError('Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const response = await talentsApi.uploadProfilePicture(file);
      setFormData({ ...formData, profilePictureUrl: response.url });
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (hasProfile) {
        await talentsApi.updateProfile(formData);
      } else {
        await talentsApi.createProfile(formData);
        setHasProfile(true);
      }
      await loadProfile();
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (!formData.firstName || !formData.lastName) return '?';
    return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Talent Profile</h1>

      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {profile?.verified && (
        <div className="bg-green-500/15 text-green-700 px-4 py-3 rounded mb-6">
          ✓ Your profile is verified!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage src={formData.profilePictureUrl} alt="Profile picture preview" />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3 w-full">
                <Label htmlFor="picture-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary transition-colors">
                    <Upload className="h-5 w-5" />
                    <span>
                      {uploading ? 'Uploading...' : 'Click to upload image'}
                    </span>
                  </div>
                  <Input
                    id="picture-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  Upload a profile picture (JPG, PNG, GIF). Max size: 5MB
                </p>
                {formData.profilePictureUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, profilePictureUrl: '' })}
                  >
                    Remove Picture
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Full Stack Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability Status</Label>
              <Select
                value={formData.availabilityStatus}
                onValueChange={(value) => setFormData({ ...formData, availabilityStatus: value as AvailabilityStatus })}
              >
                <SelectTrigger id="availability">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AvailabilityStatus.AVAILABLE}>🟢 Available</SelectItem>
                  <SelectItem value={AvailabilityStatus.BUSY}>🟡 Busy</SelectItem>
                  <SelectItem value={AvailabilityStatus.NOT_LOOKING}>🔴 Not Looking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillsManager
              skills={formData.skills || []}
              onChange={(skills) => setFormData({ ...formData, skills })}
            />
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguagesManager
              languages={formData.languages || []}
              onChange={(languages) => setFormData({ ...formData, languages })}
            />
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Project Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsManager
              projects={formData.projects || []}
              onChange={(projects) => setFormData({ ...formData, projects })}
            />
          </CardContent>
        </Card>

        <Separator />

        <div className="flex gap-4">
          <Button type="submit" disabled={saving || uploading}>
            {saving ? 'Saving...' : hasProfile ? 'Update Profile' : 'Create Profile'}
          </Button>
          {hasProfile && (
            <Button type="button" variant="outline" onClick={loadProfile} disabled={saving || uploading}>
              Reset Changes
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
