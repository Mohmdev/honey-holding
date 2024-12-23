import Image from 'next/image'

import type { CourseCardProps } from './types'

import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { formatPrice } from './utils'

const CourseCard = ({ course, onGoToCourse }: CourseCardProps) => {
  return (
    <Card className="course-card group" onClick={() => onGoToCourse(course)}>
      <CardHeader className="course-card__header">
        <Image
          src={course.image || '/placeholder.png'}
          alt={course.title}
          width={400}
          height={350}
          className="course-card__image"
          priority
        />
      </CardHeader>
      <CardContent className="course-card__content">
        <CardTitle className="course-card__title">
          {course.title}: {course.description}
        </CardTitle>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage alt={course.teacherName} />
            <AvatarFallback className="bg-secondary-700 text-black">
              {course.teacherName[0]}
            </AvatarFallback>
          </Avatar>

          <p className="text-customgreys-dirtyGrey text-sm">
            {course.teacherName}
          </p>
        </div>

        <CardFooter className="course-card__footer">
          <div className="course-card__category">{course.category}</div>
          <span className="course-card__price">
            {formatPrice(course.price)}
          </span>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default CourseCard
