'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Column, Heading, Input, PasswordInput, Button, Text, Flex } from '@once-ui-system/core';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirect') || '/dashboard';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // If already authenticated, go straight to redirect target
    const check = async () => {
      try {
        const res = await fetch('/api/check-auth', { credentials: 'include' });
        if (res.ok) {
          window.location.href = redirectTo;
        }
      } catch {
        // Not authenticated, show login form
      } finally {
        setChecking(false);
      }
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    setError('');

    try {
      console.log('[login] Submitting credentials...');
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      
      console.log('[login] Response status:', res.status);
      const data = await res.json().catch(() => ({}));
      console.log('[login] Response data:', data);
      
      if (res.ok && data.success) {
        console.log('[login] Success! Redirecting to:', redirectTo);
        // Give the session cookie time to be set
        await new Promise(resolve => setTimeout(resolve, 100));
        window.location.href = redirectTo;
      } else {
        console.log('[login] Failed:', data.message);
        setError(data.message || 'Invalid credentials');
        setLoading(false);
      }
    } catch (err) {
      console.error('[login] Error:', err);
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <Flex fillWidth paddingY="128" horizontal="center">
      <Column maxWidth={24} gap="16" fillWidth>
        {checking ? (
          <Heading align="center">Checking authentication...</Heading>
        ) : (
          <>
            <Heading align="center">Sign in</Heading>
            <form onSubmit={handleLogin} autoComplete="off">
              <Column gap="12" fillWidth>
                <Input
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  disabled={loading}
                />
                <PasswordInput
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  errorMessage={error || undefined}
                />
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </Button>
              </Column>
            </form>
            {error && (
              <Text onBackground="danger-weak" align="center">
                {error}
              </Text>
            )}
          </>
        )}
      </Column>
    </Flex>
  );
}
