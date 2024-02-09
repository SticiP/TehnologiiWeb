// PersonalPage.tsx
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import person  from './PersonalStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonalPage: React.FC = observer(() => {
    const { personalData, updatePersonalData } = person ;
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(personalData);

    const handleUpdateName = () => {
      if (personalData) {
        if (formData.name !== '') {
          updatePersonalData(formData);
          setShowModal(false); // Închide modalul după actualizare
        } 
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
  };

  return (
    <div className="container">
    <h1 className="mt-5">Personal Data</h1>
    <div className="mb-3">
        <p className="mb-1"><strong>Nume/Prenume:</strong> {personalData.name}</p>
        <p className="mb-1"><strong>Vârsta:</strong> {personalData.age} ani</p>
        <p className="mb-1"><strong>Grupa:</strong> {personalData.grupa}</p>
    </div>
    <button className="btn btn-primary" onClick={() => setShowModal(true)}>Update Name</button>

    {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nume/Prenume</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Vârsta</label>
                                <input type="text" className="form-control" id="age" name="age" placeholder="Enter age" value={formData.age} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="grupa">Grupa</label>
                                <input type="text" className="form-control" id="grupa" name="grupa" placeholder="Enter group" value={formData.grupa} onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdateName}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )}
</div>

  );
});

export default PersonalPage;
