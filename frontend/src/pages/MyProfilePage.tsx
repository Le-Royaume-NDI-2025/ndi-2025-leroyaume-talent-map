import { useState, useEffect } from 'react';
import { talentsApi } from '../lib/api/talents';
import { MyTalentProfileDto, UpsertTalentProfileRequest, AvailabilityStatus } from '../lib/api/types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { SkillsManager } from '../components/profile/SkillsManager';
import { LanguagesManager } from '../components/profile/LanguagesManager';
import { ProjectsManager } from '../components/profile/ProjectsManager';
import { Separator } from '../components/ui/separator';

export function MyProfilePage() {
  const [profile, setProfile] = useState<MyTalentProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);

  const [formData, setFormData] = useState<UpsertTalentProfileRequest>({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    city: '',
    country: '',
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
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : hasProfile ? 'Update Profile' : 'Create Profile'}
          </Button>
          {hasProfile && (
            <Button type="button" variant="outline" onClick={loadProfile}>
              Reset Changes
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
