'use client'

import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Stack,
  Button,
  IconButton,
  Chip,
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
  Grid
} from '@mui/material'
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Verified as VerifiedIcon,
  Assignment as CertificationIcon,
  DateRange as DateRangeIcon,
  Business as BusinessIcon,
  Link as LinkIcon,
  Warning as WarningIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Certification } from '@/types'

const certificationCategories = [
  'Nursing',
  'Healthcare',
  'Safety',
  'Technology',
  'Management',
  'Specialized Training',
  'Other'
]

const commonCertifications = [
  'Basic Life Support (BLS)',
  'Advanced Cardiac Life Support (ACLS)',
  'Pediatric Advanced Life Support (PALS)',
  'Critical Care Registered Nurse (CCRN)',
  'Certified Emergency Nurse (CEN)',
  'Certified Registered Nurse Anesthetist (CRNA)',
  'Certified Nurse Midwife (CNM)',
  'EPIC Certification',
  'IV Therapy Certification',
  'Wound Care Certification',
  'Other'
]

export function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: 'Basic Life Support (BLS)',
      issuingOrg: 'American Heart Association',
      issueDate: new Date('2023-01-15'),
      expiryDate: new Date('2025-01-15'),
      credentialId: 'BLS-12345678',
      verificationUrl: 'https://www.heart.org/verify',
      isActive: true
    },
    {
      id: '2',
      name: 'Advanced Cardiac Life Support (ACLS)',
      issuingOrg: 'American Heart Association',
      issueDate: new Date('2023-02-20'),
      expiryDate: new Date('2025-02-20'),
      credentialId: 'ACLS-87654321',
      isActive: true
    },
    {
      id: '3',
      name: 'Critical Care Registered Nurse (CCRN)',
      issuingOrg: 'American Association of Critical-Care Nurses',
      issueDate: new Date('2022-06-10'),
      expiryDate: new Date('2025-06-10'),
      credentialId: 'CCRN-456789',
      isActive: true
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null)
  const [formData, setFormData] = useState<Partial<Certification>>({})

  const handleAddNew = () => {
    setEditingCertification(null)
    setFormData({
      name: '',
      issuingOrg: '',
      issueDate: undefined,
      expiryDate: undefined,
      credentialId: '',
      verificationUrl: '',
      isActive: true
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification)
    setFormData({ ...certification })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id))
  }

  const handleSave = () => {
    if (editingCertification) {
      // Update existing certification
      setCertifications(prev => 
        prev.map(cert => 
          cert.id === editingCertification.id 
            ? { ...cert, ...formData } as Certification
            : cert
        )
      )
    } else {
      // Add new certification
      const newCertification: Certification = {
        ...formData,
        id: Date.now().toString()
      } as Certification
      setCertifications(prev => [...prev, newCertification])
    }
    setIsDialogOpen(false)
    setFormData({})
    setEditingCertification(null)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setFormData({})
    setEditingCertification(null)
  }

  const isExpired = (expiryDate?: Date) => {
    return expiryDate && expiryDate < new Date()
  }

  const isExpiringSoon = (expiryDate?: Date) => {
    if (!expiryDate) return false
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return expiryDate < thirtyDaysFromNow && expiryDate >= new Date()
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
          <CertificationIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Certifications & Licenses
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Professional certifications and licenses
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
          Add Certification
        </Button>
      </Box>

      {/* Certifications List */}
      <Stack spacing={3}>
        {certifications.map((cert, index) => (
          <Card 
            key={cert.id}
            elevation={0}
            sx={{ 
              border: 1, 
              borderColor: isExpired(cert.expiryDate) ? 'error.main' : 
                         isExpiringSoon(cert.expiryDate) ? 'warning.main' : 'divider',
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
                  background: `linear-gradient(135deg, ${
                    isExpired(cert.expiryDate) ? '#ffebee' : 
                    isExpiringSoon(cert.expiryDate) ? '#fff8e1' : 
                    index % 2 === 0 ? '#f8f9ff' : '#fff8f0'
                  } 0%, ${
                    isExpired(cert.expiryDate) ? '#ffcdd2' : 
                    isExpiringSoon(cert.expiryDate) ? '#ffecb3' : 
                    index % 2 === 0 ? '#e3f2fd' : '#ffeaa7'
                  } 100%)`,
                  p: 3,
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                      <Typography variant="h6" fontWeight="bold" color="text.primary">
                        {cert.name}
                      </Typography>
                      {cert.isActive && !isExpired(cert.expiryDate) && (
                        <Chip 
                          icon={<VerifiedIcon />}
                          label="Active" 
                          color="success" 
                          size="small"
                          variant="outlined"
                        />
                      )}
                      {isExpired(cert.expiryDate) && (
                        <Chip 
                          icon={<WarningIcon />}
                          label="Expired" 
                          color="error" 
                          size="small"
                          variant="outlined"
                        />
                      )}
                      {isExpiringSoon(cert.expiryDate) && (
                        <Chip 
                          icon={<WarningIcon />}
                          label="Expiring Soon" 
                          color="warning" 
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    <Typography variant="subtitle1" color="primary" fontWeight="medium" mb={1}>
                      {cert.issuingOrg}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                      {cert.credentialId && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <CertificationIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            ID: {cert.credentialId}
                          </Typography>
                        </Box>
                      )}
                      <Box display="flex" alignItems="center" gap={1}>
                        <DateRangeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {cert.issueDate?.toLocaleDateString()} - {
                            cert.expiryDate ? cert.expiryDate.toLocaleDateString() : 'No Expiry'
                          }
                        </Typography>
                      </Box>
                      {cert.verificationUrl && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinkIcon fontSize="small" color="action" />
                          <Typography 
                            variant="body2" 
                            color="primary"
                            component="a"
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                          >
                            Verify
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box display="flex" gap={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(cert)}
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
                      onClick={() => handleDelete(cert.id)}
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
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Issue Date
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {cert.issueDate?.toLocaleDateString() || 'Not specified'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Expiry Date
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="medium"
                        color={
                          isExpired(cert.expiryDate) ? 'error.main' : 
                          isExpiringSoon(cert.expiryDate) ? 'warning.main' : 'text.primary'
                        }
                      >
                        {cert.expiryDate?.toLocaleDateString() || 'No expiry'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status
                      </Typography>
                      <Chip 
                        label={
                          isExpired(cert.expiryDate) ? 'Expired' :
                          isExpiringSoon(cert.expiryDate) ? 'Expiring Soon' :
                          cert.isActive ? 'Active' : 'Inactive'
                        }
                        color={
                          isExpired(cert.expiryDate) ? 'error' :
                          isExpiringSoon(cert.expiryDate) ? 'warning' :
                          cert.isActive ? 'success' : 'default'
                        }
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        ))}

        {certifications.length === 0 && (
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
            <CertificationIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Certifications
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Add your professional certifications and licenses
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Add Your First Certification
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
            {editingCertification ? 'Edit Certification' : 'Add Certification'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingCertification ? 'Update your certification information' : 'Add new certification to your profile'}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <Box display="flex" gap={2}>
                <FormControl fullWidth>
                  <InputLabel>Certification Name</InputLabel>
                  <Select
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    label="Certification Name"
                  >
                    {commonCertifications.map((cert) => (
                      <MenuItem key={cert} value={cert}>
                        {cert}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Issuing Organization"
                  value={formData.issuingOrg || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, issuingOrg: e.target.value }))}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Box>

              <Box display="flex" gap={2}>
                <DatePicker
                  label="Issue Date"
                  value={formData.issueDate || null}
                  onChange={(date) => setFormData(prev => ({ ...prev, issueDate: date || undefined }))}
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                />
                <DatePicker
                  label="Expiry Date (Optional)"
                  value={formData.expiryDate || null}
                  onChange={(date) => setFormData(prev => ({ ...prev, expiryDate: date || undefined }))}
                  slots={{ textField: TextField }}
                  slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                />
              </Box>

              <Box display="flex" gap={2}>
                <TextField
                  label="Credential ID (Optional)"
                  value={formData.credentialId || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, credentialId: e.target.value }))}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Verification URL (Optional)"
                  type="url"
                  value={formData.verificationUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationUrl: e.target.value }))}
                  fullWidth
                  variant="outlined"
                />
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isActive || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  />
                }
                label="Currently Active"
              />
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
            disabled={!formData.name || !formData.issuingOrg}
          >
            {editingCertification ? 'Update Certification' : 'Add Certification'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
