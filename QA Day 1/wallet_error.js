"use strict";
{
    const merchantName = "Daraz";
    let balancePaisa = "250000";
    const kycVerification = 1;
    const transferAmount = "123";
    const cashBack = transferAmount * 0.02;
    const afterTransfer = balancePaisa - transferAmount + cashBack;
    const canSend = balancePaisa >= transferAmount &&
        kycVerification &&
        transferAmount > 0;
    balancePaisa = afterTransfer;
    console.log(`
Merchant   : ${merchantName}
KYC        : ${kycVerification ? "verified" : "not verified"}
Sent       : Rs ${transferAmount}
Cashback   : Rs ${cashBack}
Balance    : Rs ${balancePaisa}
Approved   : ${canSend}
`);
}
