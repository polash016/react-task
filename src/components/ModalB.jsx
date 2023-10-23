import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalA from "./ModalA";

const ModalB = () => {
  const [show, setShow] = useState(false);
  const [allContacts, setAllContacts] = useState({ results: [] });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("https://contact.mediusware.com/api/country-contacts/united states/")
      .then((res) => res.json())
      .then((data) => {
        setAllContacts(data);
      });
  }, [show]);

  return (
    <>
      {/* <Button variant="outline" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <>
        <button
          className="btn btn-lg btn-outline-primary"
          type="button"
          onClick={handleShow}
        >
          US Contacts
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <ModalA />
            <ModalB />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Header>
          <Modal.Body>
            {allContacts.results &&
              allContacts.results.map((contact) => (
                <div key={contact.id}>
                  <p>Phone: {contact.phone}</p>
                  <p>Country: {contact.country.name}</p>
                </div>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default ModalB;
