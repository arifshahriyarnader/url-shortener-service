export const generateShortCode =(length: number = 6): string => {
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode='';
    for(let i=0;i<length;i++){
        shortCode +=  chars[Math.floor(Math.random() * chars.length)];
    }
    return shortCode;
}