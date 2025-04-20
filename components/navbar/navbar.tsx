"use client"

import * as React from "react"
import { useState, useEffect } from "react";
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
import { Logo } from "./logo";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  // State to track scroll position
  const [scrolled, setScrolled] = useState(false);

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Set scrolled to true if scrolled more than 50px, false otherwise
      setScrolled(offset > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <nav className={cn(
      "fixed z-50 transition-all duration-300 ease-in-out",
      scrolled
        ? "top-6 inset-x-2 max-w-8xl mx-auto rounded-md bg-white shadow-md h-16 xs:h-[4.5rem]"
        : "top-0 inset-x-0 rounded-none bg-gradient-to-b from-black/50 to-transparent shadow-none h-26 xs:h-16"
    )}>
      <div className={cn(
        "h-full flex items-center justify-between",
        scrolled ? "max-w-full px-6" : "max-w-8xl mx-auto"
      )}>
        <LogoCard scrolled={scrolled} />

        {/* Desktop Menu - hidden on screens smaller than 1100px */}
        <NavigationMenu className="hidden max-[1450px]:hidden min-[1450px]:block pr-6">
          <NavigationMenuList>
            {/* Court-Ordered Classes */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "uppercase transition-colors duration-300 text-sm px-2 py-2",
                scrolled
                  ? "data-[state=open]:border-transparent data-[state=open]:bg-accent/30 text-foreground"
                  : "border-transparent bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10"
              )}>
                Court-Ordered Classes
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Overview Header */}
                <Link href="/services/court-mandated/overview" className="block select-none text-secondary text-xl font-semibold text-center px-4 py-2 hover:text-primary hover:underline">
                  Court-Ordered Classes Overview
                </Link>

                {/* Separator */}
                <div className="md:col-span-2">
                  <div className="h-px bg-border" />
                </div>

                <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
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
              <NavigationMenuTrigger className={cn(
                "uppercase transition-colors duration-300 text-sm px-2 py-2",
                scrolled
                  ? "data-[state=open]:border-transparent data-[state=open]:bg-accent/30 text-foreground"
                  : "border-transparent bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10"
              )}>
                College Programs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Overview Header */}
                <Link
                  href="/services/college/overview"
                  className="block select-none text-secondary text-xl font-semibold text-center px-4 py-2 hover:text-primary hover:underline"
                >
                  College Programs Overview
                </Link>
                {/* Separator */}
                <div className="md:col-span-2">
                  <div className="h-px bg-border" />
                </div>
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
              <NavigationMenuTrigger className={cn(
                "uppercase transition-colors duration-300 text-sm px-2 py-2",
                scrolled
                  ? "data-[state=open]:border-transparent data-[state=open]:bg-accent/30 text-foreground"
                  : "border-transparent bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10"
              )}>
                Corporate & Hospitals
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Overview Header */}
                <Link
                  href="/services/corporate/overview"
                  className="block select-none text-secondary text-xl font-semibold text-center px-4 py-2 hover:text-primary hover:underline"
                >
                  Corporate & Hospitals Overview
                </Link>
                {/* Separator */}
                <div className="md:col-span-2">
                  <div className="h-px bg-border" />
                </div>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className={cn(
                  "group uppercase flex items-center gap-1 px-4 py-2 h-9 rounded-md transition-colors duration-300 border border-primary-foreground",
                  scrolled
                    ? "text-foreground hover:bg-secondary data-[state=open]:bg-secondary data-[state=open]:text-primary-foreground data-[state=open]:border-transparent"
                    : "border-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:border-primary-foreground"
                )}>
                  <span>About Us</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
                    scrolled ? "text-muted-foreground" : "text-white",
                    "group-hover:text-white",
                    "group-data-[state=open]:text-white"
                  )} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="center" sideOffset={4} className="w-[400px] p-4">
                <ul className="grid gap-3">
                  {aboutUsLinks.map((link) => (
                    <ListItem
                      key={link.title}
                      title={link.title}
                      href={link.href}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            {/* Vertical Divider - Conditionally visible? Maybe hide when not scrolled? */}
            <div className={cn(
              "h-8 w-px mx-1 transition-colors duration-300",
              scrolled ? "bg-border" : "bg-white/30" // Adjusted initial divider color
            )}></div>

            {/* Enroll Now */}
            <NavigationMenuItem className="px-2">
              <Button variant="default" className={cn(navigationMenuTriggerStyle(), "border border-primary hover:border-primary/80 bg-primary text-primary-foreground uppercase")}>
                Enroll Now
              </Button>
            </NavigationMenuItem>
            {/* Sign In Portal */}
            <NavigationMenuItem>
              <Button
                variant="default"
                className={cn(navigationMenuTriggerStyle(),
                  "border border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary hover:text-primary-foreground uppercase",
                  scrolled ? "bg-transparent text-primary border-primary hover:bg-primary/90" : "text-primary-foreground hover:bg-primary/90"
                )}>
                Sign In Portal
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu - visible only on screens smaller than 1450px */}
        <Sheet>
          <SheetTrigger asChild className="min-[1450]:hidden">
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto">
            <SheetHeader className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Logo size="default" scrolled={scrolled} className="pl-0" />
                <SheetTitle className="text-xl text-primary font-bold sr-only">Three Trees</SheetTitle>
              </div>
            </SheetHeader>

            <Accordion type="single" collapsible className="w-full">
              {/* Court-Ordered Classes */}
              <AccordionItem value="court-ordered">
                <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                  <span className="text-lg font-medium">Court-Ordered Classes</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-2 py-2">
                    {courtOrderedClasses.map((classItem) => (
                      <SheetClose asChild key={classItem.title}>
                        <Link
                          href={classItem.href}
                          className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {classItem.title}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/sign-up/court-ordered"
                        className="block p-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        Sign Up for Court-Ordered Classes
                      </Link>
                    </SheetClose>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* College Programs */}
              <AccordionItem value="college">
                <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                  <span className="text-lg font-medium">College Programs</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-2 py-2">
                    {collegePrograms.map((program) => (
                      <SheetClose asChild key={program.title}>
                        <Link
                          href={program.href}
                          className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {program.title}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/sign-up/college"
                        className="block p-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        Sign Up for College Programs
                      </Link>
                    </SheetClose>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Corporate & Hospitals */}
              <AccordionItem value="corporate">
                <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                  <span className="text-lg font-medium">Corporate & Hospitals</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-2 py-2">
                    {corporatePrograms.map((program) => (
                      <SheetClose asChild key={program.title}>
                        <Link
                          href={program.href}
                          className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {program.title}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/sign-up/corporate"
                        className="block p-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        Sign Up for Corporate Programs
                      </Link>
                    </SheetClose>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* About Us */}
              <AccordionItem value="about">
                <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                  <span className="text-lg font-medium">About Us</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-2 py-2">
                    {aboutUsLinks.map((link) => (
                      <SheetClose asChild key={link.title}>
                        <Link
                          href={link.href}
                          className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {link.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <SheetClose asChild>
                <Button asChild variant="default" className="w-full justify-center">
                  <Link href="/enroll">Enroll Now</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full justify-center">
                  <Link href="/signin">Sign In</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
