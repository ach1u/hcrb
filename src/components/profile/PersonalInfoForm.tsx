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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material'
import { 
  Save as SaveIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

interface PersonalInfoFormProps {
  data: any
}

export function PersonalInfoForm({ data }: PersonalInfoFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(data.personalInfo)
  const [professionalData, setProfessionalData] = useState(data.professionalInfo)

  const handleSave = () => {
    // API call to save data would go here
    setIsEditing(false)
  }

  const maritalStatusOptions = [
    { value: 'SINGLE', label: 'Single' },
    { value: 'MARRIED', label: 'Married' },
    { value: 'DIVORCED', label: 'Divorced' },
    { value: 'WIDOWED', label: 'Widowed' },
    { value: 'SEPARATED', label: 'Separated' }
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        {/* Personal Information Card */}
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                Personal Information
              </Typography>
              <Button
                variant={isEditing ? "contained" : "outlined"}
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                sx={{ minWidth: 120 }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </Box>
            
            <Stack spacing={3}>
              {/* Name Fields */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  disabled={!isEditing}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="Middle Name"
                  value={formData.middleName || ''}
                  onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  disabled={!isEditing}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
              </Stack>

              {/* Contact Information */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
              </Stack>

              {/* Personal Details */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(date) => setFormData({...formData, dateOfBirth: date})}
                  disabled={!isEditing}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          bgcolor: isEditing ? 'background.paper' : 'grey.50'
                        }
                      }
                    }
                  }}
                />
                <TextField
                  label="Place of Birth"
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData({...formData, placeOfBirth: e.target.value})}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="Nationality"
                  value={formData.nationality}
                  onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
              </Stack>

              <FormControl 
                fullWidth 
                disabled={!isEditing}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: isEditing ? 'background.paper' : 'grey.50'
                  }
                }}
              >
                <InputLabel>Marital Status</InputLabel>
                <Select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                  label="Marital Status"
                >
                  {maritalStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary.main" mb={3}>
              Current Address
            </Typography>
            
            <Stack spacing={3}>
              <TextField
                label="Street Address"
                value={formData.currentAddress?.street || ''}
                onChange={(e) => setFormData({
                  ...formData, 
                  currentAddress: {...formData.currentAddress, street: e.target.value}
                })}
                disabled={!isEditing}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: isEditing ? 'background.paper' : 'grey.50'
                  }
                }}
              />
              
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label="City"
                  value={formData.currentAddress?.city || ''}
                  onChange={(e) => setFormData({
                    ...formData, 
                    currentAddress: {...formData.currentAddress, city: e.target.value}
                  })}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="State"
                  value={formData.currentAddress?.state || ''}
                  onChange={(e) => setFormData({
                    ...formData, 
                    currentAddress: {...formData.currentAddress, state: e.target.value}
                  })}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="ZIP Code"
                  value={formData.currentAddress?.zipCode || ''}
                  onChange={(e) => setFormData({
                    ...formData, 
                    currentAddress: {...formData.currentAddress, zipCode: e.target.value}
                  })}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Professional Information Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary.main" mb={3}>
              Professional Information
            </Typography>
            
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label="License Number"
                  value={professionalData.licenseNumber}
                  onChange={(e) => setProfessionalData({...professionalData, licenseNumber: e.target.value})}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
                <TextField
                  label="License State"
                  value={professionalData.licenseState}
                  onChange={(e) => setProfessionalData({...professionalData, licenseState: e.target.value})}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <DatePicker
                  label="License Expiry Date"
                  value={professionalData.licenseExpiry}
                  onChange={(date) => setProfessionalData({...professionalData, licenseExpiry: date})}
                  disabled={!isEditing}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          bgcolor: isEditing ? 'background.paper' : 'grey.50'
                        }
                      }
                    }
                  }}
                />
                <TextField
                  label="Years of Experience"
                  type="number"
                  value={professionalData.yearsOfExperience}
                  onChange={(e) => setProfessionalData({...professionalData, yearsOfExperience: parseInt(e.target.value)})}
                  disabled={!isEditing}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: isEditing ? 'background.paper' : 'grey.50'
                    }
                  }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {isEditing && (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Make sure all information is accurate as it will be used for resume generation and compliance verification.
          </Alert>
        )}
      </Stack>
    </LocalizationProvider>
  )
}
