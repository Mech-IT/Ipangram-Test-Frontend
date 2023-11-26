import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isUpdate:false,
   updateName:"",
   updateData:{}
}

export const updateDataSlice = createSlice({
  name: 'updateData',
  initialState,
  reducers: {
    setUpdateData: (state,action) => {
      state.isUpdate=true;
      state.updateName=action.payload.updateName
      state.updateData={
        ...action.payload.updateData
      }
    },
    resetUpdateData:(state)=>{
        state.isUpdate=false;
        state.updateName=""
        state.updateData={}
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUpdateData,resetUpdateData} = updateDataSlice.actions

export default updateDataSlice.reducer