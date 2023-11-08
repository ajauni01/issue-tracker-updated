// use the 'use client' directive to make sure that the usePathname hook is only rendered on the client,
"use client";
import { Skeleton } from "@/app/components";
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
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};
// create a sub component for the navbar links to refactor the code
const NavLinks = () => {
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
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {" "}
            {link.label}{" "}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// create a sub component for the user or dropdown menu to refactor the code
const AuthStatus = () => {
  const { status, data: session } = useSession();
  //   return null if the session is loading
  if (status === "loading") return <Skeleton width="3rem"/>;
  /* show the signin option if the user is not logged in */
  if (status === "unauthenticated")
    return <Link className="nav-link" href="api/auth/signin">Sign In</Link>;
  return (
    <Box>
      {/* show the signout option in a drop-down menu if the user is already logged in */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="4"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="api/auth/signout">Sign out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
