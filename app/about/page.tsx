import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: 'About | Inkblot Crew',
  description: 'Learn about Inkblot Crew and our mission to celebrate indie romance.',
}

// Crew members data - easy to edit
const crewMembers = [
  {
    name: 'Placeholder Name',
    role: 'Founder & Head Curator',
    bio: 'A lifelong romance reader with a passion for discovering hidden gems. Started Inkblot Crew to share the joy of indie romance with fellow book lovers.',
    avatar: null,
  },
  {
    name: 'Placeholder Name',
    role: 'Community Manager',
    bio: 'Keeps our Discord community thriving with book discussions, events, and author Q&As. Believes every reader deserves their perfect book match.',
    avatar: null,
  },
  {
    name: 'Placeholder Name',
    role: 'Operations & Partnerships',
    bio: 'Works behind the scenes to ensure every box arrives perfectly. Builds relationships with authors and publishers to bring you the best indie titles.',
    avatar: null,
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16" background="white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">About Inkblot Crew</h1>
          <p className="text-xl md:text-2xl text-ink-800 leading-relaxed">
            Celebrating indie romance, one carefully curated box at a time
          </p>
        </div>
      </Section>

      {/* Our Story */}
      <Section withBorder background="grey">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-grey-200 border border-ink-900/10" />
            <div>
              <h2 className="mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-ink-800 leading-relaxed">
                <p>
                  Inkblot Crew was born from a simple observation: the best romance stories 
                  aren&apos;t always the ones on mainstream shelves. Independent authors are 
                  crafting some of the most innovative, diverse, and emotionally resonant 
                  romance fiction available today.
                </p>
                <p>
                  But discoverability is a challenge. With thousands of indie releases each 
                  month, finding quality reads can feel overwhelming. That&apos;s where we come in.
                </p>
                <p>
                  We&apos;re readers first, curators second. Every book in our boxes is one we&apos;d 
                  genuinely recommend to a friend. We believe in supporting independent creators, 
                  building community around shared reading experiences, and making book 
                  discovery feel exciting rather than exhausting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Indie Romance - moved to after Our Story */}
      <Section withBorder background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Why Indie Romance?</h2>
          
          <div className="space-y-6 text-lg text-ink-800 leading-relaxed">
            <p>
              Romance is the bestselling fiction genre globally, and independent authors 
              make up a significant portion of that market. Yet many brilliant indie titles 
              never reach their ideal readers due to the sheer volume of releases and the 
              challenges of discoverability.
            </p>

            <p>
              Indie authors have the freedom to take creative risks, explore niche subgenres, 
              and tell stories that traditional publishing might overlook. This results in 
              fresh, innovative narratives that push the genre forward.
            </p>

            <p>
              By curating and promoting indie romance, we&apos;re not just helping readers discover 
              great books—we&apos;re supporting independent creators in building sustainable careers 
              doing what they love.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Values */}
      <Section withBorder background="grey">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl mb-3">Quality First</h3>
              <p className="text-ink-800 leading-relaxed">
                Every title is carefully vetted for strong writing, character development, 
                and emotional depth.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">🌈</div>
              <h3 className="text-2xl mb-3">Diverse Voices</h3>
              <p className="text-ink-800 leading-relaxed">
                We prioritize representation and seek out stories from diverse authors 
                and perspectives.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl mb-3">Community Driven</h3>
              <p className="text-ink-800 leading-relaxed">
                Reading is better together. We build genuine connections between readers 
                and creators.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Meet the Original Crew Members */}
      <Section withBorder background="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Meet the Original Crew Members</h2>
            <p className="text-lg text-ink-800">
              The passionate readers behind Inkblot Crew
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {crewMembers.map((member) => (
              <Card key={member.name + member.role} className="p-6 text-center">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-grey-200 border border-ink-900/10 mx-auto mb-4 flex items-center justify-center">
                  {member.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-grey-600 mb-3">{member.role}</p>
                <p className="text-ink-800 leading-relaxed text-sm">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Help / Contact Us */}
      <Section withBorder background="grey">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Get in Touch</h2>
          <p className="text-lg text-ink-800 leading-relaxed mb-8">
            Have questions or need help? We&apos;d love to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/44XXXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-6 bg-paper-50 border border-ink-900/10 hover:border-ink-900/20 transition-colors flex flex-col items-center gap-3"
            >
              <span className="text-3xl">💬</span>
              <span className="font-medium text-ink-900">WhatsApp</span>
              <span className="text-sm text-grey-600">(Placeholder number)</span>
            </a>

            {/* Email */}
            <a 
              href="mailto:hello@inkblotcrew.com"
              className="p-6 bg-paper-50 border border-ink-900/10 hover:border-ink-900/20 transition-colors flex flex-col items-center gap-3"
            >
              <span className="text-3xl">✉️</span>
              <span className="font-medium text-ink-900">Email</span>
              <span className="text-sm text-grey-600">hello@inkblotcrew.com</span>
            </a>
          </div>

          <p className="text-sm text-grey-600 mt-8">
            We typically respond within 24-48 hours
          </p>
        </div>
      </Section>
    </>
  )
}
