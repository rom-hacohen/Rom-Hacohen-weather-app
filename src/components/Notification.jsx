import { useState } from "react";
const Notification = (props) => {

  let alert = ""
  if (props.status === "failed") alert = "alert alert-danger"
  if (props.status === "success") alert ="alert alert-success";

  return (
    <div className={alert} role="alert">
     <h2>{props.title}</h2>
     <h4>{props.message}</h4>
    </div>
  );
};

export default Notification;
