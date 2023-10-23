import express from 'express';
import { prisma } from '../../utils/prisma';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const table = await prisma.table.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        res.status(200).json(table);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const table = await prisma.table.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(table);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.post('/', async (req, res) => {
    try {
        const table = await prisma.table.create({
            data: {
                ready: "AVAILABLE"
            }
        })
        res.status(201).json(table);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' })
        }
    }
})

router.put('/updatestatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ready } = req.body;
        const table = await prisma.table.update({
            where: {
                id: Number(id)
            },
            data: {
                ready
            }
        })
        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย',
            ...table
        });
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' })
        }
    }
})

router.put('/setcustomer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { customerId } = req.body;
        const table = await prisma.table.update({
            where: {
                id: Number(id)
            },
            data: {
                customerId
            }
        })
        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย',
            ...table
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
        await prisma.table.delete({
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
