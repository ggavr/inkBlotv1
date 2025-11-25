import { Section } from '@/components/ui/Section'

export const metadata = {
  title: 'Privacy Policy | Inkblot Crew',
}

export default function PrivacyPage() {
  return (
    <Section className="pt-24 pb-32">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-grey-600">Last updated: November 2025</p>
        
        <p>
          At Inkblot Crew, we take your privacy seriously. This policy describes how we collect, use, and protect 
          your personal information.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, subscribe to our 
          service, or contact us for support.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, process your transactions, 
          send you technical notices and support messages, and communicate with you about products, services, and events.
        </p>

        <h2>Data Protection</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against 
          unauthorized or unlawful processing and accidental loss, destruction, or damage.
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
          You can manage your cookie preferences through our cookie consent manager.
        </p>

        <h2>Your Rights</h2>
        <p>
          Under GDPR, you have the right to access, correct, delete, or restrict the processing of your personal data. 
          You also have the right to data portability and to object to processing.
        </p>

        <p className="text-sm text-grey-600 mt-12">
          For our complete privacy policy or to exercise your rights, please contact us at hello@inkblotcrew.com
        </p>
      </div>
    </Section>
  )
}

