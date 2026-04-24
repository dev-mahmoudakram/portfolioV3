import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateContactMessageDto) {
    const message = await this.prisma.contactMessage.create({
      data: payload
    });

    return {
      ok: true,
      message: "Thanks Mahmoud will reply soon.",
      data: message
    };
  }
}
