import { u128 } from "near-sdk-as";
import { toYocto } from "../../utils";
import { Festival } from "./model";


export function addFest(festName:string,genre:string,country:string,date:string,requestDonation:u128): Festival {
  return Festival.addFest(festName,genre,country,date,requestDonation);
}

export function findFestById(id:u32): Festival {
  return Festival.findFestById(id);
}

export function findFestByName(festName:string): Festival {
  return Festival.findFestByName(festName);
}

export function findFests(offset: u32, limit: u32=15): Festival[] {
  return Festival.findFests(offset,limit);
}

export function donateFest(id: u32, donation:u8): Festival {
  return Festival.donateFest(id,toYocto(donation))
}

