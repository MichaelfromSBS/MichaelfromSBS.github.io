import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ExternalLink, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getFormattedSubject = () =>
    `Portfolio Inquiry from ${formState.name || 'Visitor'}`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          _subject: getFormattedSubject(),
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const openInGmail = () => {
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: personalInfo.email,
    });
    if (formState.name.trim()) {
      params.set('su', `Hello from ${formState.name.trim()}`);
    }
    if (formState.message.trim()) {
      params.set('body', formState.message.trim());
    }
    window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-2">
            Whether you are interested in discussing research collaborations, software engineering opportunities, or just want to chat about AI and systems—I'd love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Email card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 truncate block"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors shrink-0 ml-2"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {personalInfo.phone}
                </div>
              </div>
            </div>

            {/* Location card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  5032 Forbes Ave, Pittsburgh, PA 15289
                </div>
                <div className="text-xs text-slate-500">Carnegie Mellon University</div>
              </div>
            </div>

            {/* Social profiles card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex items-center justify-around">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>MichaelfromSBS</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-500" />
                <span>michael-liu2</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick message form */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
              Submit a message directly from the website, or open a clean compose window in Gmail.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => {
                      setFormState({ ...formState, name: e.target.value });
                      if (submitStatus !== 'idle') setSubmitStatus('idle');
                    }}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      if (submitStatus !== 'idle') setSubmitStatus('idle');
                    }}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                    if (submitStatus !== 'idle') setSubmitStatus('idle');
                  }}
                  placeholder="Hi Michael, I would love to talk about..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/70 flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Message sent!</span> Your inquiry has been forwarded to {personalInfo.email}.
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/70 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    Direct send encountered a network blocker. Please use <button type="button" onClick={openInGmail} className="underline font-semibold cursor-pointer">Compose in Gmail</button> below!
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {submitStatus === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message Directly</span>
                  </>
                )}
              </button>

              {/* Clean Gmail Compose Option */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Prefer sending from your own email account?</span>
                <button
                  type="button"
                  onClick={openInGmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/80 hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Compose in Gmail</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
