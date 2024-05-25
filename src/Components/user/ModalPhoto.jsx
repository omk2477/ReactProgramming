import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { app } from '../../firebaseInit';
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const ModalPhoto = ({setLoading, form, setForm}) => {
  const storage = getStorage(app);
  const db = getFirestore(app);
  const uid=sessionStorage.getItem('uid');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const style={
    cursor:'pointer',
    borderRadius: '50%',
    width:'80px',
    marginBottom: '10px'
  }

  const style1={
    borderRadius: '50%',
    width:'200px',
    marginBotton: '10px'
  }

  const onChangeFile = (e) => {
    setFileName(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  const onClickSave = async() => {
    if(!file){
      alert("변경할 이미지를 선택하세요!");
      return;
    }
    if(!window.confirm("사진을 저장하시래요?")) return;
    setLoading(true);
    const res=await uploadBytes(ref(storage, `photo/${Date.now()}.jpg`), file);
    const url=await getDownloadURL(res.ref);
    await setDoc(doc(db, `users/${uid}`), {...form, photo:url});
    setForm({...form, photo:url});
    setLoading(false);
  }

  return (
    <>

      <img src={form.photo || "http://via.placeholder.com/80x80"} width="80" onClick={handleShow}/>

      <Modal style={{top:'20%'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>사진변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={fileName || "http://via.placeholder.com/200x200"} style={style1}/>
          <Form.Control type="file" onChange={onChangeFile}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalPhoto