const formatPhoneText=(nums:Array<string>)=>{
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