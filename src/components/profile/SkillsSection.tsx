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
  Rating,
  Autocomplete,
  Avatar
} from '@mui/material'
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Psychology as SkillsIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { Skill, Specialty } from '@/types'

const skillCategories = [
  'Technical Skills',
  'Clinical Skills',
  'Soft Skills',
  'Leadership',
  'Technology',
  'Languages',
  'Certifications',
  'Other'
]

const commonSkills = [
  'Patient Care',
  'IV Therapy',
  'Wound Care',
  'Medication Administration',
  'Vital Signs Monitoring',
  'Electronic Health Records (EHR)',
  'EPIC',
  'Cerner',
  'CPR/BLS',
  'ACLS',
  'PALS',
  'Critical Thinking',
  'Communication',
  'Leadership',
  'Time Management',
  'Team Collaboration',
  'Spanish',
  'French',
  'Other'
]

const specialtyOptions = [
  'Intensive Care Unit (ICU)',
  'Emergency Department (ED)',
  'Operating Room (OR)',
  'Medical-Surgical',
  'Pediatrics',
  'Oncology',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Labor & Delivery',
  'NICU',
  'Psychiatric',
  'Geriatrics',
  'Home Health',
  'Rehabilitation',
  'Other'
]

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'IV Therapy',
      category: 'Clinical Skills',
      keywords: ['intravenous', 'IV insertion', 'medication administration'],
      proficiency: 5,
      yearsExp: 8,
      isEndorsed: true
    },
    {
      id: '2',
      name: 'EPIC EHR',
      category: 'Technology',
      keywords: ['electronic health records', 'healthcare technology'],
      proficiency: 4,
      yearsExp: 5,
      isEndorsed: true
    },
    {
      id: '3',
      name: 'Critical Care',
      category: 'Clinical Skills',
      keywords: ['ICU', 'ventilator management', 'hemodynamic monitoring'],
      proficiency: 5,
      yearsExp: 6,
      isEndorsed: true
    },
    {
      id: '4',
      name: 'Spanish',
      category: 'Languages',
      keywords: ['bilingual', 'patient communication'],
      proficiency: 4,
      yearsExp: 10,
      isEndorsed: false
    }
  ])

  const [specialties, setSpecialties] = useState<Specialty[]>([
    {
      id: '1',
      name: 'Intensive Care Unit (ICU)',
      category: 'Primary Specialty',
      keywords: ['critical care', 'ventilator', 'hemodynamics'],
      yearsExp: 6,
      isPrimary: true
    },
    {
      id: '2',
      name: 'Emergency Department (ED)',
      category: 'Secondary Specialty',
      keywords: ['trauma', 'triage', 'emergency medicine'],
      yearsExp: 2,
      isPrimary: false
    }
  ])

  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false)
  const [isSpecialtyDialogOpen, setIsSpecialtyDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null)
  const [skillFormData, setSkillFormData] = useState<Partial<Skill>>({})
  const [specialtyFormData, setSpecialtyFormData] = useState<Partial<Specialty>>({})

  const handleAddSkill = () => {
    setEditingSkill(null)
    setSkillFormData({
      name: '',
      category: '',
      keywords: [],
      proficiency: 3,
      yearsExp: 0,
      isEndorsed: false
    })
    setIsSkillDialogOpen(true)
  }

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setSkillFormData({ ...skill })
    setIsSkillDialogOpen(true)
  }

  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id))
  }

  const handleSaveSkill = () => {
    if (editingSkill) {
      setSkills(prev => 
        prev.map(skill => 
          skill.id === editingSkill.id 
            ? { ...skill, ...skillFormData } as Skill
            : skill
        )
      )
    } else {
      const newSkill: Skill = {
        ...skillFormData,
        id: Date.now().toString()
      } as Skill
      setSkills(prev => [...prev, newSkill])
    }
    setIsSkillDialogOpen(false)
    setSkillFormData({})
    setEditingSkill(null)
  }

  const handleAddSpecialty = () => {
    setEditingSpecialty(null)
    setSpecialtyFormData({
      name: '',
      category: '',
      keywords: [],
      yearsExp: 0,
      isPrimary: false
    })
    setIsSpecialtyDialogOpen(true)
  }

  const handleEditSpecialty = (specialty: Specialty) => {
    setEditingSpecialty(specialty)
    setSpecialtyFormData({ ...specialty })
    setIsSpecialtyDialogOpen(true)
  }

  const handleDeleteSpecialty = (id: string) => {
    setSpecialties(prev => prev.filter(specialty => specialty.id !== id))
  }

  const handleSaveSpecialty = () => {
    if (editingSpecialty) {
      setSpecialties(prev => 
        prev.map(specialty => 
          specialty.id === editingSpecialty.id 
            ? { ...specialty, ...specialtyFormData } as Specialty
            : specialty
        )
      )
    } else {
      const newSpecialty: Specialty = {
        ...specialtyFormData,
        id: Date.now().toString()
      } as Specialty
      setSpecialties(prev => [...prev, newSpecialty])
    }
    setIsSpecialtyDialogOpen(false)
    setSpecialtyFormData({})
    setEditingSpecialty(null)
  }

  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 1: return 'Beginner'
      case 2: return 'Novice'
      case 3: return 'Intermediate'
      case 4: return 'Advanced'
      case 5: return 'Expert'
      default: return 'Unknown'
    }
  }

  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 1: return 'error'
      case 2: return 'warning'
      case 3: return 'info'
      case 4: return 'success'
      case 5: return 'primary'
      default: return 'default'
    }
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
          <SkillsIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Skills & Specialties
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Your professional skills and areas of expertise
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSpecialty}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
            }}
          >
            Add Specialty
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSkill}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
            }}
          >
            Add Skill
          </Button>
        </Box>
      </Box>

      <Stack spacing={4}>
        {/* Specialties Section */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2} display="flex" alignItems="center" gap={1}>
            <SchoolIcon color="primary" />
            Areas of Specialization
          </Typography>
          <Stack spacing={2}>
            {specialties.map((specialty, index) => (
              <Card 
                key={specialty.id}
                elevation={0}
                sx={{ 
                  border: 1, 
                  borderColor: specialty.isPrimary ? 'primary.main' : 'divider',
                  borderRadius: 3,
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                          {specialty.name}
                        </Typography>
                        {specialty.isPrimary && (
                          <Chip 
                            icon={<StarIcon />}
                            label="Primary" 
                            color="primary" 
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                        <Box display="flex" alignItems="center" gap={1}>
                          <TrendingUpIcon fontSize="small" color="success" />
                          <Typography variant="body2" color="text.secondary">
                            {specialty.yearsExp} years experience
                          </Typography>
                        </Box>
                        {specialty.keywords && specialty.keywords.length > 0 && (
                          <Box display="flex" gap={1} flexWrap="wrap">
                            {specialty.keywords.slice(0, 3).map((keyword, idx) => (
                              <Chip 
                                key={idx}
                                label={keyword}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box display="flex" gap={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditSpecialty(specialty)}
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
                        onClick={() => handleDeleteSpecialty(specialty.id)}
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
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Skills Section */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2} display="flex" alignItems="center" gap={1}>
            <SkillsIcon color="primary" />
            Professional Skills
          </Typography>
          <Stack spacing={2}>
            {skills.map((skill, index) => (
              <Card 
                key={skill.id}
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
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                          {skill.name}
                        </Typography>
                        {skill.isEndorsed && (
                          <Chip 
                            icon={<VerifiedIcon />}
                            label="Endorsed" 
                            color="success" 
                            size="small"
                            variant="outlined"
                          />
                        )}
                        <Chip 
                          label={skill.category}
                          size="small"
                          variant="outlined"
                          color="info"
                        />
                      </Box>
                      <Box display="flex" alignItems="center" gap={3} flexWrap="wrap" mb={2}>
                        {skill.proficiency && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                              Level:
                            </Typography>
                            <Rating 
                              value={skill.proficiency} 
                              readOnly 
                              size="small"
                              max={5}
                            />
                            <Chip 
                              label={getProficiencyLabel(skill.proficiency)}
                              size="small"
                              color={getProficiencyColor(skill.proficiency) as any}
                              variant="outlined"
                            />
                          </Box>
                        )}
                        {skill.yearsExp && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <TrendingUpIcon fontSize="small" color="success" />
                            <Typography variant="body2" color="text.secondary">
                              {skill.yearsExp} years
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      {skill.keywords && skill.keywords.length > 0 && (
                        <Box display="flex" gap={1} flexWrap="wrap">
                          {skill.keywords.map((keyword, idx) => (
                            <Chip 
                              key={idx}
                              label={keyword}
                              size="small"
                              variant="outlined"
                              sx={{ opacity: 0.7 }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Box display="flex" gap={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditSkill(skill)}
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
                        onClick={() => handleDeleteSkill(skill.id)}
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
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* Skill Dialog */}
      <Dialog 
        open={isSkillDialogOpen} 
        onClose={() => setIsSkillDialogOpen(false)}
        maxWidth="sm"
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
            {editingSkill ? 'Edit Skill' : 'Add Skill'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingSkill ? 'Update your skill information' : 'Add a new skill to your profile'}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <Autocomplete
              options={commonSkills}
              freeSolo
              value={skillFormData.name || ''}
              onChange={(_, value) => setSkillFormData(prev => ({ ...prev, name: value || '' }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Skill Name" 
                  required 
                  variant="outlined"
                />
              )}
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={skillFormData.category || ''}
                onChange={(e) => setSkillFormData(prev => ({ ...prev, category: e.target.value }))}
                label="Category"
              >
                {skillCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Proficiency Level
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Rating
                  value={skillFormData.proficiency || 3}
                  onChange={(_, value) => setSkillFormData(prev => ({ ...prev, proficiency: value || 3 }))}
                  max={5}
                />
                <Typography variant="body2" color="text.secondary">
                  {getProficiencyLabel(skillFormData.proficiency || 3)}
                </Typography>
              </Box>
            </Box>

            <TextField
              label="Years of Experience"
              type="number"
              inputProps={{ min: 0, max: 50 }}
              value={skillFormData.yearsExp || ''}
              onChange={(e) => setSkillFormData(prev => ({ 
                ...prev, 
                yearsExp: e.target.value ? parseInt(e.target.value) : 0 
              }))}
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              multiple
              options={[]}
              freeSolo
              value={skillFormData.keywords || []}
              onChange={(_, value) => setSkillFormData(prev => ({ ...prev, keywords: value }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Keywords (press enter to add)"
                  variant="outlined"
                  helperText="Add related keywords or synonyms"
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={() => setIsSkillDialogOpen(false)}
            variant="outlined"
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveSkill}
            variant="contained"
            size="large"
            disabled={!skillFormData.name}
          >
            {editingSkill ? 'Update Skill' : 'Add Skill'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Specialty Dialog */}
      <Dialog 
        open={isSpecialtyDialogOpen} 
        onClose={() => setIsSpecialtyDialogOpen(false)}
        maxWidth="sm"
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
            {editingSpecialty ? 'Edit Specialty' : 'Add Specialty'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {editingSpecialty ? 'Update your specialty information' : 'Add a new specialty to your profile'}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <Autocomplete
              options={specialtyOptions}
              freeSolo
              value={specialtyFormData.name || ''}
              onChange={(_, value) => setSpecialtyFormData(prev => ({ ...prev, name: value || '' }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Specialty Area" 
                  required 
                  variant="outlined"
                />
              )}
            />

            <TextField
              label="Years of Experience"
              type="number"
              inputProps={{ min: 0, max: 50 }}
              value={specialtyFormData.yearsExp || ''}
              onChange={(e) => setSpecialtyFormData(prev => ({ 
                ...prev, 
                yearsExp: e.target.value ? parseInt(e.target.value) : 0 
              }))}
              fullWidth
              variant="outlined"
            />

            <Autocomplete
              multiple
              options={[]}
              freeSolo
              value={specialtyFormData.keywords || []}
              onChange={(_, value) => setSpecialtyFormData(prev => ({ ...prev, keywords: value }))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Keywords (press enter to add)"
                  variant="outlined"
                  helperText="Add related keywords or procedures"
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={() => setIsSpecialtyDialogOpen(false)}
            variant="outlined"
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveSpecialty}
            variant="contained"
            size="large"
            disabled={!specialtyFormData.name}
          >
            {editingSpecialty ? 'Update Specialty' : 'Add Specialty'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
