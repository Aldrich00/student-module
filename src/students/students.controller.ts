import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { PropertyMetadata } from '@nestjs/core/injector/instance-wrapper';


@Controller('students')
export class StudentsController {
    constructor(private readonly studentService: StudentsService){}

    @Post()
    async createStudent(@Body() data: Partial<Student>): Promise<Student> {
        return this.studentService.createStudent(data);
    }

    @Get()
    async getStudent(): Promise<Student[]> {
        return this.studentService.getStudent();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: number): Promise<Student>{
        return this.studentService.getStudentById(id);
    }

    @Put(':id')
    async updateStudent(
        @Param('id') id: number,
        @Body() data: Partial<Student>,
    ): Promise<Student> {
        return this.studentService.updateStudent(id, data);
    }
}
