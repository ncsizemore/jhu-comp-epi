'use client';

interface BookNavigationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isFlipping: boolean;
}

export default function BookNavigation({ totalPages, currentPage, onPageChange, isFlipping }: BookNavigationProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Book edge with tabs */}
      <div className="relative w-full h-8 bg-gray-100 rounded-t-md shadow-inner border border-gray-300 mb-3">
        <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-[0.05]"></div>
        
        {/* Page tabs */}
        <div className="flex items-center justify-center h-full">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => !isFlipping && onPageChange(idx)}
              disabled={isFlipping}
              className={`relative mx-2 ${
                idx === currentPage 
                  ? 'text-hopkins-spirit-blue font-medium' 
                  : 'text-gray-400 hover:text-gray-600'
              } transition-colors duration-300 group`}
              aria-label={`Go to publication ${idx + 1}`}
            >
              <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-5 rounded-b-none rounded-t-md transform -skew-x-6 ${
                idx === currentPage ? 'bg-white border-t border-l border-r border-gray-300' : 'bg-gray-200'
              } -z-10 transition-colors duration-300 ${isFlipping ? 'opacity-50' : 'group-hover:bg-gray-100'}`}></div>
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      
      {/* Corner navigation */}
      <div className="flex justify-center items-center w-full mt-4">
        {/* Page turner - previous */}
        <button
          onClick={() => !isFlipping && currentPage > 0 && onPageChange(currentPage - 1)}
          disabled={isFlipping || currentPage === 0}
          className={`group relative h-12 w-12 flex items-center justify-center rounded-tl-md ${
            currentPage === 0 || isFlipping ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          aria-label="Previous page"
        >
          <div className={`absolute top-0 right-0 w-12 h-12 bg-white shadow-md origin-bottom-right transform transition-transform duration-300 ${
            currentPage === 0 || isFlipping ? '' : 'group-hover:-rotate-6 group-hover:bg-gray-100'
          } rounded-tl-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
        
        {/* Page count */}
        <div className="mx-8 py-1 px-4 border-b text-center">
          <span className="text-xl font-serif text-gray-700">{currentPage + 1}</span>
          <span className="text-gray-400 mx-2 font-serif">/</span>
          <span className="text-gray-500 font-serif">{totalPages}</span>
        </div>
        
        {/* Page turner - next */}
        <button
          onClick={() => !isFlipping && currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
          disabled={isFlipping || currentPage === totalPages - 1}
          className={`group relative h-12 w-12 flex items-center justify-center rounded-tr-md ${
            currentPage === totalPages - 1 || isFlipping ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          aria-label="Next page"
        >
          <div className={`absolute top-0 left-0 w-12 h-12 bg-white shadow-md origin-bottom-left transform transition-transform duration-300 ${
            currentPage === totalPages - 1 || isFlipping ? '' : 'group-hover:rotate-6 group-hover:bg-gray-100'
          } rounded-tr-md`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
