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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export const NavMenu = (props: React.ComponentProps<typeof NavigationMenu>) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Court-Ordered Classes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
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
                    className="block select-none rounded-md bg-accent/50 p-3 text-center hover:bg-accent"
                  >
                    Sign Up for Court-Ordered Classes
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>College Programs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
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
                    className="block select-none rounded-md bg-accent/50 p-3 text-center hover:bg-accent"
                  >
                    Sign Up for College Programs
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Corporate & Hospitals</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
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
                    className="block select-none rounded-md bg-accent/50 p-3 text-center hover:bg-accent"
                  >
                    Sign Up for Corporate Programs
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#why-choose-us"
              className={navigationMenuTriggerStyle()}
            >
              Why Choose Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="#our-presence"
              className={navigationMenuTriggerStyle()}
            >
              Our Presence
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
