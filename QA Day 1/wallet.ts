{
    const merchantName: string = "Daraz";
    let balancePaisa: number = 250000;

    const kycVerification: boolean = true;

    const transferAmount: number = 150000;  
    const cashBack: number = transferAmount * 0.02;

    const afterTransfer: number =
        balancePaisa - transferAmount + cashBack;

    const canSend: boolean =
        balancePaisa >= transferAmount &&
        kycVerification &&
        transferAmount > 0;

    balancePaisa = afterTransfer;

    console.log(`
Merchant   : ${merchantName}
KYC        : ${kycVerification ? "verified" : "not verified"}
Sent       : Rs ${transferAmount }
Cashback   : Rs ${cashBack }
Balance    : Rs ${balancePaisa }
Approved   : ${canSend}
`);
}