import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const mainLinks = [
    { href: '/box', label: 'Box' },
    { href: '/shop', label: 'Shop' },
    { href: '/community', label: 'Community' },
    { href: '/publishers', label: 'For Publishers' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
  ]

  const legalLinks = [
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/cookies', label: 'Cookies' },
  ]

  const socialLinks = [
    { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
    { href: 'https://tiktok.com', label: 'TikTok', icon: 'tiktok' },
    { href: 'https://pinterest.com', label: 'Pinterest', icon: 'pinterest' },
  ]

  return (
    <footer className="bg-ink-900 text-paper-50 mt-auto">
      <Container size="wide">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link href="/" className="font-serif text-2xl font-normal tracking-tight block mb-4">
                Inkblot Crew
              </Link>
              <p className="text-paper-100 text-sm leading-relaxed">
                A quarterly indie romance subscription box for readers who love to discover hidden gems.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-sans font-medium mb-4">Navigate</h3>
              <ul className="space-y-3">
                {mainLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-paper-100 hover:text-paper-50 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-sans font-medium mb-4">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-paper-100 hover:text-paper-50 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-sm text-paper-100">Contact</p>
                <a 
                  href="mailto:hello@inkblotcrew.com"
                  className="text-sm text-paper-100 hover:text-paper-50 transition-colors"
                >
                  hello@inkblotcrew.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-sans font-medium mb-4">Stay Updated</h3>
              <NewsletterSignup />
              
              <div className="mt-6">
                <h4 className="font-sans font-medium mb-3 text-sm">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper-100 hover:text-paper-50 transition-colors"
                      aria-label={link.label}
                    >
                      <span className="text-xl">{link.label[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-paper-50/10 py-6">
          <p className="text-center text-sm text-paper-100">
            © {currentYear} Inkblot Crew. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

