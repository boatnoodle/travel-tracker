import React from "react";

function RestaurantCard() {
  return (
    <div className="h-[48px] w-[48px] overflow-hidden rounded-lg bg-white shadow-lg">
      <img
        src="https://via.placeholder.com/400x200"
        alt="Restaurant Image"
        className="h-48 w-full object-cover object-center"
      />
      <div className="p-4">
        <h2 className="mb-2 text-xl font-semibold">Restaurant Name</h2>
        <p className="mb-4 text-gray-600">Category: Italian</p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          purus eget justo gravida laoreet.
        </p>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-5 w-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v8m0 0l-4-4m4 4l4-4m-4 4h4m-4 0h-4"
              ></path>
            </svg>
            <span className="text-gray-600">4.5</span>
          </div>
          <div className="text-gray-600">123 Reviews</div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
