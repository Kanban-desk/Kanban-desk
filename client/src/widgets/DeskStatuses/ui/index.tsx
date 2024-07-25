import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { ChromePicker } from 'react-color';
import AddIcon from '@mui/icons-material/Add';
import StatusCard from '@/shared/ui/statusCard';

interface Status {
  id: number;
  color: string;
  name: string;
}
const defaultStatuses: Status[] = [
    { id: 1, name: "Открыто", color: "#3498db" },
    { id: 2, name: "В работе", color: "#f1c40f" },
    { id: 3, name: "На проверке", color: "#2ecc71" },
    { id: 4, name: "Закрыто", color: "#d03beb" },
  ];


const DeskStatuses: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>(defaultStatuses);
  const [open, setOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<Status | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorChange = (color: any) => {
    if (editingStatus) {
      setEditingStatus({ ...editingStatus, color: color.hex });
    }
  };

  const handleOpen = (status?: Status) => {
    if (status) {
      setEditingStatus(status);
    } else {
      setEditingStatus({ id: Date.now(), color: '', name: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingStatus(null);
    setShowColorPicker(false);
  };

  const handleSaveStatus = () => {
    if (editingStatus && editingStatus.color && editingStatus.name) {
      if (statuses.find(s => s.id === editingStatus.id)) {
        // Updating existing status
        setStatuses(statuses.map(s => s.id === editingStatus.id ? editingStatus : s));
      } else {
        // Adding new status
        setStatuses([...statuses, editingStatus]);
      }
      handleClose();
    }
  };

  const handleEditStatus = (id: number) => {
    const statusToEdit = statuses.find(s => s.id === id);
    if (statusToEdit) {
      handleOpen(statusToEdit);
    }
  };
  const handleDeleteStatus = (id: number) => {
    setStatuses(statuses.filter(status => status.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Добавьте статусы для вашего проекта
      </Typography>
      <List>
        {statuses.map((status) => (
          <ListItem key={status.id} disablePadding>
            <StatusCard
              color={status.color}
              name={status.name}
              onEdit={() => handleEditStatus(status.id)}
              onDelete={() => handleDeleteStatus(status.id)}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        fullWidth
        sx={{ mt: 2 }}
      >
        Добавить статус
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingStatus && editingStatus.id ? 'Редактировать статус' : 'Добавить новый статус'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название статуса"
            fullWidth
            value={editingStatus?.name || ''}
            onChange={(e) => setEditingStatus(prev => prev ? {...prev, name: e.target.value} : null)}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setShowColorPicker(!showColorPicker)}
              sx={{ 
                backgroundColor: editingStatus?.color, 
                color: editingStatus?.color ? 'white' : 'inherit',
                '&:hover': {
                  backgroundColor: editingStatus?.color,
                }
              }}
            >
              {showColorPicker ? 'Закрыть палитру' : 'Выбрать цвет'}
            </Button>
          </Box>
          {showColorPicker && (
            <Box sx={{ mb: 2 }}>
              <ChromePicker 
                color={editingStatus?.color || ''} 
                onChangeComplete={handleColorChange} 
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSaveStatus}>
            {editingStatus && editingStatus.id ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeskStatuses;