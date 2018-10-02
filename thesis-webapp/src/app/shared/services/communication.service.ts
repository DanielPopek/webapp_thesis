import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { IntentDTO } from "src/app/shared/model/DTO/intent.dto.model";
import { ConversationDTO } from "src/app/shared/model/DTO/conversation.dto.model";




@Injectable()
export class CommunicationService {
    readonly rootUrl = 'http://localhost:8080';
    constructor(private http: HttpClient) { }
  
    getIntentByCommunicationHash(hash)
    {
       var result:any= this.http.get(this.rootUrl +'/intent/hash/'+hash);
       return result;
    }

    saveRootIntentByConversationHash(hash,intent:IntentDTO)
    {
        var conversation:ConversationDTO= new ConversationDTO();
        conversation.conversationHash=hash;
        conversation.root=intent;
        conversation.name="tester";
        return this.http.post(this.rootUrl + '/conversation', conversation);
    }


}