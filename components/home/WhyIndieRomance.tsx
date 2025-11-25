import { Section } from '@/components/ui/Section'

export function WhyIndieRomance() {
  return (
    <Section withBorder background="grey">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">Why Indie Romance?</h2>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-ink-800 leading-relaxed">
            <p className="text-xl">
              The romance genre is thriving, but the best stories aren&apos;t always on mainstream shelves. 
              Independent authors are crafting innovative, diverse, and deeply emotional stories that 
              deserve to be discovered.
            </p>
            
            <p>
              <strong>Discoverability is a challenge.</strong> With thousands of new releases each month, 
              finding quality indie romance can feel overwhelming. That&apos;s where we come in—curating 
              the very best titles so you can spend more time reading and less time searching.
            </p>

            <p>
              <strong>Community matters.</strong> Reading is more fun when it&apos;s shared. The Inkblot Crew 
              brings together readers who appreciate character-driven romance, meaningful representation, 
              and the unique voices that indie publishing offers.
            </p>

            <p>
              <strong>Support independent authors.</strong> Every box we send helps indie authors reach 
              new readers and build sustainable careers. Your subscription directly supports the creators 
              bringing these stories to life.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

