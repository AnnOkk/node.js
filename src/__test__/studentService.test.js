// The Arrange Act Assert (AAA) pattern in TDD unit testing

import { beforeEach, describe, expect, it, jest } from '@jest/globals';

const mockRepo = {
    createStudent: jest.fn(),
    findStudentById: jest.fn(),
    deleteStudentById: jest.fn(),
    updateStudent: jest.fn(),
    updateStudentScore: jest.fn(),
    findStudentsByName: jest.fn(),
    countStudentsByName: jest.fn(),
    findStudentsMinScore: jest.fn()
};

jest.unstable_mockModule('../repository/studentRepository.js', () => mockRepo);

const studentService = await import('../service/studentService.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('studentService', () => {
    it('addStudent returns false when student already exists', async () => {
        mockRepo.findStudentById.mockResolvedValue({ _id: '1' });

        const result = await studentService.addStudent({
            id: '1',
            name: 'Alice',
            password: 'secret'
        });

        expect(result).toBe(false);
        expect(mockRepo.findStudentById).toHaveBeenCalledWith('1');
        expect(mockRepo.createStudent).not.toHaveBeenCalled();
    });

    it('addStudent creates new student and returns true when student does not exist', async () => {
        mockRepo.findStudentById.mockResolvedValue(null);

        const result = await studentService.addStudent({
            id: '2',
            name: 'Bob',
            password: 'qwerty'
        });

        expect(result).toBe(true);
        expect(mockRepo.createStudent).toHaveBeenCalledWith({
            _id: '2',
            name: 'Bob',
            password: 'qwerty'
        });
    });

    it('findStudent delegates to repository', async () => {
        const student = { _id: '3', name: 'Kate' };
        mockRepo.findStudentById.mockResolvedValue(student);

        const result = await studentService.findStudent('3');

        expect(result).toEqual(student);
        expect(mockRepo.findStudentById).toHaveBeenCalledWith('3');
    });

    it('deleteStudent delegates to repository', async () => {
        const deleted = { _id: '4' };
        mockRepo.deleteStudentById.mockResolvedValue(deleted);

        const result = await studentService.deleteStudent('4');

        expect(result).toEqual(deleted);
        expect(mockRepo.deleteStudentById).toHaveBeenCalledWith('4');
    });

    it('updateStudent returns student without scores', async () => {
        const toObject = jest.fn().mockReturnValue({
            _id: '5',
            name: 'Tim',
            scores: { math: 95 }
        });
        mockRepo.updateStudent.mockResolvedValue({ toObject });

        const result = await studentService.updateStudent('5', { name: 'Tom' });

        expect(mockRepo.updateStudent).toHaveBeenCalledWith('5', { name: 'Tom' });
        expect(toObject).toHaveBeenCalled();
        expect(result).toEqual({ _id: '5', name: 'Tim', scores: undefined });
    });

    it('addScore delegates to repository', async () => {
        const updated = { _id: '6' };
        mockRepo.updateStudentScore.mockResolvedValue(updated);

        const result = await studentService.addScore('6', 'math', 99);

        expect(result).toEqual(updated);
        expect(mockRepo.updateStudentScore).toHaveBeenCalledWith('6', 'math', 99);
    });

    it('findByName delegates to repository', async () => {
        const list = [{ _id: '7', name: 'Eva' }];
        mockRepo.findStudentsByName.mockResolvedValue(list);

        const result = await studentService.findByName('Eva');

        expect(result).toEqual(list);
        expect(mockRepo.findStudentsByName).toHaveBeenCalledWith('Eva');
    });

    it('countByNames delegates to repository', async () => {
        mockRepo.countStudentsByName.mockReturnValue(2);

        const result = studentService.countByNames(['Ann', 'Bob']);

        expect(result).toBe(2);
        expect(mockRepo.countStudentsByName).toHaveBeenCalledWith(['Ann', 'Bob']);
    });

    it('findByMinScore delegates to repository', async () => {
        const list = [{ _id: '8', scores: { math: 90 } }];
        mockRepo.findStudentsMinScore.mockResolvedValue(list);

        const result = await studentService.findByMinScore('math', 80);

        expect(result).toEqual(list);
        expect(mockRepo.findStudentsMinScore).toHaveBeenCalledWith('math', 80);
    });
});
