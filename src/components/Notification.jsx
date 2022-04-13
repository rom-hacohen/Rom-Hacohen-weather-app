import { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
const Notification = (props) => {
  const [style, setstyle] = useState("")

  if (props.status === 'error') setstyle("danger");
  if (props.status === 'success') setstyle("success");


  return (
  <Alert variant={style}>
  <Alert.Heading>{props.title}</Alert.Heading>
  <p>
  {props.message}
  </p>
  <hr />
</Alert>
    // <section>
    //   <h2>{props.title}</h2>
    //   <p>{props.message}</p>
    // </section>
  );
};

export default Notification;
