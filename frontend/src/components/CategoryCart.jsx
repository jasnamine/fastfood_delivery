import React from 'react';

function CategoryCard({ image, name, onClick }) {
  return (
    <div
      className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] 
                 rounded-2xl border-2 border-gray-200 
                 shrink-0 overflow-hidden bg-white 
                 shadow-lg hover:shadow-xl hover:border-emerald-500 
                 transition-all duration-300 cursor-pointer"
      onClick={() => onClick()}
    >
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={name || 'Category'}
          className="absolute inset-0 w-full h-full object-cover 
                     transform hover:scale-110 transition-transform duration-300"
        />

        {/* Cập nhật lại class background mờ */}
        <div
          className="absolute bottom-0 w-full left-0 
                     bg-white/90 backdrop-blur-sm 
                     px-3 py-1 rounded-t-lg text-center 
                     text-sm font-medium text-gray-800"
        >
          {name}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
