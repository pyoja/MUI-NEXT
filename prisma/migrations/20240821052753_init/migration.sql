-- CreateTable
CREATE TABLE `tbl_user` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_user_id_key`(`id`),
    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_todo` (
    `no` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `userNo` INTEGER NOT NULL,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_todo` ADD CONSTRAINT `tbl_todo_userNo_fkey` FOREIGN KEY (`userNo`) REFERENCES `tbl_user`(`no`) ON DELETE RESTRICT ON UPDATE CASCADE;
