import {Cosmos_Module, Args_updateName, Args_sayHello, Args_init, InitResult} from "./wrap";

export function init(args: Args_init): InitResult {
  const message: string = `Hello ${args.name}. CosmoWrap Initialized!`;

  Cosmos_Module.DbSet({
    key: String.UTF8.encode("name"),
    value: String.UTF8.encode(args.name),
  })
  
  return {
    result: message
  }
}

export function updateName(args: Args_updateName): string {
  Cosmos_Module.DbSet({
    key: String.UTF8.encode("name"),
    value: String.UTF8.encode(args.newName),
  })
  
  return "";
}

export function sayHello(_: Args_sayHello): string {
  const nameBuf = Cosmos_Module.DbGet({
    key: String.UTF8.encode("name"),
  }).unwrap()
  const name = String.UTF8.decode(nameBuf);

  return `Hello from CosmoWrap, ${name}`;
}
