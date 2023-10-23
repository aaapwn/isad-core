import express from "express";
import { router as queue } from "./queue/queue.controller";
import { router as customer } from "./customer/customer.controller";
import { router as order } from "./order/order.controller";
import { router as menuCategory } from "./menu/menuCategory.controller";
import { router as menuItem } from "./menu/menuItem.controller";
import { router as table } from "./table/table.controller";
import { router as employee } from "./employee/employee.controller";

const router = express.Router();

router.use("/queue", queue)
router.use("/customer", customer)
router.use("/order", order)
router.use("/menu/category", menuCategory)
router.use("/menu/item", menuItem)
router.use("/table", table)
router.use("/employee", employee)

export { router };
