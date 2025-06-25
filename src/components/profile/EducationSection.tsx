'use client'

import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Stack,
  Button,
  Divider,
  IconButton,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Rating
} from '@mui/material'
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  DateRange as DateRangeIcon,
  LocationOn as LocationIcon,
  Grade as GradeIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Education } from '@/types'

const degreeTypes = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Certificate',
  'Diploma',
  'Professional Degree'
]

const fieldOfStudyOptions = [
  'Nursing',
  'Medicine',
  'Physical Therapy',
  'Occupational Therapy',
  'Pharmacy',
  'Radiology',
  'Laboratory Science',
  'Respiratory Therapy',
  'Healthcare Administration',
  'Public Health',
  'Other'
]

export function EducationSection() {
  const [educationRecords, setEducationRecords] = useState<Education[]>([
    {
      id: '1',
      institutionName: 'University of Miami',
      degree: 'Bachelor of Science in Nursing',
      fieldOfStudy: 'Nursing',
      startDate: new Date('2014-08-01'),
      endDate: new Date('2018-05-15'),
      isCompleted: true,
      gpa: 3.7,
      location: 'Miami, FL'
    },
    {
      id: '2',
      institutionName: 'Miami-Dade College',
      degree: 'Associate Degree in Nursing',
      fieldOfStudy: 'Nursing',
      startDate: new Date('2012-08-01'),
      endDate: new Date('2014-05-15'),
      isCompleted: true,
      gpa: 3.9,
      location: 'Miami, FL'
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<Education | null>(null)
  const [formData, setFormData] = useState<Partial<Education>>({})

  const handleAddNew = () => {
    setEditingRecord(null)
    setFormData({
      institutionName: '',
      degree: '',
      fieldOfStudy: '',
      startDate: undefined,
      endDate: undefined,
      isCompleted: false,
      gpa: undefined,
      location: ''
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (record: Education) => {
    setEditingRecord(record)
    setFormData({ ...record })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setEducationRecords(prev => prev.filter(record => record.id !== id))
  }

  const handleSave = () => {
    if (editingRecord) {
      // Update existing record
      setEducationRecords(prev => 
        prev.map(record => 
          record.id === editingRecord.id 
            ? { ...record, ...formData } as Education
            : record
        )
      )
    } else {
      // Add new record
      const newRecord: Education = {
        ...formData,
        id: Date.now().toString()
      } as Education
      setEducationRecords(prev => [...prev, newRecord])
    }
    setIsDialogOpen(false)
    setFormData({})
    setEditingRecord(null)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFormData({})
    setEditingRecord(null)
  }

  return (
    <Box>
      {/* Header */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 3,
          borderRadius: 2,
          color: 'white'
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <SchoolIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Education
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Your academic background and qualifications
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
          }}
        >
          Add Education
        </Button>
      </Box>

      {/* Education Records */}
      <Stack spacing={3}>
        {educationRecords.map((record, index) => (
          <Card 
            key={record.id}
            elevation={0}
            sx={{ 
              border: 1, 
              borderColor: 'divider',
              borderRadius: 3,
              overflow: 'hidden',
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Header */}
              <Box 
                sx={{ 
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? '#f8f9ff' : '#fff8f0'} 0%, ${index % 2 === 0 ? '#e3f2fd' : '#ffeaa7'} 100%)`,
                  p: 3,
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Typography variant="h6" fontWeight="bold" color="text.primary">
                        {record.degree}
                      </Typography>
                      {record.isCompleted && (
                        <Chip 
                          icon={<VerifiedIcon />}
                          label="Completed" 
                          color="success" 
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    <Typography variant="subtitle1" color="primary" fontWeight="medium" mb={1}>
                      {record.institutionName}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                      {record.fieldOfStudy && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <GradeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {record.fieldOfStudy}
                          </Typography>
                        </Box>
                      )}
                      {record.location && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {record.location}
                          </Typography>
                        </Box>
                      )}
                      <Box display="flex" alignItems="center" gap={1}>
                        <DateRangeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {record.startDate?.toLocaleDateString()} - {
                            record.isCompleted && record.endDate 
                              ? record.endDate.toLocaleDateString()
                              : 'Present'
                          }
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" gap={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(record)}
                      sx={{ 
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'primary.light', color: 'white' }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(record.id)}
                      sx={{ 
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'error.light', color: 'white' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {/* Details */}
              <Box p={3}>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  {record.gpa && (
                    <Box minWidth={120}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        GPA
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                          {record.gpa.toFixed(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / 4.0
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Box minWidth={120}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Duration
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {record.startDate && record.endDate && record.isCompleted
                        ? `${Math.round((record.endDate.getTime() - record.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))} years`
                        : 'In Progress'
                      }
                    </Typography>
                  </Box>
                  <Box minWidth={120}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Status
                    </Typography>
                    <Chip 
                      label={record.isCompleted ? 'Completed' : 'In Progress'}
                      color={record.isCompleted ? 'success' : 'info'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}

        {educationRecords.length === 0 && (
          <Card 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              bgcolor: 'grey.50',
              border: 2,
              borderStyle: 'dashed',
              borderColor: 'grey.300'
            }}
          >
            <SchoolIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Education Records
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Add your educational background to complete your profile
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Add Your First Education Record
            </Button>
          </Card>
        )}
      </Stack>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.default'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {editingRecord ? 'Edit Education Record' : 'Add Education Record'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingRecord ? 'Update your education information' : 'Add new education information to your profile'}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <Box display="flex" gap={2}>
                <TextField
                  label="Institution Name"
                  value={formData.institutionName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, institutionName: e.target.value }))}
                  fullWidth
                  required
                  variant="outlined"
                />
                <TextField
                  label="Location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  fullWidth
                  variant="outlined"
                  placeholder="City, State"
                />
              </Box>

              <Box display="flex" gap={2}>
                <FormControl fullWidth required>
                  <InputLabel>Degree Type</InputLabel>
                  <Select
                    value={formData.degree || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                    label="Degree Type"
                  >
                    {degreeTypes.map((degree) => (
                      <MenuItem key={degree} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Field of Study</InputLabel>
                  <Select
                    value={formData.fieldOfStudy || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                    label="Field of Study"
                  >
                    {fieldOfStudyOptions.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" gap={2}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate || null}
                  onChange={(date) => setFormData(prev => ({ ...prev, startDate: date || undefined }))}
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                />
                <DatePicker
                  label="End Date"
                  value={formData.endDate || null}
                  onChange={(date) => setFormData(prev => ({ ...prev, endDate: date || undefined }))}
                  disabled={!formData.isCompleted}
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                />
              </Box>

              <Box display="flex" gap={2} alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isCompleted || false}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        isCompleted: e.target.checked,
                        endDate: e.target.checked ? prev.endDate : undefined
                      }))}
                    />
                  }
                  label="Completed"
                />
                <TextField
                  label="GPA (Optional)"
                  type="number"
                  inputProps={{ min: 0, max: 4, step: 0.1 }}
                  value={formData.gpa || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    gpa: e.target.value ? parseFloat(e.target.value) : undefined 
                  }))}
                  fullWidth
                  variant="outlined"
                  helperText="On a 4.0 scale"
                />
              </Box>
            </Stack>
          </LocalizationProvider>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleCancel}
            variant="outlined"
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            variant="contained"
            size="large"
            disabled={!formData.institutionName || !formData.degree}
          >
            {editingRecord ? 'Update Education' : 'Add Education'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
