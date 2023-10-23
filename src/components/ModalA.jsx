import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalA = () => {
  const [show, setShow] = useState(false);
  const [allContacts, setAllContacts] = useState({ results: [] });
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   useEffect(() => {
  //     fetch("https://contact.mediusware.com/api/contacts/")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setAllContacts(data);
  //       });
  //   }, []);

  const fetchNextPage = () => {
    if (nextPageUrl) {
      fetch(nextPageUrl)
        .then((res) => res.json())
        .then((data) => {
          setAllContacts((prevData) => ({
            results: [...prevData.results, ...data.results],
          }));
          setNextPageUrl(data.next);
        });
    }
  };

  useEffect(() => {
    if (show) {
      // Fetch the initial data when the modal is opened.
      fetch("https://contact.mediusware.com/api/contacts/")
        .then((res) => res.json())
        .then((data) => {
          setAllContacts(data);
          setNextPageUrl(data.next);
        });

      // Add a scroll event listener to check for scrolling to the end of the modal.
      const handleScroll = () => {
        const modalContent = document.querySelector(".modal .modal-body");
        if (
          modalContent &&
          modalContent.scrollTop + modalContent.clientHeight >=
            modalContent.scrollHeight
        ) {
          fetchNextPage();
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        // Remove the scroll event listener when the modal is closed.
        window.removeEventListener("scroll", handleScroll);
      };
    }
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
          All Contacts
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <ModalA />
            <button className="btn btn-lg btn-outline-primary" type="button">
              Us Contacts
            </button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Header>
          <Modal.Body onScroll={fetchNextPage}>
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

export default ModalA;
