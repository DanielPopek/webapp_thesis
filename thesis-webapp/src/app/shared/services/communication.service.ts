import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { IntentDTO } from "src/app/shared/model/DTO/intent.dto.model";
import { ConversationDTO } from "src/app/shared/model/DTO/conversation.dto.model";
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";




@Injectable()
export class CommunicationService {
    readonly rootUrl = 'http://localhost:8080/management';
    constructor(private http: HttpClient) { }
  
    getIntentByCommunicationHash(hash)
    {
       var result:any= this.http.get(this.rootUrl +'/intent/hash/'+hash);
       return result;
    }

    deleteConversationByConversationHash(hash)
    {
        var result:any= this.http.delete(this.rootUrl +'/conversation/'+hash);
        return result;
    }

    getConversationsByDeveloperId(id)
    {
       var result:any= this.http.get(this.rootUrl +'/conversation/designer/'+id);
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

    saveNewConversation(conversation:ConversationDTO)
    {
        return this.http.post(this.rootUrl + '/conversation/new', conversation);
    }

    getApplicationsByDeveloperId(id)
    {
       var result:any= this.http.get(this.rootUrl +'/application/'+id);
       return result;
    }

    saveNewApplication(application:ApplicationDTO)
    {
        return this.http.post(this.rootUrl + '/application', application);
    }

    deleteApplicationByApplicationToken(token)
    {
        var result:any= this.http.delete(this.rootUrl +'/application/'+token);
        return result;
    }

    getResponse(context, conversationHash)
    {
        var wrappedContext={
            "context":context,
            "conversationHash":conversationHash
        }
        return this.http.post(this.rootUrl + '/context', wrappedContext);
    }
}