import { Body, Controller, Post } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() payload: CreateContactMessageDto) {
    return this.contactService.create(payload);
  }
}
