"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../utils/prisma");
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queue = yield prisma_1.prisma.orderBill.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                OrderItem: true
            }
        });
        res.status(200).json(queue);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
        }
    }
}));
router.get('/w-order/:order_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.params;
        const customer = yield prisma_1.prisma.orderBill.findUnique({
            where: {
                id: Number(order_id)
            },
            include: {
                OrderItem: true
            }
        });
        res.status(200).json(customer);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
        }
    }
}));
router.get('/w-customer/:customer_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.params;
        const customer = yield prisma_1.prisma.orderBill.findMany({
            where: {
                customerId: Number(customer_id)
            },
            include: {
                OrderItem: true
            }
        });
        res.status(200).json(customer);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
        }
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItem, customerId } = req.body;
    try {
        const order = yield prisma_1.prisma.orderBill.create({
            data: {
                customerId,
                OrderItem: {
                    create: orderItem
                }
            }
        });
        res.status(201).json(order);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
        }
    }
}));
router.put('/updatestatus/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = yield prisma_1.prisma.orderBill.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            }
        });
        res.status(200).json(Object.assign({ message: 'แก้ไขข้อมูลเรียบร้อย' }, order));
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' });
        }
    }
}));
