import express from "express";
import { prisma } from "../../utils/prisma";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const queue = await prisma.customer.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        res.status(200).json(queue);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(customer);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.put('/updatestatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const customer = await prisma.customer.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            }
        })
        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย',
            ...customer
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
        const customer = await prisma.customer.delete({
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
