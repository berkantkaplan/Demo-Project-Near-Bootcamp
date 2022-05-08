import {context, u128, PersistentUnorderedMap, math,logging, ContractPromiseBatch } from "near-sdk-as";
import { AccountId } from "../../utils";

//storage
export const fests = new PersistentUnorderedMap<u32, Festival>("f");
//limitage
export const maxDonateLimit = u128.from("20000000000000000000000000");
export const donation = 0

@nearBindgen
export class Festival {
    owner: AccountId = context.sender;
    id: u32;
    festName: string;
    genre: string;
    country: string;
    date: string;
    donation: u128;
    requestDonation: u128;
    remainderDonation: u128;
    maxDonationLimit: u128;
    
    



    constructor(festName: string,
                genre: string,
                country: string,
                date: string,
                request:u128) {
        this.festName = festName;
        this.genre = genre;
        this.country = country;
        this.date = date;
        this.id = math.hash32<string>(festName);
        this.donation = context.attachedDeposit;
        this.requestDonation = request;
        this.remainderDonation = request;
        this.maxDonationLimit = maxDonateLimit; 
        
   
        
      //adding Festival with arguments
    } //id is given automatically and is unique
    static addFest(festName:string,genre:string,country:string,date:string,requestDonation:u128): Festival {
        let id = math.hash32<string>(festName);
        const fest = new Festival(festName,genre,country,date,requestDonation);
        fests.set(fest.id,fest);
        logging.log("Festival added " + festName + " " + genre + " " + country + " " + date + " " + requestDonation.toString());
        return fest;

       // showing festival by id argument
    }  // If there is no festival with the entered id, it will warn 
    static findFestById(id:u32): Festival {
        assert(fests.contains(id), "Festival does not exist!")
        logging.log("festival by " + id.toString());
        return fests.getSome(id);

       // showing festival by festName argument
    }  // if there is no festival with the entered name, it will warn 
    static findFestByName(festName:string): Festival {
        assert(fests.contains(math.hash32<string>(festName)), "There is no festival by this name!");
        logging.log("id of " + festName);
        return fests.getSome(math.hash32<string>(festName));

       // showing all festivals
    }  // limited with 15
    static findFests(offset:u32, limit:u32): Festival[] {
        return fests.values(offset, limit + offset);


    } // donate to festival
    static donateFest(id:u32, donation: u128): Festival {
        const get = fests.getSome(id);
        const donate = context.attachedDeposit;
        const sender = context.sender;
        const depo = ContractPromiseBatch.create(sender);
        assert(donate > u128.Zero , "Donate must be bigger than 0.");
        assert(donate <= maxDonateLimit, "You can donate up to 20 NEAR per festival!");
        assert(donate <= get.requestDonation, "Donate cannot be bigger than request. ")
        assert(donate <= get.remainderDonation, "You cannot donate more than the remaining donation amount.")
        get.donation = u128.add(get.donation,donate) 
        get.remainderDonation = u128.sub(get.requestDonation , get.donation)
        fests.set(id,get);
        fests.set(get.id,get);
        if (get.requestDonation == get.donation){
            logging.log ("The requested " + get.requestDonation.toString() +" Near donation has been reached!")
        }
            return get;
    }

    
    
} 
