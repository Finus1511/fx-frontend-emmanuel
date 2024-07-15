import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const AddLinkModal = (props) => {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pay-amount-modal"
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Youtube Embed Link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="create-folder-form">
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Embed Link</Form.Label>
            <Form.Control type="text" placeholder="Past Here" />
          </Form.Group>
          <Button variant="primary" type="submit" className="default-btn mt-3">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddLinkModal