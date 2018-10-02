export class IntentDTO
{
  name:string;
  answerSamples:string[];
  trainingSamples:string[];
  events:string[];
  subintents:IntentDTO[];
}