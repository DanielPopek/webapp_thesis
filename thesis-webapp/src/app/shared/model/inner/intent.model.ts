export class Intent
{
  id: number;
  parentId: number;
  level: number;
  name:string;
  answers:string[];
  trainingSamples:string[];
  events:string[];
  children:Intent[];
}