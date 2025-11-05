'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Heading, Text, Button, Input, Spinner, Row, Column } from '@once-ui-system/core';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'repositories' | 'security'>('profile');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    role: '',
    avatar: '',
    location: '',
    email: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // GitHub state
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/admin/github');
      if (response.ok) {
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadDashboardData() {
    try {
      const response = await fetch('/api/admin/github');
      if (response.ok) {
        const data = await response.json();
        setRepos(data.repos || []);
        
        // Load profile from user data
        if (data.user) {
          setProfile({
            firstName: data.user.name?.split(' ')[0] || '',
            lastName: data.user.name?.split(' ').slice(1).join(' ') || '',
            role: data.user.bio || '',
            avatar: data.user.avatar_url || '',
            location: data.user.location || '',
            email: data.user.email || '',
          });
        }
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Network error');
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  async function handleSaveProfile() {
    setIsSavingProfile(true);
    setProfileMessage('');

    try {
      // If a new avatar file is selected, upload it first
      if (avatarFile) {
        const form = new FormData();
        form.append('file', avatarFile);
        const upRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: form,
        });
        const upData = await upRes.json();
        if (upRes.ok && upData.url) {
          profile.avatar = upData.url;
        } else {
          setProfileMessage(upData.error || 'Avatar upload failed');
          setIsSavingProfile(false);
          return;
        }
      }

      const response = await fetch('/api/admin/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (response.ok) {
        setProfileMessage('Profile updated successfully!');
      } else {
        setProfileMessage('Failed to update profile');
      }
    } catch (error) {
      setProfileMessage('Network error');
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setIsChangingPassword(true);
    setPasswordMessage('');

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMessage('Password updated successfully. New logins will use the new password.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage(data.error || 'Failed to update password');
      }
    } catch (error) {
      setPasswordMessage('Network error');
    } finally {
      setIsChangingPassword(false);
    }
  }

  async function handleSyncRepos() {
    setIsSyncing(true);
    setSyncMessage('');

    try {
      const response = await fetch('/api/admin/sync-repos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedRepos }),
      });

      if (response.ok) {
        const data = await response.json();
        const removed = Array.isArray(data.removed) ? data.removed : [];
        const removedInfo = removed.length > 0 ? ` | Removed: ${removed.length} (${removed.join(', ')})` : '';
        setSyncMessage(`Successfully synced ${data.synced} repositories${removedInfo}.`);
      } else {
        setSyncMessage('Failed to sync repositories');
      }
    } catch (error) {
      setSyncMessage('Network error');
    } finally {
      setIsSyncing(false);
    }
  }

  function toggleRepoSelection(repoName: string) {
    setSelectedRepos((prev) =>
      prev.includes(repoName)
        ? prev.filter((name) => name !== repoName)
        : [...prev, repoName]
    );
  }

  if (isLoading) {
    return (
      <Flex fillWidth paddingY="l" gap="m" direction="column" vertical="center">
        <Spinner size="l" />
        <Text variant="body-default-s">Loading dashboard...</Text>
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return (
      <Flex fillWidth paddingY="l" gap="m" direction="column" vertical="center">
        <Flex
          maxWidth={20}
          fillWidth
          padding="l"
          radius="l"
          border="neutral-medium"
          background="surface"
          direction="column"
          gap="m"
        >
          <Heading variant="display-strong-s">Admin Login</Heading>
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="m">
              <Input
                id="username"
                label="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
              {loginError && (
                <Text variant="body-default-s" onBackground="danger-weak">
                  {loginError}
                </Text>
              )}
              <Button type="submit" variant="primary" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex fillWidth paddingY="l" gap="l" direction="column">
      <Flex fillWidth horizontal="between" vertical="center">
        <Heading variant="display-strong-m">Dashboard</Heading>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>

      {/* Tabs */}
      <Flex gap="m">
        <Button
          variant={activeTab === 'profile' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </Button>
        <Button
          variant={activeTab === 'repositories' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('repositories')}
        >
          Repositories
        </Button>
        <Button
          variant={activeTab === 'security' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('security')}
        >
          Security
        </Button>
      </Flex>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Flex fillWidth gap="l" direction="column">
          <Flex
            fillWidth
            padding="l"
            radius="l"
            border="neutral-medium"
            background="surface"
            direction="column"
            gap="m"
          >
            <Heading variant="heading-strong-l">Profile Details</Heading>
            <Row gap="l" wrap>
              <Column maxWidth={12} gap="m" fillWidth>
                <Input
                  id="firstName"
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                />
                <Input
                  id="role"
                  label="Role"
                  value={profile.role}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, role: e.target.value })}
                />
                <Input
                  id="location"
                  label="Location"
                  value={profile.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                />
                <Input
                  id="email"
                  label="Email"
                  value={profile.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </Column>

              <Column maxWidth={12} gap="m" fillWidth>
                <Heading variant="heading-strong-s">Avatar</Heading>
                <Flex gap="m" vertical="center">
                  {(avatarPreview || profile.avatar) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarPreview || profile.avatar}
                      alt="Avatar preview"
                      style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover', border: '1px solid var(--neutral-200)'}}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setAvatarFile(file);
                      setAvatarPreview(file ? URL.createObjectURL(file) : '');
                    }}
                  />
                </Flex>
              </Column>
            </Row>
            {profileMessage && (
              <Text variant="body-default-s" onBackground="success-weak">
                {profileMessage}
              </Text>
            )}
            <Button
              variant="primary"
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
            >
              {isSavingProfile ? 'Saving...' : 'Save Profile'}
            </Button>
          </Flex>
        </Flex>
      )}

      {/* Repositories Tab */}
      {activeTab === 'repositories' && (
        <Flex
          fillWidth
          padding="l"
          radius="l"
          border="neutral-medium"
          background="surface"
          direction="column"
          gap="m"
        >
          <Heading variant="heading-strong-l">GitHub Repositories</Heading>
          <Text variant="body-default-m">
            Select repositories to sync to your portfolio
          </Text>
          <Flex direction="column" gap="s">
            {repos.map((repo) => (
              <Flex
                key={repo.id}
                padding="m"
                radius="m"
                border="neutral-medium"
                gap="m"
                vertical="center"
              >
                <input
                  type="checkbox"
                  checked={selectedRepos.includes(repo.name)}
                  onChange={() => toggleRepoSelection(repo.name)}
                />
                <Flex direction="column" gap="xs" fillWidth>
                  <Text variant="body-strong-m">{repo.name}</Text>
                  <Text variant="body-default-s">{repo.description}</Text>
                  <Flex gap="s">
                    {repo.language && (
                      <Text variant="label-default-s">
                        Language: {repo.language}
                      </Text>
                    )}
                    <Text variant="label-default-s">⭐ {repo.stargazers_count}</Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
          {syncMessage && (
            <Text variant="body-default-s" onBackground="success-weak">
              {syncMessage}
            </Text>
          )}
          <Button
            variant="primary"
            onClick={handleSyncRepos}
            disabled={isSyncing || selectedRepos.length === 0}
          >
            {isSyncing ? 'Syncing...' : `Sync ${selectedRepos.length} Selected`}
          </Button>
        </Flex>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Flex
          fillWidth
          padding="l"
          radius="l"
          border="neutral-medium"
          background="surface"
          direction="column"
          gap="m"
        >
          <Heading variant="heading-strong-l">Change Password</Heading>
          <form onSubmit={handleChangePassword}>
            <Flex direction="column" gap="m">
              <Input
                id="currentPassword"
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
                required
              />
              <Input
                id="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                required
              />
              <Input
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordMessage && (
                <Text variant="body-default-s" onBackground={passwordMessage.startsWith('Password updated') ? 'success-weak' : 'danger-weak'}>
                  {passwordMessage}
                </Text>
              )}
              <Button type="submit" variant="primary" disabled={isChangingPassword}>
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Flex>
  );
}
