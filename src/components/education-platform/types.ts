import type { ReactNode } from 'react'

/* ---------------------------------- User ---------------------------------- */
export interface UserSettings {
  theme?: 'light' | 'dark'
  emailAlerts?: boolean
  smsAlerts?: boolean
  courseNotifications?: boolean
  notificationFrequency?: 'immediate' | 'daily' | 'weekly'
}

export interface User {
  userId: string
  firstName?: string
  lastName?: string
  username?: string
  email: string
  publicMetadata: {
    userType: 'teacher' | 'student'
  }
  privateMetadata: {
    settings?: UserSettings
    // paymentMethods?: Array<PaymentMethod>
    defaultPaymentMethodId?: string
    stripeCustomerId?: string
  }
  unsafeMetadata: {
    bio?: string
    urls?: string[]
  }
}

export type CreateUserArgs = Omit<User, 'userId'>

/* ------------------------------- Components ------------------------------- */
export interface DateRange {
  from: string | undefined
  to: string | undefined
}

export interface Comment {
  commentId: string
  userId: string
  text: string
  timestamp: string
}

export interface Chapter {
  chapterId: string
  title: string
  content: string
  video?: string | File
  freePreview?: boolean
  type: 'Text' | 'Quiz' | 'Video'
}

export interface ChapterProgress {
  chapterId: string
  completed: boolean
}

export interface SectionProgress {
  sectionId: string
  chapters: ChapterProgress[]
}

export interface Section {
  sectionId: string
  sectionTitle: string
  sectionDescription?: string
  chapters: Chapter[]
}

export interface WizardStepperProps {
  currentStep: number
}

export interface AccordionSectionsProps {
  sections: Section[]
}

export interface CustomFixedModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export interface HeaderProps {
  title: string
  subtitle: string
  rightElement?: ReactNode
}

export interface SharedNotificationSettingsProps {
  title?: string
  subtitle?: string
}

export interface ToolbarProps {
  onSearch: (search: string) => void
  onCategoryChange: (category: string) => void
}

export interface SectionModalProps {
  isOpen: boolean
  onClose: () => void
  sectionIndex: number | null
  sections: Section[]
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
}

export interface DroppableComponentProps {
  sections: Section[]
  setSections: (sections: Section[]) => void
  handleEditSection: (index: number) => void
  handleDeleteSection: (index: number) => void
  handleAddChapter: (sectionIndex: number) => void
  handleEditChapter: (sectionIndex: number, chapterIndex: number) => void
  handleDeleteChapter: (sectionIndex: number, chapterIndex: number) => void
}
/* ---------------------------- Content Specific ---------------------------- */
export interface Course {
  courseId: string
  teacherId: string
  teacherName: string
  title: string
  description?: string
  category: string
  image?: string
  price?: number // Stored in cents (e.g., 4999 for $49.99)
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'Draft' | 'Published'
  sections: Section[]
  enrollments?: Array<{
    userId: string
  }>
}

export interface UserCourseProgress {
  userId: string
  courseId: string
  enrollmentDate: string
  overallProgress: number
  sections: SectionProgress[]
  lastAccessedTimestamp: string
}

export type CreateCourseArgs = Omit<Course, 'courseId'>

export interface CourseFormData {
  courseTitle: string
  courseDescription: string
  courseCategory: string
  coursePrice: string
  courseStatus: boolean
}

export interface ChapterModalProps {
  isOpen: boolean
  onClose: () => void
  sectionIndex: number | null
  chapterIndex: number | null
  sections: Section[]
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
  courseId: string
}

export interface CourseCardProps {
  course: Course
  onGoToCourse: (course: Course) => void
}

export interface TeacherCourseCardProps {
  course: Course
  onEdit: (course: Course) => void
  onDelete: (course: Course) => void
  isOwner: boolean
}

export interface SearchCourseCardProps {
  course: Course
  isSelected?: boolean
  onClick?: () => void
}

export interface CoursePreviewProps {
  course: Course
}

export interface SelectedCourseProps {
  course: Course
  handleEnrollNow: (courseId: string) => void
}
