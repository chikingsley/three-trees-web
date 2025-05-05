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
import { Button } from "../../components/ui/button";
import { LogoCard } from "@/components/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// --- Type Definitions ---
interface NavLinkItem {
  title: string;
  href: string;
  description?: string; // For ListItem usage
}

interface ButtonLink {
  text?: string;
  href?: string;
}

interface OverviewLink {
  title?: string;
  href?: string;
}

interface NavbarProps {
  courtOrderedClasses?: NavLinkItem[];
  courtOrderedOverview?: OverviewLink;
  courtOrderedSignUp?: ButtonLink;
  
  collegePrograms?: NavLinkItem[];
  collegeOverview?: OverviewLink;
  collegeSignUp?: ButtonLink;
  
  corporatePrograms?: NavLinkItem[];
  corporateOverview?: OverviewLink;
  corporateSignUp?: ButtonLink;

  aboutUsLinks?: NavLinkItem[];

  enrollButton?: ButtonLink;
  signInButton?: ButtonLink;
}

// --- Default Values ---
const defaultProps: Required<NavbarProps> = {
  courtOrderedClasses: [], // Default to empty, hide section
  courtOrderedOverview: {
    title: "Court-Ordered Classes Overview",
    href: "/services/court-mandated/overview",
  },
  courtOrderedSignUp: {
    text: "Sign Up for Court-Ordered Classes",
    href: "/sign-up/court-ordered",
  },
  collegePrograms: [], // Default to empty, hide section
  collegeOverview: {
    title: "College Programs Overview",
    href: "/services/college/overview",
  },
  collegeSignUp: {
    text: "Sign Up for College Programs",
    href: "/sign-up/college",
  },
  corporatePrograms: [], // Default to empty, hide section
  corporateOverview: {
    title: "Corporate & Hospitals Overview",
    href: "/services/corporate/overview",
  },
  corporateSignUp: {
    text: "Sign Up for Corporate Programs",
    href: "/sign-up/corporate",
  },
  aboutUsLinks: [], // Default to empty, hide section
  enrollButton: {
    text: "Enroll Now",
    href: "/enroll-now", // Path to the new enrollment form
  },
  signInButton: {
    text: "Sign In Portal",
    href: "/signin", // Assuming /signin is the target page
  },
};

// Hardcoded data removed

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

const Navbar = (props: NavbarProps) => {
  // Merge passed props with defaults, ensuring deep merge for nested objects like buttons
  const finalProps = { 
    ...defaultProps, 
    ...props, 
    // Ensure button/link objects are merged properly if partially provided
    courtOrderedOverview: { ...defaultProps.courtOrderedOverview, ...props.courtOrderedOverview },
    courtOrderedSignUp: { ...defaultProps.courtOrderedSignUp, ...props.courtOrderedSignUp },
    collegeOverview: { ...defaultProps.collegeOverview, ...props.collegeOverview },
    collegeSignUp: { ...defaultProps.collegeSignUp, ...props.collegeSignUp },
    corporateOverview: { ...defaultProps.corporateOverview, ...props.corporateOverview },
    corporateSignUp: { ...defaultProps.corporateSignUp, ...props.corporateSignUp },
    enrollButton: { ...defaultProps.enrollButton, ...props.enrollButton },
    signInButton: { ...defaultProps.signInButton, ...props.signInButton },
  };

  const {
    courtOrderedClasses,
    courtOrderedOverview,
    courtOrderedSignUp,
    collegePrograms,
    collegeOverview,
    collegeSignUp,
    corporatePrograms,
    corporateOverview,
    corporateSignUp,
    aboutUsLinks,
    enrollButton,
    signInButton,
  } = finalProps;

  // State to track scroll position
  const [scrolled, setScrolled] = useState(false);
  // State to track menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
    <>
      <nav className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out w-full",
        scrolled
          ? "top-6 inset-x-2 max-w-8xl mx-auto rounded-md bg-white shadow-md h-16 xs:h-[4.5rem]"
          : "top-0 inset-x-0 rounded-none bg-gradient-to-b from-black/50 to-transparent shadow-none h-26 xs:h-16"
      )}>
        <div className={cn(
          "h-full flex items-center justify-between",
          scrolled ? "max-w-full pr-4 md:pr-6" : "max-w-8xl mx-auto pr-4 md:px-6"
        )}>
          <LogoCard scrolled={scrolled} />

          {/* Desktop Menu - hidden on screens smaller than 1450px */}
          <NavigationMenu className="hidden max-[1450px]:hidden min-[1450px]:block pr-6">
            <NavigationMenuList>
              {/* Court-Ordered Classes - Conditional Rendering */}
              {courtOrderedClasses && courtOrderedClasses.length > 0 && (
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
                    {courtOrderedOverview?.href && (
                      <Link href={courtOrderedOverview.href} className="block select-none text-secondary text-xl font-semibold text-center px-4 py-2 hover:text-primary hover:underline">
                        {courtOrderedOverview.title}
                  </Link>
                    )}
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
                      {courtOrderedSignUp?.href && (
                    <li className="md:col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                              href={courtOrderedSignUp.href}
                          className="block select-none rounded-md bg-primary text-primary-foreground p-3 text-center"
                        >
                              {courtOrderedSignUp.text}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                      )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              )}

              {/* College Programs - Conditional Rendering */}
              {collegePrograms && collegePrograms.length > 0 && (
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
                    {collegeOverview?.href && (
                  <Link
                        href={collegeOverview.href}
                    className="block select-none text-secondary text-xl font-semibold text-center px-4 py-2 hover:text-primary hover:underline"
                  >
                        {collegeOverview.title}
                  </Link>
                    )}
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
                      {collegeSignUp?.href && (
                    <li className="md:col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                              href={collegeSignUp.href}
                          className="block select-none rounded-md bg-primary text-primary-foreground p-3 text-center hover:bg-primary/90"
                        >
                              {collegeSignUp.text}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                      )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              )}

              {/* Corporate & Hospitals - Conditional Rendering */}
              {corporatePrograms && corporatePrograms.length > 0 && (
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
                    {corporateOverview?.href && (
                  <Link
                        href={corporateOverview.href}
                    className="block select-none text-secondary text-xl font-semibold text-center px-4 py-2 hover:text-primary hover:underline"
                  >
                        {corporateOverview.title}
                  </Link>
                    )}
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
                      {corporateSignUp?.href && (
                    <li className="md:col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                              href={corporateSignUp.href}
                          className="block select-none rounded-md bg-primary text-primary-foreground p-3 text-center hover:bg-primary/90"
                        >
                              {corporateSignUp.text}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                      )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              )}

              {/* About Us - Conditional Rendering */}
              {aboutUsLinks && aboutUsLinks.length > 0 && (
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
              )}

              {/* Vertical Divider - Renders only if any main section is visible */} 
              {(courtOrderedClasses?.length > 0 || collegePrograms?.length > 0 || corporatePrograms?.length > 0 || aboutUsLinks?.length > 0) && (
              <div className={cn(
                "h-8 w-px mx-1 transition-colors duration-300",
                   scrolled ? "bg-border" : "bg-white/30"
              )}></div>
              )}

              {/* Enroll Now - Updated to use props */}
              {enrollButton?.href && (
              <NavigationMenuItem className="px-2">
                  <Button asChild variant="default" className={cn(navigationMenuTriggerStyle(), "border border-primary hover:border-primary/80 bg-primary text-primary-foreground uppercase")}>
                     <Link href={enrollButton.href}>{enrollButton.text}</Link>
                </Button>
              </NavigationMenuItem>
              )}
              {/* Sign In Portal - Updated to use props */}
              {signInButton?.href && (
              <NavigationMenuItem>
                <Button
                    asChild
                  variant="default"
                  className={cn(navigationMenuTriggerStyle(),
                    "border border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary hover:text-primary-foreground uppercase",
                    scrolled ? "bg-transparent text-primary border-primary hover:bg-primary/90" : "text-primary-foreground hover:bg-primary/90"
                  )}>
                     <Link href={signInButton.href}>{signInButton.text}</Link>
                </Button>
              </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="relative w-10 h-10 p-2 focus:outline-none rounded-full bg-white shadow-sm min-[1450px]:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary transition-all duration-300 ${
              menuOpen ? 'rotate-45' : '-translate-y-1'
            }`}></div>
            
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}></div>
            
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary transition-all duration-300 ${
              menuOpen ? '-rotate-45' : 'translate-y-1'
            }`}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel - Slides from underneath */}
      <div className={`fixed top-0 left-0 right-0 bg-white z-40 pt-16 xs:pt-20 shadow-lg transform transition-transform duration-300 ease-in-out ${
        menuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="px-4 py-6 max-h-[70vh] overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {/* Court-Ordered Classes - Conditional */}
            {courtOrderedClasses && courtOrderedClasses.length > 0 && (
            <AccordionItem value="court-ordered">
              <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                <span className="text-lg font-medium">Court-Ordered Classes</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-2 py-2">
                  {courtOrderedClasses.map((classItem) => (
                    <Link
                      key={classItem.title}
                      href={classItem.href}
                      className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {classItem.title}
                    </Link>
                  ))}
                    {courtOrderedSignUp?.href && (
                  <Link
                        href={courtOrderedSignUp.href}
                    className="block p-1.5 text-sm font-medium text-primary hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                        {courtOrderedSignUp.text}
                  </Link>
                    )}
                </div>
              </AccordionContent>
            </AccordionItem>
            )}
            
            {/* College Programs - Conditional */}
            {collegePrograms && collegePrograms.length > 0 && (
            <AccordionItem value="college">
              <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                <span className="text-lg font-medium">College Programs</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-2 py-2">
                  {collegePrograms.map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
                      className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {program.title}
                    </Link>
                  ))}
                    {collegeSignUp?.href && (
                  <Link
                        href={collegeSignUp.href}
                    className="block p-1.5 text-sm font-medium text-primary hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                        {collegeSignUp.text}
                  </Link>
                    )}
                </div>
              </AccordionContent>
            </AccordionItem>
            )}
            
            {/* Corporate & Hospitals - Conditional */}
            {corporatePrograms && corporatePrograms.length > 0 && (
            <AccordionItem value="corporate">
              <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                <span className="text-lg font-medium">Corporate & Hospitals</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-2 py-2">
                  {corporatePrograms.map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
                      className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {program.title}
                    </Link>
                  ))}
                    {corporateSignUp?.href && (
                  <Link
                        href={corporateSignUp.href}
                    className="block p-1.5 text-sm font-medium text-primary hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                        {corporateSignUp.text}
                  </Link>
                    )}
                </div>
              </AccordionContent>
            </AccordionItem>
            )}
            
            {/* About Us - Conditional */}
            {aboutUsLinks && aboutUsLinks.length > 0 && (
            <AccordionItem value="about">
              <AccordionTrigger className="py-3 text-primary [&>svg]:size-5">
                <span className="text-lg font-medium">About Us</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-2 py-2">
                  {aboutUsLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block p-1.5 text-sm text-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            )}
          </Accordion>
          
          {/* Mobile Buttons - Updated to use props */} 
          <div className="grid grid-cols-2 gap-3 mt-6">
            {enrollButton?.href && (
            <Button asChild variant="default" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
                <Link href={enrollButton.href}>{enrollButton.text}</Link>
            </Button>
            )}
            {signInButton?.href && (
            <Button asChild variant="outline" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
                <Link href={signInButton.href}>{signInButton.text}</Link>
            </Button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay that appears when menu is open */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Main Content Wrapper - Slides down when menu is open */}
      <div 
        className={`w-full transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-y-[70vh]' : 'translate-y-0' // Adjust based on mobile menu height if necessary
        }`}
      >
        {/* This is where your page content will go - it wraps the entire page */}
      </div>
    </>
  );
};

export default Navbar;
