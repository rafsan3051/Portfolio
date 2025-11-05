"use client";

import { Button, Column, Flex, Heading, Text, Row, Icon } from "@once-ui-system/core";
import { useState } from "react";

interface GitHubStatsProps {
  username: string;
}

export function GitHubStats({ username }: GitHubStatsProps) {
  const [stats, setStats] = useState<{
    repos: number;
    stars: number;
    followers: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch stats on mount
  if (typeof window !== 'undefined' && stats === null) {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          repos: data.public_repos || 0,
          stars: 0, // Will need separate call for total stars
          followers: data.followers || 0,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  if (loading || !stats) {
    return null;
  }

  return (
    <Row gap="m" wrap fillWidth horizontal="center">
      <Flex
        padding="m"
        radius="m"
        border="neutral-medium"
        gap="8"
        vertical="center"
        background="surface"
      >
        <Icon name="github" size="m" />
        <Column gap="4">
          <Text variant="heading-strong-m">{stats.repos}</Text>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Repositories
          </Text>
        </Column>
      </Flex>

      <Flex
        padding="m"
        radius="m"
        border="neutral-medium"
        gap="8"
        vertical="center"
        background="surface"
      >
        <Icon name="person" size="m" />
        <Column gap="4">
          <Text variant="heading-strong-m">{stats.followers}</Text>
          <Text variant="label-default-s" onBackground="neutral-weak">
            Followers
          </Text>
        </Column>
      </Flex>
    </Row>
  );
}
