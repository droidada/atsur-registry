const debouce = (func, delay) =>
{
    let timeOutId;
    return (...args) =>
    {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => func(...args), delay);
    };
};

export default debouce;
