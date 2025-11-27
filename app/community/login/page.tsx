import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Community Login | Inkblot Crew',
  description: 'Log in to access the Inkblot Crew community, book club discussions, and exclusive events.',
}

export default function CommunityLoginPage() {
  return (
    <>
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Community Login</h1>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Access our private Discord community, book club discussions, and exclusive member events.
          </p>
          
          <div className="space-y-4">
            <Button asChild fullWidth size="lg">
              <a 
                href="https://discord.com/channels/1442556988163751970/1442559941918326939" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Login with Discord
              </a>
            </Button>
            
            <p className="text-sm text-grey-600">
              Community access is included with your subscription.
            </p>
          </div>
        </div>
      </Section>

      <Section withBorder background="grey">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl mb-6">Not a Member Yet?</h2>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Subscribe to get full access to our community, book club, author Q&As, and all digital events.
          </p>
          <Button asChild size="lg">
            <Link href="/box">Subscribe Now</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}

