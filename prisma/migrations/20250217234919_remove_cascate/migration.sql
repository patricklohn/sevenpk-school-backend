-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `topic_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `topic_userId_fkey`;

-- DropIndex
DROP INDEX `topic_categoryId_fkey` ON `topic`;

-- DropIndex
DROP INDEX `topic_userId_fkey` ON `topic`;

-- AddForeignKey
ALTER TABLE `topic` ADD CONSTRAINT `topic_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `topic` ADD CONSTRAINT `topic_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
