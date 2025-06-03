import { ContactInfo } from '@/data/team';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export default function ContactSection({ contactInfo }: ContactSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-hopkins-blue/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-hopkins-spirit-blue/6 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Get in <span className="text-hopkins-blue">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Interested in collaborating or learning more about our computational epidemiology research?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Primary Contact */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-hopkins-blue to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Contact Our Team</h3>
                <p className="text-gray-600 font-medium mb-4 leading-relaxed">
                  For inquiries about our research, potential collaborations, or general questions about computational epidemiology
                </p>
                <div className="space-y-2">
                  <p className="text-lg font-black text-gray-900">{contactInfo.primaryContact.name}</p>
                  <p className="text-gray-600 font-medium">{contactInfo.primaryContact.role}</p>
                  <a 
                    href={`mailto:${contactInfo.primaryContact.email}`}
                    className="inline-flex items-center gap-2 text-hopkins-blue hover:text-hopkins-spirit-blue transition-colors font-semibold"
                  >
                    {contactInfo.primaryContact.email}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          {contactInfo.github && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Code & Collaboration</h3>
                  <p className="text-gray-600 font-medium mb-4 leading-relaxed">
                    Access our open-source projects, research code, and contribute to our computational epidemiology tools
                  </p>
                  <a 
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-hopkins-blue hover:text-hopkins-spirit-blue transition-colors font-semibold"
                  >
                    View on GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional collaboration note */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-br from-hopkins-blue/5 to-hopkins-spirit-blue/10 rounded-2xl p-8 border border-hopkins-blue/20">
            <h4 className="text-xl font-black text-gray-900 mb-3 tracking-tight">
              Research Collaborations Welcome
            </h4>
            <p className="text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
              We actively seek collaborations with researchers, clinicians, and public health professionals interested in computational approaches to epidemic modeling and prevention strategies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
