import express from 'express';
import { prisma } from '../../utils/prisma';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const queue = await prisma.customer.findMany({
            orderBy: {
                id: 'asc'
            },
            where: {
                status: 'QUEUE'
            }
        })
        res.status(200).json(queue);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.post('/', async (req, res) => {
    try {
        const customer = await prisma.customer.create({
            data: {
                status: "QUEUE"
            }
        })
        res.status(201).json(customer);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' })
        }
    }
})

export { router }
