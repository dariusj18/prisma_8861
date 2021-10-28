-- DropForeignKey
ALTER TABLE
  "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE
  "PostTag" DROP CONSTRAINT "PostTag_postId_fkey";

-- DropForeignKey
ALTER TABLE
  "PostTag" DROP CONSTRAINT "PostTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE
  "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE
  "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- AddForeignKey
ALTER TABLE
  "Profile"
ADD
  CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "Tag"
ADD
  CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "Post"
ADD
  CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "PostTag"
ADD
  CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  "PostTag"
ADD
  CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Tag.name_type_userId_unique" RENAME TO "Tag_name_type_userId_key";

-- RenameIndex
ALTER INDEX "User.username_type_unique" RENAME TO "User_username_type_key";

-- RenameIndex
ALTER INDEX "User.username_unique" RENAME TO "User_username_key";
