export  const handleKeyDown = (prevField: any) => {

    const nums = prevField.match(/\d/g) || [];
    nums.pop(); // Удаляем последнюю цифру

    // Переформатируем маску
    let rawText = "+ _ (___) ___ - __ - __";
    for (let i = 0; i < nums.length; i++) {
        rawText = rawText.replace("_", nums[i]);
    }

    return rawText;

};

export const formatPhone = (phone:string)=> {
    const nums = phone.match(/\d/gi);

    let rawText = "+ _ (___) ___ - __ - __"
    if (nums) {
        for (let i = 0; i < nums?.length; i++) {
            rawText = rawText.replace("_", nums[i]);
        }

    }

    return rawText
}