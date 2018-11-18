export class Intent
{
  id: string;
  parentId: string;
  level: number;
  name:string;
  answers:string[];
  trainingSamples:string[];
  events:string[];
  misunderstandingStatements:string[];
  children:Intent[];
}