const formatPhoneText = (nums: Array<string>) => {
    let rawText = "+ _ (___) ___ - __ - __"
    for (let i = 0; i < nums.length; i++) {
        rawText = i > 10 ? (rawText += ' - _').replace("_", nums[i]) : rawText.replace("_", nums[i]);
    }
    return rawText;
}

export const handleKeyDown = (prevField: any) => {

    const nums = prevField.match(/\d/g) || [];
    nums.pop(); // Удаляем последнюю цифру
    return formatPhoneText(nums);

};

export const formatPhone = (phone: string) => {
    const nums = phone.match(/\d/gi) || [];
    return formatPhoneText(nums);
}


export const makeDuration=(ms:number)=>{
    const sec = Math.floor(ms / 1000);
    const days = Math.floor(sec / (3600 * 24));
    const hours = Math.floor((sec % (3600 * 24)) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    const parts = [];
    if (days) parts.push(`${days} дн.`);
    if (hours) parts.push(`${hours} ч.`);
    if (minutes) parts.push(`${minutes} мин.`);
    if (seconds || parts.length === 0) parts.push(`${seconds} сек.`);

    return parts.join(' ');
}

export function formatDuration(startDate:string, endDate:string) {

    if (!startDate || !endDate) {
        return 0
    }
    const start:Date = new Date(startDate)
    const end:Date = new Date(endDate)



    const ms: number = end.getTime() - start.getTime(); // <-- здесь теперь точно number

    if (ms <= 0) return '0 сек.';

    return makeDuration(ms)

}


