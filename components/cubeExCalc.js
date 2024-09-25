function cubeExCalc(tic1, tic2){

    // ticket level
    const tickets = [tic1*1, tic2*1];

    // Gem calc: gem(lv.i)*3 = gem(lv.i+1)
    const gems = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const expReward = [0, 0, 0, 0, 0, 0];

    // Cube avg rewards: gems, itm1, card, itm2, itm3, money 
    const rewards = [
        [9, 14, 14000, 4, 4, 140100],
        [18, 25, 14500, 5, 5, 146800]
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

module.exports = cubeExCalc;
