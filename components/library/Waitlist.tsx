import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export function LibraryWaitlist() {
  return (
    <Section id="library-waitlist" background="grey" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="mb-6">
          Ready to borrow 6 indie romance books for the price of 1?
        </h2>
        <p className="text-xl text-ink-800 leading-relaxed mb-10">
          Join the Inkblot Library waitlist to be the first to know when we open spots in your country.
        </p>
        
        <div className="max-w-md mx-auto">
           <form className="flex flex-col gap-4" action="#">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-md border border-ink-900/10 focus:border-ink-900 focus:ring-1 focus:ring-ink-900 outline-none"
                required
              />
               <select className="w-full px-4 py-3 rounded-md border border-ink-900/10 focus:border-ink-900 focus:ring-1 focus:ring-ink-900 outline-none bg-white">
                 <option value="">Select your country</option>
                 <option value="UK">United Kingdom</option>
                 <option value="US">United States</option>
                 <option value="CA">Canada</option>
                 <option value="AU">Australia</option>
                 <option value="other">Other</option>
               </select>
              <Button size="lg" className="w-full">
                Join Library Waitlist
              </Button>
           </form>
           <p className="text-xs text-ink-500 mt-4">
             We'll notify you when we launch in your region.
           </p>
        </div>
      </div>
    </Section>
  )
}

