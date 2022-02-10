import { Param } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StudentService } from '../student/student.service';
import { assignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService:StudentService
  ){

  }
  @Query(returns => LessonType)
  lesson(
    @Args('id') id:string
  ){
      return this.lessonService.getLesson(id);
  }
  @Query(returns=>[LessonType])//return array[]
  lessons(){
    return this.lessonService.getAllLesson();
  }
  
  @Mutation(returns=>LessonType)
  createLesson(@Args('createLessonInput')  createLessonInput:CreateLessonInput){
     
    return this.lessonService.createLesson(createLessonInput);

  }
  @Mutation(returns=>LessonType)
  assignStudentsToLesson(
      @Args('assignStudentsToLessonInput') assignStudentsToLessonInput:assignStudentsToLessonInput
  ){
      const {lessonId,studentIds}=assignStudentsToLessonInput;
      return this.lessonService.assignStudentsToLesson(lessonId,studentIds);
  }
  

@ResolveField()
  async students(@Parent() lesson:Lesson){
      // console.log(lesson)
      return this.studentService.getManyStudents(lesson.students);
  }
  
}
 //   @Args('name') name:string,@Args('startDate') startDate:string,@Args('endDate') endDate:string,