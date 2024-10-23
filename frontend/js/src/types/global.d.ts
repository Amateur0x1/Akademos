declare interface Function {
  myCall(context: any, ...args: any[]): any;
  myApply(context: any, argsArray?: any[]): any;
  myBind(context: any, ...bindArgs: any[]): (...args: any[]) => any;
}
