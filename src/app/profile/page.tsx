'use client'

import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button,
  Chip,
  Avatar,
  Stack,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material'
import { 
  Person as PersonIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Assignment as CertificationIcon,
  Psychology as SkillsIcon
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm'
import { EmploymentHistorySection } from '@/components/profile/EmploymentHistorySection'
import { EducationSection } from '@/components/profile/EducationSection'
import { SkillsSection } from '@/components/profile/SkillsSection'
import { CertificationsSection } from '@/components/profile/CertificationsSection'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [activeSection, setActiveSection] = useState<string>('personal')
  
  // Mock data - this would come from API
  const profileData = {
    completionScore: 75,
    personalInfo: {
      firstName: 'Maria',
      lastName: 'Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: new Date('1985-03-15'),
      placeOfBirth: 'Miami, FL',
      nationality: 'US Citizen',
      maritalStatus: 'MARRIED',
      currentAddress: {
        street: '123 Ocean Drive',
        city: 'Miami',
        state: 'FL',
        zipCode: '33139',
        country: 'United States'
      }
    },
    professionalInfo: {
      licenseNumber: 'RN123456789',
      licenseState: 'FL',
      licenseExpiry: new Date('2025-12-31'),
      yearsOfExperience: 8
    },
    status: 'UNDER_REVIEW',
    lastUpdated: new Date()
  }

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: <PersonIcon />, completion: 90 },
    { id: 'employment', label: 'Employment History', icon: <WorkIcon />, completion: 80 },
    { id: 'education', label: 'Education', icon: <SchoolIcon />, completion: 100 },
    { id: 'certifications', label: 'Certifications', icon: <CertificationIcon />, completion: 70 },
    { id: 'skills', label: 'Skills & Specialties', icon: <SkillsIcon />, completion: 60 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'success'
      case 'UNDER_REVIEW': return 'warning'
      case 'REJECTED': return 'error'
      default: return 'info'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircleIcon />
      case 'UNDER_REVIEW': return <WarningIcon />
      case 'REJECTED': return <WarningIcon />
      default: return <WarningIcon />
    }
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm data={profileData} />
      case 'employment':
        return <EmploymentHistorySection />
      case 'education':
        return <EducationSection />
      case 'certifications':
        return <CertificationsSection />
      case 'skills':
        return <SkillsSection />
      default:
        return <PersonalInfoForm data={profileData} />
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                fontSize: '2rem',
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 2
              }}
            >
              {profileData.personalInfo.firstName.charAt(0)}
              {profileData.personalInfo.lastName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
              </Typography>
              <Typography variant="h6" color="text.secondary" mb={1}>
                Healthcare Professional
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip 
                  icon={getStatusIcon(profileData.status)}
                  label={profileData.status.replace('_', ' ')}
                  color={getStatusColor(profileData.status) as any}
                  variant="outlined"
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  Last updated: {profileData.lastUpdated.toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />}
            sx={{ 
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              borderRadius: 2,
              px: 3
            }}
          >
            Edit Profile
          </Button>
        </Box>

        {/* Completion Progress */}
        <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100' }}>
          <CardContent sx={{ py: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="body1" fontWeight="medium">
                Profile Completion
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                {profileData.completionScore}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={profileData.completionScore} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'primary.100',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  bgcolor: 'primary.main'
                }
              }}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Alert for missing information */}
      {profileData.completionScore < 100 && (
        <Alert 
          severity="info" 
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small">
              Complete Now
            </Button>
          }
        >
          Complete your profile to unlock resume generation and job matching features.
        </Alert>
      )}

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        {/* Navigation Sidebar */}
        <Box sx={{ minWidth: { lg: 300 } }}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" sx={{ p: 2, pb: 1 }} fontWeight="bold">
                Profile Sections
              </Typography>
              <Divider />
              {sections.map((section, index) => (
                <Box key={section.id}>
                  <Box
                    onClick={() => setActiveSection(section.id)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: activeSection === section.id ? 'primary.50' : 'transparent',
                      borderLeft: activeSection === section.id ? '4px solid' : '4px solid transparent',
                      borderColor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'grey.50'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box color={activeSection === section.id ? 'primary.main' : 'text.secondary'}>
                          {section.icon}
                        </Box>
                        <Typography 
                          variant="body1" 
                          fontWeight={activeSection === section.id ? 'bold' : 'medium'}
                          color={activeSection === section.id ? 'primary.main' : 'text.primary'}
                        >
                          {section.label}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="caption" 
                        color={section.completion === 100 ? 'success.main' : 'warning.main'}
                        fontWeight="bold"
                      >
                        {section.completion}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={section.completion}
                      size="small"
                      sx={{ 
                        height: 4, 
                        borderRadius: 2,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 2,
                          bgcolor: section.completion === 100 ? 'success.main' : 'warning.main'
                        }
                      }}
                    />
                  </Box>
                  {index < sections.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1 }}>
          {renderSectionContent()}
        </Box>
      </Stack>
    </Container>
  )
}
