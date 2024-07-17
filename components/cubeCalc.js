function cubeCalc(tic1, tic2, tic3, tic4, tic5){

    // ticket level
    const tickets = [tic1*1, tic2*1, tic3*1, tic4*1, tic5*1];

    // Gem calc: gem(lv.i)*3 = gem(lv.i+1)
    const gems = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expReward = [0, 0, 0, 0, 0, 0, 0, 0];

    // Cube avg rewards: gems, itm1, itm2, card, itm3, itm4, itm5, money 
    const rewards = [
        [21, 4, 0, 3000, 6, 3, 1, 77800],
        [36, 14, 0, 9000, 8, 4, 2, 99290],
        [54, 25, 0, 12000, 11, 6, 2, 111500],
        [72, 0, 14, 13000, 12, 7, 3, 120180],
        [81, 0, 25, 13500, 13, 8, 4, 129660]
    ];

    // tickets => expect rewards 
    for(const ticket in tickets)
        for(let t = 0; t < tickets[ticket]; t++) 
            for(const sum in expReward)
                expReward[sum] += rewards[ticket][sum];

    // lv 1 gems init
    gems[0] = expReward[0];

    // expect gems
    for(const gem in gems){
        if(parseInt(gems[gem]/3) != 0){
            gems[(gem*1)+1] = parseInt((gems[gem])/3);
            gems[gem] -= gems[(gem*1)+1]*3;
        }
        
    }

    // result
    expReward[0] = gems;

    return expReward;
}

module.exports = cubeCalc;