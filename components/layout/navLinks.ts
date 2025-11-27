// Shared navigation link types and data used by Header and MobileMenu

export interface NavChild {
  href: string
  label: string
}

export interface NavLink {
  label: string
  href?: string
  children?: NavChild[]
}

export const navLinks: NavLink[] = [
  { href: '/box', label: 'Box' },
  { href: '/library', label: 'Library' },
  { href: '/community', label: 'Community' },
  // { href: '/shop', label: 'Shop' },
  { href: '/faq', label: "FAQ's" },
  {
    label: 'Collaborate',
    children: [
      { href: '/publishers', label: 'For Publishers' },
      { href: '/authors', label: 'For Authors' },
    ],
  },
  { href: '/about', label: 'About' },
]

// Utility to check if link has children (type guard)
export function hasChildren(link: NavLink): link is NavLink & { children: NavChild[] } {
  return Array.isArray(link.children) && link.children.length > 0
}

// Generate unique key for nav item
export function getNavKey(link: NavLink): string {
  return link.href ?? link.label
}

// Generate submenu ID for accessibility
export function getSubmenuId(label: string): string {
  return `submenu-${label.toLowerCase().replace(/\s+/g, '-')}`
}

