"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }

        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (pathname?.startsWith(route) && routes[route]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth", { credentials: "include" });
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  // Redirect to /login when this route is protected and user is not authenticated
  useEffect(() => {
    if (!loading && isPasswordRequired && !isAuthenticated && pathname !== "/login") {
      router.replace(`/login?redirect=${encodeURIComponent(pathname || "/")}`);
    }
  }, [loading, isPasswordRequired, isAuthenticated, pathname, router]);

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
