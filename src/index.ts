import {Args_instantiate, InstantiateResult, Cosmos_Module, Args_updateName, Args_sayHello} from "./wrap";

export function instantiate(args: Args_instantiate): InstantiateResult {
  const message: string = `Hello ${args.name}. Polygasm Initialized!`;

  Cosmos_Module.DbSet({
    key: String.UTF8.encode("name"),
    value: String.UTF8.encode(args.name),
  })
  
  return {
    result: message
  }
}

export function updateName(args: Args_updateName): boolean {
  Cosmos_Module.DbSet({
    key: String.UTF8.encode("name"),
    value: String.UTF8.encode(args.name),
  })
  
  return true;
}

export function sayHello(_: Args_sayHello): string {
  const nameBuf = Cosmos_Module.DbGet({
    key: String.UTF8.encode("name"),
  }).unwrap()
  const name = String.UTF8.decode(nameBuf);

  return `Hello from Polygasm, ${name}`;
}
