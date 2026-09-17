
const balancePaisa = 100000;      // Rs 1,000 available balance
const pertxnLimitPaisa = 2500000; // Rs 25,000 per-transaction limit
const supportedGateways = ["esewa", "khalti", "connectips"];
 

const transactions = [
    { id: "TXN-01", gateway: "esewa",      amountPaisa: 15000,   verified: true  },
    { id: "TXN-02", gateway: "khalti",     amountPaisa: 0,       verified: true  },
    { id: "TXN-03", gateway: "connectips", amountPaisa: 3000000, verified: true  },
    { id: "TXN-04", gateway: "connectips", amountPaisa: 50000,   verified: false },
    { id: "TXN-05", gateway: "fonepay",    amountPaisa: 20000,   verified: true  },
    { id: "TXN-06", gateway: "esewa",      amountPaisa: 150000,  verified: true  },
];

function  feeFor (amountPaisa){
    if(amountPaisa <= 10000){ // up to Rs 100  free
        return "0";
    }else if(amountPaisa <=100000){ // up to Rs 1,000 Rs 5
        return "500";
    }else {
        return "1500"; // above Rs 1,000 Rs 15
    }
}

function validate(txn) {
    if(!txn.amountPaisa || txn.amountPaisa <=0 ){
        return " Invalid amount";
    }
    if(!txn.verified){
        return "	KYC pending";
    }
    if(txn.amountPaisa > pertxnLimitPaisa){
        return "Exceeds per-transaction limit";
    }
    if(txn.amountPaisa > balancePaisa){
        return "Insufficient balance";
    }
    if(!supportedGateways.includes(txn.gateway)){
        return "Unsupported gateway";
    }
    return "OK";
}

let approvedCount = 0;
let rejectedCount = 0;
let totalValuePaisa = 0;

for (const txn of transactions) {
    const result = validate(txn);
 
    if (result !== "OK") {
        rejectedCount++;
        console.log(`${txn.id}  REJECTED  ${result}`);
        continue; 
    }
 
    
    const fee = feeFor(txn.amountPaisa);
 
    let routeMsg;
    switch (txn.gateway) {
        case "esewa":
            routeMsg = "Redirect to eSewa";
            break;
        case "khalti":
            routeMsg = "Redirect to Khalti";
            break;
        case "connectips":
            routeMsg = "Redirect to ConnectIPS";
            break;
        default:
            routeMsg = "Redirect to gateway";
    }
 
    approvedCount++;
    totalValuePaisa += txn.amountPaisa;
 
    const amountRs = (txn.amountPaisa / 100).toFixed(2);
    const feeRs = (fee / 100).toFixed(2);
    console.log(`${txn.id}  OK        Rs ${amountRs}   fee Rs ${feeRs}    ${routeMsg}`);
}
 

console.log(
    `Approved ${approvedCount} · Rejected ${rejectedCount} · Value Rs ${(totalValuePaisa / 100).toFixed(2)}`
);