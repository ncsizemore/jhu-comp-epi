'use client';

import Image from 'next/image';
import { Publication } from '@/data/publications';

interface FeaturedPublicationCardProps {
    publication: Publication;
    onClick: () => void;
}

export default function FeaturedPublicationCard({ publication, onClick }: FeaturedPublicationCardProps) {
    return (
        <div
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 ease-in-out hover:shadow-xl"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
            aria-label={`View details for ${publication.title}`}
        >
            {/* Image */}
            <div className="relative w-full aspect-[16/9] bg-gray-200">
                {publication.imageUrl ? (
                    <Image
                        src={publication.imageUrl}
                        alt={`Visual representation for ${publication.title}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
                <h3 className="text-lg font-semibold leading-tight mb-1 group-hover:text-hopkins-gold transition-colors duration-300">
                    {publication.title}
                </h3>
                {publication.attentionGrabber && (
                    <p className="text-sm text-gray-200 line-clamp-2">
                        {publication.attentionGrabber}
                    </p>
                )}
            </div>
        </div>
    );
}
