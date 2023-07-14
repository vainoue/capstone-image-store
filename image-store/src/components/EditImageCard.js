import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Fade, MenuItem, Modal, Paper, TextField } from '@mui/material';
import '../styles/EditImageCard.css';
import MultipleSelectChip from './MultipleSelectChip';

const EditImageCard = ({ selectedImage, editOpen, setEditOpen }) => {
  const [error, setError] = useState('');
  const [tags, setTags] = useState(selectedImage.tags);

  const tagOptions = [
    'Exploration and Production',
    'Refining and Processing',
    'Transportation and Distribution',
    'Renewable Energy and Sustainability',
    'Economics and Markets',
    'Health, Safety, and Environment (HSE)',
    'Technology and Innovation',
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    tag: Yup.array().min(1, 'Tag is required').required('Tag is required'),
  });

  const handleSubmit = async (values) => {
    try {
      // Make an API call or call a function to update the image with the new values
      //await updateImage(selectedImage._id, values);
      // Handle success if necessary
      console.log(values);
      setEditOpen(false);
    } catch (error) {
      // Handle error if update fails
      setError(error.message);
    }
  };

  return (
    <>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        className="edit-module mt-5 "
      >
        <Fade in={editOpen}>
          <Paper className="edit-form p-3">
            <Formik
              initialValues={{
                title: selectedImage.title,
                description: selectedImage.description,
                status: selectedImage.status,
                price: selectedImage.price,
                tag: tags,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="row">
                  <div className="edit-content col-5 d-flex align-items-center justify-content-between">
                    <img
                      src={selectedImage.imageLocation}
                      alt={selectedImage.title}
                    />
                  </div>
                  <div className="edit-content col-7">
                    <div className="form-field">
                      <label htmlFor="title">Title </label>
                      <Field
                        type="text"
                        as={TextField}
                        id="title"
                        name="title"
                        placeholder="Enter Image Title"
                        className="edit-field"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="description">Description</label>
                      <Field
                        type="text"
                        as={TextField}
                        id="description"
                        name="description"
                        placeholder="Enter Image Description"
                        className="edit-field"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="price">Price </label>
                      <Field
                        type="number"
                        as={TextField}
                        id="price"
                        name="price"
                        placeholder="Enter Image Price"
                        className="edit-field"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="tag">Tags </label>
                      <Field
                        type="text"
                        name="tag"
                        component={MultipleSelectChip}
                        names={tagOptions}
                        fieldName={tags}
                        setFieldName={setTags}
                      />
                      <ErrorMessage
                        name="tag"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="status">Status </label>
                      <Field
                        as={TextField}
                        select
                        id="status"
                        name="status"
                        className="edit-field"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Deactive">Deactive</MenuItem>
                        <MenuItem value="Sold">Sold</MenuItem>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="error"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="mt-3"
                      color="primary"
                      variant="contained  "
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default EditImageCard;
