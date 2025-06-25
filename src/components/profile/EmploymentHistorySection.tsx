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
  FormControlLabel
} from '@mui/material'
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Work as WorkIcon,
  DateRange as DateRangeIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

interface EmploymentRecord {
  id: string
  employerName: string
  jobTitle: string
  department?: string
  location: string
  startDate: Date
  endDate?: Date
  isCurrentJob: boolean
  hoursPerWeek?: number
  salary?: number
  responsibilities: string[]
  achievements?: string[]
  reasonForLeaving?: string
  supervisorName?: string
  supervisorPhone?: string
  supervisorEmail?: string
  isVerified: boolean
}

export function EmploymentHistorySection() {
  const [employmentRecords, setEmploymentRecords] = useState<EmploymentRecord[]>([
    {
      id: '1',
      employerName: 'Miami General Hospital',
      jobTitle: 'Registered Nurse - ICU',
      department: 'Intensive Care Unit',
      location: 'Miami, FL',
      startDate: new Date('2020-01-15'),
      endDate: undefined,
      isCurrentJob: true,
      hoursPerWeek: 40,
      responsibilities: [
        'Provide direct patient care in a 24-bed ICU',
        'Monitor vital signs and administer medications',
        'Collaborate with multidisciplinary healthcare team',
        'Educate patients and families on care procedures'
      ],
      achievements: [
        'Recognized as Employee of the Month - March 2023',
        'Led implementation of new patient monitoring system'
      ],
      supervisorName: 'Dr. Sarah Johnson',
      supervisorPhone: '(555) 123-4567',
      supervisorEmail: 'sjohnson@miamigeneral.com',
      isVerified: true
    },
    {
      id: '2',
      employerName: 'Sunset Medical Center',
      jobTitle: 'Staff Nurse - Emergency Department',
      location: 'Miami, FL',
      startDate: new Date('2018-06-01'),
      endDate: new Date('2019-12-31'),
      isCurrentJob: false,
      hoursPerWeek: 36,
      responsibilities: [
        'Triaged emergency patients and assessed severity',
        'Administered emergency medications and treatments',
        'Assisted with trauma and cardiac cases',
        'Maintained accurate patient documentation'
      ],
      reasonForLeaving: 'Career advancement opportunity',
      supervisorName: 'Linda Martinez, RN',
      supervisorPhone: '(555) 987-6543',
      isVerified: true
    }
  ])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<EmploymentRecord | null>(null)
  const [formData, setFormData] = useState<Partial<EmploymentRecord>>({})

  const handleAddNew = () => {
    setEditingRecord(null)
    setFormData({
      employerName: '',
      jobTitle: '',
      department: '',
      location: '',
      startDate: new Date(),
      isCurrentJob: false,
      hoursPerWeek: 40,
      responsibilities: [''],
      achievements: ['']
    })
    setDialogOpen(true)
  }

  const handleEdit = (record: EmploymentRecord) => {
    setEditingRecord(record)
    setFormData(record)
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editingRecord) {
      // Update existing record
      setEmploymentRecords(prev => 
        prev.map(record => 
          record.id === editingRecord.id 
            ? { ...record, ...formData } as EmploymentRecord
            : record
        )
      )
    } else {
      // Add new record
      const newRecord: EmploymentRecord = {
        id: Date.now().toString(),
        ...formData,
        isVerified: false
      } as EmploymentRecord
      setEmploymentRecords(prev => [newRecord, ...prev])
    }
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setEmploymentRecords(prev => prev.filter(record => record.id !== id))
  }

  const addResponsibility = () => {
    setFormData(prev => ({
      ...prev,
      responsibilities: [...(prev.responsibilities || []), '']
    }))
  }

  const updateResponsibility = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities?.map((resp, i) => i === index ? value : resp) || []
    }))
  }

  const removeResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities?.filter((_, i) => i !== index) || []
    }))
  }

  const calculateTotalExperience = () => {
    let totalMonths = 0
    employmentRecords.forEach(record => {
      const start = new Date(record.startDate)
      const end = record.isCurrentJob ? new Date() : new Date(record.endDate!)
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      totalMonths += months
    })
    return Math.floor(totalMonths / 12)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              Employment History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Experience: {calculateTotalExperience()} years
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{ 
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'success.dark' }
            }}
          >
            Add Employment
          </Button>
        </Box>

        {/* Employment Records */}
        {employmentRecords.map((record, index) => (
          <Card key={record.id} sx={{ position: 'relative' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                <Box display="flex" gap={2}>
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: 2, 
                      bgcolor: 'primary.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <WorkIcon color="primary" />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h6" fontWeight="bold">
                      {record.jobTitle}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" fontWeight="medium">
                      {record.employerName}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {record.location}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <DateRangeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {record.startDate.toLocaleDateString()} - {record.isCurrentJob ? 'Present' : record.endDate?.toLocaleDateString()}
                        </Typography>
                      </Box>
                      {record.department && (
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <BusinessIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {record.department}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
                
                <Box display="flex" gap={1}>
                  <Chip 
                    label={record.isVerified ? 'Verified' : 'Pending'} 
                    color={record.isVerified ? 'success' : 'warning'}
                    size="small"
                    variant="outlined"
                  />
                  {record.isCurrentJob && (
                    <Chip 
                      label="Current" 
                      color="info"
                      size="small"
                    />
                  )}
                  <IconButton 
                    size="small" 
                    onClick={() => handleEdit(record)}
                    sx={{ color: 'primary.main' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(record.id)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Responsibilities */}
              <Box mb={2}>
                <Typography variant="body2" fontWeight="medium" color="text.primary" mb={1}>
                  Key Responsibilities:
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {record.responsibilities.map((resp, i) => (
                    <Typography 
                      component="li" 
                      variant="body2" 
                      color="text.secondary" 
                      key={i}
                      sx={{ mb: 0.5 }}
                    >
                      {resp}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Achievements */}
              {record.achievements && record.achievements.length > 0 && (
                <Box mb={2}>
                  <Typography variant="body2" fontWeight="medium" color="text.primary" mb={1}>
                    Key Achievements:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {record.achievements.map((achievement, i) => (
                      <Typography 
                        component="li" 
                        variant="body2" 
                        color="success.main"
                        key={i}
                        sx={{ mb: 0.5 }}
                      >
                        {achievement}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Additional Details */}
              <Box display="flex" gap={4} flexWrap="wrap">
                {record.hoursPerWeek && (
                  <Typography variant="caption" color="text.secondary">
                    Hours/Week: {record.hoursPerWeek}
                  </Typography>
                )}
                {record.supervisorName && (
                  <Typography variant="caption" color="text.secondary">
                    Supervisor: {record.supervisorName}
                  </Typography>
                )}
                {record.reasonForLeaving && (
                  <Typography variant="caption" color="text.secondary">
                    Reason for leaving: {record.reasonForLeaving}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Employment Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingRecord ? 'Edit Employment Record' : 'Add Employment Record'}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label="Employer Name"
                  value={formData.employerName || ''}
                  onChange={(e) => setFormData({...formData, employerName: e.target.value})}
                  fullWidth
                  required
                />
                <TextField
                  label="Job Title"
                  value={formData.jobTitle || ''}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  fullWidth
                  required
                />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label="Department"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  fullWidth
                />
                <TextField
                  label="Location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  fullWidth
                  required
                />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate || null}
                  onChange={(date) => setFormData({...formData, startDate: date || new Date()})}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
                {!formData.isCurrentJob && (
                  <DatePicker
                    label="End Date"
                    value={formData.endDate || null}
                    onChange={(date) => setFormData({...formData, endDate: date || undefined})}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              </Stack>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isCurrentJob || false}
                    onChange={(e) => setFormData({...formData, isCurrentJob: e.target.checked})}
                  />
                }
                label="This is my current job"
              />

              <TextField
                label="Hours per Week"
                type="number"
                value={formData.hoursPerWeek || ''}
                onChange={(e) => setFormData({...formData, hoursPerWeek: parseInt(e.target.value)})}
                fullWidth
              />

              {/* Responsibilities */}
              <Box>
                <Typography variant="subtitle1" fontWeight="medium" mb={2}>
                  Key Responsibilities
                </Typography>
                {formData.responsibilities?.map((resp, index) => (
                  <Box key={index} display="flex" gap={1} mb={1}>
                    <TextField
                      value={resp}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Describe your responsibility..."
                    />
                    <IconButton 
                      onClick={() => removeResponsibility(index)}
                      color="error"
                      sx={{ alignSelf: 'center' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addResponsibility}
                  variant="outlined"
                  size="small"
                >
                  Add Responsibility
                </Button>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              {editingRecord ? 'Update' : 'Add'} Employment
            </Button>
          </DialogActions>
        </Dialog>

        {employmentRecords.length === 0 && (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No employment records found. Add your work history to improve your profile completion score.
          </Alert>
        )}
      </Stack>
    </LocalizationProvider>
  )
}
