import { formatPrice } from './utils'
import Image from 'next/image'
import React from 'react'
import AccordionSections from './AccordionSections'
import type { CoursePreviewProps } from './types'

const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price)
  return (
    <div className="course-preview">
      <div className="course-preview__container">
        <div className="course-preview__image-wrapper">
          <Image
            src={course.image || '/placeholder.png'}
            alt="Course Preview"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="course-preview__title">{course.title}</h2>
          <p className="text-md mb-4 text-gray-400">by {course.teacherName}</p>
          <p className="text-customgreys-dirtyGrey text-sm">
            {course.description}
          </p>
        </div>

        <div>
          <h4 className="text-white-50/90 mb-2 font-semibold">
            Course Content
          </h4>
          <AccordionSections sections={course.sections} />
        </div>
      </div>

      <div className="course-preview__container">
        <h3 className="mb-4 text-xl">Price Details (1 item)</h3>
        <div className="text-customgreys-dirtyGrey mb-4 flex justify-between text-base">
          <span className="font-bold">1x {course.title}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="border-customgreys-dirtyGrey flex justify-between border-t pt-4">
          <span className="text-lg font-bold">Total Amount</span>
          <span className="text-lg font-bold">{price}</span>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview
