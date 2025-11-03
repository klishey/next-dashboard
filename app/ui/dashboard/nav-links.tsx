'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="relative">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = link.href === pathname || (link.href !== '/dashboard' && pathname.startsWith(link.href));

        return (
          <div key={link.name} className="relative">
            {isActive && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-sky-100 rounded-md"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
            <Link
              href={link.href}
              className={clsx(
                'relative flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors',
                {
                  'text-blue-600': isActive,
                  'bg-gray-50': !isActive,
                }
              )}
            >
              <LinkIcon className="w-6 relative z-10" />
              <p className="hidden md:block relative z-10">{link.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
