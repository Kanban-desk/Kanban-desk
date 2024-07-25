import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface StatusCardProps {
  color: string;
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ color, name, onEdit, onDelete }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
      <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: color,
            mr: 2,
          }}
        />
        <Typography variant="body1">{name}</Typography>
      </CardContent>
      <Box sx={{ display: 'flex' }}>
        {onEdit && (
          <IconButton onClick={onEdit} size="small" sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={onDelete} size="small" sx={{ mr: 1 }}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default StatusCard;