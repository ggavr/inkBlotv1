import { Section } from '@/components/ui/Section'

export const metadata = {
  title: 'Cookie Policy | Inkblot Crew',
}

export default function CookiesPage() {
  return (
    <Section className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Cookie Policy</h1>
        <p className="text-grey-600">Last updated: November 2025</p>
        
        <p>
          This Cookie Policy explains how Inkblot Crew uses cookies and similar tracking technologies.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit our website. They help us 
          provide you with a better experience and allow certain features to function properly.
        </p>

        <h2>Types of Cookies We Use</h2>
        
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function and cannot be switched off. They are usually only 
          set in response to actions you take, such as setting your privacy preferences or filling in forms.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting 
          information anonymously. We use Google Analytics for this purpose.
        </p>

        <h3>Marketing Cookies</h3>
        <p>
          These cookies track your browsing activity to show you relevant advertisements. They include Facebook Pixel, 
          TikTok Pixel, and similar technologies. These cookies are only activated with your consent.
        </p>

        <h2>Managing Cookies</h2>
        <p>
          You can manage your cookie preferences at any time through our cookie consent manager. You can also 
          control cookies through your browser settings, though this may limit certain features of our website.
        </p>

        <p className="text-sm text-grey-600 mt-12">
          For more information about cookies, please contact us at hello@inkblotcrew.com
        </p>
      </div>
    </Section>
  )
}

