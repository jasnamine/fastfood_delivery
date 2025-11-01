import { createSlice } from '@reduxjs/toolkit';

// 1. Tạo hàm helper
const updateCartTotals = (state) => {
  state.totalAmount = state.cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    city: null,
    allShops: null,
    shop: null,
    shopsOfCity: null,
    itemsOfCity: null,
    cartItems: [],
    totalAmount: 0,
    myOrders: [],
    ownerPendingOrders: [],
    // socket: null, <-- ĐÃ XÓA
    deliveryBoys: [],
    searchItems: null,
    pendingOrdersCount: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setAllShops: (state, action) => {
      state.allShops = action.payload;
    },
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setShopsOfCity: (state, action) => {
      state.shopsOfCity = action.payload;
    },
    setPendingOrdersCount: (state, action) => {
      state.pendingOrdersCount = action.payload;
    },
    setItemsOfCity: (state, action) => {
      state.itemsOfCity = action.payload;
    },

    // 2. Logic cart đã sửa
    addToCart: (state, action) => {
      // Giả định item này là mới (theo logic FoodCard)
      state.cartItems.push(action.payload);
      updateCartTotals(state); // Gọi helper
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Xóa item nếu quantity <= 0
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
      } else {
        // Ngược lại, cập nhật
        const item = state.cartItems.find((i) => i.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
      updateCartTotals(state); // Gọi helper
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      updateCartTotals(state); // Gọi helper
    },
    clearCart: (state) => {
      state.cartItems = [];
      updateCartTotals(state);
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    setOwnerPendingOrders: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.ownerPendingOrders = action.payload;
      } else {
        state.ownerPendingOrders = [
          action.payload,
          ...state.ownerPendingOrders,
        ];
      }
    },
    // setSocket:(state,action)=>{ ... }, <-- ĐÃ XÓA
    setDeliveryBoys: (state, action) => {
      state.deliveryBoys = action.payload;
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
  },
});

export const {
  setUserData,
  setCity,
  setAllShops,
  setShop,
  setShopsOfCity,
  setItemsOfCity,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart, // Nhớ export action mới
  setMyOrders,
  setOwnerPendingOrders,
  // setSocket, <-- ĐÃ XÓA
  setDeliveryBoys,
  setSearchItems,
  setPendingOrdersCount,
} = userSlice.actions;

export default userSlice.reducer;
