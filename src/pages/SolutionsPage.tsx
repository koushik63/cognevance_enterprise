import { Building2, CheckCircle2, Headphones, Laptop, Network, Wrench } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../hooks/useSEO';
import { validateContactForm, type ValidationErrors } from '../utils/validation';

export default function SolutionsPage() {
  useSEO({
    title: 'Business Solutions',
    description:
      'Enterprise technology solutions, business procurement, technology consulting, and dedicated support from NEXORA.',
  });

  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Enterprise Hardware Procurement Inquiry',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContactForm(form, true);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitting(true);
    window.setTimeout(() => {
      const ref = `NX-B2B-${Date.now().toString(36).toUpperCase().slice(-5)}`;
      setSubmittedRef(ref);
      setSubmitting(false);
      showToast('success', 'Demo inquiry validated', `Illustrative reference: ${ref}`);
    }, 550);
  };

  return (
    <div>
      {/* Header */}
      <section className="py-16 lg:py-22 bg-[#0B0D12] border-b border-[#293241]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151922] border border-[#293241] text-xs font-medium text-[#8AB4FF]">
              <Building2 className="w-3.5 h-3.5 text-[#4F8CFF]" aria-hidden="true" />
              <span>NEXORA for Organizations</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white leading-tight">
              Enterprise Technology Solutions
            </h1>
            <p className="text-base sm:text-lg text-[#A5ADBA] leading-relaxed">
              Structured hardware procurement, technical consulting, and lifecycle support designed for growing teams and modern workplaces.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Pillars */}
      <section className="py-16 bg-[#0B0D12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Laptop,
              title: 'Business Procurement',
              desc: 'Standardized workstation, smartphone, and peripheral bundles tailored for engineering, creative, and executive roles.',
            },
            {
              icon: Network,
              title: 'Technology Consulting',
              desc: 'Guidance on docking standards, display calibration, wireless audio interoperability, and hybrid desk setups.',
            },
            {
              icon: Wrench,
              title: 'Deployment Readiness',
              desc: 'Pre-configured accessory kits and clear SKU documentation to simplify IT asset tracking.',
            },
            {
              icon: Headphones,
              title: 'Customer & Technical Support',
              desc: 'Dedicated troubleshooting channels and warranty coordination for business hardware fleets.',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-7 rounded-2xl bg-[#151922] border border-[#293241] space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0B0D12] border border-[#293241] flex items-center justify-center text-[#4F8CFF]">
                <pillar.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold font-heading text-white">{pillar.title}</h2>
              <p className="text-sm text-[#A5ADBA] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Inquiry Form */}
      <section className="py-16 bg-[#151922] border-t border-[#293241]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
              Procurement & Advisory
            </p>
            <h2 className="text-3xl font-bold font-heading text-white mb-2">
              Business Inquiry Form
            </h2>
            <p className="text-sm text-[#A5ADBA]">
              Demonstration form: Validates all inputs client-side without transmitting to a live backend.
            </p>
          </div>

          {submittedRef ? (
            <div className="p-8 rounded-2xl bg-[#0B0D12] border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <h3 className="text-xl font-semibold font-heading text-white">
                  Demo Inquiry Recorded
                </h3>
              </div>
              <p className="text-sm text-[#A5ADBA]">
                Your business inquiry passed validation in this frontend demonstration. Illustrative reference:{' '}
                <strong className="text-white">{submittedRef}</strong>. (No external email was sent.)
              </p>
              <Button onClick={() => setSubmittedRef(null)} variant="outline" size="sm">
                Submit Another Demo Inquiry
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-[#0B0D12] border border-[#293241] space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="biz-name" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    id="biz-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="biz-company" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Company / Organization *
                  </label>
                  <input
                    id="biz-company"
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="biz-email" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Work Email *
                  </label>
                  <input
                    id="biz-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="biz-phone" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="biz-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="biz-subject" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Subject *
                </label>
                <input
                  id="biz-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="biz-message" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Hardware Requirements / Message *
                </label>
                <textarea
                  id="biz-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe team size, preferred device categories, or consulting needs..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151922] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" size="lg" isLoading={submitting}>
                Submit Business Inquiry (Demo)
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
