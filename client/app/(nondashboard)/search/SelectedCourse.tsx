import { AccordionSections } from '@/components/AccordionSection'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import React from 'react'

export const SelectedCourse = ({
    course,
    handleEnrollNow
}: SelectedCourseProps) => {
    return (
        <div className='selected-course'>
            <div>
                <h3 className='selected-course__title'>
                    {course.title}
                </h3>
                <p className='selected-course__author'>
                    Bởi {course.teacherName} | {" "}
                    <span className='selected-course__enrollment-count'>
                        {course?.enrollments?.length}
                    </span>
                </p>
            </div>

            <div className='selected-course__content'>
                <p className='selected-course__description'>
                    {course.description}
                </p>
                <div className='selected-course__sections'>
                    <h4 className='selected-course__sections-title'>
                        Nội dung khóa học
                    </h4>
                    {/* accordion sections */}
                    <AccordionSections
                        sections={course.sections}
                    />
                </div>

                <div className='selected-course__footer'>
                    <span className='selected-course__price'>
                        {formatPrice(course.price)}
                    </span>
                    <Button
                        onClick={() => handleEnrollNow(course.courseId)}
                        className="selected-course__button"
                    >
                        Đăng ký ngay
                    </Button>
                </div>
            </div>
        </div>
    )
}
