import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const MAPBOX_ACCESS_TOKEN = 'sLffJQRlZ9LLONa3GWCohKFWdyGGDUwo3RaM6PQf';

const RegisterMerchant = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    // REMOVED: logo and image, as they will be handled by file state
  });

  const [suggestions, setSuggestions] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // CHANGED: Cập nhật để sử dụng Mapbox Geocoding API
  const handleAddressChange = async (e) => {
    const val = e.target.value;
    setForm({ ...form, address: val });

    if (val.length > 3) {
      try {
        // Mã hóa giá trị nhập vào để dùng trong URL
        const encodedVal = encodeURIComponent(val);
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedVal}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=VN&limit=5&autocomplete=true`,
        );
        const data = await res.json();
        // Dữ liệu của Mapbox nằm trong mảng 'features'
        setSuggestions(data.features || []);
      } catch (error) {
        console.error('Failed to fetch address suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (address) => {
    setForm({ ...form, address: address });
    setSuggestions([]);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { id: 'test-user-id-123' };

      const merchantFormData = new FormData();
      merchantFormData.append('userId', userData.id);
      merchantFormData.append('name', form.name);
      merchantFormData.append('email', form.email);
      merchantFormData.append('phone', form.phone);
      merchantFormData.append('address', form.address);
      merchantFormData.append('description', form.description);

      if (logoFile) {
        merchantFormData.append('logo', logoFile);
      }
      if (imageFile) {
        merchantFormData.append('image', imageFile);
      }

      const merchantRes = await fetch('http://localhost:3000/api/v1/merchant', {
        method: 'POST',
        body: merchantFormData,
      });

      if (!merchantRes.ok) {
        const errorData = await merchantRes.json();
        throw new Error(errorData.message || 'Tạo thông tin cửa hàng thất bại');
      }

      toast.success('Đăng ký cửa hàng thành công');
      setTimeout(() => (window.location.href = '/login/merchant'), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="absolute inset-0 bg-[url('/food-delivery-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-white opacity-70" />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Left side */}
        <div className="w-1/2 bg-gradient-to-br from-emerald-400 to-green-600 md:flex flex-col justify-center items-center text-white p-10 hidden">
          <h2 className="text-3xl font-bold mb-3">Đăng ký nhà hàng</h2>
          <p className="text-center text-sm opacity-90">
            Tạo tài khoản nhà hàng để quản lý món ăn, đơn hàng và khách hàng của
            bạn.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Thông tin cửa hàng
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Các trường input 'name', 'email', 'phone' giữ nguyên */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Tên cửa hàng
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-left font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex-1 relative">
                <label className="block text-sm text-left font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleAddressChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border rounded-lg shadow-lg mt-1 w-full z-20 max-h-48 overflow-y-auto">
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleSuggestionClick(item.place_name)}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {item.place_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Các trường input 'logo', 'image', 'description' giữ nguyên */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {logoPreview && (
                <div className="mt-3">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Ảnh bìa
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Cover image preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Mô tả cửa hàng
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all duration-200"
            >
              Đăng ký nhà hàng
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterMerchant;
