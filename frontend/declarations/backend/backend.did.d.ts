import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Property {
  'id' : PropertyId,
  'propertyType' : string,
  'size' : number,
  'description' : [] | [string],
  'imageUrl' : [] | [string],
  'price' : number,
  'location' : string,
}
export type PropertyId = bigint;
export type Result = { 'ok' : Property } |
  { 'err' : string };
export interface _SERVICE {
  'createProperty' : ActorMethod<
    [string, string, number, number, [] | [string], [] | [string]],
    PropertyId
  >,
  'getProperties' : ActorMethod<[], Array<Property>>,
  'getProperty' : ActorMethod<[PropertyId], Result>,
  'searchProperties' : ActorMethod<[string], Array<Property>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
