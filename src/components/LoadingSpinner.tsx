import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex h-[calc(100vh-4rem)]  justify-center items-center">
        <div
            className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"
            aria-label="Loading"
        />
    </div>
);

export default LoadingSpinner;
