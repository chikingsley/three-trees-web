"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button";
import { LogoCard } from "./logo-card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Menu } from "lucide-react";

const courtOrderedClasses = [
  {
    title: "Domestic Violence",
    href: "/services/court-mandated/domestic-violence",
    description: "Classes focused on preventing and addressing domestic violence issues.",
  },
  {
    title: "Anger Management",
    href: "/services/court-mandated/anger-management",
    description: "Learn effective techniques to manage and control anger responses.",
  },
  {
    title: "Substance Abuse",
    href: "/services/court-mandated/substance-abuse",
    description: "Support and education for overcoming substance abuse challenges.",
  },
  {
    title: "Peaceful Parenting",
    href: "/services/court-mandated/peaceful-parenting",
    description: "Develop positive parenting skills and family relationships.",
  },
]

const collegePrograms = [
  {
    title: "Conflict Resolution",
    href: "/services/college/conflict-resolution",
    description: "Learn effective strategies for resolving conflicts and maintaining healthy relationships.",
  },
  {
    title: "Responsible Relationships",
    href: "/services/college/responsible-relationships",
    description: "Develop skills for building and maintaining healthy relationships in college and beyond.",
  },
  {
    title: "Rethinking Substance Abuse",
    href: "/services/college/substance-abuse",
    description: "Educational programs focused on substance abuse awareness and prevention for college students.",
  },
]

const corporatePrograms = [
  {
    title: "Staff Trainings",
    href: "/services/corporate/staff-trainings",
    description: "Comprehensive training programs designed to enhance workplace effectiveness and team dynamics.",
  },
  {
    title: "Certifications",
    href: "/services/corporate/certifications",
    description: "Professional certification programs for corporate and healthcare environments.",
  },
  {
    title: "Hospital Referrals",
    href: "/services/corporate/hospital-referrals",
    description: "Specialized referral programs tailored for healthcare institutions.",
  },
]

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-transparent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none group-hover:text-primary group-hover:font-bold transition-colors">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <LogoCard />

        {/* Desktop Menu - hidden on screens smaller than 1100px */}
        <NavigationMenu className="hidden max-xl:hidden xl:block">
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="border border-primary data-[state=open]:border-transparent data-[state=open]:bg-accent/30">Court-Ordered Classes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                  {courtOrderedClasses.map((classItem) => (
                    <ListItem
                      key={classItem.title}
                      title={classItem.title}
                      href={classItem.href}
                    >
                      {classItem.description}
                    </ListItem>
                  ))}
                  <li className="md:col-span-2">
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/sign-up/court-ordered"
                        className="block select-none rounded-md bg-primary text-primary-foreground p-3 text-center"
                      >
                        Sign Up for Court-Ordered Classes
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="border border-primary data-[state=open]:border-transparent data-[state=open]:bg-accent/30">College Programs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                  {collegePrograms.map((program) => (
                    <ListItem
                      key={program.title}
                      title={program.title}
                      href={program.href}
                    >
                      {program.description}
                    </ListItem>
                  ))}
                  <li className="md:col-span-2">
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/sign-up/college"
                        className="block select-none rounded-md bg-primary text-primary-foreground p-3 text-center hover:bg-primary/90"
                      >
                        Sign Up for College Programs
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="border border-primary data-[state=open]:border-transparent data-[state=open]:bg-accent/30">Corporate & Hospitals</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                  {corporatePrograms.map((program) => (
                    <ListItem
                      key={program.title}
                      title={program.title}
                      href={program.href}
                    >
                      {program.description}
                    </ListItem>
                  ))}
                  <li className="md:col-span-2">
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/sign-up/corporate"
                        className="block select-none rounded-md bg-primary text-primary-foreground p-3 text-center hover:bg-primary/90"
                      >
                        Sign Up for Corporate Programs
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="default" className={cn(navigationMenuTriggerStyle(), "border border-primary hover:border-primary/80 bg-primary text-primary-foreground")}>
                Sign In
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu - visible only on screens smaller than 1100px */}
        <Popover>
          <PopoverTrigger asChild className="xl:hidden">
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] p-4" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Court-Ordered Classes</h4>
                <div className="grid gap-1">
                  {courtOrderedClasses.map((classItem) => (
                    <Link
                      key={classItem.title}
                      href={classItem.href}
                      className="block p-2 text-base text-foreground hover:text-primary transition-colors"
                    >
                      {classItem.title}
                    </Link>
                  ))}
                  <Link
                    href="/sign-up/court-ordered"
                    className="block p-2 text-base font-medium text-primary hover:underline"
                  >
                    Sign Up for Court-Ordered Classes
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">College Programs</h4>
                <div className="grid gap-1">
                  {collegePrograms.map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
                      className="block p-2 text-base text-foreground hover:text-primary transition-colors"
                    >
                      {program.title}
                    </Link>
                  ))}
                  <Link
                    href="/sign-up/college"
                    className="block p-2 text-base font-medium text-primary hover:underline"
                  >
                    Sign Up for College Programs
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Corporate & Hospitals</h4>
                <div className="grid gap-1">
                  {corporatePrograms.map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
                      className="block p-2 text-base text-foreground hover:text-primary transition-colors"
                    >
                      {program.title}
                    </Link>
                  ))}
                  <Link
                    href="/sign-up/corporate"
                    className="block p-2 text-base font-medium text-primary hover:underline"
                  >
                    Sign Up for Corporate Programs
                  </Link>
                </div>
              </div>
              <Button asChild variant="ghost" className="w-full justify-start mt-2 text-base p-2 h-auto">
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
