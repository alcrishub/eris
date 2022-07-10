function checkType(value, type, data) {
    if (type === "STRING") {
        if (typeof value !== 'string')
            throw new TypeError(`Expected type of "string", got "${typeof value}"`);
        if (data?.minLength !== undefined && value.length < data.minLength)
            throw new RangeError(`String must be longer than ${data.minLength} characters.`);
        if (data?.maxLength !== undefined && value.length > data.maxLength)
            value = value.slice(0, data.maxLength);
        if (data?.match !== undefined && !data.match.test(value))
            throw new Error("String doesn't match with the pattern.");
        if (data?.length !== undefined) {
            if (Array.isArray(data.length)) {
                if (!data.length.includes(value.length))
                    throw new RangeError("String doesn't have a valid length.");
            }
            else if (data.length !== value.length)
                throw new RangeError("String doesn't have a valid length.");
        }
        if (data?.enum !== undefined) {
            if (!data.enum.includes(value))
                throw new TypeError('This string is not allowed.');
        }
    } else if (type === 'NUMBER') {
        if (typeof value !== 'number')
            throw new TypeError(`Expected type of "number", got "${typeof value}".`);
        if (data?.max !== undefined && value > data.max)
            throw new RangeError(`The value must not exceed ${data.max}.`);
        if (data?.min !== undefined && value < data.min)
            throw new RangeError(`The value must be greater than ${data.min}.`);
        if (data?.integer === true && !Number.isInteger(value))
            value = Math.floor(value);
    }
    return value;
}

function randomHexColor() {
    const characters = 'ABCDEF1234567890';
    let str = '';
    for (let i = 0; i < 6; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return Number('0x' + str);
}

module.exports = checkType
module.exports = randomHexColor