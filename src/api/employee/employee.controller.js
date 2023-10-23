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
        const employee = yield prisma_1.prisma.employee.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        res.status(200).json(employee);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
        }
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield prisma_1.prisma.employee.findUnique({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json(employee);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
        }
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, age, tel } = req.body;
        const employee = yield prisma_1.prisma.employee.create({
            data: {
                firstName,
                lastName,
                age,
                tel
            }
        });
        res.status(201).json(employee);
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
        }
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, age, tel } = req.body;
        const employee = yield prisma_1.prisma.employee.update({
            where: {
                id: Number(id)
            },
            data: {
                firstName,
                lastName,
                age,
                tel
            }
        });
        res.status(200).json(Object.assign({ message: 'แก้ไขข้อมูลเรียบร้อย' }, employee));
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' });
        }
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.prisma.employee.delete({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json({
            message: 'ลบข้อมูลเรียบร้อย',
        });
    }
    catch (error) {
        if (error) {
            res.status(400).json({ message: error.message || 'เกิดข้อผิดพลาดในการลบข้อมูล' });
        }
    }
}));