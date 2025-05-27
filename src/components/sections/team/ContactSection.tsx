import { ContactInfo } from '@/data/team';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export default function ContactSection({ contactInfo }: ContactSectionProps) {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-600">
            Interested in collaborating or learning more about our research?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Primary Contact */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-hopkins-blue/10 rounded-full p-3">
                <svg className="w-6 h-6 text-hopkins-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Contact Our Team</h3>
                <p className="text-sm text-gray-600 mb-2">
                  For inquiries about our research, collaborations, or general questions
                </p>
                <p className="font-medium text-gray-900">{contactInfo.primaryContact.name}</p>
                <p className="text-sm text-gray-600 mb-2">{contactInfo.primaryContact.role}</p>
                <a 
                  href={`mailto:${contactInfo.primaryContact.email}`}
                  className="text-hopkins-blue hover:text-hopkins-gold transition-colors font-medium"
                >
                  {contactInfo.primaryContact.email}
                </a>
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          {contactInfo.github && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-900/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Code & Collaboration</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Access our open-source projects and research code
                  </p>
                  <a 
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hopkins-blue hover:text-hopkins-gold transition-colors font-medium inline-flex items-center"
                  >
                    View on GitHub
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
