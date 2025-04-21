import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LogoCard } from "./navbar/logo-card";
import { cn } from "@/lib/utils";
import { 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin 
} from "react-icons/fa";

// Footer sitemap data - easily customizable
const footerSections = [
  {
    title: "Court-Ordered Programs",
    links: [
      {
        title: "Court-Ordered Programs Overview",
        href: "/court-ordered-programs",
      },
      {
        title: "Domestic Violence",
        href: "/services/court-ordered-programs/domestic-violence",
      },
      {
        title: "Anger Management",
        href: "/services/court-ordered-programs/anger-management",
      },
      {
        title: "Substance Abuse",
        href: "/services/court-ordered-programs/substance-abuse",
      },
      {
        title: "Peaceful Parenting",
        href: "/services/court-ordered-programs/peaceful-parenting",
      },
      {
        title: "Sign Up for Court Programs",
        href: "/sign-up/court-ordered-programs",
        isPrimary: true,
      },
    ],
  },
  {
    title: "College & University Programs",
    links: [
      {
        title: "College & University Programs Overview",
        href: "/college-university-programs",
      },
      {
        title: "Mental Health Support",
        href: "/services/college-university-programs/mental-health",
      },
      {
        title: "Substance Abuse Prevention",
        href: "/services/college-university-programs/substance-abuse",
      },
      {
        title: "Personal Development",
        href: "/services/college-university-programs/personal-development",
      },
      {
        title: "Academic Success",
        href: "/services/college-university-programs/academic-success",
      },
      {
        title: "Sign Up for College Programs",
        href: "/sign-up/college-university-programs",
        isPrimary: true,
      },
    ],
  },
  {
    title: "Corporate & Hospital Programs",
    links: [
      {
        title: "Corporate & Hospital Programs Overview",
        href: "/corporate-hospital-programs",
      },
      {
        title: "Staff Trainings",
        href: "/services/corporate-hospital-programs/staff-trainings",
      },
      {
        title: "Certifications",
        href: "/services/corporate-hospital-programs/certifications",
      },
      {
        title: "Hospital Referrals",
        href: "/services/corporate-hospital-programs/hospital-referrals",
      },
      {
        title: "Sign Up for Corporate Programs",
        href: "/sign-up/corporate-hospital-programs",
        isPrimary: true,
      },
    ],
  },
  {
    title: "About Us",
    links: [
      {
        title: "About Three Trees",
        href: "/about",
      },
      {
        title: "Our Method",
        href: "/about/method",
      },
      {
        title: "Our Presence",
        href: "/about/presence",
      },
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Contact",
        href: "/contact",
      },
    ],
  },
];

// Legal links in the bottom bar
const legalLinks = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Accessibility", href: "/accessibility" },
];

const Footer = () => {
  return (
    <footer className={cn("bg-background border-t")}>
      <div className="max-w-screen-2xl mx-auto px-6 xl:px-16">
        {/* Desktop and Mobile Footer Content */}
        <div className="py-12">
          {/* Desktop View - Flex Layout (Visible at 1300px and above) */}
          <div className="hidden min-[1400px]:flex flex-col min-[1300px]:flex-row justify-between gap-8">
            {/* Logo and description column */}
            <div className="min-[1300px]:max-w-xs">
              {/* Logo and Description */}
              <div className="flex flex-col">
                <LogoCard scrolled={true} />
                <p className={cn("mt-4 text-muted-foreground")}>
                  Evidence-based behavioral change programs that create real, lasting impact.
                </p>
                {/* Social Media Icons */}
                <div className="flex items-center gap-4 mt-6">
                  <Link href="#" className={cn("text-muted-foreground hover:text-primary transition-colors")}>
                    <FaTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <FaFacebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <FaInstagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <FaLinkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation columns - placed in a flex container */}
            <div className="flex flex-wrap gap-8 min-[1300px]:gap-16 xl:gap-20 mt-6 min-[1300px]:mt-0 justify-between">
              {footerSections.map(({ title, links }) => (
                <div key={title} className="w-[160px] mb-6 min-[1300px]:mb-0">
                  <h6 className="font-semibold text-foreground">{title}</h6>
                  <ul className="space-y-3 mt-4">
                    {links.map(({ title: linkTitle, href, isPrimary }) => (
                      <li key={linkTitle}>
                        <Link
                          href={href}
                          className={cn(
                            "transition-colors",
                            isPrimary 
                              ? "text-primary hover:text-primary/80" 
                              : "text-muted-foreground hover:text-primary"
                          )}
                        >
                          {linkTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Accordion (Visible only on screens below 1300px) */}
          <div className="min-[1400px]:hidden space-y-6">
            {/* Logo and Description for Mobile */}
            <div className="flex flex-col">
              <LogoCard scrolled={true} />
              <p className="mt-4 text-muted-foreground">
                Evidence-based behavioral change programs that create real, lasting impact.
              </p>
            </div>

            {/* Accordion for Mobile Navigation */}
            <Accordion type="single" collapsible className="w-full">
              {footerSections.map(({ title, links }, index) => (
                <AccordionItem value={`section-${index}`} key={index}>
                  <AccordionTrigger className="py-3 text-foreground">
                    <span className="font-medium">{title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 py-2">
                      {links.map(({ title: linkTitle, href, isPrimary }) => (
                        <li key={linkTitle}>
                          <Link
                            href={href}
                            className={cn(
                              "transition-colors",
                              isPrimary 
                                ? "text-primary hover:text-primary/80" 
                                : "text-muted-foreground hover:text-primary"
                            )}
                          >
                            {linkTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Social Media Icons for Mobile */}
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Full-width Copyright / Legal Links Bar */}
        <Separator />
        <div className="py-6">
          <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4")}>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Three Trees Center for Change. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2">
              {legalLinks.map(({ title, href }, index) => (
                <div key={title} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-3 text-muted-foreground text-sm flex items-center justify-center w-1">•</span>
                  )}
                  <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 