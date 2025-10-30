import React, { useRef, useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import { categories } from '../../category';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryCard from '../../components/CategoryCart';
import FoodCard from '../../components/FoodCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CustomerHome() {
  const { city, shopsOfCity, itemsOfCity, searchItems } = useSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();
  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  const [updatedItemsList, setUpdatedItemslist] = useState([]);
  const [showCateLeft, setShowCateLeft] = useState(false);
  const [showCateRight, setShowCateRight] = useState(false);
  const [showShopLeft, setShowShopLeft] = useState(false);
  const [showShopRight, setShowShopRight] = useState(false);

  const handleFilter = (category) => {
    if (category === 'All') setUpdatedItemslist(itemsOfCity);
    else
      setUpdatedItemslist(itemsOfCity?.filter((i) => i.category === category));
  };

  const updateButtons = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (!el) return;
    setLeft(el.scrollLeft > 0);
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const cateEl = cateScrollRef.current;
    const shopEl = shopScrollRef.current;

    const cateScrollListener = () =>
      updateButtons(cateScrollRef, setShowCateLeft, setShowCateRight);
    const shopScrollListener = () =>
      updateButtons(shopScrollRef, setShowShopLeft, setShowShopRight);

    if (cateEl) {
      updateButtons(cateScrollRef, setShowCateLeft, setShowCateRight);
      cateEl.addEventListener('scroll', cateScrollListener);
    }
    if (shopEl) {
      updateButtons(shopScrollRef, setShowShopLeft, setShowShopRight);
      shopEl.addEventListener('scroll', shopScrollListener);
    }

    return () => {
      if (cateEl) cateEl.removeEventListener('scroll', cateScrollListener);
      if (shopEl) shopEl.removeEventListener('scroll', shopScrollListener);
    };
  }, [categories, shopsOfCity]);

  useEffect(() => {
    setUpdatedItemslist(itemsOfCity);
  }, [itemsOfCity]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center overflow-y-auto">
      <Nav />

      {/* Wrapper tổng thể nội dung */}
      <div className="w-full max-w-7xl px-6 py-8 flex flex-col gap-10">
        {/* Search Results */}
        {searchItems && searchItems.length > 0 && (
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Kết quả tìm kiếm
            </h1>
            <div className="flex flex-wrap gap-6 justify-center">
              {searchItems.map((item, index) => (
                <FoodCard data={item} key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <section className="bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Gợi ý cho đơn đầu tiên 🍱
          </h1>
          <div className="relative">
            {showCateLeft && (
              <button
                onClick={() => scrollHandler(cateScrollRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 z-10"
              >
                <FaChevronLeft />
              </button>
            )}
            <div
              ref={cateScrollRef}
              className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-100"
            >
              {categories?.map((cate, index) => (
                <CategoryCard
                  key={index}
                  name={cate.category}
                  image={cate.image}
                  onClick={() => handleFilter(cate.category)}
                />
              ))}
            </div>
            {showCateRight && (
              <button
                onClick={() => scrollHandler(cateScrollRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 z-10"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        {/* Shops */}
        <section className="bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Quán ngon nhất tại {city}
          </h1>
          <div className="relative">
            {showShopLeft && (
              <button
                onClick={() => scrollHandler(shopScrollRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 z-10"
              >
                <FaChevronLeft />
              </button>
            )}
            <div
              ref={shopScrollRef}
              className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-100"
            >
              {shopsOfCity?.map((shop, index) => (
                <CategoryCard
                  key={index}
                  name={shop.name}
                  image={shop.image}
                  onClick={() => navigate(`/shop-items/${shop._id}`)}
                />
              ))}
            </div>
            {showShopRight && (
              <button
                onClick={() => scrollHandler(shopScrollRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 z-10"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </section>

        {/* Food Items */}
        <section className="bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Món ăn gợi ý 🍔
          </h1>
          {updatedItemsList?.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {updatedItemsList.map((item, index) => (
                <FoodCard data={item} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-center font-medium text-gray-500 p-5">
              Không tìm thấy món ăn nào
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CustomerHome;
