import Modal from './modal.component';

const TestingBox = ({ save, modal, data, setModal }) => {
  return (
    <div>
      <br />
      <br />
      <div className={save ? "d-block" : "d-none"}>
        <button onClick={() => setModal(true)} >Alert()</button>
        <Modal show={modal} handleClose={() => setModal(false)} >
          <div>{JSON.stringify(data)}</div>
        </Modal>
      </div>
    </div>
  )
}

export default TestingBox
