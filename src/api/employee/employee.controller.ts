import express from 'express';
import { prisma } from '../../utils/prisma';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employee = await prisma.employee.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        res.status(200).json(employee);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await prisma.employee.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(employee);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, age, tel } = req.body;
        const employee = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                age,
                tel
            }
        })
        res.status(201).json(employee);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' })
        }
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, age, tel } = req.body;
        const employee = await prisma.employee.update({
            where: {
                id: Number(id)
            },
            data: {
                firstName,
                lastName,
                age,
                tel
            }
        })
        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย',
            ...employee
        });
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' })
        }
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.employee.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: 'ลบข้อมูลเรียบร้อย',
        });
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการลบข้อมูล' })
        }
    }
})

export { router }
