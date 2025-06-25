// Core types for the Health Carousel application

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  currentAddress: Address;
  permanentAddress?: Address;
}

export interface BirthInfo {
  dateOfBirth: Date;
  placeOfBirth: string;
  nationality: string;
}

export interface EmploymentRecord {
  id: string;
  employerName: string;
  jobTitle: string;
  department?: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  hoursPerWeek?: number;
  salary?: number;
  responsibilities: string[];
  achievements?: string[];
  reasonForLeaving?: string;
  supervisorName?: string;
  supervisorPhone?: string;
  supervisorEmail?: string;
  isVerified: boolean;
  verificationNotes?: string;
}

export interface Education {
  id: string;
  institutionName: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: Date;
  endDate?: Date;
  isCompleted: boolean;
  gpa?: number;
  location?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate?: Date;
  expiryDate?: Date;
  credentialId?: string;
  verificationUrl?: string;
  isActive: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  keywords: string[];
  proficiency?: number; // 1-5 scale
  yearsExp?: number;
  isEndorsed: boolean;
}

export interface Specialty {
  id: string;
  name: string;
  category?: string;
  keywords: string[];
  yearsExp?: number;
  isPrimary: boolean;
}

export interface VisaHistory {
  id: string;
  visaType: string;
  country: string;
  issueDate?: Date;
  expiryDate?: Date;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'DENIED';
}

export interface ResidenceHistory {
  id: string;
  country: string;
  state?: string;
  city?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  address?: Address;
}

export interface FamilyMember {
  id: string;
  relationship: string;
  firstName: string;
  lastName?: string;
  dateOfBirth?: Date;
  nationality?: string;
}

export interface Profile {
  id: string;
  userId: string;
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  nationality?: string;
  maritalStatus?: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | 'SEPARATED';
  
  // Address Information
  currentAddress?: Address;
  permanentAddress?: Address;
  
  // Professional Information
  licenseNumber?: string;
  licenseState?: string;
  licenseExpiry?: Date;
  yearsOfExperience?: number;
  
  // Status
  profileStatus: 'INCOMPLETE' | 'COMPLETE' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  completionScore: number;
  
  // Relations
  employmentHistory: EmploymentRecord[];
  education: Education[];
  certifications: Certification[];
  skills: Skill[];
  specialties: Specialty[];
  visaHistory: VisaHistory[];
  residenceHistory: ResidenceHistory[];
  familyMembers: FamilyMember[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CANDIDATE' | 'ACCOUNT_MANAGER' | 'COMPLIANCE' | 'ADMIN';
  isActive: boolean;
  emailVerified?: Date;
  profile?: Profile;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  templateUrl: string;
  previewUrl?: string;
  isActive: boolean;
  fields: Record<string, unknown>; // Template field configurations
  styles: Record<string, unknown>; // Styling options
}

export interface Resume {
  id: string;
  profileId: string;
  templateId: string;
  jobPostingId?: string;
  title?: string;
  sizzle?: string; // AI-generated summary
  customizations?: Record<string, unknown>;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  status: ResumeStatus;
  version: number;
  isLatest: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  profile: Profile;
  template: ResumeTemplate;
  jobPosting?: JobPosting;
  approvals: ResumeApproval[];
}

export type ResumeStatus = 
  | 'DRAFT'
  | 'PENDING_CANDIDATE_REVIEW'
  | 'CANDIDATE_APPROVED'
  | 'PENDING_AM_REVIEW'
  | 'AM_APPROVED'
  | 'PENDING_COMPLIANCE_REVIEW'
  | 'COMPLIANCE_APPROVED'
  | 'READY_FOR_SUBMISSION'
  | 'REJECTED';

export interface JobPosting {
  id: string;
  title: string;
  facilityName: string;
  location?: string;
  description?: string;
  requirements: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  salaryRange?: string;
  benefits: string[];
  isActive: boolean;
  postedDate: Date;
  expiryDate?: Date;
}

export interface ResumeApproval {
  id: string;
  resumeId: string;
  approverId: string;
  role: 'CANDIDATE' | 'ACCOUNT_MANAGER' | 'COMPLIANCE' | 'ADMIN';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
  comments?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  profileId: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedAt: Date;
  isVerified: boolean;
}

export type DocumentType = 
  | 'RESUME'
  | 'COVER_LETTER'
  | 'LICENSE'
  | 'CERTIFICATION'
  | 'TRANSCRIPT'
  | 'REFERENCE_LETTER'
  | 'IDENTIFICATION'
  | 'OTHER';

// Form types
export interface ProfileFormData {
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: Date;
    placeOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
  };
  addressInfo: {
    currentAddress: Address;
    permanentAddress?: Address;
  };
  professionalInfo: {
    licenseNumber?: string;
    licenseState?: string;
    licenseExpiry?: Date;
    yearsOfExperience?: number;
  };
}

export interface EmploymentFormData {
  employerName: string;
  jobTitle: string;
  department?: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  hoursPerWeek?: number;
  salary?: number;
  responsibilities: string[];
  achievements?: string[];
  reasonForLeaving?: string;
  supervisorName?: string;
  supervisorPhone?: string;
  supervisorEmail?: string;
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  type: 'REQUIRED' | 'FORMAT' | 'RANGE' | 'CONFLICT';
}

export interface ValidationWarning {
  field: string;
  message: string;
  type: 'GAP' | 'OVERLAP' | 'INCOMPLETE';
}

export interface WorkHistoryAnalysis {
  totalExperience: number; // in months
  gaps: Array<{
    start: Date;
    end: Date;
    duration: number; // in months
  }>;
  overlaps: Array<{
    jobs: string[];
    start: Date;
    end: Date;
    duration: number; // in months
  }>;
  chronologyIssues: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  skills?: string[];
  specialties?: string[];
  experience?: {
    min?: number;
    max?: number;
  };
  location?: string;
  visaStatus?: string[];
  profileStatus?: string[];
}

export interface SortOptions {
  field: string;
  direction: 'ASC' | 'DESC';
}
