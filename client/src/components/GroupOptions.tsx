import React from "react"
import logo from '../assets/logo.svg'
import "../css/GroupOptions.css"

const GroupOptions = () => {
  return(
    <section className="group-options">
      <img className="logo" src={logo} alt='logo' />
      <section className="group-btns">
        <button>Add expense</button>
        <button>Add payment</button>
        <button>Invite friends</button>
      </section>
    </section>
  )
}
export default GroupOptions;