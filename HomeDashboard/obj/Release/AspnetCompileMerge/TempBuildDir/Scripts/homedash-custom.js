function roundDecimal(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function getMomentFromUnixEpoch(unixEpoch)
{
    return new moment(unixEpoch * 1000);
}
