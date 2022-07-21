import React from "react";

const SkeletonLoader = () => {
  return Array(5)
    .fill()
    .map((item, index) => (
      <tr key={index} className="animate-pulse">
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="w-5 bg-gray-300 h-5 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap py-4 px-3 text-sm sm:pl-6">
          <div className="flex items-center">
            <div className="h-8 w-8 flex-shrink-0">
              <div className="w-8 h-8 bg-gray-300 rounded-full "></div>
            </div>
            <div className="ml-4">
              <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
          <div className="w-16 bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
          <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
          <div className="flex-end bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
          <div className="flex bg-gray-300 h-6 rounded-md "></div>
        </td>
        <td className="whitespace-nowrap pl-3 pr-4 sm:pr-6 py-4 text-right text-sm text-gray-500">
          <div className="flex bg-gray-300 h-6 rounded-md "></div>
        </td>
      </tr>
    ));
};

export default SkeletonLoader;
