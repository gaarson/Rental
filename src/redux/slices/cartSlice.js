import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem (state, action) {
    //   state.items.push(action.payload) 
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum
    //   }, 0)
    // },
    //   addItem (state, action) {
    //   state.items.push(action.payload); 
    //   state.totalPrice += action.payload.price;
    //  } , 
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)

      if (findItem && findItem.count > 0) {
        findItem.count--
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },

    clearItems(state, action) {
      state.items = []
      state.totalPrice =0
    }

  }
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer

//   addItem(state, {payload}) {
//     const findItem = state.items.find(obj => {
//       return ((obj.id === payload.id) &&
//         (obj.size === payload.size) &&
//         (obj.type === payload.type))
//     });
//     findItem ? findItem.count++ : state.items.push({
//       ...payload, count: 1
//     });
//     state.totalPrice = state.items.reduce((sum, obj) => {
//       return obj.price * obj.count + sum;
//     }, 0);
//   },
//   minusItem(state, {payload}) {
//     const findItem = state.items.find(obj => {
//       return ((obj.id === payload.id) &&
//         (obj.size === payload.size) &&
//         (obj.type === payload.type))
//     });
//     findItem && findItem.count--;
//     state.totalPrice -= findItem.price;
//   },
//   removeItem(state, {payload}) {
//     const findItem = state.items.find(obj => {
//       return ((obj.id === payload.id) &&
//         (obj.size === payload.size) &&
//         (obj.type === payload.type))
//     });
//     state.totalPrice -= findItem.price * findItem.count;
//     state.items = state.items.filter(obj => {
//       return ((obj.id !== payload.id) ||
//         (obj.size !== payload.size) ||
//         (obj.type !== payload.type))
//     });
//   }
