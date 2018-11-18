export class IntentDTO
{
  name:string;
  answerSamples:string[];
  trainingSamples:string[];
  events:string[];
  misunderstandingStatements:string[];
  subintents:IntentDTO[];
}