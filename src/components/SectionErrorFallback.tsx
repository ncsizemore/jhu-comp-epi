'use client';

interface SectionErrorFallbackProps {
  title?: string;
  message?: string;
}

export function SectionErrorFallback({
  title = "Unable to load this section",
  message = "We encountered an error loading this content. Please try refreshing the page."
}: SectionErrorFallbackProps) {
  return (
    <div className="py-12 bg-gray-50 rounded-lg">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
}
