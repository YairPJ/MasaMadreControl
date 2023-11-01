import { configureStore } from '@reduxjs/toolkit'
import { MasaMadreSlice } from './MasaMadre/MasaMadre'

export default configureStore({
  reducer: {
      masaMadre: MasaMadreSlice.reducer,
  },
})