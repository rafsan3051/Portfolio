"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Row,
  Tag,
  Icon,
} from "@once-ui-system/core";
import { useState } from "react";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  featured = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Column 
      fillWidth 
      gap="m" 
      className={styles.projectCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {featured && (
          <div className={styles.featuredBadge} aria-label="Featured project">
            <span>Featured</span>
          </div>
        )}
        <Carousel
          priority={priority}
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
        {isHovered && (
          <div className={styles.overlay}>
            <Flex 
              fillWidth 
              fillHeight 
              vertical="center" 
              horizontal="center"
              gap="m"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            >
              <SmartLink
                suffixIcon="arrowRight"
                style={{ margin: "0", width: "fit-content" }}
                href={href}
              >
                <Text variant="body-default-m" style={{ color: "white" }}>View Details</Text>
              </SmartLink>
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-m" style={{ color: "white" }}>Live Demo</Text>
                </SmartLink>
              )}
            </Flex>
          </div>
        )}
      </div>
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
        className={styles.content}
      >
        <Row fillWidth horizontal="between" vertical="center">
          {title && (
            <Flex flex={5}>
              <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                {title}
              </Heading>
            </Flex>
          )}
          {avatars?.length > 0 && (
            <Flex>
              <AvatarGroup avatars={avatars} size="m" reverse />
            </Flex>
          )}
        </Row>
        {description?.trim() && (
          <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
            {description}
          </Text>
        )}
        <Flex gap="24" wrap>
          {content?.trim() && (
            <SmartLink
              suffixIcon="arrowRight"
              style={{ margin: "0", width: "fit-content" }}
              href={href}
            >
              <Text variant="body-default-s">Read case study</Text>
            </SmartLink>
          )}
          {link && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: "0", width: "fit-content" }}
              href={link}
            >
              <Text variant="body-default-s">View project</Text>
            </SmartLink>
          )}
        </Flex>
      </Flex>
    </Column>
  );
};
