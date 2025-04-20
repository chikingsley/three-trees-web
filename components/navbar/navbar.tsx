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
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

const aboutUsLinks = [
  {
    title: "Our Method",
    href: "/about/method",
    description: "Learn about our evidence-based approach to behavioral change.",
  },
  {
    title: "Our Presence",
    href: "/about/presence",
    description: "Discover our impact and locations across the country.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Insights, research, and stories about behavioral health and rehabilitation.",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with our team for inquiries or support.",
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
    <nav className="fixed z-50 top-6 inset-x-2 h-18 xs:h-16 bg-white shadow-md max-w-8xl mx-auto rounded-md">
      <div className="h-full flex items-center justify-between mx-auto">
        <LogoCard />

        {/* Desktop Menu - hidden on screens smaller than 1100px */}
        <NavigationMenu className="hidden max-[1300px]:hidden min-[1300px]:block pr-6">
          <NavigationMenuList className="gap-2 lg:gap-3">
            {/* Court-Ordered Classes */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="border border-primary data-[state=open]:border-transparent data-[state=open]:bg-accent/30">Court-Ordered Classes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                  {/* Overview Button */}
                  <li className="md:col-span-2">
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/services/court-mandated/overview"
                        className="block select-none text-primary text-3xl font-semibold text-center py-2"
                      >
                        Court-Ordered Classes
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  
                  {/* Separator */}
                  <li className="md:col-span-2 my-2">
                    <div className="h-px bg-border" />
                  </li>
                  
                  {/* Individual Classes */}
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
            {/* College Programs */}
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
            {/* Corporate & Hospitals */}
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
            {/* About Us */}
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border border-primary data-[state=open]:border-transparent data-[state=open]:bg-accent/30 hover:bg-transparent flex items-center gap-1 px-4 py-2 h-9 rounded-md">
                    <span>About Us</span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[400px] p-0 rounded-md">
                  <div className="grid w-full gap-3 p-4">
                    {aboutUsLinks.map((link) => (
                      <Link 
                        key={link.title}
                        href={link.href}
                        className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-transparent"
                      >
                        <div className="text-sm font-medium leading-none group-hover:text-primary group-hover:font-bold transition-colors">{link.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {link.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
            
            {/* Vertical Divider */}
            <div className="h-8 w-px bg-border mx-1"></div>
            
            {/* Enroll Now */}
            <NavigationMenuItem>
              <Button variant="default" className={cn(navigationMenuTriggerStyle(), "border border-primary hover:border-primary/80 bg-primary text-primary-foreground")}>
                Enroll Now
              </Button>
            </NavigationMenuItem>
            {/* Sign In Portal */}
            <NavigationMenuItem>
              <Button variant="default" className={cn(navigationMenuTriggerStyle(), "border border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground")}>
                Sign In Portal
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu - visible only on screens smaller than 1100px */}
        <Popover>
          <PopoverTrigger asChild className="min-[1300px]:hidden">
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
