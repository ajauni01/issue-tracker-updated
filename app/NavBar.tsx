// use the 'use client' directive to make sure that the usePathname hook is only rendered on the client,
"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const { status, data: session } = useSession();

  /*
    In order to reduce the repetition of the href, label, 
    and tailwind class names, we can create an array of objects that contain the href and label
     for each link. Then we can map over the array and render a Link component for each object in the array, 
     and add the class names only once
     */
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  // usePathname is a hook that returns the current path of the page, and we use the current path to set the active link.
  const currentPath = usePathname();
  return (
    <nav className="border-b mb-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            {/* navbar links */}
            <Link href="/">
              {" "}
              <AiFillBug />{" "}
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transation-colors": true,
                    })}
                    href={link.href}
                  >
                    {" "}
                    {link.label}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          {/* show the current user status */}
          <Box>
            {/* show the signout option if the user is already logged in */}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="4"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="api/auth/signout">Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {/* show the signin option if the user is not logged in */}
            {status === "unauthenticated" && (
              <Link href="api/auth/signin">Sign In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
export default NavBar;
