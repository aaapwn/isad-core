import express from 'express';
import { prisma } from '../../utils/prisma';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const menuItems = await prisma.menuCategory.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                Menu: {
                    orderBy: {
                        id: 'asc'
                    }
                }
            }
        })
        res.status(200).json(menuItems);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' })
        }
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, price, menuCategoryId } = req.body;
        const category = await prisma.menu.create({
            data: {
                name, price, menuCategoryId
            }
        })
        res.status(201).json(category);
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' })
        }
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, menuCategoryId } = req.body;
        const category = await prisma.menu.update({
            where: {
                id: Number(id)
            },
            data: {
                name, price, menuCategoryId
            }
        })
        res.status(200).json({
            message: 'แก้ไขข้อมูลเรียบร้อย',
            ...category
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
        await prisma.menu.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: 'ลบข้อมูลเรียบร้อย'
        });
    } catch (error: any) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการลบข้อมูล' })
        }
    }
})

export { router }
