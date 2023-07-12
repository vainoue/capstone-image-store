import { Button, Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';

const EditImageCard = () => {
  return (
    <>
      <Card>
        <CardHeader
          title="Image Title"
          className="signin-card-header mt-2"
          sx={{
            fontSize: 20,
          }}
        />
      </Card>
    </>
  );
};

export default EditImageCard;
