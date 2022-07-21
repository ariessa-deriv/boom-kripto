import React from "react";

const SkeletonLoader = () => {
  return Array(5)
    .fill()
    .map(() => (
      <tr className="animate-pulse">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div class="w-5 bg-gray-300 h-5 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap py-4 px-3 text-sm sm:pl-6">
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0">
              <div class="w-8 h-8 bg-gray-300 rounded-full "></div>
            </div>
            <div className="ml-4">
              <div class="w-36 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
          <div class="w-16 bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
          <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
          <div class="flex-end bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
          <div class="flex bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
          <div class="flex bg-gray-300 h-6 rounded-md "></div>
        </td>
      </tr>
    ));
};

export default SkeletonLoader;
