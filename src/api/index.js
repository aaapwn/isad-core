"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const queue_controller_1 = require("./queue/queue.controller");
const customer_controller_1 = require("./customer/customer.controller");
const order_controller_1 = require("./order/order.controller");
const menuCategory_controller_1 = require("./menu/menuCategory.controller");
const menuItem_controller_1 = require("./menu/menuItem.controller");
const table_controller_1 = require("./table/table.controller");
const employee_controller_1 = require("./employee/employee.controller");
const router = express_1.default.Router();
exports.router = router;
router.use("/queue", queue_controller_1.router);
router.use("/customer", customer_controller_1.router);
router.use("/order", order_controller_1.router);
router.use("/menu/category", menuCategory_controller_1.router);
router.use("/menu/item", menuItem_controller_1.router);
router.use("/table", table_controller_1.router);
router.use("/employee", employee_controller_1.router);
