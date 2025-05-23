import React from 'react';
import { Star, Clock, User, BookOpen, ShoppingCart } from 'lucide-react';
import { Link } from './ui/Link';

export interface CourseType {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  instructor: string;
  rating: number;
  reviewCount: number;
  duration: string;
  studentsCount: number;
  lessonsCount: number;
  price: number;
  discountPrice?: number;
  image: string;
}

interface CourseCardProps {
  course: CourseType;
}

const getLevelColor = (level: CourseType['level']) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const getLevelText = (level: CourseType['level']) => {
  switch (level) {
    case 'Beginner':
      return 'Начальный';
    case 'Intermediate':
      return 'Средний';
    case 'Advanced':
      return 'Продвинутый';
    default:
      return 'Все уровни';
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0
  }).format(price);
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group">
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
          {getLevelText(course.level)}
        </span>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 h-14">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">
          Преподаватель: <span className="font-medium text-gray-800">{course.instructor}</span>
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {course.rating.toFixed(1)} ({course.reviewCount} отзывов)
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-gray-400" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <User size={16} className="mr-2 text-gray-400" />
            {course.studentsCount.toLocaleString('ru-RU')} учеников
          </div>
          <div className="flex items-center col-span-2">
            <BookOpen size={16} className="mr-2 text-gray-400" />
            {course.lessonsCount} уроков
          </div>
        </div>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            {course.discountPrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(course.discountPrice)}
                </span>
                <span className="text-gray-400 line-through ml-2">
                  {formatPrice(course.price)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300">
              <ShoppingCart size={20} />
            </button>
            <Link 
              href={`/courses/${course.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;