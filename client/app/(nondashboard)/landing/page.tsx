'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCoursesQuery } from '@/state/api'
import { CourseCardSearch } from '@/components/CourseCardSearch'
import { useRouter } from 'next/navigation'

export const Landing = () => {
    const router = useRouter()
    const currentImage = useCarousel({ totalImages: 3 })
    const { data: courses, isLoading, isError } = useGetCoursesQuery({})
    // console.log('🚀 ~ Landing ~ courses:', courses)

    const handleCourseClick = (courseId: string) => {
        router.push(`/search?id=${courseId}`)
    }

    if (isLoading) return <LoadingSkeleton />

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='landing'
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='landing__hero'
            >
                <div className='landing__hero-content'>
                    <h1 className='landing__title'>
                        Khóa học
                    </h1>
                    <p className='landing__description'>
                        Đây là danh sách những khóa học bạn có thể đăng ký
                        <br />
                        các khóa học khi bạn cần và muốn chúng
                    </p>
                    <div className='landing__cta'>
                        <Link href='/search'>
                            <div className='landing__cta-button'>
                                Tìm kiếm khóa học
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='landing__hero-images'>
                    {['/hero1.jpg', '/hero2.jpg', '/hero3.jpg'].map((src, index) => (
                        <Image
                            key={src}
                            src={src}
                            alt={`Hero banner ${index + 1}`}
                            fill
                            priority={index === currentImage}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className={`landing__hero-image ${index === currentImage ? 'landing__hero-image--active' : ''
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.3, once: true }}
                className='landing__featured'
            >
                <h2 className='landing__featured-title'>
                    Khóa học nổi bật
                </h2>
                <p className='landing--featured-description'>
                    Từ cơ bản đến nâng cao, trong tất cả các ngành, chúng tôi có các khóa học phù hợp dành riêng cho bạn và chuẩn bị cho toàn bộ hành trình học tập và tận dụng tối đa của bạn
                </p>

                <div className='landing__tags'>
                    {['web development',
                        'enterprise IT',
                        'react nextjs',
                        'javascript',
                        'backend development'
                    ].map((tag, index) => (
                        <span key={index} className='landing__tag'>
                            {tag}
                        </span>
                    ))}
                </div>

                <div className='landing__courses'>
                    {/* courses display */}
                    {courses && courses.slice(0, 4).map((course, index) => (
                        <motion.div
                            key={course.courseId}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ amount: 0.3 }}
                        >
                            <CourseCardSearch
                                course={course}
                                onClick={() => handleCourseClick(course.courseId)}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}


const LoadingSkeleton = () => {
    return (
        <div className="landing-skeleton">
            <div className="landing-skeleton__hero">
                <div className="landing-skeleton__hero-content">
                    <Skeleton className="landing-skeleton__title" />
                    <Skeleton className="landing-skeleton__subtitle" />
                    <Skeleton className="landing-skeleton__subtitle-secondary" />
                    <Skeleton className="landing-skeleton__button" />
                </div>
                <Skeleton className="landing-skeleton__hero-image" />
            </div>

            <div className="landing-skeleton__featured">
                <Skeleton className="landing-skeleton__featured-title" />
                <Skeleton className="landing-skeleton__featured-description" />

                <div className="landing-skeleton__tags">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton key={index} className="landing-skeleton__tag" />
                    ))}
                </div>

                <div className="landing-skeleton__courses">
                    {[1, 2, 3, 4].map((_, index) => (
                        <Skeleton key={index} className="landing-skeleton__course-card" />
                    ))}
                </div>
            </div>
        </div>
    )
}