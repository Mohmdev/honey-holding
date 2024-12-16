import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../card'
import Image from 'next/image'
import { cn } from '../../../lib/utils/cn'
import { Button } from '../button'
import { Pencil, Trash2 } from 'lucide-react'
import type { TeacherCourseCardProps } from './types'

const TeacherCourseCard = ({
  course,
  onEdit,
  onDelete,
  isOwner
}: TeacherCourseCardProps) => {
  return (
    <Card className="course-card-teacher group">
      <CardHeader className="course-card-teacher__header">
        <Image
          src={course.image || '/placeholder.png'}
          alt={course.title}
          width={370}
          height={150}
          className="course-card-teacher__image"
          priority
        />
      </CardHeader>

      <CardContent className="course-card-teacher__content">
        <div className="flex flex-col">
          <CardTitle className="course-card-teacher__title">
            {course.title}
          </CardTitle>

          <CardDescription className="course-card-teacher__category">
            {course.category}
          </CardDescription>

          <p className="mb-2 text-sm">
            Status:{' '}
            <span
              className={cn(
                'rounded px-2 py-1 font-semibold',
                course.status === 'Published'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              {course.status}
            </span>
          </p>
          {course.enrollments && (
            <p className="text-secondary bg-secondary/10 ml-1 mt-1 inline-block text-sm font-normal">
              <span className="text-white-100 font-bold">
                {course.enrollments.length}
              </span>{' '}
              Student{course.enrollments.length > 1 ? 's' : ''} Enrolled
            </p>
          )}
        </div>

        <div className="mt-3 w-full gap-2 space-y-2 xl:flex xl:space-y-0">
          {isOwner ? (
            <>
              <div>
                <Button
                  className="course-card-teacher__edit-button"
                  onClick={() => onEdit(course)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
              <div>
                <Button
                  className="course-card-teacher__delete-button"
                  onClick={() => onDelete(course)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm italic text-gray-500">View Only</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default TeacherCourseCard
