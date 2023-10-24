import express from "express";
import { prisma } from "../../utils/prisma";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const queue = await prisma.orderBill.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                OrderItem: true
            }
        })
        res.status(200).json(queue);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.get('/w-order/:order_id', async (req, res) => {
    try {
        const { order_id } = req.params;
        const customer = await prisma.orderBill.findUnique({
            where: {
                id: Number(order_id)
            },
            include: {
                OrderItem: true
            }
        })
        res.status(200).json(customer);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.get('/w-customer/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;
        const customer = await prisma.orderBill.findMany({
            where: {
                customerId: Number(customer_id)
            },
            include: {
                OrderItem: true
                
            }
        })
        res.status(200).json(customer);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.post('/', async (req, res) => {
    const { orderItem, customerId } = req.body;
    try {
        const order = await prisma.orderBill.create({
            data: {
                customerId,
                OrderItem: {
                    create: orderItem
                }
            }
        })
        res.status(201).json(order);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' })
        }
    }
})

router.put('/updatestatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await prisma.orderBill.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            }
        })
        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย',
            ...order
        });
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' })
        }
    }
})

export { router }
