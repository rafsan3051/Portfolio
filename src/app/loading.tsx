import { Column, Flex, Skeleton } from "@once-ui-system/core";

export default function Loading() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center" fillWidth>
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" fillWidth>
          <Skeleton shape="line" width="xl" height="xl" />
          <Skeleton shape="line" width="l" height="m" style={{ marginTop: "16px" }} />
          <Skeleton shape="block" width="m" height="m" style={{ marginTop: "24px" }} />
        </Column>
      </Column>
      <Flex fillWidth gap="l" direction="column">
        <Skeleton shape="block" width="xl" height="xl" />
        <Skeleton shape="line" width="l" height="m" />
        <Skeleton shape="line" width="xl" height="s" />
      </Flex>
    </Column>
  );
}
