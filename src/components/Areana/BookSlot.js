import React from 'react'
import Dashboard from './Dashboard'
import MUIDrawer from '../MUI/MUIDrawer'
import BookingForm from '../BookingForm'
import { useSelector } from "react-redux";

function BookSlot() {
    const { admin } = useSelector((state) => state.venue);
  return (
    <>
    <Dashboard/>
    <MUIDrawer
        open={true} 
        component={<BookingForm venue={admin.info.arena_id} />}
      />
    </>
  )
}

export default BookSlot