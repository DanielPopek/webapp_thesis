import { IntentDTO } from "src/app/shared/model/DTO/intent.dto.model";

export class ConversationDTO
{
  name:string;
  conversationId:number;
  conversationHash:string;
  root:IntentDTO;
  description:string;
  lastModificationDate:string;
  creationDate:string;
}