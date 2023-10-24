-- AddForeignKey
ALTER TABLE "OrderBill" ADD CONSTRAINT "OrderBill_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
