import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository (Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    //creation ng function

    async createStudent(data: Partial<Student>): Promise<Student> {
        const student = this.studentRepository.create(data);
        return this.studentRepository.save(student);
    }

    // creation ng read function
    async getStudent(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudentById(id:number): Promise<Student> {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) {
            throw new NotFoundException('Student with ID ${id} not found'); 
        }
        return student;
    }

    //creation ng update function
    async updateStudent(id: number, data: Partial<Student>): Promise<Student> {
        const student = await this.getStudentById(id);
        Object.assign(student, data);
        return this.studentRepository.save(student);
    }

    //creation ng delete function
    async deleteStudent(id: number): Promise<void> {
        const result = await this.studentRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException('Student with ID ${id} not found');
        }
    }
}
