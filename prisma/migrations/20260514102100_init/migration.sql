-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('admin', 'speaker');

-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role_enum" NOT NULL DEFAULT 'speaker',
    "full_name" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "photo_url" TEXT,
    "external_links" JSONB,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "location" VARCHAR(255),

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "capacity" INTEGER,
    "event_id" VARCHAR(36) NOT NULL,
    "room_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_speaker" (
    "id" SERIAL NOT NULL,
    "session_id" VARCHAR(36) NOT NULL,
    "speaker_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "session_speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author_name" VARCHAR(255) DEFAULT 'anonymous',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_speaker_session_id_speaker_id_key" ON "session_speaker"("session_id", "speaker_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_speaker" ADD CONSTRAINT "session_speaker_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_speaker" ADD CONSTRAINT "session_speaker_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
