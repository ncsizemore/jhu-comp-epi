'use client';

interface ExternalLinkButtonProps {
  href: string;
  label: string;
  accentGradient: string;
}

export default function ExternalLinkButton({ href, label, accentGradient }: ExternalLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${accentGradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}
    >
      <span>{label}</span>
      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
