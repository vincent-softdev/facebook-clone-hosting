import React from "react";

const SkeletonPostCard = () => (
    <div className="animate-pulse bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div> {/* Simulate title */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Simulate content */}
        <div className="h-4 bg-gray-300 rounded w-2/4"></div> {/* Simulate footer */}
    </div>
);

export default SkeletonPostCard;
