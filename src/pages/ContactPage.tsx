import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { useSEO } from '../hooks/useSEO';
import { validateContactForm, type ValidationErrors } from '../utils/validation';

export default function ContactPage() {
  useSEO({
    title: 'Contact NEXORA',
    description: 'Get in touch with NEXORA customer support or submit a business hardware inquiry.',
  });

  const { showToast } = useToast();
  const [inquiryType, setInquiryType] = useState<'general' | 'business'>('general');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContactForm(form, inquiryType === 'business');
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('error', 'Validation error', 'Please complete all highlighted fields.');
      return;
    }

    setErrors({});
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('success', 'Demo form validated', 'No real email was sent (frontend demonstration).');
    }, 550);
  };

  const resetForm = () => {
    setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8CFF] mb-2">
          Connect With Us
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3">
          Contact NEXORA
        </h1>
        <p className="text-base text-[#A5ADBA]">
          Reach out for product inquiries, order support, or enterprise procurement consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-[#151922] border border-[#293241] space-y-5">
            <h2 className="text-lg font-semibold font-heading text-white">
              Illustrative Contact Channels
            </h2>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A5ADBA]">Email</p>
                <p className="text-sm text-white mt-0.5">support@nexora-demo.example</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A5ADBA]">Phone</p>
                <p className="text-sm text-white mt-0.5">+1 (555) 019-2834 (Demo Line)</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A5ADBA]">
                  Illustrative Office
                </p>
                <p className="text-sm text-white mt-0.5">
                  500 Technology Plaza, San Francisco, CA
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A5ADBA]">Hours</p>
                <p className="text-sm text-white mt-0.5">Mon – Fri, 9:00 AM – 6:00 PM PT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#151922] border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl font-bold font-heading text-white">
                  Demo Message Validated
                </h2>
              </div>
              <p className="text-sm text-[#A5ADBA]">
                Thank you, <strong className="text-white">{form.name}</strong>. Your{' '}
                {inquiryType === 'business' ? 'business inquiry' : 'contact message'} was validated locally. Because this is a frontend demonstration without a backend mail server, no real email was dispatched.
              </p>
              <Button onClick={resetForm} variant="outline" size="sm">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-8 rounded-2xl bg-[#151922] border border-[#293241] space-y-5"
            >
              {/* Mode Toggle */}
              <div className="inline-flex rounded-xl bg-[#0B0D12] border border-[#293241] p-1">
                <button
                  type="button"
                  onClick={() => setInquiryType('general')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    inquiryType === 'general'
                      ? 'bg-[#4F8CFF] text-white'
                      : 'text-[#A5ADBA] hover:text-white'
                  }`}
                >
                  General Contact
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('business')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    inquiryType === 'business'
                      ? 'bg-[#4F8CFF] text-white'
                      : 'text-[#A5ADBA] hover:text-white'
                  }`}
                >
                  Business Inquiry
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {inquiryType === 'business' && (
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                      Company *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                    />
                    {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                    Phone *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#A5ADBA] mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0D12] border border-[#293241] text-sm text-white focus:border-[#4F8CFF] focus:outline-none"
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-xs text-[#A5ADBA]">
                  Demo mode: Validates locally without a backend server.
                </span>
                <Button type="submit" isLoading={loading}>
                  Send Message (Demo)
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
