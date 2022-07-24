import { Alert } from "react-bootstrap";

const CustomAlert = (props) => {
  //   const [alert, setAlert] = useState("");
  //   const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      <Alert
        variant='primary'
        onClose={() => props.setShowAlert(false)}
        show={props.showAlert}
        dismissible
      >
        <p>{props.alert}</p>
      </Alert>
    </div>
  );
};

export default CustomAlert;
