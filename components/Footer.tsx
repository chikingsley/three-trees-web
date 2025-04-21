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
    title: "Court-Ordered",
    links: [
      {
        title: "Overview",
        href: "/court-ordered",
      },
      {
        title: "Domestic Violence",
        href: "/services/court-mandated/domestic-violence",
      },
      {
        title: "Anger Management",
        href: "/services/court-mandated/anger-management",
      },
      {
        title: "Substance Abuse",
        href: "/services/court-mandated/substance-abuse",
      },
      {
        title: "Peaceful Parenting",
        href: "/services/court-mandated/peaceful-parenting",
      },
      {
        title: "Sign Up",
        href: "/sign-up/court-ordered",
      },
    ],
  },
  {
    title: "College Programs",
    links: [
      {
        title: "Overview",
        href: "/college",
      },
      {
        title: "Conflict Resolution",
        href: "/services/college/conflict-resolution",
      },
      {
        title: "Responsible Relationships",
        href: "/services/college/responsible-relationships",
      },
      {
        title: "Rethinking Substance Abuse",
        href: "/services/college/substance-abuse",
      },
      {
        title: "Sign Up",
        href: "/sign-up/college",
      },
    ],
  },
  {
    title: "Corporate & Hospitals",
    links: [
      {
        title: "Overview",
        href: "/corporate",
      },
      {
        title: "Staff Trainings",
        href: "/services/corporate/staff-trainings",
      },
      {
        title: "Certifications",
        href: "/services/corporate/certifications",
      },
      {
        title: "Hospital Referrals",
        href: "/services/corporate/hospital-referrals",
      },
      {
        title: "Sign Up",
        href: "/sign-up/corporate",
      },
    ],
  },
  {
    title: "About Us",
    links: [
      {
        title: "Overview",
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
      <div className="max-w-screen-xl mx-auto">
        {/* Desktop and Mobile Footer Content */}
        <div className="py-12 px-6 xl:px-0">
          {/* Desktop View - Grid Layout (Hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              {/* Logo and Description */}
              <div className="flex flex-col">
                <LogoCard scrolled={true} />
                <p className={cn("mt-4 text-muted-foreground max-w-xs")}>
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

            {/* Desktop Sitemap Links */}
            {footerSections.map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <h6 className="font-semibold text-foreground">{title}</h6>
                <ul className="space-y-3">
                  {links.map(({ title: linkTitle, href }) => (
                    <li key={linkTitle}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {linkTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile View - Accordion (Visible only on mobile) */}
          <div className="md:hidden space-y-6">
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
                      {links.map(({ title: linkTitle, href }) => (
                        <li key={linkTitle}>
                          <Link
                            href={href}
                            className="text-muted-foreground hover:text-primary transition-colors"
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
        <div className="py-6 px-6 xl:px-0">
          <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4")}>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Three Trees Center for Change. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {legalLinks.map(({ title, href }, index) => (
                <div key={title} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-muted-foreground text-sm">•</span>
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